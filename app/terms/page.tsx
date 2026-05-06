import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackgroundCanvas from "@/components/BackgroundCanvas";

export const metadata: Metadata = {
  title: "Terms · @abhi_ai26",
  description:
    "Terms of use for strivianacademy.com — operated by Strivian LLC.",
};

const LAST_UPDATED = "May 6, 2026";

export default function TermsPage() {
  return (
    <>
      <BackgroundCanvas />
      <div className="sx-wrap">
        <Nav />
        <main className="sx-terms">
          <div className="sx-terms-inner">
            <div className="sx-terms-kicker">▸ legal</div>
            <h1 className="sx-terms-title">terms.</h1>
            <p className="sx-terms-meta sx-mono">
              last updated · {LAST_UPDATED}
            </p>

            <p className="sx-terms-lede">
              These Terms govern your use of strivianacademy.com (the &ldquo;Site&rdquo;)
              and any skills, files, or other materials we hand out. The Site is
              operated by{" "}
              <strong style={{ color: "var(--ink)" }}>Strivian LLC</strong>{" "}
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By using
              the Site or submitting your email to receive a skill, you accept
              these Terms.
            </p>

            <Section n="01" title="the skills are templates">
              You&apos;re getting a starting point — markdown instructions and a
              few helper files — not a finished product, and not a service we run
              on your behalf. We don&apos;t operate, monitor, or maintain
              anything you build or run with them.
            </Section>

            <Section n="02" title="use at your own risk">
              Everything is provided <em>as-is</em>, with no warranties, express
              or implied. We don&apos;t promise the skills will work for your
              use case, won&apos;t have bugs, won&apos;t break when third-party
              APIs or platforms change, or won&apos;t trigger rate limits or
              account flags on the systems they automate. You decide whether a
              given skill is appropriate for your situation.
            </Section>

            <Section
              n="03"
              title="you're responsible for what you do with them"
            >
              <p style={{ margin: "0 0 14px" }}>
                Many of our skills automate research or outreach against
                third-party platforms (Google, LinkedIn, Apollo, Gmail, etc.)
                and may collect contact data for real people or businesses. As
                the operator, <strong>you</strong> are responsible for:
              </p>
              <ul className="sx-terms-list">
                <li>
                  Complying with the terms of service of every platform you
                  query, scrape, post to, or send messages through.
                </li>
                <li>
                  Complying with applicable privacy laws (CCPA, GDPR, and any
                  local equivalents) for any personal data you collect, store,
                  or transmit.
                </li>
                <li>
                  Complying with any laws that govern your outreach (CAN-SPAM,
                  TCPA, telemarketing rules, and anti-spam laws in your
                  jurisdiction).
                </li>
                <li>
                  Not implying endorsement, affiliation, or partnership with
                  any business, person, or brand you contact unless one
                  actually exists.
                </li>
              </ul>
              <p style={{ margin: "14px 0 0" }}>
                We don&apos;t pre-screen what you do with the skills, and we
                aren&apos;t liable for it.
              </p>
            </Section>

            <Section n="04" title="not legal advice">
              Nothing in our skills, our Site, or our communications is legal
              advice. If you&apos;re running these commercially or at scale,
              talk to a real attorney about your situation.
            </Section>

            <Section n="05" title="your email">
              When you submit your email to unlock a skill, we add it to our
              list. We use it to deliver the skill and to send occasional
              updates about new drops. You can unsubscribe anytime via the link
              in every email, or by emailing{" "}
              <a
                href="mailto:abhi@amullapudi.com"
                className="sx-terms-link"
              >
                abhi@amullapudi.com
              </a>
              .
            </Section>

            <Section n="06" title="using the skills">
              The skills are free. You can use, modify, and remix them for
              personal or commercial purposes. You can&apos;t sell the
              unmodified files as a paid product, and you can&apos;t
              redistribute them while presenting them as your own original
              work. Otherwise, build whatever you want.
            </Section>

            <Section n="07" title="limitation of liability">
              To the maximum extent allowed by law, Strivian LLC is not liable
              for any indirect, incidental, consequential, special, or punitive
              damages arising out of or related to the Site or the skills. Our
              total aggregate liability for any claim is limited to USD $50.
            </Section>

            <Section n="08" title="changes">
              We may update these Terms occasionally. The &ldquo;last
              updated&rdquo; date at the top reflects the most recent revision.
              Continued use of the Site after changes means you accept the
              updated Terms.
            </Section>

            <p className="sx-terms-foot sx-mono">
              {"// questions? "}
              <a
                href="mailto:abhi@amullapudi.com"
                className="sx-terms-link"
              >
                abhi@amullapudi.com
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="sx-terms-section">
      <h2 className="sx-terms-h2">
        <span className="sx-terms-h2-num sx-mono">▸ {n}</span>
        <span className="sx-terms-h2-text">{title}</span>
      </h2>
      <div className="sx-terms-body">{children}</div>
    </section>
  );
}
