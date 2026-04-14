import { promises as fs } from "fs";
import path from "path";
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
