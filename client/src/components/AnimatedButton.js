// client/src/components/AnimatedButton.js
import React from 'react';

const AnimatedButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative px-8 py-3 font-bold text-black group bg-white border border-gray-300 overflow-hidden"
    >
      <span className="absolute inset-0 bg-black transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
      <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
        {text}
      </span>
    </button>
  );
};

export default AnimatedButton;