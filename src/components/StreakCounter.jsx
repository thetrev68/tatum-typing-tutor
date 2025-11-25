import React from 'react';

export const StreakCounter = ({ count }) => {
  if (count < 2) return null; // Don't show for 0 or 1, start the hype at 2

  return (
    <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 flex flex-col items-center animate-bounce z-10">
      <div className="text-4xl sm:text-6xl filter drop-shadow-lg">
        {count >= 5 ? '🔥🔥' : '🔥'}
      </div>
      <div className="text-2xl sm:text-4xl font-black text-orange-500 italic tracking-tighter transform -rotate-6 border-text">
        {count} STREAK!
      </div>
    </div>
  );
};