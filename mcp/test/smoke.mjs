// Local smoke test: runs the Worker handler in plain Node against a local posts.json
// usage: INDEX_FILE=/path/to/_site/api/posts.json node test/smoke.mjs
import { readFile } from "node:fs/promises";
import { handle } from "../src/index.js";

const file = process.env.INDEX_FILE || "../_site/api/posts.json";
const body = await readFile(file, "utf8");
const fakeFetch = async () => new Response(body, { headers: { "content-type": "application/json" } });
const env = { INDEX_URL: "local", INDEX_TTL: "600" };
let id = 0;
async function rpc(method, params) {
  const req = new Request("http://local/mcp", { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", "mcp-protocol-version": "2025-06-18" }, body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }) });
  const res = await handle(req, env, fakeFetch);
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.result;
}
const init = await rpc("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "smoke", version: "1" } });
console.log("initialize ->", init.serverInfo, "protocol", init.protocolVersion);
const tools = await rpc("tools/list", {});
console.log("tools/list ->", tools.tools.map((t) => t.name).join(", "));
const s = await rpc("tools/call", { name: "search_posts", arguments: { query: "ADSI local group", limit: 3 } });
const hits = JSON.parse(s.content[0].text);
console.log("search_posts('ADSI local group') ->"); for (const h of hits) console.log("  ", h.score, h.title, h.url);
const g = await rpc("tools/call", { name: "get_post", arguments: { url_or_slug: hits[0].url } });
console.log("get_post ->", g.content[0].text.split("\n").slice(0, 5).join(" | "), `(${g.content[0].text.length} chars)`);
const r = await rpc("tools/call", { name: "list_recent_posts", arguments: { n: 2 } });
console.log("list_recent_posts(2) ->", JSON.parse(r.content[0].text).map((p) => p.title));
const t = await rpc("tools/call", { name: "list_tags", arguments: {} });
console.log("list_tags ->", JSON.parse(t.content[0].text).slice(0, 5));
const miss = await rpc("tools/call", { name: "get_post", arguments: { url_or_slug: "does-not-exist" } });
console.log("get_post(missing) isError ->", miss.isError);
