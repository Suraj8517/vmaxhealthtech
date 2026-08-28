import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import bg from "../../assets/about/bg.webp"
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Starting size as a fraction of the box's final (fullscreen) size.
// Box ends at 100vw x 100vh, so 52vw/65vh at the start = these ratios.
const START_SCALE_X = 0.62;
const START_SCALE_Y = 0.65;

function ScrollExpandMedia({
  mediaSrc,
  mediaAlt = "",
  introTitle,
  revealTitle,
  revealSubtitle,
}) {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const imageRef = useRef(null);
  const introRef = useRef(null);
  const revealRef = useRef(null);
  const scrollHintRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          fullMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          // The box is ALWAYS 100vw x 100vh in layout terms — no width/height
          // animation, so no reflow on scroll. We fake the "small" starting
          // size purely with a transform, which is compositor-only.
          gsap.set(mediaRef.current, {
            width: "100vw",
            height: "100vh",
            borderRadius: 32,
            scaleX: START_SCALE_X,
            scaleY: START_SCALE_Y,
            transformOrigin: "center center",
            force3D: true,
          });
          gsap.set(imageRef.current, { scale: 1.16 });
          gsap.set(introRef.current, { opacity: 1, y: 0 });
          gsap.set(revealRef.current, { opacity: 0, y: 40 });
          gsap.set(scrollHintRef.current, { opacity: 1 });

          if (reduceMotion) {
            gsap.set(mediaRef.current, {
              scaleX: 1,
              scaleY: 1,
              borderRadius: 0,
            });
            gsap.set(imageRef.current, { scale: 1 });
            gsap.set(introRef.current, { opacity: 0 });
            gsap.set(revealRef.current, { opacity: 1, y: 0 });
            gsap.set(scrollHintRef.current, { opacity: 0 });
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          // MEDIA EXPANSION — transform only, no layout thrash
          tl.to(
            mediaRef.current,
            {
              scaleX: 1,
              scaleY: 1,
              borderRadius: 0,
              ease: "power3.inOut",
              duration: 1,
            },
            0
          )
            .to(
              imageRef.current,
              { scale: 1, ease: "power2.out", duration: 1 },
              0
            )
            .to(
              introRef.current,
              { opacity: 0, y: -50, ease: "power2.out", duration: 0.3 },
              0.05
            )
            .to(
              scrollHintRef.current,
              { opacity: 0, ease: "power2.out", duration: 0.15 },
              0
            )
            .to(
              revealRef.current,
              { opacity: 1, y: 0, ease: "power3.out", duration: 0.35 },
              0.62
            );
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-[280vh] bg-black">
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black">
        <div
          ref={mediaRef}
          className="relative overflow-hidden shadow-2xl shadow-black/60 will-change-transform"
        >
          {/* IMAGE */}
          <img
            ref={imageRef}
            src={mediaSrc}
            alt={mediaAlt}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover will-change-transform select-none"
          />

          {/* GRADIENT */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/30" />

          {/* INTRO */}
          <div
            ref={introRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 will-change-transform"
          >
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {introTitle}
            </h2>
          </div>

          {/* REVEAL */}
          <div
            ref={revealRef}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 will-change-transform"
          >
            <h2 className="max-w-4xl text-center text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {revealTitle}
            </h2>
            <p className="max-w-xl text-center text-base leading-relaxed text-neutral-200 sm:text-lg">
              {revealSubtitle}
            </p>
          </div>

          {/* SCROLL HINT */}
          <div
            ref={scrollHintRef}
            className="pointer-events-none absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 text-white/80"
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em]">
              Scroll
            </span>
            <svg
              className="h-4 w-4 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SomeSection() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-white">
      <ScrollExpandMedia
        mediaSrc= {bg}
        mediaAlt=""
        introTitle="Built to scale"
        revealTitle="Every pixel, everywhere"
        revealSubtitle="The frame opens up as you scroll and hands the whole stage to your media."
      />
    </div>
  );
}