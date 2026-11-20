import { validateEnquiry } from "../../lib/enquiry.mjs";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
export const config = { api: { bodyParser: { sizeLimit: "12kb" } } };
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.setHeader("Allow", "POST").status(405).end();
  const fields = validateEnquiry(req.body);
  if (!fields) return res.status(400).end();
  const id = randomUUID();
  try {
    const dir =
      process.env.ENQUIRY_DIRECTORY || path.join(process.cwd(), ".private");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "enquiries.ndjson"),
      JSON.stringify({
        id,
        time: new Date().toISOString(),
        ...fields,
        consent: true,
      }) + "\n",
      { mode: 0o600 },
    );
    res.status(201).json({ id });
  } catch {
    res.status(503).end();
  }
}

