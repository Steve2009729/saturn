/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ash: {
          950: '#080A0E',
          900: '#0F1419',
          800: '#161B22',
          700: '#1D2431',
          600: '#242C3A',
          500: '#2B3445',
          400: '#3D4A5C',
          300: '#5A6B81',
          200: '#8B95A8',
          100: '#C5D0DC',
          50: '#E8ECEF',
        },
        saturn: {
          gold: '#F0A500',
          'gold-dark': '#D68D00',
          'gold-light': '#FFC84D',
          green: '#3FB950',
          red: '#F85149',
          purple: '#8B5CF6',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        mono: ['var(--font-share-mono)', 'monospace'],
      },
      animation: {
        ticker: 'ticker-scroll 30s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      keyframes: {
        'ticker-scroll': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(240, 165, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(240, 165, 0, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-in': {
          from: { transform: 'translateX(-20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
