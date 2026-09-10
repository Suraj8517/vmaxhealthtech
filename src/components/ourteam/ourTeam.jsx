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
// runs above this — below it we render a lighter native pin instead.
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

// --- Mobile: vertical page-scroll drives horizontal movement, same idea as
// desktop's pin but implemented with a plain sticky container + rAF scroll
// listener instead of GSAP ScrollTrigger's pin, which is heavier than this
// needs to be on a phone. Falls back to a plain stacked layout (no motion,
// no pin) when the user prefers reduced motion. ---
function MobileTeamSection() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const pinHeightRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [pinHeight, setPinHeight] = useState(0);
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Measure (a) how far the track needs to travel horizontally, and (b) the
  // sticky panel's own natural height — the panel is sized to its content
  // (heading + cards), NOT forced to the full screen height, so there's no
  // leftover empty space above/below it while it's pinned.
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;

    function measure() {
      setScrollDistance(Math.max(track.scrollWidth - window.innerWidth, 0));
      const h = sticky.offsetHeight;
      pinHeightRef.current = h;
      setPinHeight(h);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(sticky);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [prefersReducedMotion]);

  // Vertical scroll progress through the pinned range. The "consumed"
  // amount before release is the sticky panel's own height, not the full
  // viewport — that's what keeps the wrapper height (and therefore the
  // total scroll distance) matched to the actual pin duration.
  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf = null;

    function apply() {
      raf = null;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const consumed = pinHeightRef.current || window.innerHeight || 1;
      const total = Math.max(rect.height - consumed, 1);
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(p);
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  // Wrapper height = the pixel scroll distance the track needs, plus the
  // sticky panel's own measured height. Until both are measured, render
  // with auto height rather than guessing — avoids an oversized flash.
  const measured = scrollDistance > 0 && pinHeight > 0;
  const wrapperHeight = prefersReducedMotion || !measured
    ? "auto"
    : `calc(${scrollDistance}px + ${pinHeight}px)`;

  const trackX = prefersReducedMotion || !measured ? 0 : -(progress * scrollDistance);

  if (prefersReducedMotion) {
    return (
      <section className="relative isolate w-full overflow-hidden bg-[#10100E] py-16">
        <SectionBackdrop />
        <div className="relative px-6">
          <Heading />
          <p className="mt-6 max-w-xs text-[15px] font-light leading-relaxed text-white/60">
            We are a diverse team of domain experts and problem solvers.
          </p>
        </div>
        <div className="relative mt-10 flex flex-col gap-10 px-6">
          {TEAM.map((person) => (
            <TeamCard key={person.name} person={person} widthClass="w-full max-w-[320px]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#10100E]">
      <SectionBackdrop />
      <div ref={wrapperRef} className="relative w-full" style={{ height: wrapperHeight }}>
        <div ref={stickyRef} className="sticky top-0 w-full overflow-hidden py-16">
          <div
            ref={trackRef}
            className="flex shrink-0 items-center gap-8 px-6 will-change-transform"
            style={{ transform: `translateX(${trackX}px)` }}
          >
            <div className="flex w-[84vw] max-w-[380px] shrink-0 flex-col justify-center pt-2">
              <Heading />
              <p className="mt-6 max-w-xs text-[15px] font-light leading-relaxed text-white/60">
                We are a diverse team of domain experts and problem solvers.
              </p>
            </div>

            {TEAM.map((person) => (
              <TeamCard key={person.name} person={person} widthClass="w-[74vw] max-w-[300px]" />
            ))}

            <div className="w-6 shrink-0" aria-hidden="true" />
          </div>
        </div>
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