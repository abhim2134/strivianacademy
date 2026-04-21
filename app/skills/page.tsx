import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import SkillCard from "@/components/SkillCard";
import { SKILLS } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Free Claude Skills — Strivian Academy",
  description:
    "Free, ready-to-install Claude skills built by a software engineer. Drop your email, get the files.",
};

export default function SkillsPage() {
  const available = SKILLS.filter((s) => s.available);
  const upcoming = SKILLS.filter((s) => !s.available);
  const featured = available[0];
  const rest = available.slice(1);

  return (
    <>
      <BackgroundCanvas />
      <div className="sx-wrap">
        <Nav page="skills" />

        {/* HERO */}
        <section className="sx-skills-hero">
          <div className="sx-skills-hero-inner">
            <div className="sx-skills-crumb">
              strivianacademy.com{" "}
              <span style={{ opacity: 0.4 }}>/</span>{" "}
              <span style={{ color: "var(--neon-1)" }}>skills</span>
            </div>
            <h1 className="sx-skills-h1">
              Free Claude <span className="sx-gradient-text">skills</span>.
            </h1>
            <p className="sx-skills-sub">
              Real systems you can drop into Claude today. New ones ship
              whenever I build something worth sharing.
            </p>
          </div>
        </section>

        {/* GRID */}
        <section className="sx-grid-section">
          <div className="sx-grid-head">
            <span>
              {available.length}{" "}
              {available.length === 1 ? "skill" : "skills"} available
              {upcoming.length > 0 && (
                <>
                  {" · "}
                  <span style={{ color: "var(--neon-1)" }}>
                    {upcoming.length} coming
                  </span>
                </>
              )}
            </span>
            <span className="sx-meta-dim">
              {"// new skills whenever I ship"}
            </span>
          </div>

          {featured ? (
            <div
              className="sx-skill-grid"
              style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
            >
              <SkillCard skill={featured} variant="feature" />
              {rest.map((s) => (
                <SkillCard key={s.id} skill={s} variant="card" />
              ))}
            </div>
          ) : (
            <div className="sx-empty">
              <div style={{ fontSize: 48 }}>⌀</div>
              <h3>
                More shipping <span>soon</span>.
              </h3>
              <div className="sx-meta-dim" style={{ marginTop: 8 }}>
                follow @abhi_ai26 for drops
              </div>
            </div>
          )}
        </section>

        {/* REQUEST */}
        <section className="sx-newsletter">
          <div className="sx-newsletter-inner">
            <div className="sx-newsletter-kicker">◎ more shipping soon</div>
            <h2 className="sx-newsletter-title">
              Follow <span className="sx-rainbow">@abhi_ai26</span>
              <br />
              for drops.
            </h2>
            <p className="sx-newsletter-sub">
              New Claude skills, teardowns, and builds — whenever I ship
              something worth sharing.
            </p>
            <div className="sx-newsletter-cta">
              <Link href="/#follow" className="sx-btn sx-btn-neon">
                Find me →
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
