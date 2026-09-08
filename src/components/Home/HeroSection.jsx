import React from "react";
import SoftAurora from "../Helper/SoftAurora";
import GradientBlinds from '../Helper/GradientBlinds';
import LogoLoader from "../Helper/LogoLoader";
import BlurText from "../Helper/BlurText";


function Hero() {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  
  return (
    <div className="relative sm:h-screen h-[50vh] w-full bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 ">
        <div className="sm:h-screen h-[60vh] " style={{ width: '100%', position: 'relative' }}>
          <GradientBlinds
            gradientColors={['ff0000', 'fc6464']}
            angle={20}
            noise={0.5}
            blindCount={16}
            blindMinWidth={60}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
            color1="#f77e7e"
            color2="#ff2727"
          />
        </div>
      </div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 lg:pt-40 pb-16">
        <div className="max-w-7xl 2xl:max-w-[90vw] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:gap-6 items-start">
            {/* Left: Headline + tags */}
            <div className="lg:col-span-2">
              <div className="flex flex-col items-start">
                <BlurText
                  text="Success,"
                  delay={200}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="font-circular leading-[0.9] tracking-tight text-white text-[15vw] sm:text-[10vw] md:text-[7.5rem] lg:text-[6.5rem] xl:text-[9rem] 2xl:text-[11rem] font-normal"
                />
                <BlurText
                  text="Simplified"
                  delay={200}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="font-circular leading-[0.9] tracking-tight text-white text-[15vw] sm:text-[10vw] md:text-[7.5rem] lg:text-[6.5rem] xl:text-[9rem] 2xl:text-[11rem] font-normal"
                />
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
               {/* <p className="font-sans text-white/90 font-bold text-xl 2xl:text-lg">
                  Unlock Growth & Client Success with <span className="text-[#f71238]">VMax</span>
                </p>*/}
              </div>
            </div>

            {/* Right: Description + CTA */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end mt-4 lg:mt-6 2xl:mt-[18rem] ">
              <p className="text-white text-lg sm:text-xl 2xl:text-xl leading-snug text-left lg:text-left max-w-md 2xl:max-w-lg z-10">
                Empower your wellness business with AI-powered tools to streamline operations, improve client outcomes, and <span className="text-[#f0637a]">accelerate growth.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 lg:h-74 z-[5] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.22) 70%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
}

export default Hero;