---

### 3. `ROADMAP.md`
This is your Project Plan. It turns abstract ideas into actionable tickets.

```markdown
# Development Roadmap

## ✅ Phase 1: Proof of Concept (Completed)
- [x] Basic React + Vite Scaffold.
- [x] Tailwind v4 Configuration.
- [x] Typing Engine (Keystroke detection).
- [x] Audio System (TTS + Synth SFX).
- [x] Visual Keyboard Hints.
- [x] Basic "Streak" Gamification.

## 🚧 Phase 2: Core Gameplay Loop (Current Focus)
- [x] **Level Selector:** Add a "Settings" or "Menu" toggle to switch between Kindergarten (Letters/CVC) and 1st Grade (Sight Words).
- [x] **Win State:** Define what happens after X words (e.g., a "Level Complete" screen with fireworks).
- [x] **Visual Polish:** Add a "Main Character" (SVG Mascot) that reacts to typing.

## 🔮 Phase 3: Persistence & PWA
- [x] **Local Storage:** Save the user's high score and selected difficulty level so it remembers them on refresh.
- [~] **PWA Configuration:** Add `manifest.json` and Service Workers so the app can be installed on a Chromebook and run without Wi-Fi.

## 🚀 Phase 4: Data & Analytics (Optional)
- [ ] **Teacher Mode:** Track which letters the user misses most frequently (e.g., "User struggles with 'Q' vs 'P'").