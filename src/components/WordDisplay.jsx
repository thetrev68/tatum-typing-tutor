import React from 'react';

export const WordDisplay = ({ word, cursor, isShake }) => {
  return (
    <div className={`flex justify-center text-5xl sm:text-7xl md:text-9xl font-mono font-bold tracking-wide sm:tracking-widest ${isShake ? 'animate-pulse text-red-500' : ''}`}>
      {word.split('').map((char, index) => {
        const isTyped = index < cursor;
        const isCurrent = index === cursor;

        return (
          <span
            key={index}
            className={`
              relative mx-0.5 sm:mx-1 transition-colors duration-100
              ${isTyped ? 'text-green-500' : 'text-gray-300'}
              ${isCurrent ? 'text-orange-600 border-b-4 sm:border-b-8 border-orange-400' : ''}
            `}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};