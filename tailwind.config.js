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
        // Brand Y2K Palette
        periwinkle: {
          DEFAULT: '#6C6CEB',
          dark: '#5555d6',
          light: '#8585f2',
          deep: '#4b4bbd',
        },
        card: {
          kawaii: '#F5F4FF',
          hover: '#EBE9FE',
          dark: '#1A1A1A',
        },
        pink: {
          kawaii: '#F4A6C6',
          highlight: '#FBD0E4',
          shadow: '#E27FA8',
          deep: '#d96596',
        },
        yellow: {
          kawaii: '#F3E29B',
          highlight: '#FFF3B8',
          shadow: '#D8BF58',
        },
        mint: {
          kawaii: '#A9E8D6',
          highlight: '#C6F5E8',
          shadow: '#76CBB3',
        },
        cable: {
          grey: '#B4B3E6',
          dark: '#8B8AC9',
        },
        ink: '#1A1A1A',
        glitch: {
          cyan: '#5FE0E0',
          magenta: '#F24FA0',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Quicksand', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'Outfit', 'Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'sticker-sm': '2px 2px 0px 0px #1A1A1A',
        'sticker': '4px 4px 0px 0px #1A1A1A',
        'sticker-md': '5px 5px 0px 0px #1A1A1A',
        'sticker-lg': '7px 7px 0px 0px #1A1A1A',
        'sticker-pink': '4px 4px 0px 0px #E27FA8',
        'sticker-yellow': '4px 4px 0px 0px #D8BF58',
        'sticker-mint': '4px 4px 0px 0px #76CBB3',
        'sticker-inset': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.4)',
      },
      borderWidth: {
        '2.5': '2.5px',
        '3': '3px',
      },
      letterSpacing: {
        'glitch': '0.08em',
      },
    },
  },
  plugins: [],
};
