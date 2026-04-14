export type Skill = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  files: string[];
  accent: "acid" | "plum" | "rust";
  available: boolean;
  features: string[];
};

export const SKILLS: Skill[] = [
  {
    id: "ai-website-business",
    title: "AI Website Business",
    tagline: "One prompt. A full business website. Shipped.",
    description:
      "A Claude skill that researches local businesses, builds them a complete Next.js website from public signals, pushes it to GitHub, deploys it to Vercel, and logs everything to a spreadsheet — all in one shot.",
    category: "Agents",
    difficulty: "Intermediate",
    readTime: "2 min setup",
    files: ["SKILL.md", "design-tokens.md"],
    accent: "acid",
    available: true,
    features: [
      "Finds local businesses without websites via Google Maps",
      "Pulls real photos, reviews, and hours — zero fabrication",
      "Generates bespoke Next.js sites with exceptional design",
      "Auto-deploys to Vercel, logs leads to a CSV",
      "Cross-platform preflight (macOS, Linux, Windows)",
    ],
  },
];

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}
