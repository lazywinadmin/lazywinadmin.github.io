import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import { loadIndex, searchPosts, findPost, recentPosts, listTags } from "./blog.js";

const json = (v) => ({ content: [{ type: "text", text: JSON.stringify(v, null, 2) }] });
const RO = { readOnlyHint: true, openWorldHint: false };

export function buildServer(env, fetchImpl) {
  const server = new McpServer({ name: "lazywinadmin-blog", version: "0.1.0" });
  const idx = () => loadIndex(env, fetchImpl);

  server.registerTool("search_posts", {
    title: "Search blog posts",
    description: "Keyword/fuzzy search over lazywinadmin.com post titles, tags, TL;DR and excerpts (PowerShell, Azure, Terraform, DevOps, AD...). Returns matching posts with URL and summary.",
    inputSchema: { query: z.string().min(1).max(200), limit: z.number().int().min(1).max(50).default(10) },
    annotations: RO,
  }, async ({ query, limit }) => json(searchPosts(await idx(), query, limit)));

  server.registerTool("get_post", {
    title: "Get a blog post",
    description: "Return the full plain-text content of one post, by absolute URL, path (e.g. /2013/10/powershell-get-domainuser.html) or slug.",
    inputSchema: { url_or_slug: z.string().min(1).max(500) },
    annotations: RO,
  }, async ({ url_or_slug }) => {
    const p = findPost(await idx(), url_or_slug);
    if (!p) return { isError: true, content: [{ type: "text", text: `No post found for "${url_or_slug}". Try search_posts first.` }] };
    const head = [`# ${p.title}`, `URL: ${p.url}`, `Date: ${p.date}`, p.last_modified_at && `Updated: ${p.last_modified_at}`, p.tags?.length && `Tags: ${p.tags.join(", ")}`, p.tldr && `TL;DR: ${p.tldr}`].filter(Boolean).join("\n");
    return { content: [{ type: "text", text: `${head}\n\n${p.content}` }] };
  });

  server.registerTool("list_recent_posts", {
    title: "List recent posts",
    description: "List the n most recent posts, newest first.",
    inputSchema: { n: z.number().int().min(1).max(50).default(10) },
    annotations: RO,
  }, async ({ n }) => json(recentPosts(await idx(), n)));

  server.registerTool("list_tags", {
    title: "List tags",
    description: "List all post tags with post counts.",
    inputSchema: {},
    annotations: RO,
  }, async () => json(listTags(await idx())));

  return server;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

export async function handle(request, env, fetchImpl) {
  const url = new URL(request.url);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (url.pathname === "/" && request.method === "GET")
    return new Response("lazywinadmin.com read-only MCP server. Endpoint: POST /mcp (Streamable HTTP).\n", { headers: { "content-type": "text/plain", ...CORS } });
  if (url.pathname !== "/mcp") return new Response("Not found", { status: 404, headers: CORS });
  if (request.method !== "POST") // stateless server: no SSE stream / sessions
    return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed" }, id: null }), { status: 405, headers: { "content-type": "application/json", Allow: "POST", ...CORS } });
  if (Number(request.headers.get("content-length") || 0) > 64 * 1024) return new Response("Payload too large", { status: 413, headers: CORS });

  // Stateless: a fresh server + transport per request (recommended by the SDK for stateless mode).
  const server = buildServer(env, fetchImpl);
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await server.connect(transport);
  const res = await transport.handleRequest(request);
  const h = new Headers(res.headers);
  for (const [k, v] of Object.entries(CORS)) h.set(k, v);
  return new Response(res.body, { status: res.status, headers: h });
}

export default { fetch: (request, env) => handle(request, env) };
