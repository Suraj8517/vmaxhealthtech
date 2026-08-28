import React from "react";

export default function AuroraText({
  children,
  className = "",
  colors = ["#FF0000", "#E53935", "#FFFFFF", "#FF0000"],
  speed = 6,
  as: Tag = "span",
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <Tag
      className={`aurora-text ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        lineHeight: 1.2,        // gives the descender room instead of a tight/inherited line-height
        paddingBottom: "0.08em", // small buffer so 'g', 'y', 'p' etc. aren't cut off
        overflow: "visible",     // ensures nothing clips the glyph itself
        animation: `aurora-move ${speed}s ease-in-out infinite`,
      }}
    >
      {children}
      <style>{`
        @keyframes aurora-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-text {
            animation: none !important;
          }
        }
      `}</style>
    </Tag>
  );
}