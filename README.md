# Tatum's Typing Adventure

A personalized, browser-based typing and sight-reading game designed for K-1 students, optimized for Chromebooks and mobile devices.

## 🎯 Project Goal
To teach kindergarteners and 1st graders how to type and sight-read simultaneously using immediate audio-visual feedback. The app is designed to run offline on low-spec hardware (Chromebooks, tablets, phones) by avoiding heavy asset downloads.

## ✨ Design Features
* **Warm, Personalized Theme:** Amber/orange color scheme with prominent "TATUM'S" branding
* **Mobile-First Design:** Fully responsive for phones, tablets, and Chromebooks
* **ADHD-Friendly:** High contrast, warm colors, and clear visual hierarchy
* **Zero External Assets:** All graphics use programmatic SVGs; all audio uses Web Audio API

## 🛠 Tech Stack
* **Core:** React 18 + Vite
* **Styling:** Tailwind CSS v4 (using the `@tailwindcss/postcss` adapter)
* **Language:** JavaScript (ES6+)
* **Assets:** Programmatic SVGs (No raster images)
* **Audio:** Web Audio API + SpeechSynthesis API (No external sound files)

## 🚀 Getting Started

1.  **Clone the repo**
    ```bash
    git clone https://github.com/thetrev68/tatum-typing-tutor.git
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run Development Server**
    ```bash
    npm run dev
    ```
4.  **Build for Production**
    ```bash
    npm run build
    ```

## 🎮 Features

### Core Gameplay
* **Dynamic Typing Engine:** Real-time keystroke validation
* **Visual Feedback:** Green (correct) / Red shake (error) indicators
* **Audio Feedback:** TTS word pronunciation + synthesized sound effects
* **Assistive Keyboard:** On-screen keyboard highlights the next key needed
* **Animated Mascot:** React-based character with mood responses

### Progression System
* **Adaptive Difficulty:** Automatically adjusts challenge level based on performance
* **Multiple Word Sets:** Beginner, Kindergarten, Fun (Animals/Colors), 1st Grade
* **Streak Counter:** Tracks consecutive perfect words with fire emoji celebration
* **Win Screen:** Celebratory animations and performance stats

### Personalization & Stats
* **Persistent Stats:** Local storage tracks games played, words typed, accuracy
* **Progress Tracking:** Displays total games won, perfect words, best streak
* **Level Indicators:** Shows current difficulty and accuracy percentage

### Mobile Optimization
* **Responsive Layout:** Adapts to screen sizes from 320px (mobile) to 1920px+ (desktop)
* **Touch-Friendly:** Large buttons with active states for mobile interaction
* **Scalable Components:** All UI elements resize appropriately for device
* **Overflow Management:** Scrollable content on small screens