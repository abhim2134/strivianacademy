"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const full = "claude skill install ai-website-business";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(t);
    }, 50);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="sx-hero">
      <div className="sx-hero-inner">
        <div className="sx-hero-meta">
          <span className="sx-chip sx-chip-live">
            <span className="sx-live-dot" /> LIVE
          </span>
          <span className="sx-meta-text">
            <span style={{ opacity: 0.55 }}>2 free skills</span>
            <span className="sx-meta-sep">/</span>
            <span style={{ opacity: 0.55 }}>built with claude</span>
            <span className="sx-meta-sep">/</span>
            <span style={{ opacity: 0.55 }}>day 1 usable</span>
          </span>
          <span
            style={{ marginLeft: "auto" }}
            className="sx-meta-text sx-meta-dim"
          >
            free systems · built by an engineer
          </span>
        </div>

        <h1 className="sx-hero-title">
          <span className="sx-h-line">Real</span>
          <span className="sx-h-line sx-h-line-accent">AI systems</span>
          <span className="sx-h-line">with Claude.</span>
        </h1>

        <div className="sx-hero-grid">
          <p className="sx-hero-sub">
            Free skills, automations, and workflows built by a software engineer
            using Claude — plus learnings on how to be a real builder.{" "}
            <span style={{ color: "var(--ink)", fontStyle: "italic" }}>
              Not another prompt bro.
            </span>
          </p>
          <div className="sx-hero-cta">
            <div className="sx-term">
              <div className="sx-term-bar">
                <span
                  className="sx-term-dot"
                  style={{ background: "var(--neon-1)" }}
                />
                <span
                  className="sx-term-dot"
                  style={{ background: "var(--neon-2)" }}
                />
                <span
                  className="sx-term-dot"
                  style={{ background: "var(--neon-3)" }}
                />
                <span className="sx-term-title">~/strivian</span>
              </div>
              <div className="sx-term-body">
                <div className="sx-term-line" style={{ opacity: 0.55 }}>
                  $ claude skill --help
                </div>
                <div className="sx-term-line">  install · run · share</div>
                <div className="sx-term-line">
                  <span style={{ color: "var(--neon-1)" }}>$</span> {typed}
                  <span className="sx-caret" />
                </div>
                <div
                  className="sx-term-line"
                  style={{ color: "var(--neon-2)" }}
                >
                  ✓ installed. try it.
                </div>
              </div>
            </div>
            <div className="sx-cta-col">
              <Link href="/skills" className="sx-btn sx-btn-neon">
                Get free Claude skills <span>→</span>
              </Link>
              <a href="#about" className="sx-btn sx-btn-ghost">
                Who am I <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
