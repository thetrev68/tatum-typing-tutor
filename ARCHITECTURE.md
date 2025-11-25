# Architecture & Design

## Directory Structure
```text
src/
├── components/       # Visual UI elements
│   ├── Keyboard.jsx      # Visual hint system
│   ├── StreakCounter.jsx # Gamification UI
│   └── WordDisplay.jsx   # The main "Stage" text
├── data/             # Static content
│   └── words.js          # Dolch/Fry word lists by difficulty
├── hooks/            # Core Business Logic (Headless)
│   ├── useGameSounds.js  # Audio synthesis & TTS wrapper
│   └── useTypingEngine.js# Keystroke validation & cursor tracking
├── App.jsx           # Main Game Controller / State Machine
└── main.jsx          # Entry point

Key Systems
1. The Typing Engine (useTypingEngine)
Input: Listens to global window.keydown events.

Logic: Compares event.key against targetWord[cursorIndex].

State: Manages the cursor position (0 to word.length).

Feedback: Triggers specific callbacks (onCorrect, onError, onComplete) to the UI layer.

2. The Audio System (useGameSounds)
Philosophy: Zero assets. All sounds are generated at runtime.

SFX: Uses AudioContext oscillators (Sine/Sawtooth waves) for positive/negative reinforcement.

Voice: Wraps window.speechSynthesis to pronounce words before and after typing.

3. The Visual Hint System
Logic: The App component calculates the targetLetter based on the current cursor position.

UI: The Keyboard component receives this prop and conditionally applies a "highlight" class (Yellow/Bounce) to the matching visual key.