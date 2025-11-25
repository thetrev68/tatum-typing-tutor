import { useState, useEffect } from 'react';
import { getRandomWordFromLevels } from './data/words';
import { useGameSounds } from './hooks/useGameSounds';
import { useTypingEngine } from './hooks/useTypingEngine';
import { useDifficultyProgression } from './hooks/useDifficultyProgression';
import { useGameStats, usePreferences } from './hooks/useLocalStorage';
import { WordDisplay } from './components/WordDisplay';
import { Keyboard } from './components/Keyboard';
import { StreakCounter } from './components/StreakCounter';
import { Mascot } from './components/Mascot';
import { WinScreen } from './components/WinScreen';
import { LevelUpNotification } from './components/LevelUpNotification';
import { StatsDisplay } from './components/StatsDisplay';

function App() {
  // --- Local Storage & Persistence ---
  const { stats, recordGame, resetStats } = useGameStats();
  const { preferences, updatePreference } = usePreferences();
  const [showUpperCaseKeyboard, setShowUpperCaseKeyboard] = useState(preferences.showUpperCaseKeyboard || false);
  // ----------------------------

  const [gameState, setGameState] = useState('menu');
  const [currentWord, setCurrentWord] = useState('');
  const [currentPath, setCurrentPath] = useState(preferences.lastSelectedPath);

  // --- New State for Streak ---
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0); // Track highest streak this game
  const [wordHasError, setWordHasError] = useState(false);
  // ----------------------------

  // --- Mascot Mood State ---
  const [mascotMood, setMascotMood] = useState('neutral');
  // ----------------------------

  // --- Word Count & Win Tracking ---
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [perfectWordsCount, setPerfectWordsCount] = useState(0);
  const WORDS_TO_WIN = preferences.wordsPerGame || 10;
  // ----------------------------

  // --- Difficulty Progression ---
  const difficulty = useDifficultyProgression(currentPath);
  const [showLevelUpNotification, setShowLevelUpNotification] = useState(false);
  const [levelUpMessage, setLevelUpMessage] = useState('');
  const [isLevelingUp, setIsLevelingUp] = useState(true);
  // ----------------------------

  // Save selected path to preferences
  useEffect(() => {
    updatePreference('lastSelectedPath', currentPath);
  }, [currentPath, updatePreference]);

  const { playSuccess, playError, playKeyClick, playLevelUp, playVictory, speakWord } = useGameSounds();

  const handleCorrectKey = () => {
    playKeyClick();

    // Speak the letter that was just typed correctly
    const typedLetter = currentWord[cursor];
    if (typedLetter) {
      speakWord(typedLetter);
    }

    setMascotMood('happy');
    setTimeout(() => setMascotMood('neutral'), 500);
  };

  const handleErrorKey = () => {
    playError();
    setWordHasError(true); // Mark this word as "imperfect"
    setStreak(0);          // Reset streak immediately on error
    setMascotMood('neutral');
  };

  const handleWordComplete = () => {
    playSuccess();

    // Increment word count
    const newWordsCompleted = wordsCompleted + 1;
    setWordsCompleted(newWordsCompleted);

    // Track performance for difficulty progression
    const wasPerfect = !wordHasError;
    const progressionResult = difficulty.recordWord(wasPerfect);

    // Increment streak only if the word was perfect
    if (wasPerfect) {
      setStreak(s => {
        const newStreak = s + 1;
        setMaxStreak(prev => Math.max(prev, newStreak));
        return newStreak;
      });
      setPerfectWordsCount(p => p + 1);
      setMascotMood('celebrating');
    } else {
      setMascotMood('excited');
    }

    // Show level change notification if difficulty changed
    const hasLevelChange = progressionResult === 'level_up' || progressionResult === 'level_down';
    if (progressionResult === 'level_up') {
      playLevelUp(); // Play celebratory level-up sound!
      setShowLevelUpNotification(true);
      setLevelUpMessage(difficulty.getCurrentLabel());
      setIsLevelingUp(true);
      setTimeout(() => setShowLevelUpNotification(false), 3000);
    } else if (progressionResult === 'level_down') {
      setShowLevelUpNotification(true);
      setLevelUpMessage(difficulty.getCurrentLabel());
      setIsLevelingUp(false);
      setTimeout(() => setShowLevelUpNotification(false), 3000);
    }

    // Check if we've reached the win condition
    if (newWordsCompleted >= WORDS_TO_WIN) {
      // Record game stats
      const finalAccuracy = difficulty.getAccuracy();
      recordGame(newWordsCompleted, perfectWordsCount + (wasPerfect ? 1 : 0), maxStreak, finalAccuracy, true);

      setTimeout(() => {
        setGameState('win');
        setMascotMood('celebrating');
        playVictory(); // Play victory fanfare!
      }, 1000);
    } else {
      setTimeout(() => {
        // Don't speak word immediately if level-up notification is showing
        const newWord = nextLevel(!hasLevelChange);
        setMascotMood('neutral');

        // If level changed, speak the word after notification disappears
        if (hasLevelChange) {
          setTimeout(() => {
            speakWord(newWord);
          }, 2500); // Speak 2.5 seconds later (total 3.5s from now, 0.5s after notification clears)
        }
      }, 1000);
    }
  };

  const nextLevel = (shouldSpeakImmediately = true) => {
      // Use adaptive difficulty levels
      const levels = difficulty.getCurrentLevels();
      const newWord = getRandomWordFromLevels(levels);
      setCurrentWord(newWord);
      setWordHasError(false); // Reset error flag for the new word

      // Only speak immediately if requested (skip if level-up notification is showing)
      if (shouldSpeakImmediately) {
        speakWord(newWord);
      }

      // Return the word so we can speak it later if needed
      return newWord;
  };

  const { cursor, isShake, handleKeyDown } = useTypingEngine(
    gameState === 'playing' ? currentWord : '',
    handleCorrectKey,
    handleErrorKey,
    handleWordComplete
  );

  const startGame = () => {
    // Play a silent click to initialize audio on mobile
    playKeyClick();

    setGameState('playing');
    setStreak(0);
    setMaxStreak(0);
    setWordsCompleted(0);
    setPerfectWordsCount(0);
    setMascotMood('neutral');
    difficulty.resetToStart(); // Start from the beginning of the selected path
    nextLevel();
  };

  const handlePlayAgain = () => {
    setWordsCompleted(0);
    setPerfectWordsCount(0);
    setStreak(0);
    setMaxStreak(0);
    setGameState('playing');
    setMascotMood('neutral');
    difficulty.reset(); // Keep current difficulty level, just clear performance history
    nextLevel();
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setWordsCompleted(0);
    setPerfectWordsCount(0);
    setStreak(0);
    setMaxStreak(0);
    setMascotMood('neutral');
    difficulty.resetToStart(); // Reset to beginning when going back to menu
  };

  const handleTitleClick = () => {
    speakWord("TATUM'S Typing Adventure");
  };

  const handleTextClick = (text) => {
    speakWord(text);
  };

  // Disable keyboard hints when at tier 3 or higher (index 2+) - expert mode
  const isExpertMode = difficulty.currentDifficulty >= 2;
  const showHints = preferences.showKeyboardHints && !isExpertMode;
  const targetLetter = showHints ? currentWord[cursor] : null;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-linear-to-br from-amber-100 via-orange-50 to-yellow-100 select-none overflow-hidden p-2 sm:p-4">

      {/* Personalized Hero Branding */}
      <div
        className="absolute top-2 sm:top-8 left-1/2 transform -translate-x-1/2 text-center z-20 cursor-pointer hover:scale-105 active:scale-95 transition-transform select-auto touch-manipulation"
        onClick={handleTitleClick}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleTitleClick();
        }}
        title="Click to hear the title!"
      >
        <div className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight pointer-events-none">
          <span className="text-orange-500 drop-shadow-lg">TATUM'S</span>
        </div>
        <div className="text-sm sm:text-xl md:text-2xl font-bold text-amber-700 -mt-1 pointer-events-none">
          Typing Adventure
        </div>
      </div>

      <div className="w-full max-w-5xl h-full sm:h-[600px] bg-linear-to-b from-white to-orange-50 rounded-2xl sm:rounded-3xl shadow-2xl border-b-4 sm:border-b-8 border-orange-300 flex flex-col items-center justify-center relative overflow-hidden mt-16 sm:mt-0">
        
        {/* Streak Component Positioned inside the Game Board */}
        {gameState === 'playing' && <StreakCounter count={streak} />}

        {gameState === 'menu' && (
          <div className="flex flex-col sm:flex-row w-full h-full overflow-y-auto sm:overflow-hidden">
            {/* Left Side - Stats */}
            <div className="w-full sm:w-1/3 p-3 sm:p-6 flex items-center justify-center">
              <StatsDisplay stats={stats} onReset={resetStats} />
            </div>

            {/* Right Side - Menu */}
            <div className="w-full sm:w-2/3 flex flex-col items-center justify-center space-y-4 sm:space-y-8 p-3 sm:p-6 pb-6">
              {/* Keyboard Display Case Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="uppercase-keyboard-toggle"
                  checked={showUpperCaseKeyboard}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setShowUpperCaseKeyboard(isChecked);
                    updatePreference('showUpperCaseKeyboard', isChecked);
                    handleTextClick(isChecked ? 'Uppercase Keyboard' : 'Lowercase Keyboard');
                  }}
                  className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="uppercase-keyboard-toggle"
                  className="text-base sm:text-lg font-bold text-amber-800 cursor-pointer"
                  onClick={() => {
                    const isChecked = !showUpperCaseKeyboard;
                    setShowUpperCaseKeyboard(isChecked);
                    updatePreference('showUpperCaseKeyboard', isChecked);
                    handleTextClick(isChecked ? 'Uppercase Keyboard' : 'Lowercase Keyboard');
                  }}
                >
                  ABC Keyboard
                </label>
              </div>

              <div className="mb-4 sm:mb-8">
                <h2
                  className="text-lg sm:text-2xl font-bold text-amber-800 mb-3 sm:mb-4 text-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  onClick={() => handleTextClick('Choose Your Words!')}
                  title="Click to hear!"
                >
                  Choose Your Words!
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-2xl">
                  <button
                    onClick={() => {
                      handleTextClick('Letters and Simple Words');
                      setCurrentPath('beginner');
                    }}
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
                      currentPath === 'beginner'
                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-2 border-amber-200'
                    }`}
                  >
                    🔤 Letters & Simple Words
                  </button>
                  <button
                    onClick={() => {
                      handleTextClick('Kindergarten Mix');
                      setCurrentPath('kindergarten');
                    }}
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
                      currentPath === 'kindergarten'
                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-2 border-amber-200'
                    }`}
                  >
                    🎒 Kindergarten Mix
                  </button>
                  <button
                    onClick={() => {
                      handleTextClick('Animals and Colors');
                      setCurrentPath('fun');
                    }}
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
                      currentPath === 'fun'
                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-2 border-amber-200'
                    }`}
                  >
                    🎨 Animals & Colors
                  </button>
                  <button
                    onClick={() => {
                      handleTextClick('First Grade Challenge');
                      setCurrentPath('firstGrade');
                    }}
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
                      currentPath === 'firstGrade'
                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-2 border-amber-200'
                    }`}
                  >
                    📚 1st Grade Challenge
                  </button>
                  <button
                    onClick={() => {
                      handleTextClick('Second Grade Challenge');
                      setCurrentPath('secondGrade');
                    }}
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
                      currentPath === 'secondGrade'
                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-2 border-amber-200'
                    }`}
                  >
                    🎓 2nd Grade Challenge
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  handleTextClick('Start!');
                  startGame();
                }}
                className="px-8 py-4 sm:px-12 sm:py-6 bg-green-500 hover:bg-green-400 active:bg-green-600 text-white rounded-full text-2xl sm:text-4xl font-black shadow-[0_4px_0_rgb(21,128,61)] sm:shadow-[0_6px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all animate-bounce"
              >
                START!
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="flex flex-col items-center justify-center w-full h-full py-4 md:py-2 overflow-y-auto md:overflow-hidden gap-4 md:gap-2">

            {/* Level Up Notification Overlay */}
            <LevelUpNotification
              show={showLevelUpNotification}
              message={levelUpMessage}
              isLevelUp={isLevelingUp}
            />

            {/* Word Progress Counter */}
            <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex flex-col items-end gap-1 text-right">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">
                📝 {wordsCompleted}/{WORDS_TO_WIN}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-amber-700 bg-amber-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border-2 border-amber-300">
                {difficulty.getCurrentLabel()}
              </div>
              <div className="text-[10px] sm:text-xs text-amber-600">
                Accuracy: {difficulty.getAccuracy()}%
              </div>
            </div>

            {/* Mascot Character */}
            <div className="shrink-0">
              <Mascot mood={mascotMood} size={100} className="sm:w-32 sm:h-32" />
            </div>

            <div className="shrink-0 px-2">
               <WordDisplay word={currentWord} cursor={cursor} isShake={isShake} />
            </div>

            <div className="shrink-0 w-full px-2">
                <Keyboard targetKey={targetLetter} onKeyPress={handleKeyDown} displayUpperCase={showUpperCaseKeyboard} />
            </div>

            <button
              onClick={() => speakWord(currentWord)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 bg-amber-50 text-amber-700 rounded-xl font-bold hover:bg-amber-100 active:bg-amber-200 border-2 border-amber-200 transition text-sm sm:text-base"
            >
              <span>🔊</span> Say "{currentWord}"
            </button>

            <button
              onClick={handleBackToMenu}
              className="absolute top-3 sm:top-6 left-3 sm:left-6 text-orange-300 hover:text-red-500 active:text-red-600 font-bold text-base sm:text-lg"
            >
              ← QUIT
            </button>
          </div>
        )}

        {gameState === 'win' && (
          <WinScreen
            wordsCompleted={wordsCompleted}
            perfectWords={perfectWordsCount}
            onPlayAgain={handlePlayAgain}
            onMenu={handleBackToMenu}
          />
        )}
      </div>
    </div>
  )
}

export default App