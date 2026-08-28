import React, { useEffect, useState } from "react";
import AboutUsDesktopHero from "./AboutUsDesktopHero";
import AboutUsMobileHero from "./AboutUsMobileHero";

const DESKTOP_QUERY = "(min-width: 1024px)";

export default function AboutUsHero(props) {
  // Initialize synchronously when possible so there's no flash of the wrong
  // variant on first paint (fine for a client-rendered app; if this is
  // server-rendered, consider gating the initial render until mounted).
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(DESKTOP_QUERY).matches : true
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (e) => setIsDesktop(e.matches);
    // Keep in sync if the viewport crosses the breakpoint (resize, rotate,
    // devtools). Only one variant is ever mounted at a time, so switching
    // cleanly unmounts one animation loop/canvas and mounts the other.
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
      return () => mql.removeEventListener("change", handleChange);
    }
    // Safari < 14 fallback
    mql.addListener(handleChange);
    return () => mql.removeListener(handleChange);
  }, []);

  return isDesktop ? (
    <AboutUsDesktopHero {...props} />
  ) : (
    <AboutUsMobileHero {...props} />
  );
}