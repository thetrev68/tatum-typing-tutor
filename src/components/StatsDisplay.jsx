export const StatsDisplay = ({ stats }) => {
  if (!stats || stats.totalGamesPlayed === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border-2 border-blue-100">
        <h3 className="text-xl font-bold text-gray-700 mb-2">🎮 Your Stats</h3>
        <p className="text-gray-600">Play your first game to see your stats!</p>
      </div>
    );
  }

  const averageAccuracy = stats.totalWordsTyped > 0
    ? Math.round((stats.totalPerfectWords / stats.totalWordsTyped) * 100)
    : 0;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border-2 border-blue-100">
      <h3 className="text-xl font-bold text-gray-700 mb-4">🎮 Your Stats</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Games Played */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="text-3xl font-black text-blue-600">{stats.totalGamesPlayed}</div>
          <div className="text-xs text-gray-600 font-semibold">Games Played</div>
        </div>

        {/* Games Won */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="text-3xl font-black text-green-600">{stats.gamesWon}</div>
          <div className="text-xs text-gray-600 font-semibold">Games Won 🏆</div>
        </div>

        {/* Total Words */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="text-3xl font-black text-purple-600">{stats.totalWordsTyped}</div>
          <div className="text-xs text-gray-600 font-semibold">Words Typed</div>
        </div>

        {/* Perfect Words */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="text-3xl font-black text-yellow-600">{stats.totalPerfectWords}</div>
          <div className="text-xs text-gray-600 font-semibold">Perfect Words ⭐</div>
        </div>

        {/* Best Streak */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="text-3xl font-black text-orange-600">{stats.highestStreak}</div>
          <div className="text-xs text-gray-600 font-semibold">Best Streak 🔥</div>
        </div>

        {/* Average Accuracy */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="text-3xl font-black text-pink-600">{averageAccuracy}%</div>
          <div className="text-xs text-gray-600 font-semibold">Avg Accuracy</div>
        </div>
      </div>

      {/* Encouragement Message */}
      {averageAccuracy >= 80 && (
        <div className="mt-4 text-center text-sm font-bold text-green-600 bg-green-50 rounded-lg py-2">
          🌟 Amazing work! You're doing great! 🌟
        </div>
      )}
      {averageAccuracy >= 50 && averageAccuracy < 80 && (
        <div className="mt-4 text-center text-sm font-bold text-blue-600 bg-blue-50 rounded-lg py-2">
          💪 Keep practicing! You're getting better! 💪
        </div>
      )}
      {averageAccuracy < 50 && averageAccuracy > 0 && (
        <div className="mt-4 text-center text-sm font-bold text-purple-600 bg-purple-50 rounded-lg py-2">
          🎯 Every word you type makes you stronger! 🎯
        </div>
      )}
    </div>
  );
};
