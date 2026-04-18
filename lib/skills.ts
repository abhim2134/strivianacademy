export type Skill = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
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
    tagline: "One command. A full website business. Shipped.",
    description:
      "A Claude skill that researches local businesses, builds them a complete Next.js website from public signals, pushes it to GitHub, deploys it to Vercel, and logs everything to a file — all in one shot.",
    category: "Agents",
    readTime: "2 min setup",
    files: ["SKILL.md", "design-tokens.md"],
    accent: "acid",
    available: true,
    features: [
      "Finds local businesses without websites via Google Maps",
      "Generates tailored website to business",
      "Generates bespoke Next.js sites with exceptional design",
      "Auto-deploys to Vercel, logs leads to a CSV",
      "Cross-platform preflight (macOS, Linux, Windows)",
    ],
  },
  {
    id: "local-business-gaps",
    title: "Local Business Gaps",
    tagline: "Cold calling is dead. Walk in with evidence.",
    description:
      "A Claude skill that researches any local business across 8+ signal sources, finds the exact digital gaps you can pitch them, and writes a sales brief per prospect — what's broken, what to sell, what to build, and rough price band.",
    category: "Agents",
    readTime: "3 min setup",
    files: [
      "SKILL.md",
      "intake.md",
      "gap-catalog.md",
      "recipe-home-services.md",
      "recipe-restaurants-cafes.md",
      "recipe-professional-services.md",
    ],
    accent: "plum",
    available: true,
    features: [
      "Pulls signals from GBP, website, SERP, Meta Ad Library, socials, Yelp, BBB, LinkedIn",
      "Scores gaps against an opinionated catalog with severity + evidence",
      "Maps each gap to a concrete service you sell and what to build",
      "Per-business pitch brief + cross-target matrix for batch prospecting",
      "Adapts the signal stack to your vertical and services automatically",
    ],
  },
];

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}
