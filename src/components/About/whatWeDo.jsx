import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { PhoneCall, FolderHeart, BrainCircuit } from "lucide-react";

const STEPS = [
  {
    icon: PhoneCall,
    title: "Communication Simplified",
    body: "Our CRM allows users to make calls effortlessly, ensuring seamless communication between patients and healthcare providers.",
  },
  {
    icon: FolderHeart,
    title: "Health Records Management",
    body: "Keeping track of health records has never been easier. Our system provides a secure and efficient way to manage and access health information.",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    body: "We harness the power of Artificial Intelligence to provide intelligent insights and personalized health recommendations, making health management smarter and more efficient.",
  },
];

// Fraction of the pinned scroll range spent revealing all steps / growing
// the line. The line's tip and the step text finish together at this point.
const REVEAL_WINDOW = 0.9;

// Full rotations the leading "+" makes while travelling one segment. Any
// integer keeps it visually upright at both ends (a "+" has 90° symmetry).
const ROTATIONS_PER_SEGMENT = 1;

// Critically-damped spring: smooths out jittery scroll samples without any
// bounce/overshoot, so the "+" still locks cleanly onto each marker instead
// of wobbling past it.
const SPRING = { stiffness: 400, damping: 90, mass: 1 };

const TOTAL_MARKERS = STEPS.length; // number of line segments
const MARKER_COUNT = TOTAL_MARKERS + 1;

export default function WhatWeDo() {
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const animated = !isMobile && !prefersReducedMotion;

  // scrollYProgress goes 0 -> 1 across the pinned range (top of section
  // hits top of viewport -> bottom of section hits bottom of viewport).
  // This is read straight off the DOM by Framer's own rAF loop, not through
  // React state, so it doesn't force a re-render on every scroll tick.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // 0 -> TOTAL_MARKERS, reaching each integer exactly when the
  // corresponding step finishes revealing.
  const markerProgressRaw = useTransform(
    scrollYProgress,
    [0, REVEAL_WINDOW],
    [0, TOTAL_MARKERS],
    { clamp: true }
  );
  const mp = useSpring(markerProgressRaw, SPRING);

  const lineWidth = useTransform(mp, [0, TOTAL_MARKERS], ["0%", "100%"]);

  // Step text reveal, driven by the same smoothed value.
  const step0Local = useTransform(mp, [0, 1], [0, 1], { clamp: true });
  const step1Local = useTransform(mp, [1, 2], [0, 1], { clamp: true });
  const step2Local = useTransform(mp, [2, 3], [0, 1], { clamp: true });
  const stepLocals = [step0Local, step1Local, step2Local];
  const step0Y = useTransform(step0Local, [0, 1], [16, 0]);
  const step1Y = useTransform(step1Local, [0, 1], [16, 0]);
  const step2Y = useTransform(step2Local, [0, 1], [16, 0]);
  const stepYs = [step0Y, step1Y, step2Y];

  // Marker 1: travels segment [0,1], marker 2: [1,2], marker 3: [2,3].
  // Add another block below (and to STEPS) if you add more steps.
  const left1 = useTransform(mp, [0, 1], ["0%", `${(1 / TOTAL_MARKERS) * 100}%`], { clamp: true });
  const rotate1 = useTransform(mp, [0, 1], ["0deg", `${360 * ROTATIONS_PER_SEGMENT}deg`], { clamp: true });
  const opacity1 = useTransform(mp, [0, 0.001], [0, 1], { clamp: true });

  const left2 = useTransform(mp, [1, 2], [`${(1 / TOTAL_MARKERS) * 100}%`, `${(2 / TOTAL_MARKERS) * 100}%`], { clamp: true });
  const rotate2 = useTransform(mp, [1, 2], ["0deg", `${360 * ROTATIONS_PER_SEGMENT}deg`], { clamp: true });
  const opacity2 = useTransform(mp, [1, 1.001], [0, 1], { clamp: true });

  const left3 = useTransform(mp, [2, 3], [`${(2 / TOTAL_MARKERS) * 100}%`, "100%"], { clamp: true });
  const rotate3 = useTransform(mp, [2, 3], ["0deg", `${360 * ROTATIONS_PER_SEGMENT}deg`], { clamp: true });
  const opacity3 = useTransform(mp, [2, 2.001], [0, 1], { clamp: true });

  const transform1 = useMotionTemplate`translate(-50%, -50%) rotate(${rotate1})`;
  const transform2 = useMotionTemplate`translate(-50%, -50%) rotate(${rotate2})`;
  const transform3 = useMotionTemplate`translate(-50%, -50%) rotate(${rotate3})`;

  if (!animated) {
    // Static fallback: mobile / reduced-motion just shows the end state,
    // no scroll wiring, no framer motion values in play.
    return (
      <section ref={wrapperRef} className="relative bg-[#08090a]">
        <div className="flex items-center overflow-hidden py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
            <Header />
            <div className="mt-16 md:mt-24">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
                {STEPS.map((step) => (
                  <StepText key={step.title} step={step} />
                ))}
              </div>
              <div className="relative mt-14 hidden h-px w-full bg-white/10 md:mt-16 md:block">
                <div className="absolute inset-y-0 left-0 w-full bg-white/30" />
                {Array.from({ length: MARKER_COUNT }).map((_, k) => (
                  <StaticPlusMark key={k} left={(k / TOTAL_MARKERS) * 100} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapperRef} style={{ height: "260vh" }} className="relative bg-[#08090a]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <Header />

          <div className="mt-16 md:mt-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
              {STEPS.map((step, i) => (
                <motion.div key={step.title} style={{ opacity: stepLocals[i], y: stepYs[i] }}>
                  <StepText step={step} />
                </motion.div>
              ))}
            </div>

            {/* Connecting line — tip and leading "+" grow together; each
                "+" spins while travelling and locks flat on arrival. */}
            <div className="relative mt-14 hidden h-px w-full md:mt-16 md:block">
              <motion.div className="absolute inset-y-0 left-0 bg-white/30" style={{ width: lineWidth }} />

              {/* Marker 0 is always static at the start. */}
              <StaticPlusMark left={0} />
              <motion.svg
                viewBox="0 0 12 12"
                className="absolute top-1/2 h-3 w-3 text-white/70"
                style={{ left: left1, opacity: opacity1, transform: transform1 }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M6 0V12M0 6H12" />
              </motion.svg>
              <motion.svg
                viewBox="0 0 12 12"
                className="absolute top-1/2 h-3 w-3 text-white/70"
                style={{ left: left2, opacity: opacity2, transform: transform2 }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M6 0V12M0 6H12" />
              </motion.svg>
              <motion.svg
                viewBox="0 0 12 12"
                className="absolute top-1/2 h-3 w-3 text-white/70"
                style={{ left: left3, opacity: opacity3, transform: transform3 }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M6 0V12M0 6H12" />
              </motion.svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <>
      <span className="block text-[11px] font-medium tracking-[0.18em] text-white/70">OUR PROCESS</span>
      <h2 className="mt-3 font-sans text-5xl font-medium tracking-tight text-red-600 sm:text-6xl md:text-7xl">
        What We Do
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/40 md:text-base">
       Our flagship product is a state-of-the-art Customer Relationship Management (CRM) system designed specifically for the health and wellness sector. Our CRM is more than just a tool; it’s a comprehensive solution that integrates seamlessly into your daily operations.
      </p>
    </>
  );
}

function StepText({ step }) {
  const Icon = step.icon;
  return (
    <div>
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
        <Icon className="h-5 w-5 text-red-600/80" strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 text-2xl font-medium text-white md:text-3xl">{step.title}</h3>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45 md:text-[15px]">{step.body}</p>
    </div>
  );
}

function StaticPlusMark({ left }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className="absolute top-1/2 h-3 w-3 text-white/70"
      style={{ left: `${left}%`, transform: "translate(-50%, -50%)" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M6 0V12M0 6H12" />
    </svg>
  );
}