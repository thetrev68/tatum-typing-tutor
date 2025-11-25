# Tatum Typing Tutor

A lightweight, browser-based typing and sight-reading game designed for K-1 students (Chromebook optimized).

## 🎯 Project Goal
To teach kindergarteners and 1st graders how to type and sight-read simultaneously using immediate audio-visual feedback. The app is designed to run offline on low-spec hardware (Chromebooks) by avoiding heavy asset downloads.

## 🛠 Tech Stack
* **Core:** React 18 + Vite
* **Styling:** Tailwind CSS v4 (using the `@tailwindcss/postcss` adapter)
* **Language:** JavaScript (ES6+)
* **Assets:** Programmatic SVGs (No raster images)
* **Audio:** Web Audio API + SpeechSynthesis API (No external sound files)

## 🚀 Getting Started

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/thetrev68/tatum-typing-tutor.git](https://github.com/thetrev68/tatum-typing-tutor.git)
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 🎮 Current Features
* **Dynamic Typing Engine:** Validates keystrokes in real-time.
* **Visual Feedback:** Green (correct) / Red Shake (error) indicators.
* **Audio Feedback:** TTS (Text-to-Speech) for words + Synthesized SFX for interactions.
* **Assistive Keyboard:** On-screen keyboard highlights the specific key required next.
* **Gamification:** Streak counter for perfect words.