import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        headline: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['Space Grotesk', 'Inter', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        syne: ['Syne', 'Space Grotesk', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'Cormorant Garamond', 'serif'],
        classical: ['Cinzel', 'Playfair Display', 'serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        editorial: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        grotesk: ['Space Grotesk', 'Inter', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        crimson: {
          DEFAULT: '#ff2638',
          50: '#fff1f2',
          100: '#ffe4e6',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          vivid: '#e52536',
          glow: '#ff334b',
        },
        travertine: {
          50: '#f8f8f4',
          100: '#efeee7',
          200: '#e1dfd4',
          300: '#d1cfc1',
          400: '#c4c3b6',
          500: '#a8a798',
          600: '#8c8b7b',
          700: '#6f6e5f',
          800: '#535246',
          900: '#38372e',
        },
        obsidian: {
          950: '#060609',
          900: '#09090e',
          850: '#0f1017',
          800: '#141620',
          750: '#1a1d2b',
          700: '#232638',
        },
        ink: '#0e0f13',
        gold: {
          roman: '#b89047',
          amber: '#d4a359',
          light: '#f3d99f',
        },
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
      },
      letterSpacing: {
        widest: '.2em',
        epic: '.35em',
      },
      borderRadius: {
        pill: '9999px',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 24s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
