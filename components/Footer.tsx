import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sx-footer">
      <div className="sx-footer-inner">
        <div className="sx-footer-big">
          Real AI systems.
          <br />
          <span className="sx-gradient-text">Shipped.</span>
        </div>
        <FooterCol
          title="Site"
          items={[
            { label: "Home", href: "/" },
            { label: "Skills", href: "/skills" },
            { label: "About", href: "/#about" },
          ]}
        />
        <FooterCol
          title="Follow"
          items={[
            { label: "TikTok", href: "https://tiktok.com/@abhibuilds1" },
            { label: "Instagram", href: "https://instagram.com/abhibuilds1" },
            { label: "YouTube", href: "https://youtube.com/@abhibuilds1yt" },
          ]}
        />
        <FooterCol
          title="Contact"
          items={[
            { label: "abhi@amullapudi.com", href: "mailto:abhi@amullapudi.com" },
          ]}
        />
      </div>
      <div className="sx-footer-base">
        <span>built by Abhi</span>
        <span>amullapudi.com</span>
        <span>@abhibuilds1</span>
      </div>
    </footer>
  );
}

type FooterItem = { label: string; href: string };

function FooterCol({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <div className="sx-footer-col">
      <div className="sx-footer-col-title">{title}</div>
      {items.map((it) =>
        it.href.startsWith("http") || it.href.startsWith("mailto") ? (
          <a
            key={it.label}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="sx-footer-link"
          >
            {it.label}
          </a>
        ) : (
          <Link key={it.label} href={it.href} className="sx-footer-link">
            {it.label}
          </Link>
        )
      )}
    </div>
  );
}
