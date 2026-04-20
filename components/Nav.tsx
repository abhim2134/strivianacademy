import Link from "next/link";

type Props = { page?: "home" | "skills" };

export default function Nav({ page = "home" }: Props) {
  return (
    <nav className="sx-nav">
      <Link href="/" className="sx-logo">
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
      <div className="sx-nav-links">
        <Link
          href="/"
          className={"sx-nav-link" + (page === "home" ? " is-active" : "")}
        >
          /home
        </Link>
        <Link
          href="/skills"
          className={"sx-nav-link" + (page === "skills" ? " is-active" : "")}
        >
          /skills
        </Link>
        <a href="#about" className="sx-nav-link">
          /about
        </a>
        <a href="#follow" className="sx-nav-link">
          /follow
        </a>
        <Link href="/skills" className="sx-btn sx-btn-primary">
          Free skills <span style={{ marginLeft: 6 }}>→</span>
        </Link>
      </div>
    </nav>
  );
}
