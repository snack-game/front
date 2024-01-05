/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-light': '#DEF9FF',
        primary: '#9BCBD6',
        'primary-dark': '#48C6D5',
        'primary-deep-dark': '#113F4C',

        background: '#F8F8F8',
      },

      fontFamily: {
        dovemayo: ['DovemayoGothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
