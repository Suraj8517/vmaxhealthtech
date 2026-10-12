export default function SectionBackdrop() {
    const GRAIN_BG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 8% 15%, rgba(239,68,68,0.10), transparent 60%), radial-gradient(50% 40% at 100% 30%, rgba(220,38,38,0.08), transparent 60%), linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.03) 48%, transparent 56%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `url("${GRAIN_BG}")`, backgroundSize: "140px 140px" }}
      />
    </>
  );
}