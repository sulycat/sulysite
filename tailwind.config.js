module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-dark': {
          600: '#2d2d3f',
          700: '#252536',
          800: '#1e1e2e',
          900: '#181825',
        },
        'warm-light': {
          100: '#fff9f0',
          200: '#fff4e0',
          300: '#ffefd1',
          400: '#ffe9c2',
        },
        'warm-gray': {
          100: '#f7f3f0',
          300: '#d3ccc6',
          400: '#b8aea5',
          500: '#9c9187',
          600: '#82766c',
          700: '#685c53',
          800: '#4e443c',
          900: '#352d26',
        },
        'green': {
          400: '#4ade80',
          500: '#22c55e',
        },
        'yellow': {
          400: '#facc15',
          500: '#eab308',
        },
        'red': {
          400: '#f87171',
          500: '#ef4444',
        },
        'blue': {
          600: '#2563eb',
        },
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
      }
    },
  },
  plugins: [],
}