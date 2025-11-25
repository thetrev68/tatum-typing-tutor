import { useState, useCallback } from 'react';

/**
 * Custom hook for persisting state to localStorage
 * Automatically syncs state with localStorage on changes
 */
export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function like useState
      setStoredValue(currentValue => {
        const valueToStore = value instanceof Function ? value(currentValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
};

/**
 * Hook for managing game statistics and high scores
 */
export const useGameStats = () => {
  const [stats, setStats] = useLocalStorage('tatum-typing-stats', {
    totalGamesPlayed: 0,
    totalWordsTyped: 0,
    totalPerfectWords: 0,
    highestStreak: 0,
    bestAccuracy: 0,
    gamesWon: 0,
    lastPlayed: null,
    achievements: []
  });

  // Update stats after a game
  const recordGame = (wordsCompleted, perfectWords, maxStreak, accuracy, didWin) => {
    setStats(prev => ({
      ...prev,
      totalGamesPlayed: prev.totalGamesPlayed + 1,
      totalWordsTyped: prev.totalWordsTyped + wordsCompleted,
      totalPerfectWords: prev.totalPerfectWords + perfectWords,
      highestStreak: Math.max(prev.highestStreak, maxStreak),
      bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
      gamesWon: didWin ? prev.gamesWon + 1 : prev.gamesWon,
      lastPlayed: new Date().toISOString()
    }));
  };

  // Reset all stats
  const resetStats = () => {
    setStats({
      totalGamesPlayed: 0,
      totalWordsTyped: 0,
      totalPerfectWords: 0,
      highestStreak: 0,
      bestAccuracy: 0,
      gamesWon: 0,
      lastPlayed: null,
      achievements: []
    });
  };

  return { stats, recordGame, resetStats };
};

/**
 * Hook for managing user preferences
 */
export const usePreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('tatum-typing-preferences', {
    lastSelectedPath: 'kindergarten',
    soundEnabled: true,
    wordsPerGame: 15,
    showKeyboardHints: true,
    playerName: 'Tatum'
  });

  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, [setPreferences]);

  return { preferences, updatePreference, setPreferences };
};
