import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vignesh from "../../assets/team/vignesh.png"
import sarvesh from "../../assets/team/sarvesh.png"
import pritika from "../../assets/team/pritika-team.png"
import sanga from "../../assets/team/sanga.png"
import vinothini from "../../assets/team/vinothini.png"

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: "Vignesh Prabhakaran", role: "Founder / Visionary / Chief Business Director", accent: "#ef4444", img: vignesh },
  { name: "Sarvesh Prabhakaran", role: "Co Founder / CEO", accent: "#f87171", img: sarvesh },
  { name: "Pritika", role: "Influencer / Brand Partner(FitMom Club)", accent: "#dc2626", img: pritika },
  { name: "Sangameswaran ", role: "Senior Operations Manager", accent: "#fca5a5", img: sanga },
  { name: "Vinothini", role: "Product Manager", accent: "#b91c1c", img: vinothini },
];

const ZIGZAG_OFFSETS = ["md:mt-0", "md:mt-20", "md:mt-10"];

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

// Tracks whether we're above the desktop breakpoint. GSAP pin/scrub only
// runs above this — below it we render a native scroll-snap carousel instead.
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : true
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsDesktop(e.matches);
    handler(mq); // sync on mount in case it changed before listener attached
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isDesktop;
}

function TeamCard({ person, offsetClass = "", widthClass = "" }) {
  return (
    <div
      data-card
      className={`group flex shrink-0 flex-col transition-transform duration-500 ${widthClass} ${offsetClass}`}
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

function SectionBackdrop() {
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

function Heading() {
  return (
    <div className="flex items-start gap-3">
      <h2 className="text-[15vw] font-light leading-[0.95] tracking-tight text-white sm:text-[74px] md:text-[86px]">
        Meet our
        <br />
        Team
      </h2>
      <CornerMark className="mt-2 hidden shrink-0 text-white/40 sm:block" />
    </div>
  );
}

// --- Mobile: no pin, no scroll-jacking. Native scroll-snap carousel. ---
function MobileTeamSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#10100E] py-16">
      <SectionBackdrop />
      <div className="relative px-6">
        <Heading />
        <p className="mt-6 max-w-xs text-[15px] font-light leading-relaxed text-white/60">
          We are a diverse team of domain experts and problem solvers.
        </p>
      </div>

      <div
        className="relative mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TEAM.map((person) => (
          <div key={person.name} className="snap-start">
            <TeamCard person={person} widthClass="w-[78vw] max-w-[320px]" />
          </div>
        ))}
        <div className="w-2 shrink-0" aria-hidden="true" />
      </div>

    
    </section>
  );
}

// --- Desktop: original pinned horizontal-scroll GSAP treatment. ---
function DesktopTeamSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx;
    let ro;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const getScrollDistance = () =>
          Math.max(track.scrollWidth - section.clientWidth, 0);

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      }, section);

      ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(track);
    });

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#0A0A08]"
    >
      <SectionBackdrop />

      <div className="relative flex h-screen items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex shrink-0 items-center gap-10 px-6 will-change-transform sm:gap-14 sm:px-12 md:px-20"
        >
          <div className="flex w-[86vw] shrink-0 flex-col justify-center pt-2 sm:w-[70vw] md:w-[520px] md:pr-10 pl-20">
            <Heading />
            <p className="mt-8 max-w-xs text-[15px] font-light leading-relaxed text-white/60 sm:text-base">
Meet our veterans from various trades            </p>
          </div>

          {TEAM.map((person, i) => (
            <TeamCard
              key={person.name}
              person={person}
              offsetClass={ZIGZAG_OFFSETS[i % ZIGZAG_OFFSETS.length]}
              widthClass="w-[64vw] sm:w-[300px] md:w-[340px]"
            />
          ))}

          <div className="w-6 shrink-0 sm:w-12" />
        </div>
      </div>
    </section>
  );
}

export default function MeetOurPeople() {
  const isDesktop = useIsDesktop(768);
  return isDesktop ? <DesktopTeamSection /> : <MobileTeamSection />;
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