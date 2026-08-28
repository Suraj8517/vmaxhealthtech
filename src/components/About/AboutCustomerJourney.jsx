import React, { useEffect, useRef, useState } from "react";
import AuroraText from "../Helper/AuroraText";

const EYEBROW = "WHAT WE BELIEVE SHAPES BETTER WORK.";

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

// How much extra "scroll room" (in units of one card-step) is reserved after
// the last card locks into place, used to fade the closing eyebrow line in.
const FOOTER_STEPS = 0.6;

// How the right-hand stack scrolls: only this many rows are visible in the
// clipped window at once. Once more cards than that have been revealed, the
// whole stack translates upward so older rows scroll off the top while new
// ones fold open at the bottom.
const VISIBLE_ROWS = 5;
const ROW_HEIGHT = 210;

const VH_PER_STEP = 55;

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

export default function CustomerSection() {
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

      // rect.top === vh is the instant the section's top edge crosses the
      // BOTTOM of the viewport — i.e. the very first moment any part of the
      // section is about to appear. That's progress = 0. Progress climbs
      // continuously from there (through entry, then through the pinned
      // scroll range) until the pin releases, which is progress = 1.
      //
      // IMPORTANT: the denominator here is the *usable pinned scroll range*,
      // not the full wrapper height. The sticky child is itself 100vh tall,
      // so position: sticky can only hold the section in place for
      // (wrapperHeight - 100vh) of scrolling — after that it unpins and
      // starts scrolling away regardless of what `progress` says. Using the
      // full wrapper height as the denominator makes progress reach 1 a
      // full viewport too late — after the pin has already released — which
      // is what produces the big empty gap after this section. Subtracting
      // vh here makes progress hit 1 exactly when the pin runs out.
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
  const footerOpacity = prefersReducedMotion
    ? 1
    : Math.min(1, Math.max(0, (scaled - VALUES.length) / FOOTER_STEPS));

  // How far the stack has "progressed" in row-units (0 → VALUES.length).
  // Once that exceeds the visible window, translate the whole stack up by
  // the overflow amount so it reads as the right column scrolling.
  const scrollIndex = Math.min(scaled, VALUES.length);
  const stackOffset = prefersReducedMotion
    ? 0
    : Math.max(0, scrollIndex - VISIBLE_ROWS) * ROW_HEIGHT;

  // Wrapper height = scroll budget for all steps (cards + footer) PLUS one
  // extra viewport height, since that's what the sticky child consumes
  // before the pin can even begin releasing. This keeps wrapperHeight and
  // the progress denominator (rect.height - vh) in sync — see the comment
  // in the scroll handler above.
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
                      <span className="block text-[11px] font-medium tracking-[0.18em] text-white/70">Customer Journey</span>

              <h2 className="font-sans text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                <AuroraText>How It Works</AuroraText>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#a3a2a8]">
                At VMAX Health Tech, we connect customers with our flagship wellness brand Fitmom Club to deliver personalized fitness and nutrition solutions.
              </p>
            </div>

            {/* Right — the folding card stack, clipped to a scrolling window */}
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
                      // f is the eased progress of THIS row folding open,
                      // from a thin, pointed sliver (like a page corner
                      // just lifting) into a full flat panel.
                      const f = easeOutCubic(activeFraction);
                      const shadow = 1 - f;

                      // Wide funnel at the start (a crease, not a
                      // rectangle), narrowing to a flat edge as the row
                      // settles open.
                      const inset = 3 * (1 - f);

                      rowStyle = {
                        maxHeight: f * (ROW_HEIGHT - 54),
                        opacity: 1,
                        // The row darkens toward the fold's shadow while
                        // it's mid-unfold, then eases into the same tone
                        // as the settled rows above it.
                        background: `rgba(255,255,255,${0.065 + shadow * 0.02})`,
                        clipPath: `polygon(0% 0%, 100% 0%, ${100 - inset}% 100%, ${inset}% 100%)`,
                        transform: `translateY(${shadow * 6}px) scaleY(${0.9 + f * 0.1})`,
                        // Soft inset shadow at the crease line, fading out
                        // as the panel opens flat — this is what reads as
                        // a fold rather than a wipe.
                        boxShadow: `inset 0 ${14 * shadow}px ${20 * shadow}px -6px rgba(0,0,0,${0.55 * shadow})`,
                      };
                      // Text stays hidden for the whole fold and only
                      // appears right at the very end, once the panel has
                      // essentially finished opening flat.
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