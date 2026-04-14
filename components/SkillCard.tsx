"use client";

import { useState } from "react";
import type { Skill } from "@/lib/skills";
import UnlockModal from "./UnlockModal";

export default function SkillCard({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  const accentMap: Record<Skill["accent"], string> = {
    acid: "bg-acid text-ink",
    plum: "bg-plum text-bone",
    rust: "bg-rust text-bone",
  };
  const accentBlur: Record<Skill["accent"], string> = {
    acid: "bg-acid/20",
    plum: "bg-plum/30",
    rust: "bg-rust/20",
  };

  return (
    <>
      <article
        className="rise group relative overflow-hidden rounded-3xl border hairline bg-ink-2/70 p-6 sm:p-10 transition-all hover:border-bone/20"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div
          className={`absolute -top-24 -right-16 h-56 w-56 rounded-full ${accentBlur[skill.accent]} blur-3xl transition-opacity opacity-60 group-hover:opacity-100`}
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim border hairline rounded-full px-2.5 py-1">
              {skill.category}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim border hairline rounded-full px-2.5 py-1">
              {skill.difficulty}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim border hairline rounded-full px-2.5 py-1">
              {skill.readTime}
            </span>
            {skill.available ? (
              <span className="font-mono text-[10px] uppercase tracking-widest text-acid border border-acid/40 bg-acid/10 rounded-full px-2.5 py-1 inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-acid pulse-dot" />
                Available
              </span>
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim border hairline rounded-full px-2.5 py-1">
                Coming soon
              </span>
            )}
          </div>

          <h3 className="font-display text-3xl sm:text-5xl font-medium tracking-tight leading-[1.05]">
            {skill.title}
          </h3>
          <p className="mt-3 text-lg sm:text-xl font-display italic text-bone-dim">
            {skill.tagline}
          </p>

          <p className="mt-6 text-bone-dim leading-relaxed max-w-2xl">
            {skill.description}
          </p>

          {skill.features.length > 0 && (
            <ul className="mt-6 space-y-2">
              {skill.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-bone/90"
                >
                  <span className="mt-1.5 h-1 w-4 bg-acid shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              disabled={!skill.available}
              className={`group/btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-semibold transition-all ${
                skill.available
                  ? accentMap[skill.accent] + " hover:brightness-95"
                  : "bg-bone/10 text-bone-dim cursor-not-allowed"
              }`}
            >
              {skill.available ? "Unlock this skill" : "Coming soon"}
              {skill.available && (
                <span className="transition-transform group-hover/btn:translate-x-1">
                  →
                </span>
              )}
            </button>
            <div className="font-mono text-xs text-bone-dim">
              {skill.files.length} files · delivered by email
            </div>
          </div>
        </div>
      </article>

      {open && (
        <UnlockModal skill={skill} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
