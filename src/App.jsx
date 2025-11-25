import { useState } from 'react';
import { getRandomWord } from './data/words';
import { useGameSounds } from './hooks/useGameSounds';
import { useTypingEngine } from './hooks/useTypingEngine';
import { WordDisplay } from './components/WordDisplay';
import { Keyboard } from './components/Keyboard';
import { StreakCounter } from './components/StreakCounter'; // <--- IMPORT

function App() {
  const [gameState, setGameState] = useState('menu'); 
  const [currentWord, setCurrentWord] = useState('');
  
  // --- New State for Streak ---
  const [streak, setStreak] = useState(0);
  const [wordHasError, setWordHasError] = useState(false); 
  // ----------------------------

  const { playSuccess, playError, playKeyClick, speakWord } = useGameSounds();

  const handleCorrectKey = () => playKeyClick();

  const handleErrorKey = () => {
    playError();
    setWordHasError(true); // Mark this word as "imperfect"
    setStreak(0);          // Reset streak immediately on error
  };
  
  const handleWordComplete = () => {
    playSuccess();
    
    // Increment streak only if the word was perfect
    if (!wordHasError) {
      setStreak(s => s + 1);
    }

    setTimeout(() => {
        nextLevel();
    }, 1000);
  };

  const nextLevel = () => {
      const newWord = getRandomWord('kindergarten');
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
    setStreak(0); // Reset total streak on new game
    nextLevel();
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
          <div className="text-center animate-bounce">
            <button 
              onClick={startGame}
              className="px-12 py-6 bg-green-500 hover:bg-green-400 text-white rounded-full text-4xl font-black shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all"
            >
              PLAY
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="flex flex-col items-center w-full h-full pt-10">
            
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
              onClick={() => setGameState('menu')}
              className="absolute top-6 left-6 text-gray-300 hover:text-red-400 font-bold"
            >
              QUIT
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App