import React from "react";
import SectionBackdrop from "../components/contact/sectionBackDrop";
import CornerMark from "../components/Helper/cornerMarker";


// Update these links to match your site's routes.
const LINKS = [
  { label: "Start here", text: "Home", href: "/" },
  { label: "Need a hand?", text: "Contact us", href: "/contact" },
  { label: "Customer queries", text: "support@vmaxfit.com", href: "mailto:support@vmaxfit.com?subject=Broken%20link%20on%20website" },
];




export default function NotFound() {
  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "/";
  };

  return (
    <main className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-[#0A0A08] px-6 py-24 sm:px-12 md:px-20">
      <SectionBackdrop />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-24">
        {/* Left: the big 404 */}
        <div>
          <div className="flex items-start gap-3">
            <h1
              className="text-[34vw] font-light leading-[0.85] tracking-tighter text-white sm:text-[200px] md:text-[240px]"
              aria-label="Error 404"
            >
              4
              <span className="text-red-500">0</span>
              4
            </h1>
            <CornerMark className="mt-3 hidden shrink-0 text-white/40 sm:block" />
          </div>
          <p className="mt-8 text-[22px] font-light tracking-tight text-white sm:text-[26px]">
            This page does not exist.
          </p>
          <p className="mt-3 max-w-sm text-[15px] font-light leading-relaxed text-white/60 sm:text-base">
            The link may be broken, or the page may have moved. Check the address, or use one of the options on this page.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href="/"
              className="rounded-[2px] bg-red-500 px-8 py-3.5 text-sm font-light tracking-tight text-white shadow-[0_20px_50px_-20px_rgba(239,68,68,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300"
            >
              Go to home page
            </a>
            <button
              type="button"
              onClick={goBack}
              className="border-b border-white/30 pb-1 text-sm font-light text-white transition-colors hover:border-red-500 focus-visible:border-red-500 focus-visible:outline-none"
            >
              Go back
            </button>
          </div>
        </div>

        {/* Right: where to go instead */}
        <ul className="max-w-sm md:justify-self-end md:w-full">
          {LINKS.map((l) => (
            <li key={l.label} className="border-t border-white/10 py-5 last:border-b">
              <span className="text-[13px] font-light text-white/50">{l.label}</span>
              <a
                href={l.href}
                className="mt-1 block break-words text-[20px] font-light tracking-tight text-white transition-colors duration-300 hover:text-red-400 focus-visible:text-red-400 focus-visible:outline-none"
              >
                {l.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}