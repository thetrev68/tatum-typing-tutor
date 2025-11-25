import { useEffect, useRef } from 'react';

export const MobileInput = ({ isActive, onInput }) => {
  const inputRef = useRef(null);

  // Auto-focus when game starts
  useEffect(() => {
    if (isActive && inputRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isActive]);

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

  if (!isActive) return null;

  return (
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
      className="absolute opacity-0 pointer-events-auto"
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
      }}
      aria-hidden="true"
    />
  );
};
