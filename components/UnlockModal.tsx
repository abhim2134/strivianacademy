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
        recipient:
          typeof data.recipient === "string" ? data.recipient : email.trim(),
        emailSent: Boolean(data.emailSent),
      });
    } catch {
      setState({ kind: "error", message: "Network error. Try again." });
    }
  }

  return (
    <div
      className="sx-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unlock-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sx-modal">
        <div className="sx-modal-bar">
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
          <span style={{ marginLeft: 8 }}>unlock · {skill.id}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="sx-modal-close"
          >
            ✕
          </button>
        </div>

        <div className="sx-modal-body">
          {state.kind !== "success" && (
            <>
              <div className="sx-modal-kicker">▸ enter email to unlock</div>
              <h2 id="unlock-title" className="sx-modal-title">
                {skill.title}
              </h2>
              <p className="sx-modal-sub">
                Drop your email and I&apos;ll send you the {skill.files.length}{" "}
                files.
              </p>

              <form onSubmit={submit} className="sx-modal-form">
                <label htmlFor="email" style={{ display: "none" }}>
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
                  className="sx-modal-input"
                />
                <button
                  type="submit"
                  disabled={state.kind === "loading"}
                  className="sx-modal-submit"
                >
                  {state.kind === "loading"
                    ? "Sending…"
                    : "Send me the skill →"}
                </button>
                {state.kind === "error" && (
                  <p className="sx-modal-error">{state.message}</p>
                )}
              </form>

              <p className="sx-modal-foot">
                {"// entering your email adds you to the Strivian list. Unsubscribe anytime — link in every email."}
              </p>
            </>
          )}

          {state.kind === "success" && (
            <>
              <div className="sx-modal-success-icon">✓</div>
              <h2 className="sx-modal-title">Check your inbox.</h2>
              <p className="sx-modal-sub">
                I sent{" "}
                <span className="sx-mono" style={{ color: "var(--ink)" }}>
                  {state.recipient}
                </span>{" "}
                the skill files.
              </p>

              <div
                style={{
                  marginTop: 20,
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  padding: "16px 18px",
                }}
              >
                <div
                  className="sx-mono"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-dim)",
                    marginBottom: 10,
                  }}
                >
                  once you have them
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "var(--ink)",
                    fontSize: 14,
                    lineHeight: 1.55,
                  }}
                >
                  Open Claude Code, drop the files into chat, and say:
                </p>
                <pre className="sx-modal-code">
{`Create a Claude skill from these files.`}
                </pre>
                <p
                  style={{
                    margin: "10px 0 0",
                    color: "var(--ink-dim)",
                    fontSize: 12,
                    lineHeight: 1.55,
                  }}
                >
                  Claude sets up the skill folder. Restart Claude Code and invoke
                  it by describing what you want.
                </p>
              </div>

              <p className="sx-modal-foot">
                {"// didn't arrive in 2 min? check spam, or DM @abhi_ai26."}
              </p>

              <button
                onClick={onClose}
                style={{
                  marginTop: 14,
                  width: "100%",
                  background: "transparent",
                  border: "1px solid var(--line-strong)",
                  color: "var(--ink-dim)",
                  padding: "12px",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
