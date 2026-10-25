#!/usr/bin/env python3
"""Build the self-hosted Font Awesome Free subset used by the site.

Inputs : the official @fortawesome/fontawesome-free package (see README.md)
         and icons.txt (one "<style> <icon-name>" per line).
Outputs: assets/fonts/fontawesome/fa-{solid-900,regular-400,brands-400}.woff2
         assets/css/fontawesome-subset.css

The generated CSS is the upstream all.css with (a) every icon rule that is not
listed in icons.txt removed, (b) the FA5 / v4-compat @font-face blocks removed
(nothing on the site uses those font families) and (c) the ttf fallbacks
removed (woff2 is supported by every browser we care about). All upstream
utility rules (fa-fw, fa-spin, sizes, ...) and icon aliases (fa-file-alt,
fa-calendar-alt, fa-rss-square, ...) that are used are preserved.

Requires: pip install fonttools brotli
Usage   : build.py /path/to/node_modules/@fortawesome/fontawesome-free
"""
import io, os, re, sys
from fontTools import subset
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
FONT_OUT = os.path.join(ROOT, 'assets', 'fonts', 'fontawesome')
CSS_OUT = os.path.join(ROOT, 'assets', 'css', 'fontawesome-subset.css')
FONTS = {'solid': 'fa-solid-900', 'regular': 'fa-regular-400', 'brands': 'fa-brands-400'}

fa = sys.argv[1]
css = open(os.path.join(fa, 'css', 'all.css'), encoding='utf-8').read()

# --- wanted icons -----------------------------------------------------------
wanted = {}  # style -> set(icon names)
for line in open(os.path.join(HERE, 'icons.txt')):
    line = line.strip()
    if line and not line.startswith('#'):
        style, name = line.split()
        wanted.setdefault(style, set()).add(name)

# --- split all.css into top-level blocks ------------------------------------
blocks, depth, start = [], 0, 0
for i, ch in enumerate(css):
    if ch == '{':
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            blocks.append(css[start:i + 1].strip())
            start = i + 1

icon_rule = re.compile(r'^\.fa-([a-z0-9-]+)\s*\{\s*--fa:\s*"\\([0-9a-f]+)";?\s*\}$')
codepoint, other = {}, []
for b in blocks:
    m = icon_rule.match(b)
    if m:
        codepoint[m.group(1)] = (int(m.group(2), 16), b)
    else:
        other.append(b)

# --- verify + collect code points per style ---------------------------------
unicodes = {s: set() for s in FONTS}
kept_rules, missing = [], []
for style, names in wanted.items():
    for n in sorted(names):
        if n not in codepoint:
            missing.append((style, n, 'no such class in all.css'))
            continue
        unicodes[style].add(codepoint[n][0])
for style, name in FONTS.items():
    cmap = TTFont(os.path.join(fa, 'webfonts', name + '.ttf')).getBestCmap()
    for n in sorted(wanted.get(style, ())):
        if n in codepoint and codepoint[n][0] not in cmap:
            missing.append((style, n, 'glyph not in %s' % name))
if missing:
    sys.exit('MISSING: %r' % missing)

all_names = sorted({n for s in wanted.values() for n in s})
kept_rules = [codepoint[n][1] for n in all_names]

# --- subset fonts -----------------------------------------------------------
os.makedirs(FONT_OUT, exist_ok=True)
for style, name in FONTS.items():
    if not unicodes[style]:
        continue
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = []          # icon fonts have no needed GSUB/GPOS
    opts.name_IDs = ['*']              # keep copyright / OFL licence strings
    opts.name_legacy = True
    opts.name_languages = ['*']
    opts.notdef_outline = True
    opts.hinting = False
    font = subset.load_font(os.path.join(fa, 'webfonts', name + '.ttf'), opts)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=sorted(unicodes[style]))
    sub.subset(font)
    subset.save_font(font, os.path.join(FONT_OUT, name + '.woff2'), opts)

# --- assemble CSS -----------------------------------------------------------
m = re.match(r'(/\*!.*?\*/)\s*(.*)', other[0], re.S)  # licence banner + first rule (.fa)
assert m, 'licence banner not found'
header = m.group(1)
keep = []
for b in [m.group(2)] + other[1:]:
    sel = b.split('{')[0]
    if b.startswith('@font-face'):
        fam = re.search(r"font-family:\s*'([^']+)'", b).group(1)
        wm = re.search(r'font-weight:\s*(\d+)', b)
        weight = wm.group(1) if wm else ''
        if fam == 'Font Awesome 6 Brands' and unicodes['brands']:
            style = 'brands'
        elif fam == 'Font Awesome 6 Free' and weight == '900' and unicodes['solid']:
            style = 'solid'
        elif fam == 'Font Awesome 6 Free' and weight == '400' and unicodes['regular']:
            style = 'regular'
        else:
            continue  # FA5 / FontAwesome v4 compat families: dropped
        b = re.sub(r'src:[^;]*;?', 'src: url("../fonts/fontawesome/%s.woff2") format("woff2");' % FONTS[style], b)
    elif sel.strip().startswith('/*'):
        continue
    keep.append(b)

body = '\n'.join(keep) + '\n' + '\n'.join(kept_rules) + '\n'
body = re.sub(r'/\*.*?\*/', '', body, flags=re.S)           # strip comments
body = re.sub(r'\s+', ' ', body)
body = re.sub(r'\s*([{};,])\s*', r'\1', body)
body = re.sub(r':\s+', ':', body)
body = body.replace(';}', '}')
note = ('/* Subset generated by .github/fontawesome-subset/build.py: %d icons from Font Awesome Free 6.7.2. */\n'
        % len(all_names))
open(CSS_OUT, 'w', encoding='utf-8').write(header + '\n' + note + body + '\n')

for style, name in FONTS.items():
    p = os.path.join(FONT_OUT, name + '.woff2')
    if os.path.exists(p):
        print('%-8s %2d glyphs  %6d bytes' % (style, len(unicodes[style]), os.path.getsize(p)))
print('css      %d bytes, %d icon classes' % (os.path.getsize(CSS_OUT), len(all_names)))
