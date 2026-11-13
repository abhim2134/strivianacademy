export type Skill = {
  id: string;
  title: string;
  tagline: string;
  /** Zip in content/skills/, sent as a signed download link. */
  zip: string;
  available: boolean;
  features: string[];
  glyph: string;
  /** What to say to Claude once the skill is installed. */
  prompt: string;
};

export const SKILLS: Skill[] = [
  {
    id: "local-ai-setup",
    title: "Local AI Setup",
    tagline:
      "Checks your computer, picks the best local AI model it can run, and sets it up. No usage cap.",
    zip: "local-ai-setup.zip",
    available: true,
    features: [
      "Reads your RAM, GPU and disk (Mac, Windows, Linux)",
      "Picks a model that fits, and tells you why",
      "Installs Ollama, downloads the model, sets context",
      "Tests speed and connects Claude Code to it",
    ],
    glyph: "∞",
    prompt: "Set up local AI on my computer.",
  },
];

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}
