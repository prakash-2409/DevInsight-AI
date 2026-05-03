/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  // Enable dark mode with class strategy
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Using default Tailwind colors, no extensions needed
      },
      spacing: {
        // Using default spacing
      },
    },
  },
  plugins: [],
}
