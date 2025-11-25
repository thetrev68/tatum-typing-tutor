// useGameSounds.js
import { useCallback } from 'react';

export const useGameSounds = () => {
  const playTone = useCallback((freq, type, duration) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type; // 'sine', 'square', 'sawtooth', 'triangle'
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  }, []);

  return {
    playSuccess: () => playTone(600, 'sine', 0.5), // High pitch "Ding"
    playError: () => playTone(150, 'sawtooth', 0.3), // Low pitch buzz
    playPop: () => playTone(800, 'triangle', 0.1), // Short "Pop" for typing
    speakWord: (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for kids
      window.speechSynthesis.speak(utterance);
    }
  };
};