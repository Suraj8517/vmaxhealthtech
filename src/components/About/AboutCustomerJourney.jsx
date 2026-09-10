import React, { useEffect, useRef, useState } from "react";
import AuroraText from "../Helper/AuroraText";

const VALUES = [
  {
    title: "Visit VMax Health Tech",
    body: "Customers explore our services and are redirected to our wellness brand Fitmom Club for detailed information and offerings.",
  },
  {
    title: "Book a Consultation Call",
    body: "On the Fitmom Club website, customers complete a form to schedule a demo or consultation call with one of our certified health consultants.",
  },
  {
    title: "Health Consultant Outreach",
    body: "Our certified health consultants review the submitted form and reach out directly to understand the customer’s goals and requirements.",
  },
  {
    title: "Program Discussion",
    body: "The consultant evaluates the customer’s lifestyle and goals and explains the most suitable fitness and nutrition program, including benefits, duration, and expected results.",
  },
  {
    title: "Payment Link ",
    body: "If the customer wishes to enroll, the consultant shares a secure payment link via email or WhatsApp. This payment is processed through Razorpay for a safe and seamless experience",
  },
  {
    title: "Program Onboarding",
    body: "Once the payment is confirmed, the customer is officially onboarded, assigned a dedicated coach or dietitian, and their transformation journey begins.",
  },
];

const MOBILE_BREAKPOINT = 768; // matches Tailwind's `md`
const ACCENT = "#dc2626"; // red-600, matches the desktop row titles

/** Tracks whether the viewport is at/above the `md` breakpoint. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

/* -------------------------------------------------------------------------
 * Desktop — original scroll-pinned folding stack, unchanged.
 * ---------------------------------------------------------------------- */

const FOOTER_STEPS = 0.6;
const VISIBLE_ROWS = 5;
const ROW_HEIGHT = 210;
const VH_PER_STEP = 55;

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

function CustomerSectionDesktop() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf = null;

    function apply() {
      raf = null;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const total = Math.max(rect.height - vh, 1);
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

  const totalSteps = VALUES.length + FOOTER_STEPS;
  const scaled = prefersReducedMotion ? VALUES.length : progress * totalSteps;
  const revealedCount = prefersReducedMotion
    ? VALUES.length
    : Math.min(VALUES.length, Math.floor(scaled));
  const activeFraction =
    !prefersReducedMotion && revealedCount < VALUES.length
      ? Math.min(1, Math.max(0, scaled - revealedCount))
      : 1;

  const scrollIndex = Math.min(scaled, VALUES.length);
  const stackOffset = prefersReducedMotion
    ? 0
    : Math.max(0, scrollIndex - VISIBLE_ROWS) * ROW_HEIGHT;

  const wrapperHeight = prefersReducedMotion
    ? "auto"
    : `${totalSteps * VH_PER_STEP + 100}vh`;

  return (
    <section className="relative w-full bg-[#08090a]">
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ height: wrapperHeight }}
      >
        <div
          className={
            prefersReducedMotion
              ? "w-full px-6 md:px-16"
              : "sticky top-0 flex h-screen w-full items-start px-6 py-24 md:px-16"
          }
        >
          <div className="mx-auto grid w-full max-w-screen grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.5fr] md:gap-16">
            <div className="pt-2">
              <span className="block text-[11px] font-medium tracking-[0.18em] text-white/70">
                Customer Journey
              </span>

              <h2 className="font-sans text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                <AuroraText>How It Works</AuroraText>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#a3a2a8]">
                At VMAX Health Tech, we connect customers with our flagship wellness brand Fitmom Club to deliver personalized fitness and nutrition solutions.
              </p>
            </div>

            <div>
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  height: prefersReducedMotion ? "auto" : VISIBLE_ROWS * ROW_HEIGHT,
                }}
              >
                <div
                  style={{
                    transform: prefersReducedMotion
                      ? "none"
                      : `translateY(-${stackOffset}px)`,
                  }}
                >
                  {VALUES.map((value, i) => {
                    const isRevealed = i < revealedCount;
                    const isActive = i === revealedCount;

                    if (prefersReducedMotion) {
                      return (
                        <ValueRow
                          key={value.title}
                          value={value}
                          textOpacity={1}
                          style={{ background: "rgba(255,255,255,0.035)" }}
                        />
                      );
                    }

                    let rowStyle;
                    let textOpacity;

                    if (isRevealed) {
                      rowStyle = {
                        maxHeight: ROW_HEIGHT,
                        opacity: 1,
                        background: "rgba(255,255,255,0.035)",
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        transform: "translateY(0) scaleY(1)",
                        boxShadow: "none",
                      };
                      textOpacity = 1;
                    } else if (isActive) {
                      const f = easeOutCubic(activeFraction);
                      const shadow = 1 - f;
                      const inset = 3 * (1 - f);

                      rowStyle = {
                        maxHeight: f * (ROW_HEIGHT - 54),
                        opacity: 1,
                        background: `rgba(255,255,255,${0.065 + shadow * 0.02})`,
                        clipPath: `polygon(0% 0%, 100% 0%, ${100 - inset}% 100%, ${inset}% 100%)`,
                        transform: `translateY(${shadow * 6}px) scaleY(${0.9 + f * 0.1})`,
                        boxShadow: `inset 0 ${14 * shadow}px ${20 * shadow}px -6px rgba(0,0,0,${0.55 * shadow})`,
                      };
                      textOpacity = f > 0.92 ? (f - 0.92) / 0.08 : 0;
                    } else {
                      rowStyle = {
                        maxHeight: 0,
                        opacity: 0,
                        background: "rgba(255,255,255,0.035)",
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                        transform: "translateY(0) scaleY(1)",
                        boxShadow: "none",
                      };
                      textOpacity = 0;
                    }

                    return (
                      <ValueRow
                        key={value.title}
                        value={value}
                        textOpacity={textOpacity}
                        style={rowStyle}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueRow({ value, textOpacity, style }) {
  return (
    <div
      className="relative origin-top overflow-hidden"
      style={{
        transition: "none",
        transformOrigin: "top center",
        ...style,
      }}
    >
      <div className="flex flex-col gap-2 px-6 py-7 sm:flex-row sm:items-start  sm:gap-8 md:px-8">
        <h3
          className="shrink-0 text-xl font-semibold text-red-600 sm:w-64 sm:text-xl"
          style={{ opacity: textOpacity, transition: "opacity 150ms ease-out" }}
        >
          {value.title}
        </h3>
        <p
          className=" text-sm leading-relaxed text-white/50"
          style={{ opacity: textOpacity, transition: "opacity 150ms ease-out" }}
        >
          {value.body}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Mobile — static numbered timeline, no scroll-jacking.
 * ---------------------------------------------------------------------- */

function CustomerSectionMobile() {
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#08090a] px-6 py-20">
      <span className="block text-[11px] font-medium tracking-[0.18em] text-white/70">
        Customer Journey
      </span>
      <h2 className="mt-2 font-sans text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white">
        <AuroraText>How It Works</AuroraText>
      </h2>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#a3a2a8]">
        At VMAX Health Tech, we connect customers with our flagship wellness brand Fitmom Club to deliver personalized fitness and nutrition solutions.
      </p>

      <ol className="relative mt-12 flex flex-col">
        {VALUES.map((value, i) => {
          const isLast = i === VALUES.length - 1;
          return (
            <li
              key={value.title}
              className="relative flex gap-5 pb-10 transition-all last:pb-0"
              style={{
                transitionDuration: prefersReducedMotion ? "0ms" : "700ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: prefersReducedMotion ? "0ms" : `${100 + i * 90}ms`,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(14px)",
              }}
            >
              {/* Number + connecting line */}
              <div className="relative flex shrink-0 flex-col items-center">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold"
                  style={{ borderColor: ACCENT, color: ACCENT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="mt-1 w-px flex-1 bg-white/10"
                  />
                )}
              </div>

              <div className="pt-1.5">
                <h3 className="text-lg font-semibold text-white">
                  {value.title.trim()}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {value.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Exported switcher
 * ---------------------------------------------------------------------- */
export default function CustomerSection() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <CustomerSectionDesktop /> : <CustomerSectionMobile />;
}