import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import vignesh from "../../assets/team/vignesh.png"
import sarvesh from "../../assets/team/sarvesh.png"
import pritika from "../../assets/team/pritika-team.png"
import sanga from "../../assets/team/sanga.png"
import vinothini from "../../assets/team/vinothini.png"




/**
 * "Meet our people" — horizontally swipable team section.
 *
 * Swipe / drag / scroll to move through the row. Works with touch (native),
 * trackpad (native), mouse-drag (custom handler below), and the arrow
 * buttons / keyboard for accessibility.
 */

// Shades of red only — kept distinct enough to tell portraits apart,
// but unified in hue so the row reads as one palette.
const TEAM = [
  {
    name: "Vignesh Prabhakaran",
    role: "Founder / Visionary / Chief Business Director",
    accent: "#ef4444",
    img: vignesh,
  },
  {
    name: "Sarvesh Prabhakaran",
    role: "Co Founder / CEO",
    accent: "#f87171",
    img: sarvesh,
  },
  {
    name: "Pritika",
    role: "Influencer / Brand Partner(FitMom Club)",
    accent: "#dc2626",
    img: pritika,
  },
  {
    name: "Sangameswaran ",
    role: "Senior Operations Manager",
    accent: "#fca5a5",
    img: sanga,
  },
  {
    name: "Vinothini",
    role: "Product Manager",
    accent: "#b91c1c",
    img: vinothini,
  }
];

// Vertical rhythm for the zig-zag layout: alternates the row up/down.
// Uses real margin (not transform) so layout height reflows correctly
// and nothing gets clipped or leaves empty gaps above/below.
const ZIGZAG_OFFSETS = ["md:mt-0", "md:mt-20", "md:mt-10"];
const MAX_ZIGZAG_OFFSET = "md:pb-20"; // matches the largest offset above

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

function TeamCard({ person, offsetClass }) {
  return (
    <div
      className={`group flex w-[64vw] shrink-0 snap-start flex-col transition-transform duration-500 sm:w-[300px] md:w-[340px] ${offsetClass}`}
    >
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-white shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1"
        style={{ boxShadow: `0 30px 70px -30px ${person.accent}55` }}
      >
        <img
          src={person.img}
          alt={person.name}
          draggable={false}
          className="h-full w-full select-none object-cover grayscale"
        />
        
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <h3 className="text-[26px] font-light leading-none tracking-tight text-white sm:text-2xl">
          {person.name}
        </h3>
        <span className="translate-y-[-6px] text-[11px] font-light text-white/50">
          + {person.role}
        </span>
      </div>
      <div className="mt-4 h-px w-full bg-white/10" />
    </div>
  );
}

export default function MeetOurPeople() {
  const trackRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const dragged = useRef(false);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(true);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const onPointerDown = (e) => {
    const el = trackRef.current;
    isDown.current = true;
    dragged.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDown.current) return;
    const el = trackRef.current;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) dragged.current = true;
    el.scrollLeft = startScroll.current - dx;
  };

  const endDrag = () => {
    isDown.current = false;
  };

  const onClickCapture = (e) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 40 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToEnd = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  };

  return (
    <section className="h-[100vh] relative isolate w-full overflow-hidden bg-[#050505] py-15 sm:py-20">
      {/* atmosphere: soft diagonal light streaks */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 8% 15%, rgba(239,68,68,0.10), transparent 60%), radial-gradient(50% 40% at 100% 30%, rgba(220,38,38,0.08), transparent 60%), linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.03) 48%, transparent 56%)",
        }}
      />
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `url("${GRAIN_BG}")`, backgroundSize: "140px 140px" }}
      />

      <div className="relative">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-10 overflow-x-auto px-6 pb-4 active:cursor-grabbing sm:gap-14 sm:px-12 md:px-20"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Slide 0: heading + intro copy, scrolls with the row */}
          <div className="flex w-[86vw] shrink-0 snap-start flex-col justify-center pt-2 sm:w-[70vw] md:w-[520px] md:pr-10 pl-20">
            <div className="flex items-start gap-3">
              <h2 className="text-[15vw] font-light leading-[0.95] tracking-tight text-white sm:text-[74px] md:text-[86px]">
                Meet our
                <br />
                people
              </h2>
              <CornerMark className="mt-2 hidden shrink-0 text-white/40 sm:block" />
            </div>
            <p className="mt-8 max-w-xs text-[15px] font-light leading-relaxed text-white/60 sm:text-base">
              We are a diverse team of domain experts and problem solvers.
            </p>
          </div>

          {TEAM.map((person, i) => (
            <div data-card key={person.name}>
              <TeamCard person={person} offsetClass={ZIGZAG_OFFSETS[i % ZIGZAG_OFFSETS.length]} />
            </div>
          ))}

          {/* trailing spacer so last card can rest away from viewport edge */}
          <div className="w-6 shrink-0 sm:w-12" />
        </div>

        {/* desktop nav arrows 
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Scroll left"
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/70 backdrop-blur-sm transition hover:border-white/40 hover:text-white disabled:opacity-0"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Scroll right"
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/70 backdrop-blur-sm transition hover:border-white/40 hover:text-white disabled:opacity-0"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

      */}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

function CornerMark({ className = "" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
      <path d="M1 6V1H6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 1H21V6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M21 16V21H16" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 21H1V16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}