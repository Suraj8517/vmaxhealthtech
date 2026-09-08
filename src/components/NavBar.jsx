import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/vmax.png"
/**
 * NOTE ON INTEGRATION
 * This preview swaps react-router-dom's <NavLink> for local click-state so it
 * can render standalone. In your app, restore routing like this:
 *
 *   import { NavLink, useLocation } from "react-router-dom";
 *   const { pathname } = useLocation();
 *   const activeIndex = NAV_LINKS.findIndex((l) => l.to === pathname);
 *   // ...and swap the onClick handlers below for <NavLink to={link.to}>.
 */

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Products", to: "/our-products" },
];

const COLORS = {
  paper: "#14150F",
  ink: "#F1F1EA",
  inkSoft: "#8E9184",
  accent: "#E63A2E",
  accentText: "#FDFDFB",
  line: "#2A2C24",
  overlay: "#0F100C",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const linkRefs = useRef([]);
  const navRef = useRef(null);

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

  // Load the display typeface once.
  useEffect(() => {
    if (document.getElementById("nl-font")) return;
    const link = document.createElement("link");
    link.id = "nl-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  const measure = () => {
    const el = linkRefs.current[activeIndex];
    const nav = navRef.current;
    if (!el || !nav) return;
    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    setIndicator({ left: elRect.left - navRect.left, width: elRect.width });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        fontFamily: "'Space Grotesk', sans-serif",
        background: scrolled ? COLORS.paper : "transparent",
        borderBottom: `1px solid ${scrolled ? COLORS.line : "transparent"}`,
        transition: "background 250ms ease, border-color 250ms ease",
      }}
    >
      <nav
        className="mx-auto flex items-center justify-between px-5 sm:px-8"
        style={{ maxWidth: "1180px", height: "68px" }}
      >
        {/* Wordmark */}
        <a
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          style={{ color: COLORS.ink, textDecoration: "none" }}
        >
          <img src={logo} className="w-12"/> 
          <span className="hidden sm:flex" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em" }}>
            VMax Healthtech
          </span>
        </a>

        {/* Desktop links with sliding indicator */}
        <div
          ref={navRef}
          className="hidden md:flex items-center relative"
          style={{ gap: "4px" }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: indicator.left,
              width: indicator.width,
              background: COLORS.accent,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)",
              borderRadius: "3px",
              transition: "left 280ms cubic-bezier(0.65,0,0.35,1), width 280ms cubic-bezier(0.65,0,0.35,1)",
              zIndex: 0,
            }}
          />
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.to}
              ref={(el) => (linkRefs.current[i] = el)}
              onClick={() => setActiveIndex(i)}
              style={{
                position: "relative",
                zIndex: 1,
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: activeIndex === i ? COLORS.accentText : COLORS.ink,
                transition: "color 150ms ease",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="/our-products"
          className="hidden md:inline-block"
          style={{
            background: COLORS.ink,
            color: COLORS.paper,
            fontSize: "14px",
            fontWeight: 600,
            padding: "10px 20px",
            textDecoration: "none",
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%)",
          }}
        >
          Get started
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            color: COLORS.ink,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          top: "68px",
          background: COLORS.overlay,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity 220ms ease, transform 220ms ease, visibility 220ms",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <ul className="px-6 pt-8" style={{ listStyle: "none", margin: 0 }}>
          {NAV_LINKS.map((link, i) => (
            <li key={link.to}>
              <button
                onClick={() => {
                  setActiveIndex(i);
                  setOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid #2A2C24`,
                  padding: "18px 0",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: activeIndex === i ? COLORS.accent : COLORS.paper,
                  cursor: "pointer",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 320ms ease ${open ? 80 + i * 60 : 0}ms, transform 320ms ease ${
                    open ? 80 + i * 60 : 0
                  }ms`,
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="px-6 pt-6">
          <a
            href="/our-products"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              textAlign: "center",
              background: COLORS.accent,
              color: COLORS.accentText,
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px",
              textDecoration: "none",
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 96% 100%, 0 100%)",
            }}
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}