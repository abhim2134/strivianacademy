import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";
import { unsubscribeContact } from "@/lib/audience";

export const metadata: Metadata = {
  title: "Unsubscribed · @abhi_ai26",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Search = Promise<{ e?: string; t?: string }>;

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { e, t } = await searchParams;

  let state: "missing" | "invalid" | "ok" | "error" = "missing";
  let shownEmail = "";
  let errorMessage = "";

  if (e && t) {
    if (!verifyUnsubscribeToken(e, t)) {
      state = "invalid";
    } else {
      shownEmail = e.trim().toLowerCase();
      const result = await unsubscribeContact(shownEmail);
      if (result.ok) {
        state = "ok";
      } else {
        state = "error";
        errorMessage = result.error ?? "Something went wrong.";
      }
    }
  }

  return (
    <>
      <BackgroundCanvas />
      <div className="sx-wrap">
        <Nav />
        <main className="sx-unsub">
          <div className="sx-unsub-inner">
            {state === "ok" && (
              <>
                <div className="sx-unsub-icon">✓</div>
                <h1 className="sx-unsub-title">Unsubscribed.</h1>
                <p className="sx-unsub-sub">
                  <span
                    className="sx-mono"
                    style={{ color: "var(--ink)" }}
                  >
                    {shownEmail}
                  </span>{" "}
                  has been removed from the list. You won&apos;t receive any
                  more drops from @abhi_ai26.
                </p>
                <p
                  className="sx-mono"
                  style={{
                    marginTop: 24,
                    fontSize: 12,
                    color: "var(--ink-dim)",
                  }}
                >
                  Changed your mind?{" "}
                  <Link
                    href="/skills"
                    style={{
                      color: "var(--neon-1)",
                      textDecoration: "underline",
                    }}
                  >
                    Grab a skill again
                  </Link>{" "}
                  and you&apos;ll be re-subscribed.
                </p>
              </>
            )}

            {(state === "missing" || state === "invalid") && (
              <>
                <div className="sx-unsub-icon is-warn">?</div>
                <h1 className="sx-unsub-title">Link invalid or expired.</h1>
                <p className="sx-unsub-sub">
                  This unsubscribe link doesn&apos;t check out. If you want to
                  be removed, reply to any of my emails with{" "}
                  <span className="sx-mono" style={{ color: "var(--ink)" }}>
                    unsubscribe
                  </span>{" "}
                  and I&apos;ll take you off manually.
                </p>
                <Link
                  href="/"
                  className="sx-btn"
                  style={{ marginTop: 28 }}
                >
                  ← Home
                </Link>
              </>
            )}

            {state === "error" && (
              <>
                <div className="sx-unsub-icon is-err">!</div>
                <h1 className="sx-unsub-title">Something went wrong.</h1>
                <p className="sx-unsub-sub">
                  {errorMessage || "Try again in a minute."} If it keeps
                  happening, email{" "}
                  <a
                    href="mailto:abhi@amullapudi.com"
                    style={{ color: "var(--neon-1)" }}
                  >
                    abhi@amullapudi.com
                  </a>
                  .
                </p>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
