import { NextResponse } from "next/server";
import { getSkill } from "@/lib/skills";
import { buildSkillZip } from "@/lib/skillFiles";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ skillId: string }> }
) {
  const { skillId } = await params;
  const skill = getSkill(skillId);
  if (!skill || !skill.available) {
    return NextResponse.json({ error: "skill-not-found" }, { status: 404 });
  }
  const buf = await buildSkillZip(skillId);
  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${skillId}.zip"`,
      "Content-Length": String(buf.length),
      "Cache-Control": "no-store",
    },
  });
}
