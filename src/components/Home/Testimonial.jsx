import React from "react";

function Testimonial() {
  return (
    <section className="relative w-full bg-black overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="relative z-10 mx-6 sm:mx-10 lg:mx-16">
        {/* Heading */}
        <h2 className="text-center font-sans font-extrabold uppercase leading-[1.05] text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-14 sm:mb-20">
          <span className="block text-white">Join thousands of teams</span>
          <span className="block text-[#ff2727]">who already use VMax</span>
        </h2>

        {/* Content row */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image with custom crop */}
          <div className="relative w-full max-w-sm lg:max-w-md flex-shrink-0">
            <div className="relative aspect-[4/5] w-full">
              <img
                src="https://picsum.photos/seed/vmax-fitness/800/1000"
                alt="Vinothini, Product Manager at FitMom Club"
                className="w-full h-full object-cover"
                style={{
                  clipPath:
                    "polygon(0 0, 70% 0, 70% 28%, 100% 28%, 100% 100%, 0 100%)",
                }}
              />
              {/* Concave scoop overlay bottom-left, matches page bg */}
              <div className="absolute bottom-0 left-0 w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-tr-[100%]" />
              {/* subtle red edge glow to tie into theme */}
              <div
                className="absolute inset-0 pointer-events-none ring-1 ring-[#ff2727]/20"
                style={{
                  clipPath:
                    "polygon(0 0, 70% 0, 70% 28%, 100% 28%, 100% 100%, 0 100%)",
                }}
              />
            </div>
          </div>

          {/* Quote column */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Quote icon */}
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ff2727] mb-6">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.4 0C2.9 0.9 0 4 0 7.7 0 10.1 1.7 12 4.1 12c2 0 3.5-1.6 3.5-3.5 0-1.8-1.3-3.2-3-3.4C5 3.5 6.6 2 8.7 1.4L6.4 0zM14.1 0c-3.5.9-6.4 4-6.4 7.7 0 2.4 1.7 4.3 4.1 4.3 2 0 3.5-1.6 3.5-3.5 0-1.8-1.3-3.2-3-3.4C12.7 3.5 14.3 2 16.4 1.4L14.1 0z"
                  fill="white"
                />
              </svg>
            </span>

            <p className="text-white font-sans font-bold uppercase text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-wide max-w-2xl">
              The detailed client profiles in the{" "}
              <span className="text-[#ff2727]">CRM</span> enables me to
              tailor fitness and nutrition plans with precision. By having
              access to comprehensive data, including past workouts, dietary
              preferences, and progress metrics, I can create personalized
              experiences that drive better results and higher client
              satisfaction.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-6">
              <div>
                <p className="text-[#ff2727] font-bold text-base sm:text-lg">
                  Vinothini
                </p>
                <p className="text-white/60 text-sm sm:text-base">
                  Vinothin | Product Manager | FitMom Club
                </p>
              </div>

              {/* Logo mark */}
              <div className="flex items-center gap-2">
                <span className="text-white font-black text-2xl tracking-tight">
                  Fit<span className="text-[#ff2727]">Mom</span> Club
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;