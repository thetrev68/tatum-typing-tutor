export const WinScreen = ({ wordsCompleted, perfectWords, onPlayAgain, onMenu }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-8 animate-in px-4 overflow-y-auto max-h-full py-4">
      {/* Celebration Banner */}
      <div className="text-center space-y-2 sm:space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-pink-500 to-purple-600 animate-bounce">
          🎉 AMAZING! 🎉
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
          You typed {wordsCompleted} words!
        </p>
        {perfectWords > 0 && (
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
            ⭐ {perfectWords} perfect {perfectWords === 1 ? 'word' : 'words'}! ⭐
          </p>
        )}
      </div>

      {/* Animated Stars */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl sm:text-9xl animate-spin-slow">🌟</div>
        </div>
        <div className="absolute top-0 left-0 text-3xl sm:text-5xl animate-bounce" style={{ animationDelay: '0.1s' }}>⭐</div>
        <div className="absolute top-0 right-0 text-3xl sm:text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
        <div className="absolute bottom-0 left-0 text-3xl sm:text-5xl animate-bounce" style={{ animationDelay: '0.3s' }}>💫</div>
        <div className="absolute bottom-0 right-0 text-3xl sm:text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎊</div>
      </div>

      {/* Encouraging Messages */}
      <div className="text-center space-y-2">
        {wordsCompleted >= 20 && (
          <p className="text-base sm:text-xl font-bold text-purple-600 animate-pulse">
            🏆 SUPER STAR READER! 🏆
          </p>
        )}
        {wordsCompleted >= 10 && wordsCompleted < 20 && (
          <p className="text-base sm:text-xl font-bold text-blue-600 animate-pulse">
            🌟 FANTASTIC JOB! 🌟
          </p>
        )}
        {wordsCompleted < 10 && (
          <p className="text-base sm:text-xl font-bold text-green-600 animate-pulse">
            👏 GREAT WORK! 👏
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
        <button
          onClick={onPlayAgain}
          className="px-8 py-4 sm:px-10 sm:py-5 bg-green-500 hover:bg-green-400 active:bg-green-600 text-white rounded-full text-xl sm:text-2xl md:text-3xl font-black shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all"
        >
          🎮 PLAY AGAIN
        </button>
        <button
          onClick={onMenu}
          className="px-8 py-4 sm:px-10 sm:py-5 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white rounded-full text-xl sm:text-2xl md:text-3xl font-black shadow-[0_4px_0_rgb(194,65,12)] active:shadow-none active:translate-y-1 transition-all"
        >
          🏠 MENU
        </button>
      </div>
    </div>
  );
};
