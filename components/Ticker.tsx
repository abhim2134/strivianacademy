const ITEMS = [
  "REAL AI SYSTEMS",
  "BUILT WITH CLAUDE",
  "FREE TO INSTALL",
  "FOR OPERATORS + BUILDERS",
  "NO PROMPT BROS",
  "@ABHI_AI26",
];

export default function Ticker() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="sx-ticker">
      <div className="sx-ticker-track">
        {loop.map((t, i) => (
          <span key={i} className="sx-ticker-item">
            <span>{t}</span>
            <span className="sx-ticker-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
