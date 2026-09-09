import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "../assets/vmax.png";

/**
 * NOTE ON INTEGRATION
 * This preview reads window.location.pathname instead of react-router-dom's
 * useLocation so it can render standalone in isolation. In your app, restore
 * real routing:
 *
 *   import { NavLink, useLocation } from "react-router-dom";
 *   const { pathname } = useLocation(); // replaces the useState below
 *   // swap each <a href={link.to}> below for <NavLink to={link.to}>,
 *   // keeping the onClick that closes the drawer.
 *
 * Also swap in your real logo asset:
 *   import logo from "../assets/logo.png";
 *
 * NOTE ON FONT
 * "Space Grotesk" is referenced via `font-[Space_Grotesk,sans-serif]` below.
 * Load it once globally (document head <link>, next/font, or your CSS
 * entrypoint) instead of injecting it per-component — the Footer component
 * uses the same face.
 */

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Products", to: "/our-products" },
];

// Trailing-slash-tolerant, case-insensitive match so "/about" vs "/about/"
// (or route casing) doesn't silently break which link is treated as active.
function isActivePath(pathname, to) {
  const clean = (p) => p.replace(/\/+$/, "").toLowerCase() || "/";
  return clean(pathname) === clean(to);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Reflects the real current page, not just the last link clicked — so a
  // hard refresh or landing directly on /about still highlights "About".
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );
  const drawerRef = useRef(null);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] font-[Space_Grotesk,sans-serif] transition-colors duration-[250ms] ease-in-out border-b ${
        scrolled || open
          ? "bg-[#0A0A08] border-[#26261F]"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1180px] items-center justify-between px-4 sm:h-16 sm:px-6 md:h-[68px] md:px-8">
        {/* Wordmark */}
        <a href="/" className="flex shrink-0 items-center gap-2.5 text-[#F1F1EA] no-underline">
          <img src={logo} alt="VMax" className="w-11 sm:w-12 md:w-14" />
        </a>

        {/* Menu trigger (desktop — text label + icon) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="hidden items-center gap-2.5 border-none bg-transparent text-[#F1F1EA] md:flex"
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em]">
            {open ? "Close" : "Menu"}
          </span>
          <span
            className={`grid h-[38px] w-[38px] place-items-center border border-[#26261F] ${
              open ? "text-[#E63A2E]" : "text-[#F1F1EA]"
            }`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </span>
        </button>

        {/* Menu trigger (mobile — icon only, larger tap target) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center border-none bg-transparent text-[#F1F1EA] md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Backdrop — dims the page behind the drawer */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/55 transition-opacity duration-300 ease-in-out ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Full-height drawer — full width on mobile/tablet, quarter width from md up */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 flex h-[100dvh] w-full flex-col border-l border-[#26261F] bg-[#111110] font-[Space_Grotesk,sans-serif] transition-transform duration-[420ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] md:w-1/4 md:min-w-[320px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer top bar — same height as the real nav, holds just the close button */}
        <div className="flex h-14 flex-shrink-0 items-center justify-end border-b border-[#26261F] px-4 sm:h-16 sm:px-6 md:h-[68px] md:px-7">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center border border-[#26261F] bg-transparent text-[#E63A2E] sm:h-[38px] sm:w-[38px]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links — large, bold, uppercase, stacked to fill the height, scrolls if it overflows on short screens */}
        <ul className="m-0 flex flex-1 flex-col overflow-y-auto p-0 list-none">
          {NAV_LINKS.map((link, i) => {
            const isActive = isActivePath(pathname, link.to);
            return (
              <li
                key={link.to}
                className={`min-h-[64px] flex-1 ${
                  i === NAV_LINKS.length - 1 ? "" : "border-b border-[#26261F]"
                }`}
              >
                <a
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className={`relative flex h-full w-full items-center justify-between gap-3 px-5 text-left no-underline transition-[background,color] duration-200 ease-in-out hover:bg-[#8C0F0A] hover:text-[#F1F1EA] sm:px-7 md:px-7 ${
                    isActive ? "bg-[#E63A2E] text-[#0A0A08] hover:bg-[#E63A2E] hover:text-[#0A0A08]" : "bg-transparent text-[#F1F1EA]"
                  }`}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(10px)",
                    transitionProperty: "background-color, color, opacity, transform",
                    transitionDuration: "380ms",
                    transitionDelay: open ? `${100 + i * 70}ms` : "0ms",
                    transitionTimingFunction: "ease",
                  }}
                >
                  <span className="text-[clamp(26px,8vw,42px)] font-bold uppercase leading-none tracking-[-0.01em] sm:text-[clamp(28px,6vw,42px)]">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={24}
                    strokeWidth={2.25}
                    className={`shrink-0 sm:size-[26px] ${isActive ? "opacity-100" : "opacity-35"}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Footer — CTA + contact, pinned to bottom, respects the home-indicator safe area on iOS */}
        <div className="flex flex-shrink-0 flex-col gap-4 border-t border-[#26261F] px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-5 sm:px-7 sm:pb-[26px] sm:pt-[22px]">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] tracking-[0.04em] text-[#6E7066]">
            <span>© {new Date().getFullYear()}</span>
            <span>hello@yourbrand.com</span>
          </div>
        </div>
      </aside>
    </header>
  );
}