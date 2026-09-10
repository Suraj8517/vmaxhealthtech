import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/vmax.png";
// Add a real photo here — something that shows the work/product/people,
// not a stock abstraction. Landscape orientation, at least 1600px wide.
import heroBg from "../../assets/img3.webp";
import AuroraText from "../Helper/AuroraText";

const HEADLINE_TOP = ["Different Needs", "One Solution"];

const DESCRIPTION =
  "We build for the job in front of you, not a generic one. Every engagement starts from what you actually need — then we shape the solution around it.";

// A single, deliberate 1% grain texture — the one bit of "material" quality
// on an otherwise flat black field. Kept as a data URI so there's no extra
// asset/network request.
const GRAIN_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC45Ii8+PC9zdmc+";

function LogoMark({ logoSrc, logoAlt = "Company logo" }) {
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-8 w-8 select-none object-contain opacity-90"
        draggable={false}
      />
    );
  }
  return (
    <span
      className="select-none font-mono text-[10px] tracking-[0.3em] text-white/70"
      aria-label={logoAlt}
    >
      VMAX
    </span>
  );
}

export default function AboutUsMobileHero({ logoSrc, logoAlt }) {
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Trigger the entrance sequence once the section actually enters the
  // viewport, rather than immediately on mount.
  useEffect(() => {
    if (prefersReducedMotion) {
      setLoaded(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const entranceEase = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-black px-6"
    >
      {/* Background photo — sits behind everything, slightly zoomed and
          desaturated so it reads as texture/context rather than competing
          with the headline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform bg-black"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: "grayscale(0.35) contrast(1.05)",
          transitionDuration: prefersReducedMotion ? "0ms" : "1600ms",
          transitionTimingFunction: entranceEase,
          transform: loaded ? "scale(1.04)" : "scale(1.12)",
        }}
      />

      {/* Overlay — a bottom-weighted dark gradient plus a flat black wash,
          tuned so the red-800 headline and white body copy both stay
          legible against whatever the photo is doing underneath. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.72) 70%, rgba(0,0,0,0.99) 100%)",
        }}
      />

      {/* Dark curtain that lifts away to reveal the hero — the one
          orchestrated page-load moment. Everything else on the page stays
          still. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 bg-black transition-transform"
        style={{
          transitionDuration: prefersReducedMotion ? "0ms" : "1050ms",
          transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
          transform: loaded ? "translateY(-100%)" : "translateY(0%)",
        }}
      />

      {/* Grain — a quiet material texture so the field doesn't read as
          flat/digital. Barely visible on its own. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.05]"
        style={{ backgroundImage: `url(${GRAIN_URL})`, backgroundSize: "160px 160px" }}
      />

      {/* A single soft crimson glow pooled behind the title — the one
          bold gesture in the frame. Everything else stays quiet so this
          reads as intentional, not decorative clutter. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity"
        style={{
          width: "min(90vw, 480px)",
          height: "min(90vw, 480px)",
          transitionDuration: prefersReducedMotion ? "0ms" : "1400ms",
          transitionDelay: prefersReducedMotion ? "0ms" : "150ms",
          opacity: loaded ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(220,20,30,0.32) 0%, rgba(120,8,16,0.16) 42%, rgba(0,0,0,0) 72%)",
          filter: "blur(6px)",
          animation: prefersReducedMotion
            ? "none"
            : "vmax-glow-breathe 6s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes vmax-glow-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
        }
      `}</style>

      {/* Foreground: logo, title, description. */}
      <div className="relative z-30 flex w-full max-w-sm flex-col items-center gap-4 py-24 text-center">
        <div
          className="flex items-center justify-center transition-all"
          style={{
            transitionDuration: prefersReducedMotion ? "0ms" : "800ms",
            transitionTimingFunction: entranceEase,
            transitionDelay: prefersReducedMotion ? "0ms" : "150ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-0.5rem)",
          }}
        >
          <LogoMark logoSrc={logo} logoAlt={logoAlt} />
        </div>

        <h2
          className="relative text-[2.95rem] font-medium uppercase leading-[0.96] tracking-tight text-red-400 transition-all"
          style={{
            transitionDuration: prefersReducedMotion ? "0ms" : "900ms",
            transitionTimingFunction: entranceEase,
            transitionDelay: prefersReducedMotion ? "0ms" : "300ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(1rem)",
            filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.9))",
          }}
        >
          
            {HEADLINE_TOP.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
           
         
        </h2>

        <div
          className="h-px w-16 bg-gradient-to-r from-transparent via-red-600/60 to-transparent transition-all"
          style={{
            transitionDuration: prefersReducedMotion ? "0ms" : "700ms",
            transitionTimingFunction: entranceEase,
            transitionDelay: prefersReducedMotion ? "0ms" : "550ms",
            opacity: loaded ? 1 : 0,
          }}
          aria-hidden="true"
        />

        <p
          className="max-w-[50ch] text-md font-normal leading-relaxed text-white/70 transition-all"
          style={{
            transitionDuration: prefersReducedMotion ? "0ms" : "800ms",
            transitionTimingFunction: entranceEase,
            transitionDelay: prefersReducedMotion ? "0ms" : "700ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(0.5rem)",
          }}
        >
          {DESCRIPTION}
        </p>
      </div>
    </section>
  );
}