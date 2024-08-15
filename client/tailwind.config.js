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
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'linear' },
        },
      },
      animation: {
        bounce: 'bounce 2s infinite', // Aumentando a dura��o para 2 segundos
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

