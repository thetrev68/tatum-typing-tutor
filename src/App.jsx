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
  const { stats, recordGame } = useGameStats();
  const { preferences, updatePreference } = usePreferences();
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

  const { playSuccess, playError, playKeyClick, playVictory, speakWord } = useGameSounds();

  const handleCorrectKey = () => {
    playKeyClick();
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
    if (progressionResult === 'level_up') {
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
        nextLevel();
        setMascotMood('neutral');
      }, 1000);
    }
  };

  const nextLevel = () => {
      // Use adaptive difficulty levels
      const levels = difficulty.getCurrentLevels();
      const newWord = getRandomWordFromLevels(levels);
      setCurrentWord(newWord);
      setWordHasError(false); // Reset error flag for the new word
      speakWord(newWord);
  };

  const { cursor, isShake } = useTypingEngine(
    gameState === 'playing' ? currentWord : '',
    handleCorrectKey,
    handleErrorKey,
    handleWordComplete
  );

  const startGame = () => {
    setGameState('playing');
    setStreak(0);
    setMaxStreak(0);
    setWordsCompleted(0);
    setPerfectWordsCount(0);
    setMascotMood('neutral');
    difficulty.reset();
    nextLevel();
  };

  const handlePlayAgain = () => {
    setWordsCompleted(0);
    setPerfectWordsCount(0);
    setStreak(0);
    setMaxStreak(0);
    setGameState('playing');
    setMascotMood('neutral');
    // Keep current difficulty level - don't reset
    nextLevel();
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setWordsCompleted(0);
    setPerfectWordsCount(0);
    setStreak(0);
    setMaxStreak(0);
    setMascotMood('neutral');
    difficulty.reset();
  };

  const targetLetter = currentWord[cursor];

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-sky-100 select-none overflow-hidden">
      
      <div className="absolute top-4 left-4 text-2xl font-bold text-sky-800">
        Tatum Typing Tutor
      </div>

      <div className="w-full max-w-5xl h-[600px] bg-white rounded-3xl shadow-2xl border-b-8 border-sky-200 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Streak Component Positioned inside the Game Board */}
        {gameState === 'playing' && <StreakCounter count={streak} />}

        {gameState === 'menu' && (
          <div className="flex w-full h-full">
            {/* Left Side - Stats */}
            <div className="w-1/3 p-6 flex items-center justify-center">
              <StatsDisplay stats={stats} />
            </div>

            {/* Right Side - Menu */}
            <div className="w-2/3 flex flex-col items-center justify-center space-y-8 p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Choose Your Words!</h2>
                <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
                  <button
                    onClick={() => setCurrentPath('beginner')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      currentPath === 'beginner'
                        ? 'bg-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🔤 Letters & Simple Words
                  </button>
                  <button
                    onClick={() => setCurrentPath('kindergarten')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      currentPath === 'kindergarten'
                        ? 'bg-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🎒 Kindergarten Mix
                  </button>
                  <button
                    onClick={() => setCurrentPath('fun')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      currentPath === 'fun'
                        ? 'bg-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🎨 Animals & Colors
                  </button>
                  <button
                    onClick={() => setCurrentPath('firstGrade')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      currentPath === 'firstGrade'
                        ? 'bg-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📚 1st Grade Challenge
                  </button>
                </div>
              </div>

              <button
                onClick={startGame}
                className="px-12 py-6 bg-green-500 hover:bg-green-400 text-white rounded-full text-4xl font-black shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all animate-bounce"
              >
                PLAY
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="flex flex-col items-center w-full h-full pt-10">

            {/* Level Up Notification Overlay */}
            <LevelUpNotification
              show={showLevelUpNotification}
              message={levelUpMessage}
              isLevelUp={isLevelingUp}
            />

            {/* Word Progress Counter */}
            <div className="absolute top-6 right-6 flex flex-col items-end gap-1">
              <div className="text-2xl font-bold text-sky-700">
                📝 {wordsCompleted}/{WORDS_TO_WIN}
              </div>
              <div className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {difficulty.getCurrentLabel()}
              </div>
              <div className="text-xs text-gray-500">
                Accuracy: {difficulty.getAccuracy()}%
              </div>
            </div>

            {/* Mascot Character */}
            <div className="mb-6">
              <Mascot mood={mascotMood} size={160} />
            </div>

            <div className="mb-8">
               <WordDisplay word={currentWord} cursor={cursor} isShake={isShake} />
            </div>

            <div className="mb-8">
                <Keyboard targetKey={targetLetter} />
            </div>

            <button
              onClick={() => speakWord(currentWord)}
              className="flex items-center gap-2 px-6 py-3 bg-sky-50 text-sky-600 rounded-xl font-bold hover:bg-sky-100 transition"
            >
              <span>🔊</span> Say "{currentWord}"
            </button>

            <button
              onClick={handleBackToMenu}
              className="absolute top-6 left-6 text-gray-300 hover:text-red-400 font-bold"
            >
              QUIT
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