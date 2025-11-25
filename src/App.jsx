import { useState } from 'react'

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameover

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-sky-100 relative">
      
      {/* HUD / Scoreboard */}
      <div className="absolute top-4 left-4 text-2xl font-bold text-sky-800">
        Tatum Typing Tutor
      </div>

      {/* Main Game Area */}
      <div className="w-full max-w-4xl h-96 bg-white rounded-xl shadow-2xl border-4 border-sky-300 flex items-center justify-center overflow-hidden">
        {gameState === 'menu' && (
          <div className="text-center">
            <h1 className="text-6xl font-black text-sky-500 mb-8 tracking-wider">
              READY?
            </h1>
            <button 
              onClick={() => setGameState('playing')}
              className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-full text-2xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="text-center">
            <p className="text-4xl text-gray-400 mb-4">Type the letter:</p>
            <div className="text-9xl font-mono font-bold text-sky-600 animate-bounce">
              A
            </div>
            <button 
              onClick={() => setGameState('menu')}
              className="mt-10 text-gray-400 underline"
            >
              Quit
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default App