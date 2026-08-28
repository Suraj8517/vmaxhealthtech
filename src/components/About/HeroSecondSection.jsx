import React from "react";

/**
 * Marquee
 * A bold, editorial infinite-scroll marquee for dark backgrounds.
 * Inspired by broadcast/print title cards: heavy condensed type,
 * a hairline scan/interlace texture, and a plus-mark divider.
 *
 * Usage:
 *   <Marquee items={["INNOVATE", "IMPACT", "INSPIRE"]} />
 */

const DEFAULT_ITEMS = ["INNOVATE", "IMPACT", "INSPIRE"];

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="mx-6 sm:mx-10 inline-flex items-center justify-center text-neutral-500/70 text-2xl sm:text-3xl font-light select-none"
    >
      +
    </span>
  );
}

function Sequence({ items }) {
  return (
    <span className="flex items-center shrink-0">
      {items.map((word, i) => (
        <React.Fragment key={i}>
          <span
            className="text-[13vw] sm:text-[7vw] md:text-[6vw] lg:text-[5.5vw] leading-none font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-500"
            style={{ fontFamily: "'Archivo Black', 'Arial Black', sans-serif" }}
          >
            {word}
          </span>
          <Divider />
        </React.Fragment>
      ))}
    </span>
  );
}

export default function AboutHeroSecondSection({
  items = DEFAULT_ITEMS,
  speed = 28, // seconds per loop — lower is faster
}) {
  return (
    <div className="w-full bg-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll var(--marquee-duration, 28s) linear infinite;
          will-change: transform;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div className="marquee-wrap relative overflow-hidden py-10 sm:py-14">
        {/* top / bottom hairlines */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />

        {/* scrolling text, duplicated for a seamless loop */}
        <div
          className="marquee-track flex w-max"
          style={{ "--marquee-duration": `${speed}s` }}
        >
          <Sequence items={items} />
          <Sequence items={items} aria-hidden="true" />
        </div>

        {/* interlace / scanline texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent 4px)",
          }}
        />

        {/* subtle vertical vignette so text edges recede into black */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90"
        />
      </div>
    </div>
  );
}