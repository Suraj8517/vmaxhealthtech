import React, { useEffect, useRef, useState } from "react";

function CTA() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // only animate once
        }
      },
      { threshold: 0.3 } // trigger when 30% of section is visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const line1 = "Ready to Transform Your";
  const line2 = "Wellness Business?";

  const renderLetters = (text, lineOffset) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transitionDelay: `${(lineOffset + i) * 25}ms`,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
    >
      <div className="relative z-10 mx-6 sm:mx-10 lg:mx-16 py-16 sm:py-18 lg:py-24 flex flex-col items-center text-center rounded-3xl">
        <span className="inline-flex items-center gap-2 text-[#ff2727] text-xs tracking-[0.2em] font-mono uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2727]" />
          Get Started
        </span>

        <h2 className="font-zentry leading-[1.05] text-white text-4xl sm:text-6xl lg:text-7xl xl:text-9xl font-normal">
          <span className="block">{renderLetters(line1, 0)}</span>
          <span className="block">{renderLetters(line2, line1.length)}</span>
        </h2>

        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#ff2727] text-white font-medium text-base sm:text-lg hover:bg-[#e01f1f] transition-colors duration-300">
            Get Started Free
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-medium text-base sm:text-lg hover:border-white/40 hover:bg-white/5 transition-colors duration-300">
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;