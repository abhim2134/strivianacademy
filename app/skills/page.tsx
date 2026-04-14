import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

  return (
    <div className="grain relative">
      <Nav />

      {/* HERO */}
      <section className="relative mesh overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/3 h-80 w-80 rounded-full bg-plum/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-widest text-bone-dim hover:text-bone"
            >
              ← Home
            </Link>
            <span className="text-bone-dim">/</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-bone">
              Skills
            </span>
          </div>

          <h1 className="rise font-display text-[44px] sm:text-[84px] lg:text-[100px] leading-[0.92] tracking-[-0.035em] font-medium">
            Free Claude
            <br />
            <span className="italic font-light">skills</span>, ready to
            install.
          </h1>
          <p
            className="rise mt-6 max-w-2xl text-lg sm:text-xl text-bone-dim leading-relaxed"
            style={{ animationDelay: "120ms" }}
          >
            Real systems you can drop into Claude today. New ones ship
            whenever I build something worth sharing.
          </p>
          <div
            className="rise mt-8 inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-bone-dim"
            style={{ animationDelay: "220ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-acid pulse-dot" />
            {available.length} available
            {upcoming.length > 0 && ` · ${upcoming.length} coming soon`}
          </div>
        </div>
      </section>

      {/* SKILL CARDS */}
      <section className="relative border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24 space-y-8">
          {available.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}

          {/* Placeholder for future skills */}
          <div className="rounded-3xl border hairline border-dashed p-10 sm:p-16 text-center">
            <div className="font-mono text-[11px] uppercase tracking-widest text-bone-dim mb-4">
              More shipping soon
            </div>
            <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-bone-dim">
              Follow <span className="text-bone">@abhi_ai26</span> to know when
              the next one drops.
            </h3>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
