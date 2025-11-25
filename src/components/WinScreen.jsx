export const WinScreen = ({ wordsCompleted, perfectWords, onPlayAgain, onMenu }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in">
      {/* Celebration Banner */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-bounce">
          🎉 AMAZING! 🎉
        </h1>
        <p className="text-3xl font-bold text-gray-700">
          You typed {wordsCompleted} words!
        </p>
        {perfectWords > 0 && (
          <p className="text-2xl font-bold text-green-600">
            ⭐ {perfectWords} perfect {perfectWords === 1 ? 'word' : 'words'}! ⭐
          </p>
        )}
      </div>

      {/* Animated Stars */}
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-9xl animate-spin-slow">🌟</div>
        </div>
        <div className="absolute top-0 left-0 text-5xl animate-bounce" style={{ animationDelay: '0.1s' }}>⭐</div>
        <div className="absolute top-0 right-0 text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
        <div className="absolute bottom-0 left-0 text-5xl animate-bounce" style={{ animationDelay: '0.3s' }}>💫</div>
        <div className="absolute bottom-0 right-0 text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎊</div>
      </div>

      {/* Encouraging Messages */}
      <div className="text-center space-y-2">
        {wordsCompleted >= 20 && (
          <p className="text-xl font-bold text-purple-600 animate-pulse">
            🏆 SUPER STAR READER! 🏆
          </p>
        )}
        {wordsCompleted >= 10 && wordsCompleted < 20 && (
          <p className="text-xl font-bold text-blue-600 animate-pulse">
            🌟 FANTASTIC JOB! 🌟
          </p>
        )}
        {wordsCompleted < 10 && (
          <p className="text-xl font-bold text-green-600 animate-pulse">
            👏 GREAT WORK! 👏
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onPlayAgain}
          className="px-10 py-5 bg-green-500 hover:bg-green-400 text-white rounded-full text-3xl font-black shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all"
        >
          🎮 PLAY AGAIN
        </button>
        <button
          onClick={onMenu}
          className="px-10 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-full text-3xl font-black shadow-[0_4px_0_rgb(3,105,161)] active:shadow-none active:translate-y-1 transition-all"
        >
          🏠 MENU
        </button>
      </div>
    </div>
  );
};
