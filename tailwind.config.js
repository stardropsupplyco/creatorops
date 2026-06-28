export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        ink: '#1A1A2E',
        'ink-light': '#2D2D44',
        gold: '#C9922A',
        'gold-light': '#E8B84B',
        sage: '#4A7C59',
        rose: '#C4614A',
        muted: '#8A8AA0',
        soft: '#C0C0D0',
        border: '#E8E4DC',
        surface: '#FAFAF7',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
