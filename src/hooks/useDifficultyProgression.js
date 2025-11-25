import { useState } from 'react';

/**
 * Smart difficulty progression system that adapts to the player's performance
 * Tracks accuracy and automatically adjusts word complexity
 */
export const useDifficultyProgression = (initialPath = 'kindergarten') => {
  // Difficulty tiers based on the selected learning path
  const getTiersForPath = (path) => {
    switch (path) {
      case 'beginner':
        return [
          { name: 'letters', label: '🔤 Letters', levels: ['letters'] },
          { name: 'twoLetter', label: '✌️ Two Letters', levels: ['letters', 'twoLetter'] },
          { name: 'simple', label: '🌟 Simple Words', levels: ['twoLetter', 'cvc'] }
        ];
      case 'fun':
        return [
          { name: 'animals', label: '🐶 Animals Only', levels: ['animals'] },
          { name: 'colors', label: '🎨 Colors Only', levels: ['colors'] },
          { name: 'mixed', label: '🌈 Animals & Colors', levels: ['animals', 'colors'] }
        ];
      case 'kindergarten':
        return [
          { name: 'simple', label: '🌟 Simple Words', levels: ['twoLetter', 'cvc'] },
          { name: 'intermediate', label: '🎒 Kindergarten', levels: ['twoLetter', 'cvc', 'kindergarten', 'animals', 'colors', 'family'] }
        ];
      case 'firstGrade':
        return [
          { name: 'intermediate', label: '🎒 Kindergarten', levels: ['cvc', 'kindergarten'] },
          { name: 'advanced', label: '🚀 1st Grade', levels: ['cvc', 'kindergarten', 'firstGrade'] }
        ];
      default:
        return [
          { name: 'intermediate', label: '🎒 Kindergarten', levels: ['twoLetter', 'cvc', 'kindergarten', 'animals', 'colors', 'family'] }
        ];
    }
  };

  const difficultyTiers = getTiersForPath(initialPath);
  const initialDiff = 0; // Always start at the first tier for the selected path

  const [currentDifficulty, setCurrentDifficulty] = useState(initialDiff);
  const [performanceHistory, setPerformanceHistory] = useState([]);

  // Track performance of completed word
  const recordWord = (wasPerfect) => {
    const newHistory = [...performanceHistory, wasPerfect ? 1 : 0].slice(-5); // Keep last 5 words
    setPerformanceHistory(newHistory);

    // Calculate accuracy percentage
    const accuracy = newHistory.length > 0
      ? (newHistory.reduce((sum, val) => sum + val, 0) / newHistory.length) * 100
      : 0;

    // Auto-advance logic: Need 4+ words tracked and high accuracy
    if (newHistory.length >= 4) {
      if (accuracy >= 80 && currentDifficulty < difficultyTiers.length - 1) {
        // Advance to next difficulty
        setCurrentDifficulty(prev => prev + 1);
        setPerformanceHistory([]); // Reset tracking for new level
        return 'level_up';
      } else if (accuracy < 40 && currentDifficulty > 0) {
        // Drop back a level if struggling
        setCurrentDifficulty(prev => prev - 1);
        setPerformanceHistory([]); // Reset tracking
        return 'level_down';
      }
    }

    return 'stay';
  };

  // Manual difficulty adjustment (for settings)
  const setDifficulty = (index) => {
    setCurrentDifficulty(Math.max(0, Math.min(index, difficultyTiers.length - 1)));
    setPerformanceHistory([]);
  };

  // Reset progression (clears history but keeps difficulty level)
  const reset = () => {
    setPerformanceHistory([]);
  };

  // Full reset (returns to starting difficulty for this path)
  const resetToStart = () => {
    setCurrentDifficulty(0);
    setPerformanceHistory([]);
  };

  const getCurrentTier = () => difficultyTiers[currentDifficulty];
  const getCurrentLevels = () => difficultyTiers[currentDifficulty].levels;
  const getCurrentLabel = () => difficultyTiers[currentDifficulty].label;

  // Calculate current accuracy percentage
  const getAccuracy = () => {
    if (performanceHistory.length === 0) return 100;
    return Math.round(
      (performanceHistory.reduce((sum, val) => sum + val, 0) / performanceHistory.length) * 100
    );
  };

  return {
    currentDifficulty,
    recordWord,
    reset,
    resetToStart,
    setDifficulty,
    getCurrentTier,
    getCurrentLevels,
    getCurrentLabel,
    getAccuracy,
    performanceHistory,
    difficultyTiers,
    canLevelUp: currentDifficulty < difficultyTiers.length - 1,
    canLevelDown: currentDifficulty > 0
  };
};
