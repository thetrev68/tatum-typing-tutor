import React from 'react';

export const StreakCounter = ({ count }) => {
  if (count < 2) return null; // Don't show for 0 or 1, start the hype at 2

  return (
    <div className="absolute top-6 right-6 flex flex-col items-center animate-bounce">
      <div className="text-6xl filter drop-shadow-lg">
        {count >= 5 ? '🔥🔥' : '🔥'}
      </div>
      <div className="text-4xl font-black text-orange-500 italic tracking-tighter transform -rotate-6 border-text">
        {count} STREAK!
      </div>
    </div>
  );
};