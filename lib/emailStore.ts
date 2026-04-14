import { promises as fs } from "fs";
import path from "path";

type Entry = {
  email: string;
  skillId: string;
  at: string;
  ua?: string;
  ip?: string;
};

const STORE_PATH = path.join(process.cwd(), "data", "emails.json");

async function readStore(): Promise<Entry[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as Entry[];
  } catch {
    return [];
  }
}

export async function saveEmail(entry: Entry): Promise<{ persisted: boolean }> {
  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    const existing = await readStore();
    existing.push(entry);
    await fs.writeFile(STORE_PATH, JSON.stringify(existing, null, 2), "utf8");
    return { persisted: true };
  } catch (err) {
    console.log("[strivian] email capture (non-persisted)", {
      ...entry,
      err: err instanceof Error ? err.message : String(err),
    });
    return { persisted: false };
  }
}
