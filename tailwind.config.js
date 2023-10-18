/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        yellow: 'var(--color-yellow)',
      },
      spacing: {
        '1/10': '10%',
        '2/5': '40%',
        '1/5': '20%',
      },
      maxWidth: {
        '2/3': '66.666667%',
        '11/12': '91.666667%',
        '28': '7rem',
      },
      maxHeight: {
        '3/4': '75%',
      },
      rotate: {
        '225': '225deg',
      }
    },
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1024px',
      },
    },
  },
  plugins: []
}