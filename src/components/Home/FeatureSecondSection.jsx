import React, { useEffect, useState } from "react";
import {
  Dumbbell,
  Apple,
  HeartPulse,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const RESOURCES = [
  {
    icon: Dumbbell,
    title: "Fitness Coaches",
    description:
      "Optimize training plans, monitor client progress remotely, and build stronger client relationships.",
  },
  {
    icon: Apple,
    title: "Nutritionists",
    description:
      "Create personalized meal plans, track client adherence, and provide ongoing support effortlessly.",
  },
  {
    icon: HeartPulse,
    title: "Wellness Coaches",
    description:
      "Deliver personalized programs, track client goals, and measure the impact of your services.",
  },
  {
    icon: Building2,
    title: "Gyms & Fitness Centers",
    description:
      "Boost client engagement, streamline operations, and gain valuable insights to grow your business.",
  },
];

const AUTO_ADVANCE_MS = 4000;

function ResourceCard({ icon: Icon, title, description, layout }) {
  return (
    <div
      className={`group flex h-full w-full flex-col items-center gap-3 rounded-xl bg-white/[0.04] p-4 text-center ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-white/[0.07] hover:ring-white/20 sm:p-5 ${
        layout === "row"
          ? "sm:flex-row sm:items-start sm:gap-4 sm:text-left lg:p-6"
          : ""
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 sm:h-14 sm:w-14">
        <Icon className="h-5 w-5 text-red-400 sm:h-6 sm:w-6" strokeWidth={1.5} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-base font-medium text-white sm:text-lg">
          {title}
        </span>
        <span className="mt-1 text-sm leading-relaxed text-white/60">
          {description}
        </span>
      </span>
    </div>
  );
}

export default function FeatureSecondSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance the mobile carousel; resets whenever the slide changes,
  // whether that change came from the timer or a manual tap.
  useEffect(() => {
    const id = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % RESOURCES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [activeIndex]);

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + RESOURCES.length) % RESOURCES.length);
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % RESOURCES.length);

  return (
    <div className="relative w-full py-14 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-light leading-tight text-white sm:text-3xl md:text-4xl">
          Designed for Wellness Professionals Like You
        </h2>

        {/* Mobile: one card at a time, auto-advancing */}
        <div className="mt-8 w-full sm:hidden">
          <ResourceCard {...RESOURCES[activeIndex]} layout="col" />

          {/* Prev / dots / next, all together below the card */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {RESOURCES.map((resource, index) => (
                <button
                  key={resource.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to ${resource.title}`}
                  aria-current={index === activeIndex}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-6 bg-red-400"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* sm and up: full grid, cards stretch to match the tallest in each row */}
        <div className="mt-10 hidden w-full grid-cols-2 items-stretch gap-4 sm:grid lg:mt-12 lg:gap-5">
          {RESOURCES.map((resource) => (
            <ResourceCard key={resource.title} {...resource} layout="row" />
          ))}
        </div>
      </div>
    </div>
  );
}