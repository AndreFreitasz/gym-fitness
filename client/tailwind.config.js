/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
      height: {
        'screen-72': 'calc(100vh - 72px)',
      }
    },
  },
  plugins: [],
}

