import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/vmax.png"
import AuroraText from "../Helper/AuroraText";

const HEADLINE_TOP = ["Different", "Needs"];
const HEADLINE_BOTTOM = ["One", "Solution"];

// Stage is designed at a fixed 320px box — small enough to fit inside any
// phone viewport (with px-4 section padding) without needing further
// responsive scaling math. Ring/marker positions are plain pixel values,
// same pattern as the desktop version, just smaller.
const STAGE_SIZE = 320;
const SPHERE_SIZE = 170;

const RINGS = [
  { radius: 68, speed: 6 },
  { radius: 106, speed: -4 },
  { radius: 144, speed: 3 },
];

// Markers: which ring they live on, and their starting offset angle (deg, 0 = top, clockwise).
const MARKERS = [
  { ring: 2, baseAngle: 4 },
  { ring: 1, baseAngle: 300 },
  { ring: 0, baseAngle: 150 },
];

// Small debris particles scattered in a band around each ring. Generated once
// (deterministic, seeded) and rendered as children of the ring's rotating
// div, so they orbit for free along with it.
function makeRingDust(ring, count, seedBase) {
  return Array.from({ length: count }, (_, i) => {
    const seed = seedBase + i * 12.9898;
    const rand1 = Math.abs(Math.sin(seed) * 43758.5453) % 1;
    const rand2 = Math.abs(Math.sin(seed * 1.7 + 3.1) * 24634.634) % 1;
    const rand3 = Math.abs(Math.sin(seed * 2.3 + 7.7) * 91234.12) % 1;
    const angle = rand1 * Math.PI * 2;
    const jitter = (rand2 - 0.5) * 16; // spread around the ring radius
    const r = ring.radius + jitter;
    return {
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      size: 1 + rand3 * 1.8,
      opacity: 0.25 + rand3 * 0.55,
      red: rand2 < 0.16,
    };
  });
}

const RING_DUST = RINGS.map((ring, i) => makeRingDust(ring, 50, i * 91.7 + 5));

function LogoMark({ logoSrc, logoAlt = "Company logo" }) {
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-12 w-12 object-contain select-none pointer-events-none opacity-80"
        draggable={false}
      />
    );
  }
  return (
    <span
      className="font-mono text-[10px] tracking-[0.2em] text-white/80 select-none"
      aria-label={logoAlt}
    >
      VMAX
    </span>
  );
}

export default function AboutUsMobileHero({ logoSrc, logoAlt }) {
  const canvasRef = useRef(null);
  const ringRefs = useRef([]);
  const markerRefs = useRef([]);
  const labelRefs = useRef([]);
  const dustRef = useRef(null);
  const reducedMotion = useRef(false);

  // Sphere orientation — driven by auto-rotation, overridden by touch/drag.
  const rotYRef = useRef(0);
  const rotXRef = useRef(0.35);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const sectionRef = useRef(null);

  // Trigger the entrance sequence once the section actually enters the
  // viewport, rather than immediately on mount.
  useEffect(() => {
    if (prefersReducedMotion) {
      setLoaded(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const entranceDuration = prefersReducedMotion ? "0ms" : "900ms";
  const entranceEase = "cubic-bezier(0.16, 1, 0.3, 1)";

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = SPHERE_SIZE;
    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";
    ctx.scale(DPR, DPR);

    // Build a lat/long point grid rather than a Fibonacci scatter — this is
    // what gives the visible row/column structure across the sphere.
    const points = [];
    const ROWS = 26;
    const DENSITY = 10; // columns per unit of circumference
    for (let row = 0; row <= ROWS; row++) {
      const v = row / ROWS;
      const lat = (v - 0.5) * Math.PI; // -PI/2 .. PI/2
      const y = Math.sin(lat);
      const ringR = Math.cos(lat);
      const cols = Math.max(3, Math.round(ringR * Math.PI * 2 * DENSITY));
      for (let col = 0; col < cols; col++) {
        const theta = (col / cols) * Math.PI * 2;
        const x = Math.cos(theta) * ringR;
        const z = Math.sin(theta) * ringR;
        points.push({ x, y, z });
      }
    }

    const R = SIZE * 0.427; // same proportion as desktop's 128/300
    let lastTs = null;
    let raf;

    function frame(ts) {
      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (!reducedMotion.current && !isDraggingRef.current) {
        rotYRef.current += dt * 0.35;
      }

      ctx.clearRect(0, 0, SIZE, SIZE);

      const cosY = Math.cos(rotYRef.current);
      const sinY = Math.sin(rotYRef.current);
      const cosTiltX = Math.cos(rotXRef.current);
      const sinTiltX = Math.sin(rotXRef.current);

      const projected = [];
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let x = p.x * cosY + p.z * sinY;
        let z = -p.x * sinY + p.z * cosY;
        let y = p.y;
        const ty = y * cosTiltX - z * sinTiltX;
        const tz = y * sinTiltX + z * cosTiltX;
        y = ty;
        z = tz;

        if (z < -0.05) continue;

        const persp = 1 / (1.8 - z * 0.6);
        const px = SIZE / 2 + x * R * persp;
        const py = SIZE / 2 + y * R * persp;
        const depth = (z + 1) / 2;
        projected.push({ px, py, depth });
      }

      projected.sort((a, b) => a.depth - b.depth);

      for (const p of projected) {
        const size = 0.6 + p.depth * 1.5;
        const alpha = 0.2 + p.depth * 0.7;
        ctx.beginPath();
        ctx.fillStyle = `rgba(100,0,0,${alpha})`;
        ctx.arc(p.px, p.py, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    // Touch/drag to spin the sphere manually. Auto-rotation pauses while
    // dragging and resumes smoothly from wherever it's left.
    function handlePointerDown(e) {
      isDraggingRef.current = true;
      setIsDragging(true);
      canvas.setPointerCapture(e.pointerId);
      canvas.dataset.lastX = e.clientX;
      canvas.dataset.lastY = e.clientY;
    }
    function handlePointerMove(e) {
      if (!isDraggingRef.current) return;
      const lastX = parseFloat(canvas.dataset.lastX || e.clientX);
      const lastY = parseFloat(canvas.dataset.lastY || e.clientY);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      canvas.dataset.lastX = e.clientX;
      canvas.dataset.lastY = e.clientY;
      rotYRef.current += dx * 0.009;
      rotXRef.current = Math.min(
        1.3,
        Math.max(-1.3, rotXRef.current - dy * 0.009)
      );
    }
    function handlePointerUp(e) {
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore — pointer may already be released
      }
    }

    canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    let raf;
    let start = null;

    function frame(ts) {
      if (start === null) start = ts;
      const t = (ts - start) / 1000;

      RINGS.forEach((ring, i) => {
        const rotation = reducedMotion.current ? 0 : t * ring.speed;
        const el = ringRefs.current[i];
        if (el) el.style.transform = `rotate(${rotation}deg)`;
      });

      MARKERS.forEach((m, i) => {
        const ring = RINGS[m.ring];
        const rotation = reducedMotion.current ? 0 : t * ring.speed;
        let angle = (m.baseAngle + rotation) % 360;
        if (angle < 0) angle += 360;
        const rad = (angle * Math.PI) / 180;

        const x = Math.sin(rad) * ring.radius;
        const y = -Math.cos(rad) * ring.radius;

        const markerEl = markerRefs.current[i];
        if (markerEl) {
          markerEl.style.transform = `translate(${x}px, ${y}px)`;
        }
        const labelEl = labelRefs.current[i];
        if (labelEl) {
          labelEl.textContent = `${angle.toFixed(1)}°`;
          const radEl = labelEl.nextElementSibling;
          if (radEl) radEl.textContent = `${rad.toFixed(3)} rad`;
        }
      });

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black px-4 py-10"
    >
      {/* Dark curtain that lifts away to reveal the hero — plays alongside
          the content entrance so the section feels like it's being unveiled
          rather than just fading in. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 bg-black transition-transform"
        style={{
          transitionDuration: prefersReducedMotion ? "0ms" : "1050ms",
          transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
          transitionDelay: "0ms",
          transform: loaded ? "translateY(-100%)" : "translateY(0%)",
        }}
      />

      <div
        ref={dustRef}
        className="pointer-events-none absolute inset-0 transition-opacity ease-out"
        style={{
          transitionDuration: entranceDuration,
          transitionDelay: prefersReducedMotion ? "0ms" : "200ms",
          opacity: loaded ? 1 : 0,
        }}
        aria-hidden="true"
      >
        {DUST.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              background: d.red ? "#ff0000" : "rgba(255,0,0,0.4)",
              opacity: d.opacity,
            }}
          />
        ))}
      </div>

      {/* Top headline, sphere, and bottom headline spaced apart with
          justify-between so they pin near the top/bottom edges with the
          stage centered in the remaining space — matches the reference. */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-between gap-6 py-2">
        <h2
          className="relative z-30 text-center text-4xl font-bold uppercase leading-[1.05] tracking-tight text-red-800 transition-all"
          style={{
            transitionDuration: entranceDuration,
            transitionTimingFunction: entranceEase,
            transitionDelay: prefersReducedMotion ? "0ms" : "60ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-1.5rem)",
          }}
        >
          <AuroraText>
            {HEADLINE_TOP.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </AuroraText>
        </h2>

        <div
          className="relative flex shrink-0 items-center justify-center transition-all"
          style={{
            width: STAGE_SIZE,
            height: STAGE_SIZE,
            transitionDuration: prefersReducedMotion ? "0ms" : "1100ms",
            transitionTimingFunction: entranceEase,
            transitionDelay: prefersReducedMotion ? "0ms" : "120ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "scale(1)" : "scale(0.86)",
            filter: loaded ? "blur(0px)" : "blur(6px)",
          }}
        >
          {RINGS.map((ring, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-all"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                left: "50%",
                top: "50%",
                marginLeft: -ring.radius,
                marginTop: -ring.radius,
                transitionDuration: prefersReducedMotion ? "0ms" : "900ms",
                transitionTimingFunction: entranceEase,
                transitionDelay: prefersReducedMotion
                  ? "0ms"
                  : `${260 + i * 130}ms`,
                opacity: loaded ? 1 : 0,
                transform: `scale(${loaded ? 1 : 0.7})`,
              }}
            >
              <div
                ref={(el) => (ringRefs.current[i] = el)}
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px dotted rgba(255,50,60,0.32)",
                  willChange: "transform",
                }}
              >
                {RING_DUST[i].map((d, di) => (
                  <span
                    key={di}
                    className="absolute rounded-full"
                    style={{
                      left: `calc(50% + ${d.x}px)`,
                      top: `calc(50% + ${d.y}px)`,
                      width: d.size,
                      height: d.size,
                      marginLeft: -d.size / 2,
                      marginTop: -d.size / 2,
                      background: d.red ? "#ff0000" : "rgba(235,0,0,0.9)",
                      opacity: d.opacity,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

          {MARKERS.map((m, i) => (
            <div
              key={i}
              ref={(el) => (markerRefs.current[i] = el)}
              className="absolute left-1/2 top-1/2 transition-opacity"
              style={{
                willChange: "transform",
                transitionDuration: prefersReducedMotion ? "0ms" : "700ms",
                transitionTimingFunction: entranceEase,
                transitionDelay: prefersReducedMotion
                  ? "0ms"
                  : `${600 + i * 110}ms`,
                opacity: loaded ? 1 : 0,
              }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <span className="block text-[11px] leading-none text-[#ff0000]">
                  +
                </span>
                <div
                  className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] leading-tight text-red-500 ${
                    m.baseAngle > 90 && m.baseAngle < 270
                      ? "right-3 text-right"
                      : "left-3 text-left"
                  }`}
                >
                  <span
                    ref={(el) => (labelRefs.current[i] = el)}
                    className="block"
                  >
                    0.0°
                  </span>
                  <span className="block text-red-400">0.000 rad</span>
                </div>
              </div>
            </div>
          ))}

          <div
            className="relative z-10 flex items-center justify-center overflow-hidden rounded-full"
            style={{ width: SPHERE_SIZE, height: SPHERE_SIZE }}
          >
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                width: SPHERE_SIZE,
                height: SPHERE_SIZE,
                touchAction: "none",
              }}
            />

            <div
              className="pointer-events-none relative -z-10 flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-sm transition-all"
              style={{
                transitionDuration: prefersReducedMotion ? "0ms" : "700ms",
                transitionTimingFunction: entranceEase,
                transitionDelay: prefersReducedMotion ? "0ms" : "500ms",
                opacity: loaded ? 1 : 0,
                transform: `scale(${loaded ? 1 : 0.6})`,
              }}
            >
              <LogoMark logoSrc={logo} logoAlt={logoAlt} />
            </div>
          </div>
        </div>

        <h2
          className="relative z-30 text-center text-4xl font-bold uppercase leading-[1.05] tracking-tight text-red-800 transition-all"
          style={{
            transitionDuration: entranceDuration,
            transitionTimingFunction: entranceEase,
            transitionDelay: prefersReducedMotion ? "0ms" : "60ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(1.5rem)",
          }}
        >
          <AuroraText>
            {HEADLINE_BOTTOM.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </AuroraText>
        </h2>
      </div>
    </section>
  );
}

const DUST = Array.from({ length: 180 }, (_, i) => {
  const seed = i * 237.5;
  const x = (Math.sin(seed) * 0.5 + 0.5) * 100;
  const y = (Math.cos(seed * 1.3) * 0.5 + 0.5) * 100;
  return {
    x,
    y,
    size: 1 + (i % 3),
    opacity: 0.1 + (i % 5) * 0.07,
    red: i % 6 === 0,
  };
});