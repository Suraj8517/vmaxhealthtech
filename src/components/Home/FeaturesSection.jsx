import React, { useEffect, useRef } from "react";
import { BookOpen, Settings, UserCog, Globe, ArrowUpRight } from "lucide-react";
import AuroraText from "../Helper/AuroraText";
import HeroSecondSection from "./HeroSecondSection";
import LightTunnel from "../Helper/LightTunnel";
import DotGrid from "../Helper/DotGrid";
import FeatureSecondSection from "./FeatureSecondSection";

const features = [
  {
    icon: BookOpen,
    title: "Al-Powered Insights ",
    description:
      "Make data-driven decisions with personalized recommendations and predictive analytics.",
  },
  {
    icon: Settings,
    title: "Automated Engagement ",
    description:
      "Keep clients motivated with automated reminders, progress reports, and targeted communication.",
  },
  {
    icon: UserCog,
    title: "Effortless Client Management ",
    description:
      "Centralize client data, track progress effortlessly, and streamline communication.",
  },
  {
    icon: Globe,
    title: "Boost Client Retention ",
    description:
      "Foster engagement, build stronger relationships, and drive long-term success for your clients.",
  },
];

export default function FeaturesSection() {
  return (

    // This section is intentionally taller than 100vh so there's room for the
    // sticky background to "hold" while content scrolls over it. Mobile gets
    // extra height since the two columns stack into one long column there.
    <section className="relative bg-[#0D0D0B] min-h-[150vh] sm:min-h-[200vh] xl:min-h-[150vh]">

      {/* Top transition overlay: black -> transparent, spans full screen height */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-5 h-screen"
        style={{
          background:
            "linear-gradient(to bottom, #000 0%, #000 8%, rgba(0,0,0,0.94) 18%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 44%, rgba(0,0,0,0.38) 58%, rgba(0,0,0,0.2) 72%, rgba(0,0,0,0.08) 86%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Bottom transition overlay: black -> transparent, spans full screen height */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-screen"
        style={{
          background:
            "linear-gradient(to top, #000 0%, #000 8%, rgba(0,0,0,0.94) 18%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 44%, rgba(0,0,0,0.38) 58%, rgba(0,0,0,0.2) 72%, rgba(0,0,0,0.08) 86%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <LightTunnel
            cableColor="#ff0000"
            pulseColor="#fa0000"
            tunnelColor="#ff0000"
            tunnelOpacity={0}
            speed={0.1}
            flowDirection="outward"
            pulseSpeed={2}
            pulseLength={0.28}
            pulseBlend={1}
            pulseWidth={1}
            cableCount={20}
            thickness={0.35}
            rimWidth={0.15}
            waviness={0.3}
            sway={0.5}
            size={1}
            centerX={0}
            centerY={0}
            glow={1}
            fadeNear={0.5}
            fadeFar={2}
            brightness={1}
            colorVariance
            grain
            grainIntensity={0.05}
            opacity={1}
            mouseInteraction
            mouseStrength={0.1}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* subtle vignette so text stays readable */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/10 to-black/60" />
      </div>

      <div className="absolute inset-0 z-10 mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-16 pt-8 sm:pt-16 lg:pt-28 lg:grid-cols-2 lg:gap-8">
          {/* Left column */}
          <div className="flex flex-col justify-start">
            <div className="mb-4 sm:mb-6 flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              VMAX HEALTHTECH
            </div>

            <h2 className="text-[28px] leading-[1.1] font-light text-white sm:text-3xl sm:leading-[1.05] md:text-4xl lg:text-5xl">
              Streamline Your{" "}
              <AuroraText
                colors={["#FF0000", "#f99d9d", "#f99d9d", "#FF0000"]}
                speed={9}
              >
                Operations
              </AuroraText>
              <br />
              Elevate Your{" "}
              <AuroraText
                colors={["#FF0000", "#f99d9d", "#f99d9d", "#FF0000"]}
                speed={9}
              >
                Impact
              </AuroraText>
            </h2>

            <div className="mt-6 sm:mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-mono uppercase tracking-wide text-white transition hover:bg-red-500"
              >
                Our Products
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-mono uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Right column - feature list */}
          <div className="flex flex-col justify-center">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="py-3 sm:py-7 first:pt-0 last:pb-0">
                <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-white" strokeWidth={1.5} />
                  <h3 className="text-base sm:text-lg lg:text-2xl font-medium text-white">{title}</h3>
                </div>
                <p className="max-w-xl text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed text-white/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <FeatureSecondSection/>
      </div>
    </section>
  );
}