import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../../assets/img1.webp";
import img2 from "../../assets/img2.webp";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";
import AuroraText from "../Helper/AuroraText";
import DotGrid from "../Helper/DotGrid";
gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Personalized Recommendations",
    heading: "A plan built entirely around you.",
    description:
      "Forget generic workout and diet plans. Our AI analyzes your individual data — health goals, fitness level, dietary preferences, even wearable tech integrations — to build a truly personalized plan, while saving your team valuable time on assessments and program creation so you can focus on delivering exceptional guidance.",
    image: img1,
  },
  {
    title: "Smart Insights & Tracking",
    heading: "See progress the moment it happens.",
    description:
      "Understand your progress with AI-powered insights that track activity, nutrition, and other key metrics with ease, and get personalized nudges to stay motivated. Behind the scenes, powerful analytics let you monitor client progress, spot trends, and optimize your services for maximum impact.",
    image: img2,
  },
  {
    title: "Enhanced Efficiency & Engagement",
    heading: "Less admin, more momentum.",
    description:
      "Spend less time planning and more time on what matters — our AI streamlines the entire health journey into one user-friendly platform. On the business side, automated reminders, personalized communication, and gamified challenges keep clients engaged while your operations run themselves.",
    image: img3,
  },
  {
    title: "Time and Money Saved",
    heading: "Real results, faster.",
    description:
      "Reach your health goals faster with a personalized roadmap and dedicated support, without the wasted time and effort. For businesses, it means less administrative burden, smarter resource allocation, and stronger client retention — real time and cost savings you can see.",
    image: img4,
  },
];

function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        sectionRefs.current.forEach((el, i) => {
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-b from-black to-[#0D0D0B] text-white ">
      <div className="mt-44 h-0  sm:h-[320px] w-full hidden md:block">
        <DotGrid />
      </div>

      {/* Header block */}
      <div className="w-full px-6 sm:px-10 lg:px-12 mb-10 lg:mb-28">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[#ff2727] text-xs tracking-[0.2em] font-mono uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2727]" />
            Why VMax
          </span>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
            <h1 className=" text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight lg:max-w-2xl">
              Harnessing the Power of AI for
              <br />
              <AuroraText>Your Health &amp; Wellness Journey</AuroraText>
            </h1>

            <div className="lg:max-w-sm lg:pb-2 lg:border-l lg:border-white/10 lg:pl-8">
              <p className="text-white/50 text-base sm:text-lg leading-relaxed">
                At VMax Health Tech, we believe in leveraging the power of
                technology to empower both wellness businesses and their
                clients. That's why we've seamlessly integrated artificial
                intelligence into our platform, revolutionizing the way you
                approach health and wellness.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          <div className="hidden lg:flex lg:w-2/5 lg:sticky lg:top-0 lg:h-screen flex-col justify-start pt-60">
            <div className="flex flex-col gap-4">
              {sections.map((s, i) => (
                <h3
                  key={s.title}
                  className={` leading-[1.1] tracking-tight text-3xl xl:text-4xl transition-all duration-500 ease-out ${
                    activeIndex === i ? "text-white" : "text-white/20"
                  }`}
                >
                  {s.title}
                </h3>
              ))}
            </div>
          </div>

         

          {/* RIGHT — scrolling content blocks */}
          <div className="lg:w-3/5 flex flex-col gap-20 sm:gap-24 lg:gap-32 py-10 lg:py-32">
            {sections.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => (sectionRefs.current[i] = el)}
                className="flex flex-col gap-6"
              >
                {/* Title shown per-block on mobile since the pinned list is hidden */}
                <h4 className="lg:hidden text-2xl sm:text-3xl font-circular text-[#ff2727]">
                  {s.title}
                </h4>

                {/* Visual card with image */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Red/black gradient overlay for legibility + theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                  <div
                    className="absolute inset-0 opacity-50 mix-blend-multiply"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 0%, rgba(255,39,39,0.55), transparent 60%)",
                    }}
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-circular text-white">{s.heading}</h3>

                <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;