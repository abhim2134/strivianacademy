import Link from "next/link";
import BackgroundCanvas from "@/components/BackgroundCanvas";

const TikTokGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M16 3 C16 6 18 8 21 8 V11 C19 11 17.5 10.5 16 9.5 V15.5 C16 19 13.5 21 10.5 21 C7.5 21 5 18.8 5 15.8 C5 12.8 7.5 10.5 10.5 10.5 C11 10.5 11.5 10.6 12 10.7 V14 C11.5 13.8 11 13.7 10.5 13.7 C9.3 13.7 8.3 14.6 8.3 15.8 C8.3 17 9.3 18 10.5 18 C11.7 18 12.7 17 12.7 15.8 V3 Z" />
  </svg>
);
const IGGlyph = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    aria-hidden
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const YTGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M10 9 L15 12 L10 15 Z" fill="var(--bg)" />
  </svg>
);

const SOCIALS = [
  { label: "TikTok", href: "https://tiktok.com/@abhi_ai26", Icon: TikTokGlyph },
  { label: "Instagram", href: "https://instagram.com/abhi_ai26", Icon: IGGlyph },
  { label: "YouTube", href: "https://youtube.com/@abhi_ai26", Icon: YTGlyph },
];

export default function Home() {
  return (
    <>
      <BackgroundCanvas />
      <main className="sx-bio">
        <div className="sx-bio-inner">
          <div className="sx-bio-brand">
            <span className="sx-logo-mark">
              <span className="sx-logo-mark-inner">@</span>
            </span>
            <span className="sx-bio-name">abhi_ai26</span>
          </div>

          <h1 className="sx-bio-title">real ai systems.</h1>
          <p className="sx-bio-sub">free skills, built by an engineer.</p>

          <Link href="/skills" className="sx-btn sx-bio-cta">
            Free Claude skills <span>→</span>
          </Link>

          <div className="sx-bio-socials">
            <div className="sx-bio-socials-row">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="sx-bio-social"
                >
                  <Icon />
                </a>
              ))}
              <span className="sx-bio-handle">@abhi_ai26</span>
            </div>
          </div>

          <div className="sx-bio-foot">amullapudi.com</div>
        </div>
      </main>
    </>
  );
}
