/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: '#161623',
          darker: '#20202c',
          dark: '#363349',
          normal: '#5c5879',
          bright: '#716c93'
        },
        white: '#edf2f5',
        background: '#12121f',
        black: '#0f0f10',
        error: '#e53333'
      }
    },
  },
  plugins: [],
}
