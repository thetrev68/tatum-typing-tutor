import { useState, useEffect, useCallback } from 'react';

export const useTypingEngine = (targetWord, onCorrect, onError, onComplete) => {
  const [cursor, setCursor] = useState(0);
  const [isShake, setIsShake] = useState(false);

  // Reset cursor when word changes
  useEffect(() => {
    setCursor(0);
    setIsShake(false);
  }, [targetWord]);

  const handleKeyDown = useCallback((e) => {
    // Ignore non-character keys (shift, ctrl, etc)
    if (e.key.length > 1) return;

    // Prevent typing if already done
    if (cursor >= targetWord.length) return;

    const targetChar = targetWord[cursor].toLowerCase();
    const typedChar = e.key.toLowerCase();

    if (typedChar === targetChar) {
      // Correct!
      onCorrect();
      const nextCursor = cursor + 1;
      setCursor(nextCursor);
      
      if (nextCursor === targetWord.length) {
        onComplete();
      }
    } else {
      // Wrong!
      onError();
      setIsShake(true);
      setTimeout(() => setIsShake(false), 300);
    }
  }, [cursor, targetWord, onCorrect, onError, onComplete]);

  // Attach listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { cursor, isShake };
};