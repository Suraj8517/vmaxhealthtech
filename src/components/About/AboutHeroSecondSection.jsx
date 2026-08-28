import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/vmax.png"
import AuroraText from "../Helper/AuroraText";
const HEADLINE =
  "PROVIDING TECHNICAL LEADERSHIP AND DESIGN TO DELIVER QUALITY SOFTWARE SOLUTIONS, INCLUDING ARCHITECTURE, INTEGRATIONS, AND MACHINE LEARNING.";

const BODY =
  "Designing and building systems with a stable senior team, so context compounds and decisions improve over time. Every engagement draws on the Phobos collective intelligence, strengthening architecture and delivery, enabling evolution.";

// Text repeated around the seal, spaced by mid-dots.
const SEAL_TEXT =
  "PASSION IN THE PROCESS  \u2022  EST. 2008  \u2022  PHOBOS CONSULTING  \u2022  EST. 2008  \u2022  ";

const ACCENT = "#ff2b2b"; // red accent used across the seal + CTA hover states

function LogoMark({ logoSrc, logoAlt = "Company logo", size }) {
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-full w-full rounded-full object-contain select-none pointer-events-none"
        draggable={false}
      />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
      <rect x="8" y="10" width="7" height="8" rx="1.5" fill={ACCENT} />
      <rect x="29" y="10" width="7" height="8" rx="1.5" fill={ACCENT} />
      <rect x="9" y="27" width="26" height="8" rx="4" fill={ACCENT} />
    </svg>
  );
}

function Seal({ size = 168, logoSrc, logoAlt }) {
  const R = size / 2;
  const textRadius = R - 19;
  const pathId = "seal-ring-path";

  return (
    <div
      className="relative shrink-0 select-none"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="motion-safe:animate-[seal-spin_20s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d={`M ${R}, ${R} m -${textRadius}, 0 a ${textRadius},${textRadius} 0 1,1 ${
              textRadius * 2
            },0 a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0`}
          />
        </defs>

        <text
          fill={ACCENT}
          fontSize="12.4"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="1.5"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {SEAL_TEXT}
          </textPath>
        </text>
      </svg>

      {/* Logo, held fixed in the center while the ring rotates around it */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: size * 0.34, height: size * 0.34 }}
        >
          <LogoMark logoSrc={logoSrc} logoAlt={logoAlt} size={size * 0.34} />
        </div>
      </div>
    </div>
  );
}

export default function AboutHeroSection({ logoSrc, logoAlt }) {
  // --- load-in / scroll animation state -----------------------------------
  const [loaded, setLoaded] = useState(false);
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const sectionRef = useRef(null);
  const headlineWrapRef = useRef(null);
  const bodyWrapRef = useRef(null);
  const sealWrapRef = useRef(null);

  useEffect(() => {
    // Inject the keyframes once; keeps the component fully self-contained.
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes seal-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

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

  // Scroll parallax: headline/body ease upward and fade slightly, the seal
  // drifts and gently scales as the section leaves the top of the viewport.
  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf = null;

    function apply() {
      raf = null;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.min(Math.max(-rect.top / vh, 0), 1);

      if (headlineWrapRef.current) {
        headlineWrapRef.current.style.transform = `translate3d(0, ${
          progress * -26
        }px, 0)`;
        headlineWrapRef.current.style.opacity = `${1 - progress * 0.6}`;
      }
      if (bodyWrapRef.current) {
        bodyWrapRef.current.style.transform = `translate3d(0, ${
          progress * -16
        }px, 0)`;
        bodyWrapRef.current.style.opacity = `${1 - progress * 0.6}`;
      }
      if (sealWrapRef.current) {
        const scale = 1 - progress * 0.1;
        sealWrapRef.current.style.transform = `translate3d(0, ${
          progress * 30
        }px, 0) scale(${scale})`;
        sealWrapRef.current.style.opacity = `${1 - progress * 0.4}`;
      }
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

  const entranceEase = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-black px-6 py-6 md:px-16 md:py-10"
    >
      <div className="relative mx-4 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr] md:gap-4 md:items-center">
        {/* Headline — pulled up well above the row */}
        <div ref={headlineWrapRef} style={{ willChange: "transform, opacity" }}>
          <h1
            className="max-w-xl self-start -mt-2 font-circular text-[20px] font-bold uppercase leading-[1.15] tracking-tight text-white sm:text-4xl md:-mt-10 transition-all"
            style={{
              transitionDuration: prefersReducedMotion ? "0ms" : "900ms",
              transitionTimingFunction: entranceEase,
              transitionDelay: prefersReducedMotion ? "0ms" : "40ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(28px)",
            }}
          ><AuroraText>{HEADLINE}</AuroraText>
            
          </h1>
        </div>

        {/* Body copy + CTA, right column — centered within the row */}
        <div ref={bodyWrapRef} style={{ willChange: "transform, opacity" }}>
          <div
            className="flex flex-col justify-center self-center md:mt-22 md:pt-2 transition-all"
            style={{
              transitionDuration: prefersReducedMotion ? "0ms" : "900ms",
              transitionTimingFunction: entranceEase,
              transitionDelay: prefersReducedMotion ? "0ms" : "180ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(28px)",
            }}
          >
            <p className="max-w-md text-[12px] sm:text-[18px] leading-relaxed text-[#a3a2a8]">
              {BODY}
            </p>

            <button
              type="button"
              className="group mt-10 flex w-fit items-center gap-3 focus:outline-none"
            >
              <span
                className="flex h-9 w-9 items-center justify-center border border-white/25 text-base text-white/80 transition-colors group-hover:border-[#ff2b2b] group-hover:text-[#ff2b2b] group-focus-visible:border-[#ff2b2b] group-focus-visible:text-[#ff2b2b]"
                aria-hidden="true"
              >
                +
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 transition-colors group-hover:text-[#ff2b2b]">
                Learn more
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Rotating seal — sits at the bottom of the section, centered on
          mobile and pushed to the right on larger screens */}
      <div
        ref={sealWrapRef}
        className="flex justify-center md:justify-end md:pr-8 pl-36"
        style={{ willChange: "transform, opacity" }}
      >
        <div
          className="transition-all"
          style={{
            transitionDuration: prefersReducedMotion ? "0ms" : "1000ms",
            transitionTimingFunction: entranceEase,
            transitionDelay: prefersReducedMotion ? "0ms" : "320ms",
            opacity: loaded ? 1 : 0,
            transform: `scale(${loaded ? 1 : 0.7}) rotate(${
              loaded ? 0 : -40
            }deg)`,
          }}
        >
          <Seal size={168} logoSrc={logo} logoAlt={logoAlt} />
        </div>
      </div>
    </section>
  );
}