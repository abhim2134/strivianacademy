import type { Metadata } from "next";
import Link from "next/link";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import SkillCard from "@/components/SkillCard";
import { SKILLS } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Free Claude Skills — @abhi_ai26",
  description:
    "Free, ready-to-install Claude skills built by a software engineer. Drop your email, get the files.",
};

export default function SkillsPage() {
  const available = SKILLS.filter((s) => s.available);
  const upcoming = SKILLS.filter((s) => !s.available);

  return (
    <>
      <BackgroundCanvas />
      <main className="sx-bio">
        <div className="sx-bio-inner sx-bio-inner-skills">
          <Link href="/" className="sx-bio-brand sx-bio-brand-link">
            <span className="sx-logo-mark">
              <span className="sx-logo-mark-inner">@</span>
            </span>
            <span className="sx-bio-name">abhi_ai26</span>
          </Link>

          <h1 className="sx-bio-title sx-bio-title-sm">free claude skills.</h1>
          <p className="sx-bio-sub">
            real systems you can drop into claude today.
          </p>

          <div className="sx-bio-list">
            {available.map((s) => (
              <SkillCard key={s.id} skill={s} variant="row" />
            ))}
            {upcoming.map((s) => (
              <SkillCard key={s.id} skill={s} variant="row" />
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
