/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('./clouds.png')", // Adjust the path as needed
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(15deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        move: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-2px)' },
        },
      },
      animation: {
        'rotate': 'rotate 2s ease-in-out infinite',
        'move': 'move 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}