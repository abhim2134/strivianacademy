"use client";

import { useEffect, useState } from "react";
import type { Skill } from "@/lib/skills";

type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "success"; recipient: string; emailSent: boolean }
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
        recipient: typeof data.recipient === "string" ? data.recipient : email.trim(),
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
              Check your inbox.
            </h2>
            <p className="mt-3 text-bone-dim">
              I sent <span className="text-bone font-mono">{state.recipient}</span>{" "}
              the two skill files.
            </p>

            <div className="mt-6 rounded-2xl border hairline bg-ink p-5 text-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest text-bone-dim mb-3">
                Once you have them
              </div>
              <p className="text-bone/90 leading-relaxed">
                Open Claude Code, drop both files into the chat, and say:
              </p>
              <pre className="mt-3 text-acid text-[12px] overflow-auto whitespace-pre-wrap">
{`Create a Claude skill from these two files.`}
              </pre>
              <p className="mt-3 text-bone-dim text-[12px] leading-relaxed">
                Claude will set up the skill folder for you. Restart Claude
                Code and invoke it by describing what you want.
              </p>
            </div>

            <p className="mt-5 text-[11px] text-bone-dim font-mono">
              Didn&apos;t arrive in 2 min? Check spam, or DM @abhi_ai26.
            </p>

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
