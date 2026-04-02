/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './*.js',
    './*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-charcoal': '#1a1d29',
        'neon-blue': '#00d4ff',
        'neon-blue-glow': '#00a3cc'
      }
    }
  },
  plugins: [],
}
