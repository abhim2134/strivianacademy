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

const YOUTUBE = "https://youtube.com/@abhibuilds1yt";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/abhibuilds1", Icon: IGGlyph },
  { label: "TikTok", href: "https://tiktok.com/@abhibuilds1", Icon: TikTokGlyph },
];

export default function Home() {
  return (
    <>
      <BackgroundCanvas />
      <main className="sx-bio">
        <div className="sx-bio-inner">
          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="sx-btn sx-bio-cta"
          >
            Check out my YouTube: youtube.com/@abhibuilds1yt <span>→</span>
          </a>

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
              <span className="sx-bio-handle">@abhibuilds1</span>
            </div>
          </div>

          <p className="sx-bio-sub">
            About me: I&apos;m a software engineer who enjoys exploring the use
            cases of ai agents and finding unique ways to use them.
          </p>

          <div className="sx-bio-foot">All views presented are my own.</div>
        </div>
      </main>
    </>
  );
}
