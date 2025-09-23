export default {
  content: [
    './index.html',
    './src/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          sun: '#84cc16',    // green-yellow that blends well with teal
          navy: '#2563eb',   // blue
          teal: '#22c55e',   // green
          gray: '#a3a3a3',   // neutral gray, blends well with green and blue
          light: '#f5f5f5',  // faded gray-white
          dark: '#1b1b1b'    // deep dark background
        }
      },
      fontFamily: {
        sans: ['BankFont'],
      }
    }
  },
  darkMode: 'class',
  plugins: []
};
