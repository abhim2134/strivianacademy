import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";
import { unsubscribeContact } from "@/lib/audience";

export const metadata: Metadata = {
  title: "Unsubscribed · Strivian Academy",
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
    <div className="grain relative min-h-dvh flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-5 py-32">
        <div className="w-full max-w-lg">
          {state === "ok" && (
            <>
              <div className="h-12 w-12 rounded-2xl bg-acid text-ink flex items-center justify-center mb-6 text-2xl font-bold">
                ✓
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight font-medium leading-tight">
                Unsubscribed.
              </h1>
              <p className="mt-4 text-bone-dim text-lg">
                <span className="text-bone font-mono">{shownEmail}</span> has
                been removed from the list. You won&apos;t receive any more
                skill drops from Strivian Academy.
              </p>
              <p className="mt-6 text-sm text-bone-dim">
                Changed your mind?{" "}
                <Link href="/skills" className="text-bone underline hover:text-acid">
                  Grab a skill again
                </Link>{" "}
                and you&apos;ll be re-subscribed.
              </p>
            </>
          )}

          {(state === "missing" || state === "invalid") && (
            <>
              <div className="h-12 w-12 rounded-2xl border hairline bg-ink-2 flex items-center justify-center mb-6 text-2xl text-bone-dim">
                ?
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight font-medium leading-tight">
                Link invalid or expired.
              </h1>
              <p className="mt-4 text-bone-dim text-lg">
                This unsubscribe link doesn&apos;t check out. If you want to be
                removed from the list, reply to any of my emails with{" "}
                <span className="text-bone font-mono">unsubscribe</span> and
                I&apos;ll take you off manually.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-full border hairline px-5 py-3 text-sm font-medium hover:bg-bone/5"
              >
                ← Home
              </Link>
            </>
          )}

          {state === "error" && (
            <>
              <div className="h-12 w-12 rounded-2xl bg-rust text-bone flex items-center justify-center mb-6 text-2xl font-bold">
                !
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight font-medium leading-tight">
                Something went wrong.
              </h1>
              <p className="mt-4 text-bone-dim text-lg">
                {errorMessage || "Try again in a minute."} If this keeps
                happening, email{" "}
                <a
                  href="mailto:abhi@strivianacademy.com"
                  className="text-bone underline"
                >
                  abhi@strivianacademy.com
                </a>
                .
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
