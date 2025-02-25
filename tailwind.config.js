/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/web/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#cc0e4d',
        'primary-light': '#e6739f',
        'primary-muted': '#f1d4d4',
        text: '#121212',
        alt: '#ffffff',
        input: '#dddde0',
        disabled: '#eeeeef',
        error: '#dc0a4d',
      },
      spacing: {
        '112': '28rem', // For the huge accent size
      },
      borderRadius: {
        'xl': '10px',
      },
      boxShadow: {
        'card': '0 5px 20px -2px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 30px -4px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s',
        'fade-out': 'fadeOut 0.25s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} 