/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'], // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        'waving-apple': 'wave 2s linear infinite',
      },
      fontFamily: {
        dove: 'Dovemayo_gothic',
        kcc: 'KCC-Ganpan',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
