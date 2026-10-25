# Font Awesome Free subset

The site self-hosts a **subset** of [Font Awesome Free 6.7.2](https://fontawesome.com/) instead of loading
the full `all.min.css` and three full webfonts from cdn.jsdelivr.net.

| Output | Purpose |
| --- | --- |
| `assets/css/fontawesome-subset.css` | upstream `all.css` trimmed to the icons in `icons.txt` (+ all upstream utility classes, alias names kept) |
| `assets/fonts/fontawesome/fa-{solid-900,regular-400,brands-400}.woff2` | glyph subsets of the official fonts |
| `assets/fonts/fontawesome/LICENSE.txt` | upstream Font Awesome Free licence (icons CC BY 4.0, fonts SIL OFL 1.1, code MIT) |

## Add or remove an icon

1. Edit `icons.txt` (`solid|regular|brands <icon name without fa- prefix>`; legacy aliases such as
   `file-alt`, `calendar-alt`, `rss-square` are fine, they are defined in upstream `all.css`).
2. Rebuild (needs Node/npm and Python):

   ```bash
   mkdir -p /tmp/fa && cd /tmp/fa && npm i @fortawesome/fontawesome-free@6.7.2
   pip install fonttools brotli
   python3 .github/fontawesome-subset/build.py /tmp/fa/node_modules/@fortawesome/fontawesome-free
   ```

   The script fails if an icon class does not exist upstream or its glyph is missing from the font of the
   requested style, so a typo cannot silently produce a blank icon.
3. Commit the regenerated CSS and fonts.

If you add icons that Font Awesome Free does not ship, they will not appear (Pro icons are not included).
After deploying a changed font/CSS, purge those paths in Cloudflare if they were already cached.
