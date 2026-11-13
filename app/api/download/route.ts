import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getSkill } from "@/lib/skills";
import { verifyDownloadToken } from "@/lib/unsubscribe";

export const runtime = "nodejs";

// Serves a skill's zip to whoever holds the signed link from the unlock email.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const skillId = url.searchParams.get("s") ?? "";
  const email = url.searchParams.get("e") ?? "";
  const token = url.searchParams.get("t") ?? "";

  const skill = getSkill(skillId);
  if (!skill || !skill.available) {
    return NextResponse.json({ error: "skill-not-found" }, { status: 404 });
  }
  if (!email || !token || !verifyDownloadToken(email, skillId, token)) {
    return NextResponse.json({ error: "invalid-link" }, { status: 403 });
  }

  const file = await fs.readFile(
    path.join(process.cwd(), "content", "skills", skill.zip)
  );
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${skill.zip}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
