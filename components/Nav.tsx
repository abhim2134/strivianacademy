"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = { page?: "home" | "skills" };

export default function Nav({ page = "home" }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      if (window.innerWidth > 768 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={"sx-nav" + (open ? " is-menu-open" : "")}>
      <Link href="/" className="sx-logo" onClick={close}>
        <span className="sx-logo-mark">
          <span className="sx-logo-mark-inner">S</span>
        </span>
        <span className="sx-logo-text">
          <span className="sx-logo-name">
            strivian
            <span style={{ opacity: 0.55 }}>.academy</span>
          </span>
          <span className="sx-logo-sub">/ real ai systems with claude</span>
        </span>
      </Link>

      <button
        type="button"
        className="sx-nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={"sx-nav-toggle-icon" + (open ? " is-open" : "")}>
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className={"sx-nav-links" + (open ? " is-open" : "")}>
        <Link
          href="/"
          className={"sx-nav-link" + (page === "home" ? " is-active" : "")}
          onClick={close}
        >
          /home
        </Link>
        <Link
          href="/skills"
          className={"sx-nav-link" + (page === "skills" ? " is-active" : "")}
          onClick={close}
        >
          /skills
        </Link>
        <a href="#about" className="sx-nav-link" onClick={close}>
          /about
        </a>
        <a href="#follow" className="sx-nav-link" onClick={close}>
          /follow
        </a>
        <Link href="/skills" className="sx-btn sx-btn-primary" onClick={close}>
          Free skills <span style={{ marginLeft: 6 }}>→</span>
        </Link>
      </div>
    </nav>
  );
}
