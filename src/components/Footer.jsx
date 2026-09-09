import { useState } from "react";
import { ArrowUpRight, ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * NOTE ON INTEGRATION
 * Swap the plain <a href> nav links for <NavLink to={...}> from
 * react-router-dom in a routed app, same as the Navbar component.
 * Replace the social hrefs below with your real profile URLs.
 *
 * This version uses Tailwind CSS utility classes instead of styled-jsx.
 * Add the "Space Grotesk" font either via your global stylesheet/font
 * loader or a <link> tag in your document head — it's no longer injected
 * at runtime here.
 */

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Products", to: "/our-products" },
];

const SOCIALS = [
  {
    label: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    href: "https://www.instagram.com/fitmomclub.co/",
  },
  {
    label: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94z" />
      </svg>
    ),
    href: "https://www.facebook.com/Fitmomclub.co",
  },
  {
    label: "YouTube",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.521a2.994 2.994 0 0 0-2.107 2.12A31.29 31.29 0 0 0 0 12a31.29 31.29 0 0 0 .502 5.814 2.994 2.994 0 0 0 2.107 2.12c1.886.521 9.391.521 9.391.521s7.505 0 9.391-.521a2.994 2.994 0 0 0 2.107-2.12A31.29 31.29 0 0 0 24 12a31.29 31.29 0 0 0-.502-5.814zM9.6 15.568V8.432L15.818 12 9.6 15.568z" />
      </svg>
    ),
    href: "https://www.youtube.com/channel/UCD1g7ji_oZieKaeU3vMvoQw",
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    ),
    href: "https://linkedin.com/company/vmax",
  },
];

const EMAIL = "info@vmaxhealthtech.com";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative isolate flex flex-col overflow-hidden bg-[#0A0A08] text-[#F1F1EA] font-[Space_Grotesk,sans-serif] sm:h-[70vh] sm:max-h-[70vh">
      {/* Grain / grit texture overlay */}
      <svg className="absolute h-0 w-0">
        <filter id="vmaxGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] [filter:url(#vmaxGrain)]"
      />

      {/* Hero block — headline + email CTA. */}
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col justify-center border-b border-[#26261F] px-5 py-7 sm:px-16 sm:py-[clamp(12px,3vh,28px)]">
        <div className="mx-auto w-full max-w-[1180px]">
          <span className="mb-1.5 inline-block border-l-[3px] border-[#E63A2E] pl-2.5 text-xs font-semibold tracking-[0.1em] text-[#E63A2E] sm:mb-[clamp(6px,1.5vh,12px)]">
            Let's build something
          </span>

          <h2 className="m-0 max-w-full text-[clamp(28px,9vw,40px)] font-bold uppercase leading-[0.96] tracking-[-0.02em] sm:max-w-[16ch] sm:text-[clamp(24px,4.5vw,56px)]">
            Unlock Growth &amp; Client Success
            <br className="hidden sm:block" />
            with VMax
          </h2>

          <a
            href={`mailto:${EMAIL}`}
            onClick={copyEmail}
            className="mt-7 inline-flex flex-wrap items-center gap-2.5 text-[#F1F1EA] no-underline sm:mt-[clamp(10px,2vh,22px)] sm:gap-3.5"
          >
            <span className="grid h-[38px] w-[38px] flex-shrink-0 place-items-center bg-[#E63A2E] text-[#0A0A08] [clip-path:polygon(0_0,100%_0,100%_70%,82%_100%,0_100%)]">
              <Mail size={16} />
            </span>
            <span className="break-words border-b-2 border-[#26261F] pb-[3px] text-[clamp(14px,1.8vw,18px)] font-semibold">
              {EMAIL}
            </span>
            <ArrowUpRight size={18} className="opacity-60" />
          </a>
          <div className="mt-1.5 h-3.5 text-[11px] text-[#6E7066]">
            {copied ? "Copied to clipboard — paste it anywhere." : "Click to copy the address."}
          </div>
        </div>
      </div>

      {/* Link + social row */}
      <div className="relative z-[1] flex-shrink-0 border-b border-[#26261F]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start gap-4 px-5 py-4.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-16">
          <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2.5 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <a
                  href={link.to}
                  className="text-sm font-bold uppercase text-[#F1F1EA] no-underline transition-colors duration-150 ease-out hover:text-[#E63A2E] sm:text-[13px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid h-[38px] w-[38px] place-items-center border border-[#26261F] text-[#F1F1EA] transition-colors duration-150 ease-out hover:border-[#E63A2E] hover:bg-[#E63A2E] hover:text-[#0A0A08] sm:h-8 sm:w-8"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[1] mx-auto flex w-full max-w-[1180px] flex-shrink-0 flex-col-reverse items-start gap-3 px-5 py-4 pb-5 [padding-bottom:calc(env(safe-area-inset-bottom,0px)+20px)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-16 sm:pb-3 sm:[padding-bottom:12px]">
        <span className="text-[11px] tracking-[0.04em] text-[#6E7066]">
          © {new Date().getFullYear()} VMax Healthtech
        </span>


        <div className="flex w-full items-center justify-between gap-5 sm:w-auto">
            <Link to="/refund-policy" className="text-xs text-[#6E7066] no-underline">
            Refund Policy
          </Link>
          <Link to="/privacy-policy" className="text-xs text-[#6E7066] no-underline">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="text-xs text-[#6E7066] no-underline">
            Terms & Conditions
          </Link>
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 border border-[#26261F] bg-transparent px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#F1F1EA] transition-colors duration-150 ease-out hover:border-[#E63A2E] hover:text-[#E63A2E] sm:px-3 sm:py-1.5"
          >
            Top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}