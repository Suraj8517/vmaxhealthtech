import React from "react";
import { motion } from "framer-motion";
import AuroraText from "../Helper/AuroraText";

const display = "font-[500] uppercase leading-[0.8] tracking-[-0.06em]";
const fontFamily = "Robert Regular";

const lineVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function AboutHero() {
  return (
    <section className="bg-black min-h-[90dvh]">
      <div className="relative w-full text-[#d9d9d9] flex flex-col overflow-hidden">
        <div className="min-h-[90dvh] flex flex-col justify-center items-center py-20 sm:py-28 lg:py-36 px-6 sm:px-8">

          {/* ---------- HERO TEXT ---------- */}
          <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 w-full max-w-[1600px]">
            <div className="col-span-12 md:col-span-11 md:col-start-2 overflow-hidden">
              <motion.h2
                custom={0}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={`${display} text-[13vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[150px] whitespace-nowrap`}
                style={{ fontFamily }}
              >
                Different
              </motion.h2>
            </div>

            <div className="col-span-12 md:col-span-8 md:col-start-4 overflow-hidden mt-1 md:mt-0">
              <motion.h2
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={`${display} text-center md:text-left text-[13vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[150px] whitespace-nowrap`}
                style={{ fontFamily }}
              >
                Needs. One
              </motion.h2>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7 overflow-hidden mt-1 md:mt-0">
              <motion.h2
                custom={2}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={`${display} text-right md:text-left text-[13vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[150px] whitespace-nowrap text-white`}
                style={{ fontFamily }}
              >
                Solution.
              </motion.h2>
            </div>

            <div className="relative col-span-12 lg:col-span-8 lg:col-start-3 max-w-[30rem] mt-18 lg:mt-10 mx-auto lg:mx-0 text-center lg:text-left">
              <motion.span
                custom={3}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block uppercase text-[11px] sm:text-[16px] font-light tracking-wider leading-snug text-white lg:absolute lg:-translate-y-full"
                style={{ fontFamily }}
              >
                    Welcome to <AuroraText>VMax Health Tech</AuroraText>, where innovation
                          meets wellness. Founded in 2022 by a dedicated group of fitness
                          enthusiasts, we are passionate about revolutionizing the health and
                          wellness industry through cutting-edge technology.
              </motion.span>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}