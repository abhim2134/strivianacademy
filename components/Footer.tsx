import { Socials } from "./Socials";

export default function Footer() {
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-acid" />
          <span className="font-display text-sm tracking-tight">
            Strivian LLC
          </span>
          <span className="text-bone-dim text-xs font-mono">
            © {new Date().getFullYear()}
          </span>
        </div>
        <Socials size="sm" />
      </div>
    </footer>
  );
}
