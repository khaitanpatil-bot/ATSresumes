export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        accent: '#10b981',
        warn: '#f59e0b',
        danger: '#ef4444'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #312e81 0%, #1d4ed8 100%)'
      }
    }
  },
  plugins: []
}
