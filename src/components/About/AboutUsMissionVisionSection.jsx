import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import img1 from "../../assets/img3.webp"
export default function MissionVision() {
  const pinRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // Image width recedes from the right, cards slide in from the right,
  // across the full pin duration (no more bottom-to-top rise stage).
  const imageWidth = useTransform(scrollYProgress, [0, 1], ["100%", "66.6667%"]);
  const cardsX = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  const staticImage = prefersReducedMotion;

  return (
    <div className="w-full bg-black text-neutral-900">
      {/* Scroll-pinned image + stat cards */}
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