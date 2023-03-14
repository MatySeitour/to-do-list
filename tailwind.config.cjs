/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        spin_gear: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(180deg)' },
        },
        spin_gear: {
          '0%, 100': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle .5s ease',
        spin_gear: 'spin_gear .5s ease',
      }
    },
  },
  plugins: [require("daisyui")],
}
