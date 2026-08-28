import React, { useEffect, useRef } from "react";
import "../Helper/css/LogoLoader.css";

// Reusable logo mark. `id` must be unique per instance since gradient
// ids can't collide when multiple copies are inlined in the same DOM.
function LogoMark({ id, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`leftGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C1216" />
          <stop offset="50%" stopColor="#C81E20" />
          <stop offset="100%" stopColor="#F51E27" />
        </linearGradient>
        <linearGradient id={`rightGradient-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C1216" />
          <stop offset="50%" stopColor="#C81E20" />
          <stop offset="100%" stopColor="#F51E27" />
        </linearGradient>
      </defs>

      <polygon points="0,166 74,171 256,380 256,262 133,113" fill={`url(#leftGradient-${id})`} />
      <polygon points="512,166 438,171 256,380 256,262 379,113" fill={`url(#rightGradient-${id})`} />
      <polygon points="256,262 264,300 256,380 248,300" fill="#5A0C10" fillOpacity="0.4" />
      <polygon points="120,272 36,416 131,416 179,342" fill={`url(#leftGradient-${id})`} />
      <polygon points="392,272 476,416 381,416 333,342" fill={`url(#rightGradient-${id})`} />
    </svg>
  );
}

// Smaller copies scattered around the edges, each with its own
// size/position/drift-timing so the motion doesn't feel synchronized.
const SATELLITES = [
  { top: "12%", left: "8%", size: 70, delay: "0s", duration: "7s", rotate: "-18deg", opacity: 0.16 },
  { top: "72%", left: "6%", size: 46, delay: "1.2s", duration: "9s", rotate: "12deg", opacity: 0.12 },
  { top: "20%", left: "88%", size: 58, delay: "0.6s", duration: "8s", rotate: "10deg", opacity: 0.14 },
  { top: "78%", left: "90%", size: 80, delay: "1.8s", duration: "10s", rotate: "-8deg", opacity: 0.18 },
  { top: "48%", left: "3%", size: 34, delay: "2.4s", duration: "6.5s", rotate: "20deg", opacity: 0.1 },
  { top: "6%", left: "48%", size: 40, delay: "0.9s", duration: "7.5s", rotate: "-14deg", opacity: 0.12 },
  { top: "90%", left: "50%", size: 50, delay: "1.5s", duration: "8.5s", rotate: "16deg", opacity: 0.13 },
  { top: "40%", left: "94%", size: 38, delay: "2s", duration: "9.5s", rotate: "-10deg", opacity: 0.11 },
];

export default function LogoBackground() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (parallaxRef.current) {
        parallaxRef.current.style.setProperty("--parallax-x", `${x * 14}px`);
        parallaxRef.current.style.setProperty("--parallax-y", `${y * 14}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-logo-scene">
      {/* faint tech grid, fading toward the edges */}
      <div className="bg-logo-grid" />

      {/* ambient breathing glow behind everything */}
      <div className="bg-logo-glow" />

      {/* diagonal shimmer sweep for a "catchy" touch */}
      <div className="bg-logo-shimmer" />

      {/* satellite logos drifting around the edges */}
      {SATELLITES.map((s, i) => (
        <div
          key={i}
          className="bg-logo-satellite"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            "--rot": s.rotate,
            "--op": s.opacity,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        >
          <LogoMark id={`sat-${i}`} className="bg-logo-satellite__svg" />
        </div>
      ))}

      {/* central mouse-parallax cluster: rings + hero logo */}
      <div className="bg-logo-center" ref={parallaxRef}>
        <div className="bg-logo-ring bg-logo-ring--outer" />
        <div className="bg-logo-ring bg-logo-ring--inner" />
        <LogoMark id="hero" className="bg-logo-hero" />
      </div>

      {/* keeps edges dark so foreground text stays readable */}
      <div className="bg-logo-vignette" />
    </div>
  );
}