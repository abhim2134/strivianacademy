type Props = { size?: "sm" | "md" };

const LINKS = [
  {
    name: "Instagram",
    handle: "abhi_ai26",
    href: "https://instagram.com/abhi_ai26",
  },
  {
    name: "TikTok",
    handle: "abhi_ai26",
    href: "https://tiktok.com/@abhi_ai26",
  },
  {
    name: "YouTube",
    handle: "abhi_ai26",
    href: "https://youtube.com/@abhi_ai26",
  },
];

export function Socials({ size = "md" }: Props) {
  const isMd = size === "md";
  return (
    <ul
      className={`flex flex-wrap items-center ${isMd ? "gap-3" : "gap-2"}`}
    >
      {LINKS.map((l) => (
        <li key={l.name}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-2 rounded-full border hairline bg-ink-2 hover:bg-bone/5 hover:border-bone/30 transition-all ${
              isMd ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs"
            }`}
          >
            <span className="font-medium">{l.name}</span>
            <span className="text-bone-dim font-mono group-hover:text-acid transition-colors">
              @{l.handle}
            </span>
            <span className="text-bone-dim group-hover:translate-x-0.5 transition-transform">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
