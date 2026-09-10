import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import img1 from "../../assets/img2.webp";

const ACCENT = "#ff2b2b";
const MOBILE_BREAKPOINT = 768; // matches Tailwind's `md`

/** Tracks whether the viewport is at/above the `md` breakpoint. Renders
 * nothing decisive until after mount so we don't guess wrong on the
 * server/first paint. */
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
 * Desktop — original scroll-pinned version, unchanged.
 * ---------------------------------------------------------------------- */
function MissionVisionDesktop() {
  const pinRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const imageWidth = useTransform(scrollYProgress, [0, 1], ["100%", "66.6667%"]);
  const cardsX = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  const staticImage = prefersReducedMotion;

  return (
    <div className="w-full bg-black text-neutral-900">
      <div ref={pinRef} className="relative h-[250vh]">
        <div className="sticky top-0 w-full overflow-hidden flex">
          <motion.div
            style={staticImage ? { width: "66.6667%" } : { width: imageWidth }}
            className="h-full shrink-0 overflow-hidden"
          >
            <img
              src={img1}
              alt="Two designers reviewing work together on a laptop"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            style={staticImage ? { x: "0%" } : { x: cardsX }}
            className="absolute right-0 top-12 h-full w-1/3 flex flex-col"
          >
            <div className="flex-1 bg-red-300 px-8 py-10 flex flex-col justify-start ">
              <div className="text-6xl md:text-7xl font-light tracking-tight leading-none uppercase ">
                Mission
              </div>
              <p className="mt-4 text-base leading-snug max-w-sm text-black/60">
                At VMax Health Tech, our mission is to empower 1 Million People and their Healthcare Providers with the tools they need to enhance health management. We believe that technology can play a pivotal role in improving wellness, and we are committed to making that belief a reality.
               
              </p>
            </div>
            <div className="flex-1 bg-red-100 px-8 py-10 flex flex-col justify-start">
              <div className="text-6xl md:text-7xl font-light tracking-tight leading-none uppercase">
                Vision
              </div>
              <p className="mt-4 text-base leading-snug max-w-sm text-black/60">
                We envision a world where technology and wellness go hand in hand, creating healthier communities through smarter health management. By continuously innovating and improving our solutions, we aim to set new standards in the Health and Wellness industry.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Mobile — static premium version, no scroll-linked transforms.
 * ---------------------------------------------------------------------- */
function Panel({ label, body, delay, loaded, prefersReducedMotion }) {
  return (
    <div
      className="border-t border-white/10 px-6 py-10 transition-all"
      style={{
        transitionDuration: prefersReducedMotion ? "0ms" : "800ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: prefersReducedMotion ? "0ms" : `${delay}ms`,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(18px)",
      }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="h-px w-6"
          style={{ backgroundColor: ACCENT }}
          aria-hidden="true"
        />
        <h3 className="font-circular text-3xl font-light uppercase leading-none tracking-tight text-white">
          {label}
        </h3>
      </div>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
        {body}
      </p>
    </div>
  );
}

function MissionVisionMobile() {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="w-full bg-black">
      <div
        className="relative w-full overflow-hidden transition-all"
        style={{
          aspectRatio: "4 / 5",
          transitionDuration: prefersReducedMotion ? "0ms" : "1000ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: loaded ? 1 : 0,
        }}
      >
        <img
          src={img1}
          alt="Two designers reviewing work together on a laptop"
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
          }}
        />
      </div>

      <div className="px-0">
        <Panel
          label="Mission"
          body="At VMax Health Tech, our mission is to empower 1 million people and their healthcare providers with the tools they need to enhance health management. We believe technology can play a pivotal role in improving wellness, and we're committed to making that belief a reality."
          delay={80}
          loaded={loaded}
          prefersReducedMotion={prefersReducedMotion}
        />
        <Panel
          label="Vision"
          body="We envision a world where technology and wellness go hand in hand, creating healthier communities through smarter health management. By continuously innovating and improving our solutions, we aim to set new standards in the health and wellness industry."
          delay={200}
          loaded={loaded}
          prefersReducedMotion={prefersReducedMotion}
        />
        <div className="border-t border-white/10" aria-hidden="true" />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Exported switcher
 * ---------------------------------------------------------------------- */
export default function MissionVision() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <MissionVisionDesktop /> : <MissionVisionMobile />;
}