export const Mascot = ({ mood = 'neutral', size = 200 }) => {
  const getMoodStyles = () => {
    switch (mood) {
      case 'happy':
        return {
          eyeY: 45,
          mouthPath: 'M 60 80 Q 80 95 100 80',
          color: '#10b981',
          bounce: 'animate-bounce'
        };
      case 'excited':
        return {
          eyeY: 40,
          mouthPath: 'M 55 75 Q 80 100 105 75',
          color: '#f59e0b',
          bounce: 'animate-bounce'
        };
      case 'celebrating':
        return {
          eyeY: 35,
          mouthPath: 'M 50 70 Q 80 105 110 70',
          color: '#8b5cf6',
          bounce: 'animate-bounce'
        };
      default: // neutral
        return {
          eyeY: 50,
          mouthPath: 'M 65 85 Q 80 90 95 85',
          color: '#3b82f6',
          bounce: ''
        };
    }
  };

  const { eyeY, mouthPath, color, bounce } = getMoodStyles();

  return (
    <div className={`${bounce} transition-all duration-300`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main body - friendly blob shape */}
        <ellipse
          cx="80"
          cy="90"
          rx="60"
          ry="65"
          fill={color}
          className="transition-colors duration-300"
        />

        {/* Belly spot */}
        <ellipse
          cx="80"
          cy="100"
          rx="35"
          ry="40"
          fill="white"
          opacity="0.3"
        />

        {/* Left eye white */}
        <ellipse
          cx="60"
          cy={eyeY}
          rx="12"
          ry="15"
          fill="white"
        />

        {/* Right eye white */}
        <ellipse
          cx="100"
          cy={eyeY}
          rx="12"
          ry="15"
          fill="white"
        />

        {/* Left pupil */}
        <circle
          cx="60"
          cy={eyeY + 2}
          r="6"
          fill="#1f2937"
        />

        {/* Right pupil */}
        <circle
          cx="100"
          cy={eyeY + 2}
          r="6"
          fill="#1f2937"
        />

        {/* Eye shine highlights */}
        <circle cx="58" cy={eyeY} r="3" fill="white" opacity="0.8" />
        <circle cx="98" cy={eyeY} r="3" fill="white" opacity="0.8" />

        {/* Mouth */}
        <path
          d={mouthPath}
          stroke="#1f2937"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-300"
        />

        {/* Cheek blush - left */}
        {(mood === 'happy' || mood === 'excited' || mood === 'celebrating') && (
          <>
            <ellipse
              cx="45"
              cy="75"
              rx="8"
              ry="6"
              fill="#ff6b9d"
              opacity="0.4"
            />
            <ellipse
              cx="115"
              cy="75"
              rx="8"
              ry="6"
              fill="#ff6b9d"
              opacity="0.4"
            />
          </>
        )}

        {/* Celebrating sparkles */}
        {mood === 'celebrating' && (
          <>
            <text x="20" y="30" fontSize="20" fill="#fbbf24">✨</text>
            <text x="120" y="30" fontSize="20" fill="#fbbf24">✨</text>
            <text x="10" y="70" fontSize="16" fill="#fbbf24">⭐</text>
            <text x="135" y="70" fontSize="16" fill="#fbbf24">⭐</text>
          </>
        )}

        {/* Little arms */}
        <ellipse
          cx="25"
          cy="90"
          rx="15"
          ry="8"
          fill={color}
          opacity="0.9"
          className="transition-colors duration-300"
          transform="rotate(-20 25 90)"
        />
        <ellipse
          cx="135"
          cy="90"
          rx="15"
          ry="8"
          fill={color}
          opacity="0.9"
          className="transition-colors duration-300"
          transform="rotate(20 135 90)"
        />

        {/* Shadow */}
        <ellipse
          cx="80"
          cy="155"
          rx="40"
          ry="5"
          fill="black"
          opacity="0.1"
        />
      </svg>
    </div>
  );
};
