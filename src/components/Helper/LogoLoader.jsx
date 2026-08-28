import { useEffect, useState } from "react";
import "../Helper/css/LogoLoader.css";

export default function LogoLoader({onComplete}) {
  const [visible, setVisible] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExit(true), 2050);
    const removeTimer = setTimeout(() => {setVisible(false);onComplete?.();}, 2650);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`logo-loader ${exit ? "logo-loader--exit" : ""}`}>
    

     



      <div className="logo-loader__content">
        <svg
          className="logo-svg"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Loading"
        >
          <defs>
            {/* Left stroke: dark top-left -> bright bottom-right */}
            <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C1216" />
              <stop offset="50%" stopColor="#C81E20" />
              <stop offset="100%" stopColor="#F51E27" />
            </linearGradient>

            {/* Right stroke: mirrored -> bright top-right, dark bottom-left */}
            <linearGradient id="rightGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C1216" />
              <stop offset="50%" stopColor="#C81E20" />
              <stop offset="100%" stopColor="#F51E27" />
            </linearGradient>
          </defs>

          {/* =====================================================
              MAIN "M" — split into left/right halves so the
              gradient meets at a natural center seam
          ====================================================== */}

          <polygon
            className="logo-shape logo-main-left"
            points="0,166 74,171 256,380 256,262 133,113"
            fill="url(#leftGradient)"
          />

          <polygon
            className="logo-shape logo-main-right"
            points="512,166 438,171 256,380 256,262 379,113"
            fill="url(#rightGradient)"
          />

          {/* Subtle center seam for a dimensional, folded look */}
          <polygon
            className="logo-seam"
            points="256,262 264,300 256,380 248,300"
            fill="#5A0C10"
            fillOpacity="0.4"
          />

          {/* =====================================================
              LEFT / RIGHT WING TIPS
          ====================================================== */}

          <polygon
            className="logo-shape logo-left-wing"
            points="120,272 36,416 131,416 179,342"
            fill="url(#leftGradient)"
          />

          <polygon
            className="logo-shape logo-right-wing"
            points="392,272 476,416 381,416 333,342"
            fill="url(#rightGradient)"
          />
        </svg>
      </div>

      
    </div>
  );
}