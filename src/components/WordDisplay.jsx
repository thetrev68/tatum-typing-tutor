import React from 'react';

export const WordDisplay = ({ word, cursor, isShake }) => {
  return (
    <div className={`flex justify-center text-9xl font-mono font-bold tracking-widest ${isShake ? 'animate-pulse text-red-500' : ''}`}>
      {word.split('').map((char, index) => {
        const isTyped = index < cursor;
        const isCurrent = index === cursor;
        
        return (
          <span 
            key={index}
            className={`
              relative mx-1 transition-colors duration-100
              ${isTyped ? 'text-green-500' : 'text-gray-300'}
              ${isCurrent ? 'text-sky-600 border-b-8 border-sky-400' : ''}
            `}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};