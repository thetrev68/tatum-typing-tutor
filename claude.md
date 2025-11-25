# Claude Context: Tatum's Typing Adventure

## Project Overview
A personalized, browser-based typing and sight-reading game for K-1 students, optimized for Chromebooks and mobile devices. The app teaches kindergarteners and 1st graders how to type and sight-read simultaneously using immediate audio-visual feedback. Features a warm amber/orange theme with prominent "TATUM'S" branding for personalization.

## Core Design Principles
- **Zero Assets:** All graphics use programmatic SVGs; all audio uses Web Audio API + SpeechSynthesis API
- **Offline-First:** Designed to run on low-spec Chromebooks, tablets, and phones without internet
- **Immediate Feedback:** Real-time audio and visual responses to user input
- **Age-Appropriate UX:** Large buttons, clear colors, simple navigation for 5-6 year olds
- **ADHD-Friendly:** Warm amber/orange color scheme, high contrast, clear visual hierarchy
- **Mobile-Responsive:** Fully responsive design from 320px (mobile) to 1920px+ (desktop)

## Tech Stack
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/postcss` adapter)
- **Language:** JavaScript (ES6+)
- **No External Assets:** Programmatic generation only

## Project Structure
```
src/
├── components/          # Visual UI elements
│   ├── Keyboard.jsx              # Responsive on-screen keyboard (highlights next key)
│   ├── Mascot.jsx                # Animated SVG character with mood states
│   ├── StreakCounter.jsx         # Fire emoji streak counter (bottom-left)
│   ├── WordDisplay.jsx           # Responsive word display (changes color per letter)
│   ├── WinScreen.jsx             # Victory celebration screen
│   ├── StatsDisplay.jsx          # Persistent game statistics
│   └── LevelUpNotification.jsx   # Difficulty change overlay
├── data/               # Static content
│   └── words.js                  # Word lists: beginner, kindergarten, fun, firstGrade
├── hooks/              # Core Business Logic (Headless)
│   ├── useGameSounds.js          # Audio synthesis & TTS wrapper
│   ├── useTypingEngine.js        # Keystroke validation & cursor tracking
│   ├── useDifficultyProgression.js # Adaptive difficulty system
│   └── useLocalStorage.js        # Persistent stats & preferences
├── App.jsx             # Main Game Controller / State Machine
├── main.jsx            # Entry point
└── index.html          # HTML entry with favicon
public/
└── favicon.svg         # Custom "T" logo with warm gradient
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
- **States:** `menu` (start screen) | `playing` (active game) | `win` (completion screen)
- **Word Flow:** Random word → User types → Success audio → Next word
- **Streak System:** Counts consecutive perfect words (no errors)
- **Adaptive Difficulty:** Automatically adjusts word difficulty based on performance

### 5. Difficulty Progression ([useDifficultyProgression.js](src/hooks/useDifficultyProgression.js))
- Tracks accuracy and adjusts difficulty dynamically
- Provides visual feedback for level changes
- Maintains balanced challenge for optimal learning

### 6. Local Storage ([useLocalStorage.js](src/hooks/useLocalStorage.js))
- Persists game statistics (games played, words typed, accuracy)
- Saves user preferences (last selected word path, words per game)
- Uses React hooks with proper memoization to prevent race conditions

## Completed Features
- [x] Dynamic typing validation with real-time feedback
- [x] Visual feedback (Green correct / Orange current / Red shake error)
- [x] Audio feedback (TTS + synthesized SFX)
- [x] Responsive on-screen keyboard with next-key highlighting
- [x] Streak counter for perfect words (bottom-left with fire emoji)
- [x] Tailwind v4 styling with warm amber/orange theme
- [x] Level selector (4 word paths: Beginner, Kindergarten, Fun, 1st Grade)
- [x] Win state with celebratory animations
- [x] SVG mascot character with mood reactions (neutral, happy, celebrating, excited)
- [x] Local storage persistence for stats and preferences
- [x] Adaptive difficulty progression system
- [x] Mobile-responsive design (320px to 1920px+)
- [x] Personalized branding with "TATUM'S" hero text
- [x] Custom SVG favicon with "T" logo

## Design System

### Color Palette (Warm Theme)
- **Primary Background:** `bg-linear-to-br from-amber-100 via-orange-50 to-yellow-100`
- **Game Board:** `bg-linear-to-b from-white to-orange-50` with `border-orange-300`
- **Branding:** `text-orange-500` with `text-amber-700` subtitle
- **Buttons (Active):** `bg-orange-500` with hover states
- **Buttons (Inactive):** `bg-amber-50 text-amber-800 border-amber-200`
- **Success:** `text-green-500` (typed letters)
- **Current:** `text-orange-600 border-orange-400` (current letter)
- **Error:** `text-red-500` (shake animation)

### Responsive Breakpoints
- **Mobile:** < 640px (sm:)
- **Tablet:** 640px - 768px
- **Desktop:** > 768px (md:)

Uses Tailwind responsive classes: `text-5xl sm:text-7xl md:text-9xl`

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
- Large touch/click targets for small hands (touch-friendly on mobile)
- High contrast colors with warm amber/orange theme
- Clear audio pronunciation with adjustable speech rate
- Forgiving error feedback (encouragement-focused)
- Responsive design adapts to all screen sizes
- ADHD-friendly: high contrast, warm colors, clear visual hierarchy

### Code Style
- Functional React with hooks (no class components)
- Component composition over prop drilling
- Custom hooks for complex logic (properly memoized with useCallback)
- Tailwind utility classes over custom CSS
- Responsive-first: use `sm:` and `md:` prefixes for breakpoints
- Accessibility: proper ARIA labels, keyboard navigation

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
- Use `bg-linear-to-*` instead of `bg-gradient-to-*` (Tailwind v4)
- Maintain warm color palette: amber, orange, yellow tones
- Use responsive classes: `text-5xl sm:text-7xl md:text-9xl`
- Add touch feedback: `hover:` and `active:` states

### Making Components Mobile-Responsive
1. Add responsive text sizing: `text-sm sm:text-base md:text-lg`
2. Add responsive spacing: `p-2 sm:p-4 md:p-6`
3. Add responsive layout: `flex-col sm:flex-row`
4. Scale components: `scale-75 sm:scale-90 md:scale-100`
5. Test on mobile viewports (320px minimum)

## Important Notes
- All audio must remain programmatic (no MP3/WAV files)
- All graphics must remain SVG-based (no PNG/JPG, except favicon.svg)
- Keep bundle size minimal for Chromebook performance
- Test on low-bandwidth scenarios
- Ensure keyboard events work on both physical and virtual keyboards
- Speech synthesis may require user interaction to initialize (browser security)
- Always use `useCallback` for functions in custom hooks to prevent race conditions
- Keep warm amber/orange theme consistent across all components

## Known Issues / Considerations
- Speech API voice quality varies by browser/OS
- Some Chromebooks may have delayed audio synthesis
- Mobile devices need special handling for speech synthesis initialization
- React Compiler requires proper dependency arrays in useCallback hooks
- localStorage must be wrapped with error handling for browser compatibility

## Related Documentation
- [README.md](README.md) - Project overview and setup
- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed system design
- [ROADMAP.md](ROADMAP.md) - Development phases and task list
