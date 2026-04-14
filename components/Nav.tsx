import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/60 border-b hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="h-2 w-2 rounded-full bg-acid pulse-dot" />
          <span className="font-display text-[15px] tracking-tight">
            Strivian<span className="text-bone-dim"> Academy</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-[13px] font-medium">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full hover:bg-bone/5 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/skills"
            className="px-3 py-1.5 rounded-full bg-acid text-ink hover:bg-acid/90 transition-colors"
          >
            Free Skills →
          </Link>
        </nav>
      </div>
    </header>
  );
}
