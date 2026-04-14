import { promises as fs } from "fs";
import path from "path";
import JSZip from "jszip";
import { getSkill } from "./skills";

function renderInstallMd(title: string, skillId: string): string {
  return `# ${title} — Install Guide

A free Claude skill from [Strivian Academy](https://strivianacademy.com).

---

## What's in this folder

- \`SKILL.md\` — the skill itself (instructions Claude loads when you invoke it)
- \`design-tokens.md\` — supporting file the skill references
- \`INSTALL.md\` — this file

## Install in Claude Code (3 steps)

**1. Make sure Claude Code is installed.** If you don't have it yet:
\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

**2. Drop this folder into your Claude skills directory.**

macOS / Linux:
\`\`\`bash
mkdir -p ~/.claude/skills
mv ${skillId} ~/.claude/skills/
\`\`\`

Windows (PowerShell):
\`\`\`powershell
New-Item -ItemType Directory -Force -Path $HOME\\.claude\\skills
Move-Item ${skillId} $HOME\\.claude\\skills\\
\`\`\`

Your directory should now look like this:
\`\`\`
~/.claude/skills/${skillId}/
  ├── SKILL.md
  ├── design-tokens.md
  └── INSTALL.md
\`\`\`

**3. Restart Claude Code** and invoke the skill by describing what you want. For example:
\`\`\`
Use the ${title} skill to build a website for a local business in Austin, TX
\`\`\`

Claude will detect the skill automatically and start running it.

## Troubleshooting

- **Skill not triggering?** Double-check the path. The skill folder must sit directly inside \`~/.claude/skills/\` — not one level deeper.
- **Getting permission errors on macOS?** Run \`chmod -R u+rw ~/.claude/skills/${skillId}\`.
- **Want to confirm Claude sees the skill?** Ask Claude: *"What skills do you have access to?"*

## More free skills

New skills ship at [strivianacademy.com/skills](https://strivianacademy.com/skills).

Follow **@abhi_ai26** on Instagram, TikTok, and YouTube to know when the next one drops.
`;
}

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
  folder.file("INSTALL.md", renderInstallMd(skill.title, skillId));
  const buf = await zip.generateAsync({ type: "nodebuffer" });
  return buf;
}
