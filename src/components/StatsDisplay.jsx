export const StatsDisplay = ({ stats }) => {
  if (!stats || stats.totalGamesPlayed === 0) {
    return (
      <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border-2 border-amber-200">
        <h3 className="text-base sm:text-xl font-bold text-amber-800 mb-2">🎮 Your Stats</h3>
        <p className="text-sm text-amber-700">Play your first game to see your stats!</p>
      </div>
    );
  }

  const averageAccuracy = stats.totalWordsTyped > 0
    ? Math.round((stats.totalPerfectWords / stats.totalWordsTyped) * 100)
    : 0;

  return (
    <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border-2 border-amber-200 w-full">
      <h3 className="text-base sm:text-xl font-bold text-amber-800 mb-3 sm:mb-4">🎮 Your Stats</h3>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {/* Games Played */}
        <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm">
          <div className="text-xl sm:text-3xl font-black text-orange-600">{stats.totalGamesPlayed}</div>
          <div className="text-[10px] sm:text-xs text-gray-600 font-semibold">Games Played</div>
        </div>

        {/* Games Won */}
        <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm">
          <div className="text-xl sm:text-3xl font-black text-green-600">{stats.gamesWon}</div>
          <div className="text-[10px] sm:text-xs text-gray-600 font-semibold">Games Won 🏆</div>
        </div>

        {/* Total Words */}
        <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm">
          <div className="text-xl sm:text-3xl font-black text-purple-600">{stats.totalWordsTyped}</div>
          <div className="text-[10px] sm:text-xs text-gray-600 font-semibold">Words Typed</div>
        </div>

        {/* Perfect Words */}
        <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm">
          <div className="text-xl sm:text-3xl font-black text-yellow-600">{stats.totalPerfectWords}</div>
          <div className="text-[10px] sm:text-xs text-gray-600 font-semibold">Perfect Words ⭐</div>
        </div>

        {/* Best Streak */}
        <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm">
          <div className="text-xl sm:text-3xl font-black text-orange-600">{stats.highestStreak}</div>
          <div className="text-[10px] sm:text-xs text-gray-600 font-semibold">Best Streak 🔥</div>
        </div>

        {/* Average Accuracy */}
        <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm">
          <div className="text-xl sm:text-3xl font-black text-pink-600">{averageAccuracy}%</div>
          <div className="text-[10px] sm:text-xs text-gray-600 font-semibold">Avg Accuracy</div>
        </div>
      </div>

      {/* Encouragement Message */}
      {averageAccuracy >= 80 && (
        <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm font-bold text-green-600 bg-green-50 rounded-lg py-1.5 sm:py-2">
          🌟 Amazing work! You're doing great! 🌟
        </div>
      )}
      {averageAccuracy >= 50 && averageAccuracy < 80 && (
        <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 rounded-lg py-1.5 sm:py-2">
          💪 Keep practicing! You're getting better! 💪
        </div>
      )}
      {averageAccuracy < 50 && averageAccuracy > 0 && (
        <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm font-bold text-purple-600 bg-purple-50 rounded-lg py-1.5 sm:py-2">
          🎯 Every word you type makes you stronger! 🎯
        </div>
      )}
    </div>
  );
};
