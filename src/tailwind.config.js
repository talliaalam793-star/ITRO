/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hot-pink': '#FF69B4',
        'pink': '#FFB6C1',
        'baby-pink': '#FFD1DC',
        'light-blue': '#ADD8E6',
        'gold': '#FFD700',
      },
      backgroundImage: {
        'bubble-wave': 'radial-gradient(circle at 20% 30%, rgba(255,105,180,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(173,216,230,0.3) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(255,182,193,0.2) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}