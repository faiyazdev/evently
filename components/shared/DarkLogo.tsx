// components/shared/DarkLogo.tsx
import React from "react";

const DarkLogo = () => {
  return (
    <svg
      className="hidden dark:block w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 50"
    >
      {/* ICON: Universal Event/Calendar Indicator */}
      <g
        transform="translate(8, 7)"
        fill="none"
        stroke="oklch(0.6724 0.1308 38.7559)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="26" height="26" rx="5" />
        <path d="M22 2v6M8 2v6M2 14h26" />
        {/* Little focal notification indicator */}
        <circle
          cx="20"
          cy="22"
          r="2"
          fill="oklch(0.6724 0.1308 38.7559)"
          stroke="none"
        />
      </g>

      {/* TEXT: Scaled text size with tight tracking spacing */}
      <text
        x="48"
        y="35"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="oklch(0.8074 0.0142 93.0137)"
        letterSpacing="1"
      >
        Evently
      </text>
    </svg>
  );
};

export default DarkLogo;
