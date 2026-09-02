/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: {
          DEFAULT: '#141414',
          card: '#1a1a1a',
          hover: '#222222',
          border: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#c9884f',
          hover: '#d9975b',
          amber: '#e09f53',
          dark: '#8c592d',
          glow: 'rgba(201, 136, 79, 0.25)',
        },
        primary: {
          DEFAULT: '#f5f5f0',
          muted: '#9a9a9a',
          dark: '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'amber-glow': 'radial-gradient(ellipse at center, rgba(201, 136, 79, 0.18) 0%, rgba(10, 10, 10, 0.95) 75%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.95) 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(18,18,18,0.95) 100%)',
      },
      boxShadow: {
        'copper': '0 0 25px -5px rgba(201, 136, 79, 0.3)',
        'copper-lg': '0 0 45px -5px rgba(201, 136, 79, 0.4)',
        'panel': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      },
      letterSpacing: {
        'widest-luxury': '0.25em',
        'tracked': '0.15em',
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
