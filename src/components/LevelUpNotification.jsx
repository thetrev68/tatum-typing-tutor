export const LevelUpNotification = ({ show, message, isLevelUp = true }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-in scale-110">
        {isLevelUp ? (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-12 py-8 rounded-3xl shadow-2xl border-4 border-white">
            <div className="text-6xl font-black text-center mb-2 animate-bounce">
              ⭐ LEVEL UP! ⭐
            </div>
            <div className="text-3xl font-bold text-center">
              {message}
            </div>
            <div className="text-xl text-center mt-2 opacity-90">
              You're getting better!
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-12 py-8 rounded-3xl shadow-2xl border-4 border-white">
            <div className="text-5xl font-black text-center mb-2">
              💙 Let's Try Easier Words 💙
            </div>
            <div className="text-2xl font-bold text-center">
              {message}
            </div>
            <div className="text-xl text-center mt-2 opacity-90">
              Take your time!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
