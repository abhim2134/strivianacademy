import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import { Socials } from "@/components/Socials";
import { SKILLS } from "@/lib/skills";

export default function Home() {
  return (
    <>
      <BackgroundCanvas />
      <div className="sx-wrap">
        <Ticker />
        <Nav page="home" />

        <Hero />

        {/* FEATURED SKILLS */}
        <section className="sx-section">
          <div className="sx-section-head">
            <div className="sx-section-num">§01</div>
            <div>
              <div className="sx-section-kicker">The library</div>
              <h2 className="sx-section-title">Real Claude skills. Drop them in.</h2>
            </div>
            <p className="sx-section-desc">
              Agents, automations, and workflows packaged as Claude skills you
              can install and run on day one. New ones drop whenever I build
              something worth sharing.
            </p>
          </div>
          <div className="sx-section-body">
            <div className="sx-featured-grid">
              {SKILLS.map((s, i) => (
                <Link
                  key={s.id}
                  href="/skills"
                  className={"sx-featured" + (i === 0 ? " sx-featured-hero" : "")}
                >
                  <div className="sx-featured-top">
                    <div className="sx-featured-glyph">{s.glyph}</div>
                    <span
                      className={
                        "sx-tier" + (s.available ? "" : " sx-tier-paid")
                      }
                    >
                      {s.available ? "FREE" : "SOON"}
                    </span>
                  </div>
                  <div className="sx-featured-meta">
                    {s.category} · {s.readTime}
                  </div>
                  <div className="sx-featured-title">{s.title}</div>
                  <p className="sx-featured-desc">{s.tagline}</p>
                  <div className="sx-featured-foot">
                    <span>{s.files.length} files · by email</span>
                    <span>view →</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="sx-featured-after">
              <span className="sx-meta-dim">
                {"// new skills whenever I build something worth shipping"}
              </span>
              <Link href="/skills" className="sx-btn sx-btn-neon">
                See full library →
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="sx-section" id="about">
          <div className="sx-section-head">
            <div className="sx-section-num">§02</div>
            <div>
              <div className="sx-section-kicker">The human shipping this</div>
              <h2 className="sx-section-title">
                Built by an <span style={{ fontStyle: "italic", color: "var(--neon-1)" }}>engineer</span>.
              </h2>
            </div>
            <p className="sx-section-desc">
              I&apos;m a software engineer who builds AI automation systems with
              Claude. I teach non-technical and semi-technical people how to
              build real AI systems that actually work — not another prompt bro.
            </p>
          </div>
          <div className="sx-section-body">
            <div className="sx-about-grid">
              <div className="sx-about-copy">
                <p>
                  The skills on this site are free. They&apos;re the same agents,
                  automations, and workflows I use myself — packaged so you can
                  install them into Claude and run them on day one.
                </p>
                <p>
                  No prompt-engineering hustle content. No &quot;6-figure agency&quot;
                  nonsense. Just systems that work on Monday morning.
                </p>
              </div>
              <div className="sx-about-card">
                <div className="sx-about-bar">
                  <span>cv.txt</span>
                  <span style={{ opacity: 0.5 }}>last saved today</span>
                </div>
                {(
                  [
                    ["role", "Software engineer + creator"],
                    ["stack", "Claude · Next.js · TypeScript · Python"],
                    ["teaching", "AI for operators + builders"],
                    ["skills shipped", `${SKILLS.filter((s) => s.available).length} & counting`],
                    ["based in", "The internet"],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="sx-about-row">
                    <span className="sx-about-k">{k}</span>
                    <span className="sx-about-v">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOCIALS */}
        <section className="sx-section">
          <div className="sx-section-head">
            <div className="sx-section-num">§03</div>
            <div>
              <div className="sx-section-kicker">Follow along</div>
              <h2 className="sx-section-title">Three feeds. One brain.</h2>
            </div>
            <p className="sx-section-desc">
              Same ideas, three places. Pick whichever you actually check.
            </p>
          </div>
          <div className="sx-section-body">
            <Socials />
          </div>
        </section>

        {/* BIG CTA */}
        <section className="sx-newsletter" id="newsletter">
          <div className="sx-newsletter-inner">
            <div className="sx-newsletter-kicker">◆ free · day 1 usable</div>
            <h2 className="sx-newsletter-title">
              Real Claude skills.
              <br />
              <span className="sx-rainbow">Drop them in.</span>
            </h2>
            <p className="sx-newsletter-sub">
              Agents, automations, and workflows packaged as Claude skills you
              can install and run on day one. Free forever.
            </p>
            <div className="sx-newsletter-cta">
              <Link href="/skills" className="sx-btn sx-btn-neon">
                Browse the skills →
              </Link>
            </div>
            <div className="sx-newsletter-foot">
              {"// unsubscribe whenever — link in every email"}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
