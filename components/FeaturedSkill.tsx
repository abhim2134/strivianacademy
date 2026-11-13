"use client";

import { useState } from "react";
import type { Skill } from "@/lib/skills";
import UnlockModal from "./UnlockModal";

// Highlighted free-skill card for the home page, sized for the bio column.
export default function FeaturedSkill({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id={skill.id} className="sx-bio-skill" aria-labelledby={`${skill.id}-title`}>
        <div className="sx-bio-skill-top">
          <span className="sx-bio-skill-badge">Free Claude skill</span>
          <span className="sx-bio-skill-glyph" aria-hidden>
            {skill.glyph}
          </span>
        </div>
        <h2 id={`${skill.id}-title`} className="sx-bio-skill-title">
          {skill.title}
        </h2>
        <p className="sx-bio-skill-desc">{skill.tagline}</p>
        <ul className="sx-bio-skill-list">
          {skill.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="sx-bio-skill-btn"
        >
          Get it free <span aria-hidden>→</span>
        </button>
        <span className="sx-bio-skill-meta">download link sent by email</span>
      </section>

      {open && <UnlockModal skill={skill} onClose={() => setOpen(false)} />}
    </>
  );
}
