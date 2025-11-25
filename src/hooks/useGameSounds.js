import { useCallback, useRef } from 'react';

export const useGameSounds = () => {
  // We use a ref to hold the audio context so it persists between renders
  const audioCtxRef = useRef(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume context if suspended (browser autoplay policy)
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playTone = useCallback((freq, type, duration) => {
    initAudio();
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type; 
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Volume envelope (fade out to avoid clicking sound)
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [initAudio]);

  const speakWord = useCallback((text) => {
    // Cancel any current speech so they don't stack up
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8; // Slower for kids
    utterance.pitch = 1.1; // Slightly friendlier/higher pitch
    window.speechSynthesis.speak(utterance);
  }, []);

  // Victory fanfare - ascending triumphant melody
  const playVictory = useCallback(() => {
    initAudio();
    const ctx = audioCtxRef.current;
    const notes = [
      { freq: 523, time: 0, duration: 0.15 },      // C
      { freq: 659, time: 0.15, duration: 0.15 },   // E
      { freq: 784, time: 0.3, duration: 0.15 },    // G
      { freq: 1047, time: 0.45, duration: 0.3 }    // High C (longer)
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      // Volume envelope with attack and release
      gain.gain.setValueAtTime(0, ctx.currentTime + time);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + time + 0.02); // Attack
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration); // Release

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + duration);
    });

    // Add a cheerful "hooray" speech after the melody
    setTimeout(() => {
      speakWord('Hooray! You did it!');
    }, 800);
  }, [initAudio, speakWord]);

  return {
    playSuccess: () => playTone(600, 'sine', 0.2), // High Ding
    playError: () => playTone(150, 'sawtooth', 0.4), // Low Buzz
    playKeyClick: () => playTone(800, 'triangle', 0.05), // Short click
    playVictory, // Victory fanfare for win screen
    speakWord
  };
};