import type { Metadata } from "next";
import Link from "next/link";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import FeaturedSkill from "@/components/FeaturedSkill";
import { SKILLS } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Free Claude skills · @abhibuilds1",
  description:
    "Free, ready-to-install Claude skills built by a software engineer. Drop your email, get the download link.",
};

export default function SkillsPage() {
  const available = SKILLS.filter((s) => s.available);

  return (
    <>
      <BackgroundCanvas />
      <main className="sx-bio">
        <div className="sx-bio-inner sx-bio-inner-skills">
          <h1 className="sx-bio-title sx-bio-title-sm">free claude skills.</h1>
          <p className="sx-bio-sub">
            Real systems you can drop into Claude today.
          </p>

          <div className="sx-bio-list">
            {available.map((s) => (
              <FeaturedSkill key={s.id} skill={s} />
            ))}
          </div>

          <Link href="/" className="sx-bio-back">
            ← back
          </Link>

          <div className="sx-bio-foot">amullapudi.com / skills</div>
        </div>
      </main>
    </>
  );
}
