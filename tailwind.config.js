/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This overrides the default font to be Schoolbell
        sans: ['"Schoolbell"', 'cursive', 'sans-serif'], 
        mono: ['"Courier New"', 'monospace'], // Keep mono for the word display if you prefer
      }
    },
  },
  plugins: [],
}