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
      },
    },
  },
  plugins: [
    function({ addVariant, e }) {
      addVariant('autofill', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`autofill${separator}${className}`)}:-webkit-autofill,
            .${e(`autofill${separator}${className}`)}:-webkit-autofill:hover,
            .${e(`autofill${separator}${className}`)}:-webkit-autofill:focus,
            .${e(`autofill${separator}${className}`)}:-webkit-autofill:active`;
        });
      });
    },
  ],
}

