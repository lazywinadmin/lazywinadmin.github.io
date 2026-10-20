// Pure data helpers (no Worker APIs) so they can be unit-tested with plain node.
let cache = { at: 0, data: null, url: null };

export async function loadIndex(env, fetchImpl = fetch) {
  const url = env.INDEX_URL || "https://lazywinadmin.com/api/posts.json";
  const ttl = Number(env.INDEX_TTL || 600) * 1000;
  if (cache.data && cache.url === url && Date.now() - cache.at < ttl) return cache.data;
  const res = await fetchImpl(url, { cf: { cacheTtl: Number(env.INDEX_TTL || 600), cacheEverything: true } });
  if (!res.ok) {
    if (cache.data) return cache.data; // serve stale on upstream error
    throw new Error(`Index fetch failed: HTTP ${res.status}`);
  }
  const data = await res.json();
  cache = { at: Date.now(), data, url };
  return data;
}

const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const tokens = (s) => norm(s).split(/[^a-z0-9#.+-]+/).filter((t) => t.length > 1);

function lev1(a, b) { // true if edit distance <= 1
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, e = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++e > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return e + (a.length - i) + (b.length - j) <= 1;
}

function fieldScore(qt, words, weight) {
  let s = 0;
  for (const w of words) {
    if (w === qt) { s += weight * 3; break; }
    if (w.startsWith(qt) && qt.length >= 3) { s += weight * 2; break; }
    if (qt.length >= 5 && lev1(qt, w)) { s += weight; break; }
  }
  return s;
}

export function searchPosts(index, query, limit = 10) {
  const qts = tokens(query);
  if (!qts.length) return [];
  const out = [];
  for (const p of index.posts) {
    const title = tokens(p.title), tags = (p.tags || []).flatMap(tokens);
    const ex = tokens(`${p.tldr || ""} ${p.excerpt || ""}`);
    let score = 0, hit = 0;
    for (const qt of qts) {
      const s = fieldScore(qt, title, 5) + fieldScore(qt, tags, 4) + fieldScore(qt, ex, 1);
      if (s) hit++;
      score += s;
    }
    if (!score) continue;
    if (hit === qts.length) score *= 1.5; // all terms matched
    if (norm(p.title).includes(norm(query))) score += 10; // phrase in title
    out.push({ score, p });
  }
  out.sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date));
  return out.slice(0, limit).map(({ score, p }) => ({ ...summary(p), score: Math.round(score * 10) / 10 }));
}

export function summary(p) {
  return { title: p.title, url: p.url, date: p.date, last_modified_at: p.last_modified_at, tags: p.tags, tldr: p.tldr, excerpt: p.excerpt };
}

export function findPost(index, ref) {
  const r = String(ref || "").trim();
  let path = r;
  try { path = new URL(r).pathname; } catch {}
  path = path.replace(/[?#].*$/, "").replace(/\/+$/, "");
  const bare = path.replace(/^\/+/, "").replace(/\.html$/, "");
  return index.posts.find((p) => {
    const pp = new URL(p.url).pathname.replace(/^\/+/, "").replace(/\.html$/, "");
    return pp === bare || pp.endsWith("/" + bare) || p.slug === bare || norm(p.slug) === norm(bare);
  }) || null;
}

export function recentPosts(index, n = 10) {
  return index.posts.slice(0, n).map(summary); // index is newest first
}

export function listTags(index) {
  const c = new Map();
  for (const p of index.posts) for (const t of p.tags || []) c.set(t, (c.get(t) || 0) + 1);
  return [...c].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
