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
    try {
      initAudio();
      const ctx = audioCtxRef.current;

      // Extra resume for mobile browsers
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

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
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [initAudio]);

  const speakWord = useCallback((text) => {
    // Cancel any current speech so they don't stack up
    window.speechSynthesis.cancel();

    // Pronunciation helper - provide phonetic alternatives for words that are often mispronounced
    const pronunciationMap = {
      "TATUM'S Typing Adventure": "Tay-tums Typing Adventure",
      "TATUM'S": "Tay-tum's"
    };

    // Use phonetic version if available, otherwise use original text
    const spokenText = pronunciationMap[text] || text;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 0.8; // Slower for kids
    utterance.pitch = 1.2; // Higher pitch for friendlier voice
    utterance.volume = 1.0; // Full volume

    // Try to select a child-friendly voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Prefer female voices or higher-pitched voices (better for kids)
      const preferredVoice = voices.find(voice =>
        voice.name.includes('Female') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Google US English')
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  // Victory fanfare - upbeat celebratory melody
  const playVictory = useCallback(() => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;

      // Resume if suspended
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Extended victory melody - "Ta-da!" fanfare
      const melody = [
        { freq: 523, time: 0, duration: 0.12 },       // C
        { freq: 659, time: 0.12, duration: 0.12 },    // E
        { freq: 784, time: 0.24, duration: 0.12 },    // G
        { freq: 1047, time: 0.36, duration: 0.25 },   // High C
        { freq: 784, time: 0.65, duration: 0.12 },    // G
        { freq: 1047, time: 0.77, duration: 0.35 }    // High C (held)
      ];

      melody.forEach(({ freq, time, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle'; // Warmer sound for celebration
        osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

        // Volume envelope with attack and release
        gain.gain.setValueAtTime(0, ctx.currentTime + time);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + time + 0.02); // Attack
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration); // Release

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + duration);
      });

      // Add harmony for richer sound
      const harmony = [
        { freq: 392, time: 0.36, duration: 0.25 },    // G (below high C)
        { freq: 659, time: 0.77, duration: 0.35 }     // E (harmony)
      ];

      harmony.forEach(({ freq, time, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

        gain.gain.setValueAtTime(0, ctx.currentTime + time);
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + duration);
      });
    } catch (error) {
      console.warn('Victory sound failed:', error);
    }

    // Enthusiastic victory speech with higher pitch
    setTimeout(() => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Awesome job! You won!');
      utterance.rate = 1.0; // Faster, more excited
      utterance.pitch = 1.4; // Higher pitch for excitement
      utterance.volume = 1.0;

      // Try to select a child-friendly voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(voice =>
          voice.name.includes('Female') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Victoria')
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    }, 1200); // Wait for melody to finish
  }, [initAudio]);

  return {
    playSuccess: () => playTone(600, 'sine', 0.2), // High Ding
    playError: () => playTone(150, 'sawtooth', 0.4), // Low Buzz
    playKeyClick: () => playTone(800, 'triangle', 0.05), // Short click
    playVictory, // Victory fanfare for win screen
    speakWord
  };
};