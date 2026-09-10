import React from "react";
import fmc from "../../assets/brands/fmc.png";
import vmax from "../../assets/brands/vmax.png";

const cards = [
  {
    name: "vmax.fit",
    logo: vmax,
    label: "DIGITAL WELLNESS",
    description:
      "A cutting-edge digital wellness platform by Vmax Healthtech, offering personalized fitness and nutrition solutions tailored to each individual's lifestyle and health goals.",
    url: "https://vmax.fit/",
    lowercase: true,
  },
  {
    name: "fitmomclub",
    logo: fmc,
    label: "WOMEN'S WELLNESS",
    description:
      "A community-driven wellness platform created for women, specializing in prenatal, postnatal, and lifestyle-focused wellness.",
    url: "https://fitmomclub.co/",
    lowercase: true,
  },
];

const brands = ["vmax.fit", "fitmomclub"];

export default function Brands() {
  return (
    <section className="h-[70vh] sm:h-screen w-full bg-[#08090a] text-white flex flex-col px-6 py-8 md:px-16 md:py-19">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-10 flex-wrap">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Our Brands
        </h1>

        <p className="max-w-md text-base leading-relaxed text-gray-100">
          At Vmax Healthtech, we are building innovative digital health and
          fitness platforms. Our brands, FitMom Club and Vmax.fit, are
          designed to empower individuals to achieve their wellness goals
          through technology-driven solutions.
        </p>

        <div className="flex flex-col gap-2.5">
          {brands.map((name) => (
            <span
              key={name}
              className="font-mono text-xs text-red-600 font-bold uppercase tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[3px] mt-8 md:mt-12 w-full md:w-[65%] h-[280px] md:h-[320px] ml-auto">
        {cards.map(({ name, logo, label, description, url, lowercase }) => (
          <div
            key={name}
            className="group relative bg-[#fbb3b3] overflow-hidden transition-colors duration-300 hover:bg-white"
          >
            {/* default state */}
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-7 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
              <img
                src={logo}
                alt={name}
                className="w-20 h-20 md:w-28 md:h-28 object-contain"
              />
              <span
                className={`absolute bottom-6 right-6 md:bottom-7 md:right-7 text-xl md:text-2xl font-bold tracking-tight text-black ${
                  lowercase ? "lowercase" : ""
                } ${name === "vmax.fit" ? "font-mono" : ""}`}
              >
                {name}
              </span>
            </div>

            {/* hover detail state */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex flex-col items-start gap-3">
                <img
                  src={logo}
                  alt={name}
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
                <span className="font-mono text-xs font-bold tracking-wide text-black/70 uppercase">
                  {label}
                </span>
                <p className="text-sm md:text-base leading-relaxed text-black/80 max-w-[90%]">
                  {description}
                </p>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-black underline underline-offset-2"
                  >
                    Visit website ↗
                  </a>
                )}
              </div>

              <span
                className={`self-end text-xl md:text-2xl font-bold tracking-tight text-black ${
                  lowercase ? "lowercase" : ""
                } ${name === "vmax.fit" ? "font-mono" : ""}`}
              >
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}