import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GrowLine({ className = "" }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 40%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const plusRotate = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <div
      ref={ref}
      className={`relative w-full max-w-[1600px] flex items-center justify-center h-10 ${className}`}
    >
      <motion.div
        style={{ scaleX: lineScale }}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-[#3a3a3a] origin-center"
      />
      <motion.span
        style={{ rotate: plusRotate }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-8 h-8 bg-[#040508] text-[#8a8a8a] text-2xl leading-none"
      >
        +
      </motion.span>
    </div>
  );
}