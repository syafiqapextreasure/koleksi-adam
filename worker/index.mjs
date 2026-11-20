import { validateEnquiry } from "../lib/enquiry.mjs";

const maxBytes = 12 * 1024;

async function submit(request, env) {
  const headers = { "Cache-Control": "no-store" };
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { ...headers, Allow: "POST" } });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return new Response(null, { status: 415, headers });
  if (!request.body) return new Response(null, { status: 400, headers });
  if (Number(request.headers.get("content-length")) > maxBytes) return new Response(null, { status: 413, headers });
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let raw = "", size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      return new Response(null, { status: 413, headers });
    }
    raw += decoder.decode(value, { stream: true });
  }
  let fields;
  try { fields = validateEnquiry(JSON.parse(raw + decoder.decode())); }
  catch { return new Response(null, { status: 400, headers }); }
  if (!fields) return new Response(null, { status: 400, headers });
  const id = crypto.randomUUID();
  const time = new Date().toISOString();
  try {
    await env.ENQUIRIES.put(time + "/" + id, JSON.stringify({ id, time, ...fields, consent: true }));
  } catch {
    return new Response(null, { status: 503, headers });
  }
  return Response.json({ id }, { status: 201, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiries") return submit(request, env);
    if (url.pathname.startsWith("/api/")) return new Response(null, { status: 404 });
    if (/\.html$/i.test(url.pathname)) {
      url.pathname = url.pathname.replace(/(?:\/index)?\.html$/i, "").replace(/\/$/, "") || "/";
      return Response.redirect(url, 308);
    }
    return env.ASSETS.fetch(request);
  }
};
