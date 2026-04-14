import { promises as fs } from "fs";
import path from "path";
import JSZip from "jszip";
import { getSkill } from "./skills";

export async function readSkillFile(
  skillId: string,
  filename: string
): Promise<Buffer> {
  const skill = getSkill(skillId);
  if (!skill) throw new Error("skill-not-found");
  if (!skill.files.includes(filename)) throw new Error("file-not-allowed");
  const abs = path.join(
    process.cwd(),
    "content",
    "skills",
    skillId,
    filename
  );
  return fs.readFile(abs);
}

export async function buildSkillZip(skillId: string): Promise<Buffer> {
  const skill = getSkill(skillId);
  if (!skill) throw new Error("skill-not-found");
  const zip = new JSZip();
  const folder = zip.folder(skillId)!;
  for (const file of skill.files) {
    const content = await readSkillFile(skillId, file);
    folder.file(file, content);
  }
  folder.file(
    "README-strivian.txt",
    [
      `${skill.title} — Strivian Academy`,
      "",
      "Install this skill in Claude by placing the contents of this folder at:",
      "  ~/.claude/skills/" + skillId + "/",
      "",
      "Make sure the directory contains SKILL.md at the top level.",
      "",
      "More free skills: https://strivianacademy.com/skills",
    ].join("\n")
  );
  const buf = await zip.generateAsync({ type: "nodebuffer" });
  return buf;
}
