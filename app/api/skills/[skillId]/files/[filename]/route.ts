import { NextResponse } from "next/server";
import { getSkill } from "@/lib/skills";
import { readSkillFile } from "@/lib/skillFiles";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ skillId: string; filename: string }> }
) {
  const { skillId, filename } = await params;
  const skill = getSkill(skillId);
  if (!skill || !skill.available || !skill.files.includes(filename)) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }
  const buf = await readSkillFile(skillId, filename);
  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(buf.length),
      "Cache-Control": "no-store",
    },
  });
}
