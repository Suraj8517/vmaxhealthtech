import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

const MAX_DOTS = 2000; // hard safety ceiling regardless of container size

export default function DotGrid({
  cellSize = 80,
  dotSize = 4,
  activeSize = 26,
  hoverRadius = 180,
  ambientCount = 2,
  ambientInterval = 2000,
  dotColor = "rgba(255,255,255,0.22)",
  activeColor = "#ef4444",
  glow = "0 0 14px rgba(239,68,68,0.85), 0 0 4px rgba(239,68,68,0.9)",
  className = "",
}) {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });
  const [ambientActive, setAmbientActive] = useState(() => new Set());
  const [hoverActive, setHoverActive] = useState(() => new Map());
  const isHoveringRef = useRef(false);
  const rafRef = useRef(null);
  const gridRef = useRef(grid); // avoid stale closures without re-subscribing effects
  gridRef.current = grid;

  // Measure container and compute how many dots fit — with sane bounds
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let frame = null;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();

      // Bail on invalid/zero measurements (common during initial layout)
      if (!width || !height || !Number.isFinite(width) || !Number.isFinite(height)) {
        return;
      }

      let cols = Math.max(1, Math.floor(width / cellSize));
      let rows = Math.max(1, Math.floor(height / cellSize));

      // Hard ceiling: never render more than MAX_DOTS, shrink rows if needed
      if (cols * rows > MAX_DOTS) {
        rows = Math.max(1, Math.floor(MAX_DOTS / cols));
      }

      setGrid((prev) =>
        prev.cols === cols && prev.rows === rows ? prev : { cols, rows }
      );
    };

    // Debounce via rAF so rapid ResizeObserver callbacks don't thrash state
    const scheduleMeasure = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cellSize]);

  // Ambient random highlight cycle — only runs while not hovering
  useEffect(() => {
    const total = grid.cols * grid.rows;
    if (total === 0) return;

    const tick = () => {
      if (isHoveringRef.current) return;
      const count = Math.min(ambientCount, total);
      const picked = new Set();
      while (picked.size < count) {
        picked.add(Math.floor(Math.random() * total));
      }
      setAmbientActive(picked);
    };

    tick();
    const id = setInterval(tick, ambientInterval);
    return () => clearInterval(id);
  }, [grid.cols, grid.rows, ambientCount, ambientInterval]);

  // Cursor spotlight — rAF-throttled distance calc per dot
  const handleMouseMove = useCallback(
    (e) => {
      const el = containerRef.current;
      const { cols, rows } = gridRef.current;
      if (!el || cols === 0) return;
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const next = new Map();
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = c * cellSize + cellSize / 2;
            const cy = r * cellSize + cellSize / 2;
            const dist = Math.hypot(mx - cx, my - cy);
            if (dist < hoverRadius) {
              next.set(r * cols + c, 1 - dist / hoverRadius);
            }
          }
        }
        setHoverActive(next);
      });
    },
    [cellSize, hoverRadius]
  );

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    setHoverActive(new Map());
  };

  const dots = useMemo(() => {
    const list = [];
    for (let r = 0; r < grid.rows; r++) {
      for (let c = 0; c < grid.cols; c++) {
        const id = r * grid.cols + c;
        const hoverIntensity = hoverActive.get(id) ?? 0;
        const isAmbient = ambientActive.has(id) && hoverActive.size === 0;
        const active = hoverIntensity > 0 || isAmbient;

        const size = active
          ? dotSize + (activeSize - dotSize) * (hoverIntensity > 0 ? hoverIntensity : 1)
          : dotSize;

        list.push(
          <div
            key={id}
            style={{
              position: "absolute",
              left: c * cellSize,
              top: r * cellSize,
              width: cellSize,
              height: cellSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                width: size,
                height: size,
                borderRadius: active ? 4 : 999,
                background: active ? activeColor : dotColor,
                boxShadow: active ? glow : "none",
                transition:
                  "width 350ms ease, height 350ms ease, border-radius 350ms ease, background 350ms ease, box-shadow 350ms ease",
              }}
            />
          </div>
        );
      }
    }
    return list;
  }, [
    grid.cols,
    grid.rows,
    hoverActive,
    ambientActive,
    cellSize,
    dotSize,
    activeSize,
    dotColor,
    activeColor,
    glow,
  ]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full hidden md:block overflow-hidden ${className}`}
    >
      {dots}
    </div>
  );
}