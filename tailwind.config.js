/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C5CFC',
        'primary-light': '#9D86FF',
        'primary-dark': '#5B3DF0',
        'glow': '#A78BFA',
        black: '#000000',
        'black-100': '#0a0a0a',
        'black-200': '#111111',
        'black-300': '#18181b',
        'zinc-100': '#fafafa',
        'zinc-200': '#e4e4e7',
        'zinc-300': '#d4d4d8',
        'zinc-400': '#a1a1aa',
        'zinc-500': '#71717a',
        'zinc-600': '#52525b',
        'zinc-700': '#3f3f46',
        'zinc-800': '#27272a',
        'zinc-900': '#18181b',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'ultra': '0.4em',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'beam': 'beam 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        beam: {
          '0%, 100%': { opacity: '0.6', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(40px)' },
          '50%': { opacity: '0.7', filter: 'blur(60px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
