import Link from "next/link";
import {
  SiClaude,
  SiNextdotjs,
  SiVercel,
  SiGithub,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
} from "@icons-pack/react-simple-icons";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Socials } from "@/components/Socials";

const MARQUEE_LOGOS = [
  { name: "Claude", Icon: SiClaude },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Vercel", Icon: SiVercel },
  { name: "GitHub", Icon: SiGithub },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "React", Icon: SiReact },
  { name: "Node.js", Icon: SiNodedotjs },
];

export default function Home() {
  return (
    <div className="grain relative">
      <Nav />

      {/* HERO */}
      <section className="relative mesh overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-plum/30 blur-3xl" />
          <div className="absolute bottom-10 -right-20 h-80 w-80 rounded-full bg-rust/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32">
          {/* Top badge */}
          <div className="rise inline-flex items-center gap-2 rounded-full border hairline bg-ink-2/60 backdrop-blur px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-bone-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-acid pulse-dot" />
            Free systems · built by an engineer
          </div>

          {/* Headline */}
          <h1
            className="rise font-display mt-8 text-[56px] leading-[0.92] sm:text-[104px] sm:leading-[0.9] lg:text-[136px] tracking-[-0.035em] font-medium"
            style={{ animationDelay: "80ms" }}
          >
            <span className="italic font-light">Real AI systems</span>
            <br />
            <span className="inline-flex items-baseline gap-3">
              with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-ink px-3">Claude</span>
                <span className="absolute inset-0 bg-acid -skew-x-6 rounded-sm" />
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="rise mt-8 max-w-2xl text-lg sm:text-xl text-bone-dim leading-relaxed"
            style={{ animationDelay: "200ms" }}
          >
            Free skills, automations, and workflows built by a software
            engineer —{" "}
            <span className="text-bone italic font-display">
              not another prompt bro
            </span>
            .
          </p>

          {/* CTAs */}
          <div
            className="rise mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <Link
              href="/skills"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-acid text-ink px-6 py-4 text-[15px] font-semibold hover:bg-bone hover:text-ink transition-all"
            >
              Get the free skills
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 rounded-full border hairline bg-ink-2/60 backdrop-blur px-6 py-4 text-[15px] font-medium hover:bg-bone/5 hover:border-bone/30 transition-all"
            >
              Who am I
            </a>
          </div>

          {/* Stats / caption row */}
          <div
            className="rise mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl"
            style={{ animationDelay: "420ms" }}
          >
            {[
              { n: "Free", l: "To install" },
              { n: "Day 1", l: "Usable" },
              { n: "∞", l: "Things to build" },
            ].map((s) => (
              <div key={s.l} className="border-l hairline pl-4">
                <div className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
                  {s.n}
                </div>
                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-bone-dim mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo strip */}
        <div className="border-y hairline bg-ink-2/40 py-6 sm:py-8 overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-bone-dim/40" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-bone-dim">
              Real tools · real systems · no slop
            </span>
          </div>
          <div className="marquee-track flex gap-12 sm:gap-16 whitespace-nowrap items-center">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-12 sm:gap-16 shrink-0 items-center"
              >
                {MARQUEE_LOGOS.map(({ name, Icon }) => (
                  <div
                    key={`${i}-${name}`}
                    className="flex items-center gap-3 text-bone/70 hover:text-bone transition-colors"
                    title={name}
                  >
                    <Icon className="h-7 w-7 sm:h-9 sm:w-9 shrink-0" />
                    <span className="font-display text-lg sm:text-xl tracking-tight hidden sm:inline">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-bone-dim mb-4">
                /about
              </div>
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight font-medium leading-tight">
                Built by an <span className="italic">engineer</span>.
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pt-4">
              <p className="text-xl sm:text-2xl text-bone leading-relaxed font-display font-light">
                I&apos;m a software engineer who builds AI automation systems
                with Claude. I teach non-technical and semi-technical people
                how to build{" "}
                <span className="bg-acid text-ink px-2 italic">
                  real AI systems
                </span>{" "}
                that actually work.
              </p>
              <p className="mt-8 text-base text-bone-dim leading-relaxed max-w-2xl">
                The skills on this page are free. They&apos;re the same
                agents, automations, and workflows I use myself — packaged so
                you can install them into Claude and run them on day one.
              </p>

              <div className="mt-10">
                <div className="font-mono text-[11px] uppercase tracking-widest text-bone-dim mb-4">
                  Find me
                </div>
                <Socials />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="relative border-t hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
          <div className="relative overflow-hidden rounded-3xl border hairline bg-ink-2 p-8 sm:p-14">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-acid/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-plum/20 blur-3xl" />
            <div className="relative">
              <div className="font-mono text-[11px] uppercase tracking-widest text-bone-dim">
                /skills
              </div>
              <h3 className="mt-4 font-display text-4xl sm:text-6xl tracking-tight font-medium max-w-3xl">
                Real Claude skills.{" "}
                <span className="italic text-bone-dim">Drop them in.</span>
              </h3>
              <p className="mt-6 max-w-xl text-bone-dim text-lg">
                Agents, automations, and workflows — packaged as Claude
                skills you can install and run on day one. New ones drop
                whenever I build something worth sharing.
              </p>
              <Link
                href="/skills"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-acid text-ink px-6 py-4 text-[15px] font-semibold hover:bg-bone transition-all group"
              >
                Browse the skills
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
