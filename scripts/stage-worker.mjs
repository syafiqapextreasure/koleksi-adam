import { promises as fs } from "node:fs";
import path from "node:path";

const dest = path.resolve(".worker-assets");
await fs.rm(dest, { recursive: true, force: true });
await fs.mkdir(dest);
async function stage(source, target) {
  const stat = await fs.stat(source);
  if (stat.isDirectory()) {
    await fs.mkdir(target, { recursive: true });
    for (const entry of await fs.readdir(source)) await stage(path.join(source, entry), path.join(target, entry));
    return;
  }
  if (stat.size > 25 * 1024 * 1024) throw Error("Asset exceeds the Workers limit: " + source);
  await fs.mkdir(path.dirname(target), { recursive: true });
  try { await fs.link(source, target); }
  catch (error) {
    if (!["EPERM", "EXDEV", "ENOTSUP"].includes(error.code)) throw error;
    await fs.copyFile(source, target);
  }
}
for (const name of await fs.readdir("public")) {
  await stage(name === "catalogues" ? "worker-catalogues" : path.join("public", name), path.join(dest, name));
}
await stage(".next/static", path.join(dest, "_next/static"));
const { routes } = JSON.parse(await fs.readFile(".next/prerender-manifest.json", "utf8"));
for (const [route, meta] of Object.entries(routes)) {
  if (route === "/_not-found") continue;
  const slug = route.slice(1) || "index";
  if (meta.dataRoute) {
    await stage(".next/server/pages/" + slug + ".html", path.join(dest, slug + ".html"));
    await stage(".next/server/pages/" + slug + ".json", path.join(dest, meta.dataRoute.slice(1)));
  } else if (route === "/sitemap.xml" || route === "/robots.txt") {
    await stage(".next/server/app/" + slug + ".body", path.join(dest, slug));
  } else {
    throw Error("Unhandled prerendered route " + route);
  }
}
await stage(".next/server/pages/404.html", path.join(dest, "404.html"));
for (const name of ["index.html", "bm.html", "sitemap.xml", "robots.txt"]) await fs.access(path.join(dest, name));
console.log("Prepared " + Object.keys(routes).length + " routes and their assets for Workers.");

