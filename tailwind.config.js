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
      },

      fontFamily: {
        sans: ['DovemayoGothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
