# Claude Context: Tatum Typing Tutor

## Project Overview
A lightweight, browser-based typing and sight-reading game for K-1 students, optimized for Chromebooks. The app teaches kindergarteners and 1st graders how to type and sight-read simultaneously using immediate audio-visual feedback.

## Core Design Principles
- **Zero Assets:** All graphics use programmatic SVGs; all audio uses Web Audio API + SpeechSynthesis API
- **Offline-First:** Designed to run on low-spec Chromebooks without internet
- **Immediate Feedback:** Real-time audio and visual responses to user input
- **Age-Appropriate UX:** Large buttons, clear colors, simple navigation for 5-6 year olds

## Tech Stack
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/postcss` adapter)
- **Language:** JavaScript (ES6+)
- **No External Assets:** Programmatic generation only

## Project Structure
```
src/
├── components/          # Visual UI elements
│   ├── Keyboard.jsx         # Visual hint system (highlights next key)
│   ├── StreakCounter.jsx    # Gamification UI (perfect word counter)
│   └── WordDisplay.jsx      # Main "Stage" text display
├── data/               # Static content
│   └── words.js            # Dolch/Fry word lists by difficulty
├── hooks/              # Core Business Logic (Headless)
│   ├── useGameSounds.js    # Audio synthesis & TTS wrapper
│   └── useTypingEngine.js  # Keystroke validation & cursor tracking
├── App.jsx             # Main Game Controller / State Machine
└── main.jsx            # Entry point
```

## Key Systems

### 1. Typing Engine ([useTypingEngine.js](src/hooks/useTypingEngine.js))
- **Input:** Listens to global `window.keydown` events
- **Logic:** Compares `event.key` against `targetWord[cursorIndex]`
- **State:** Manages cursor position (0 to word.length)
- **Feedback:** Triggers callbacks (`onCorrect`, `onError`, `onComplete`)

### 2. Audio System ([useGameSounds.js](src/hooks/useGameSounds.js))
- **SFX:** Uses AudioContext oscillators (Sine/Sawtooth waves) for feedback
- **Voice:** Wraps `window.speechSynthesis` to pronounce words
- **Zero Files:** All audio generated at runtime

### 3. Visual Hint System ([Keyboard.jsx](src/components/Keyboard.jsx))
- Receives `targetLetter` prop from App
- Highlights the specific key needed next (Yellow/Bounce animation)
- Visual QWERTY keyboard display

### 4. Game State Machine ([App.jsx](src/App.jsx))
- **States:** `menu` (start screen) | `playing` (active game)
- **Word Flow:** Random word → User types → Success audio → Next word
- **Streak System:** Counts consecutive perfect words (no errors)

## Current Features (Phase 1 - Complete)
- [x] Dynamic typing validation
- [x] Visual feedback (Green correct / Red shake error)
- [x] Audio feedback (TTS + synthesized SFX)
- [x] Assistive keyboard with next-key highlighting
- [x] Streak counter for perfect words
- [x] Tailwind v4 styling system

## Active Development (Phase 2)
- [ ] Level selector (K vs 1st grade words)
- [ ] Win state / Level complete screen
- [ ] SVG mascot character with reactions

## Future Enhancements
- **Phase 3:** Local storage persistence + PWA for offline install
- **Phase 4:** Teacher mode with letter-accuracy analytics

## Development Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
```

## Design Constraints

### Performance
- Must run smoothly on low-spec Chromebooks
- No heavy asset downloads
- Minimal dependencies

### UX Requirements
- Large touch/click targets for small hands
- High contrast colors
- Clear audio pronunciation
- Forgiving error feedback (encouragement-focused)

### Code Style
- Functional React with hooks (no class components)
- Component composition over prop drilling
- Custom hooks for complex logic
- Tailwind utility classes over custom CSS

## Common Tasks for Claude

### Adding New Words
Edit [src/data/words.js](src/data/words.js) - organized by grade level (kindergarten, firstGrade)

### Adjusting Audio
Modify [src/hooks/useGameSounds.js](src/hooks/useGameSounds.js) - oscillator frequencies, speech rate, volume

### Changing Visual Feedback
Edit [src/components/WordDisplay.jsx](src/components/WordDisplay.jsx) - letter colors, animations, shake effects

### Modifying Typing Logic
Update [src/hooks/useTypingEngine.js](src/hooks/useTypingEngine.js) - validation rules, cursor behavior

### Styling Changes
Use Tailwind classes in components - v4 syntax with `@tailwindcss/postcss` adapter

## Important Notes
- All audio must remain programmatic (no MP3/WAV files)
- All graphics must remain SVG-based (no PNG/JPG)
- Keep bundle size minimal for Chromebook performance
- Test on low-bandwidth scenarios
- Ensure keyboard events work on both physical and virtual keyboards
- Speech synthesis may require user interaction to initialize (browser security)

## Known Issues / Considerations
- Speech API voice quality varies by browser/OS
- Some Chromebooks may have delayed audio synthesis
- Mobile devices need special handling for speech synthesis initialization

## Related Documentation
- [README.md](README.md) - Project overview and setup
- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed system design
- [ROADMAP.md](ROADMAP.md) - Development phases and task list
