"use client";

import { useEffect, useState } from "react";
import type { Skill } from "@/lib/skills";

type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "success"; downloadUrl: string; emailSent: boolean }
  | { kind: "error"; message: string };

export default function UnlockModal({
  skill,
  onClose,
}: {
  skill: Skill;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "form" });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), skillId: skill.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({
          kind: "error",
          message: data?.error ?? "Something went wrong.",
        });
        return;
      }
      setState({
        kind: "success",
        downloadUrl: data.downloadUrl,
        emailSent: Boolean(data.emailSent),
      });
    } catch {
      setState({ kind: "error", message: "Network error. Try again." });
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unlock-title"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
      />
      <div className="relative w-full sm:max-w-lg bg-ink-2 border hairline sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 m-0 sm:m-4 animate-[rise_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-9 w-9 rounded-full border hairline bg-ink hover:bg-bone/10 flex items-center justify-center text-bone-dim hover:text-bone transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {state.kind !== "success" && (
          <>
            <div className="font-mono text-[10px] uppercase tracking-widest text-bone-dim">
              Unlock · {skill.id}
            </div>
            <h2
              id="unlock-title"
              className="mt-3 font-display text-3xl sm:text-4xl tracking-tight font-medium leading-tight pr-8"
            >
              {skill.title}
            </h2>
            <p className="mt-2 text-bone-dim text-sm">
              Drop your email and I&apos;ll send you the files. You&apos;ll
              also get a direct download right after.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-3">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoFocus
                disabled={state.kind === "loading"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full rounded-2xl border hairline bg-ink px-5 py-4 text-base text-bone placeholder:text-bone-dim focus:border-acid focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={state.kind === "loading"}
                className="w-full rounded-2xl bg-acid text-ink px-5 py-4 font-semibold hover:bg-bone transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state.kind === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  "Send me the skill →"
                )}
              </button>
              {state.kind === "error" && (
                <p className="text-rust text-sm">{state.message}</p>
              )}
            </form>

            <p className="mt-5 text-[11px] text-bone-dim font-mono">
              No spam. No course funnel. One email per new skill, max.
            </p>
          </>
        )}

        {state.kind === "success" && (
          <div>
            <div className="h-12 w-12 rounded-2xl bg-acid text-ink flex items-center justify-center mb-5 text-2xl font-bold">
              ✓
            </div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight font-medium">
              You&apos;re in.
            </h2>
            <p className="mt-3 text-bone-dim">
              {state.emailSent
                ? "Check your inbox — the skill is on its way. Meanwhile, grab it instantly below:"
                : "Download the skill instantly below. (I also got a notification so I can add you to the list.)"}
            </p>
            <a
              href={state.downloadUrl}
              download
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-acid text-ink px-5 py-4 font-semibold hover:bg-bone transition-colors"
            >
              Download {skill.id}.zip ↓
            </a>
            <div className="mt-6 rounded-2xl border hairline bg-ink p-4 text-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest text-bone-dim mb-2">
                Install
              </div>
              <pre className="text-acid text-[12px] overflow-auto">
{`mkdir -p ~/.claude/skills/${skill.id}
# unzip the download into that folder`}
              </pre>
            </div>
            <button
              onClick={onClose}
              className="mt-4 w-full text-sm text-bone-dim hover:text-bone"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
