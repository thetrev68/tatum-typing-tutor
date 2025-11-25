import { useEffect, useRef, useState } from 'react';

export const MobileInput = ({ isActive, onInput }) => {
  const inputRef = useRef(null);

  // Detect mobile device once
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
  const [showPrompt, setShowPrompt] = useState(false);

  // Show prompt on mobile devices when game becomes active
  useEffect(() => {
    if (isActive && isMobile) {
      // Use setTimeout to avoid setState in effect
      const timer = setTimeout(() => setShowPrompt(true), 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowPrompt(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isActive, isMobile]);

  const handleTap = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setShowPrompt(false);
    }
  };

  const handleInput = (e) => {
    const char = e.target.value.slice(-1); // Get last character typed
    if (char) {
      // Create a synthetic keyboard event
      onInput({
        key: char,
        preventDefault: () => {},
      });
      // Clear input to allow continuous typing
      e.target.value = '';
    }
  };

  const handleKeyDown = (e) => {
    // Pass through to parent handler
    onInput(e);
    // Prevent default to avoid input value changes
    e.preventDefault();
  };

  const handleBlur = () => {
    // Show prompt again if input loses focus during game
    if (isActive) {
      setShowPrompt(true);
    }
  };

  if (!isActive) return null;

  return (
    <>
      {/* Visible tap area for mobile */}
      {showPrompt && (
        <div
          onClick={handleTap}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          style={{ touchAction: 'none' }}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md text-center animate-bounce">
            <div className="text-6xl mb-4">⌨️</div>
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
              Tap to Start Typing!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              This will open your keyboard
            </p>
          </div>
        </div>
      )}

      {/* The actual input field - now visible but styled to blend in */}
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="fixed bottom-0 left-0 w-full h-12 opacity-0 pointer-events-auto z-40"
        style={{
          fontSize: '16px', // Prevents iOS zoom on focus
        }}
        aria-label="Mobile typing input"
      />
    </>
  );
};
