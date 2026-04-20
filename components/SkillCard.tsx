"use client";

import { useState } from "react";
import type { Skill } from "@/lib/skills";
import UnlockModal from "./UnlockModal";

type Props = {
  skill: Skill;
  variant?: "feature" | "card";
};

export default function SkillCard({ skill, variant = "card" }: Props) {
  const [open, setOpen] = useState(false);

  if (variant === "feature") {
    return (
      <>
        <article className="sx-feature">
          <div className="sx-feature-top">
            <span className="sx-feature-badge">
              <span className="sx-live-dot" /> Featured skill
            </span>
            <span className="sx-tier">
              {skill.available ? "FREE · AVAILABLE" : "COMING SOON"}
            </span>
          </div>
          <div className="sx-feature-glyph">{skill.glyph}</div>
          <div>
            <div className="sx-feature-cat">
              {skill.category} · {skill.readTime}
            </div>
            <div className="sx-feature-title">{skill.title}</div>
            <p className="sx-feature-desc">{skill.tagline}</p>
          </div>
          {skill.features.length > 0 && (
            <ul className="sx-feature-list">
              {skill.features.slice(0, 4).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          <div className="sx-feature-cta">
            <button
              onClick={() => setOpen(true)}
              disabled={!skill.available}
              className="sx-btn sx-btn-neon"
            >
              {skill.available ? "Unlock free" : "Coming soon"}
              {skill.available && <span>→</span>}
            </button>
            <span className="sx-meta-dim">
              {skill.files.length} files · delivered by email
            </span>
          </div>
        </article>

        {open && <UnlockModal skill={skill} onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <article className="sx-skill">
        <div className="sx-skill-top">
          <div className="sx-skill-glyph">{skill.glyph}</div>
          <div className="sx-skill-badges">
            <span
              className={
                "sx-tier" + (skill.available ? "" : " sx-tier-paid")
              }
              style={
                skill.available
                  ? undefined
                  : { background: "var(--line-strong)", color: "var(--ink-dim)", borderColor: "var(--line-strong)" }
              }
            >
              {skill.available ? "FREE" : "SOON"}
            </span>
            <span className="sx-skill-v">{skill.readTime}</span>
          </div>
        </div>
        <div className="sx-skill-cat">{skill.category}</div>
        <div className="sx-skill-title">{skill.title}</div>
        <p className="sx-skill-desc">{skill.tagline}</p>
        <div className="sx-skill-foot">
          <span>{skill.files.length} files · by email</span>
          <button
            onClick={() => setOpen(true)}
            disabled={!skill.available}
            className="sx-skill-install"
          >
            {skill.available ? "install →" : "soon"}
          </button>
        </div>
      </article>

      {open && <UnlockModal skill={skill} onClose={() => setOpen(false)} />}
    </>
  );
}
