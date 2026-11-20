import { constants, promises as fs } from "node:fs";
import path from "node:path";
const sources = "worker-catalogues", dest = "public/catalogues";
await fs.mkdir(dest, { recursive: true });
for (const name of await fs.readdir(sources)) {
  if (!name.endsWith(".pdf")) continue;
  const target = path.join(dest, name), source = path.join(sources, name);
  try { await fs.link(source, target); }
  catch (err) {
    if (err.code === "EEXIST") continue;
    await fs.copyFile(source, target, constants.COPYFILE_EXCL);
  }
}
