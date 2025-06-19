// client/src/components/CrystalText.js
import React from 'react';

export default function CrystalText({ text }) {
  return (
    <h1
      className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text
                 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400
                 shadow-lg transform rotate-[-2deg] tracking-widest
                 text-stroke text-stroke-2 text-stroke-gray-500
                 "
      style={{
        // Custom CSS properties to simulate shine and depth
        WebkitTextStroke: '2px rgba(107, 114, 128, 0.5)', // Tailwind's gray-500 equivalent
        textStroke: '2px rgba(107, 114, 128, 0.5)',
        textShadow: `
          0 0 5px rgba(255,255,255,0.8),    /* Inner glow */
          0 0 10px rgba(255,255,255,0.6),   /* Outer glow */
          2px 2px 3px rgba(0,0,0,0.3),      /* Main shadow for depth */
          -2px -2px 3px rgba(255,255,255,0.2) /* Light highlight for sparkle */
        `,
      }}
    >
      {text}
    </h1>
  );
}