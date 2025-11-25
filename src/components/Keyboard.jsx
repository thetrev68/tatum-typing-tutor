import React from 'react';

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export const Keyboard = ({ targetKey }) => {
  return (
    <div className="flex flex-col gap-2 select-none">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((char) => {
            // Check if this key is the one needed next
            const isTarget = char === targetKey?.toLowerCase();
            
            return (
              <div
                key={char}
                className={`
                  w-12 h-12 md:w-16 md:h-16 flex items-center justify-center 
                  rounded-lg text-2xl font-bold uppercase shadow-md transition-all
                  ${isTarget 
                    ? 'bg-yellow-400 text-yellow-900 border-b-4 border-yellow-600 translate-y-1' 
                    : 'bg-slate-200 text-slate-500 border-b-4 border-slate-300'
                  }
                `}
              >
                {char}
              </div>
            );
          })}
        </div>
      ))}
      
      {/* Space Bar (Optional, mostly for visual balance) */}
      <div className="flex justify-center mt-1">
        <div className="w-64 h-12 rounded-lg bg-slate-200 border-b-4 border-slate-300"></div>
      </div>
    </div>
  );
};