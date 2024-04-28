/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-light': '#fcf9f7',
        primary: '#EF8B5A',
        'primary-dark': '#a4693a',
        'primary-deep-dark': '#482e19',

        game: '#FFEDD5',

        'button-disabled': '#939393',
        'button-enabled': '#22c55e',
      },

      fontFamily: {
        sans: ['DovemayoGothic', 'sans-serif'],
      },

      boxShadow: {
        navigation:
          '0px 0px 4px 0px rgba(0, 0, 0, 0.4), 2px 4px 12px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
