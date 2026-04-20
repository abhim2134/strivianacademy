const TikTokGlyph = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
    <path d="M16 3 C16 6 18 8 21 8 V11 C19 11 17.5 10.5 16 9.5 V15.5 C16 19 13.5 21 10.5 21 C7.5 21 5 18.8 5 15.8 C5 12.8 7.5 10.5 10.5 10.5 C11 10.5 11.5 10.6 12 10.7 V14 C11.5 13.8 11 13.7 10.5 13.7 C9.3 13.7 8.3 14.6 8.3 15.8 C8.3 17 9.3 18 10.5 18 C11.7 18 12.7 17 12.7 15.8 V3 Z" />
  </svg>
);
const IGGlyph = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const YTGlyph = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M10 9 L15 12 L10 15 Z" fill="var(--bg)" />
  </svg>
);

const SOCIALS = [
  {
    platform: "TikTok",
    handle: "@abhi_ai26",
    blurb: "Short clips of real builds.",
    Icon: TikTokGlyph,
    href: "https://tiktok.com/@abhi_ai26",
    tag: "SHORTFORM",
  },
  {
    platform: "Instagram",
    handle: "@abhi_ai26",
    blurb: "Same ideas, different feed.",
    Icon: IGGlyph,
    href: "https://instagram.com/abhi_ai26",
    tag: "SHORTFORM",
  },
  {
    platform: "YouTube",
    handle: "@abhi_ai26",
    blurb: "Teardowns, builds, tutorials.",
    Icon: YTGlyph,
    href: "https://youtube.com/@abhi_ai26",
    tag: "LONGFORM",
  },
];

export function Socials() {
  return (
    <div className="sx-social-grid" id="follow">
      {SOCIALS.map((s) => (
        <a
          key={s.platform}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="sx-social"
        >
          <div className="sx-social-top">
            <div className="sx-social-icon">
              <s.Icon />
            </div>
            <span className="sx-social-tag">{s.tag}</span>
          </div>
          <div className="sx-social-name">{s.platform}</div>
          <div className="sx-social-handle">{s.handle}</div>
          <p className="sx-social-blurb">{s.blurb}</p>
          <div className="sx-social-follow">follow →</div>
        </a>
      ))}
    </div>
  );
}
