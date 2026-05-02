/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
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
