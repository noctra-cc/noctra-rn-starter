/** @type {import('tailwindcss').Config} */
const colors = require('./src/core/config/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors
    },
  },
  plugins: [],
}