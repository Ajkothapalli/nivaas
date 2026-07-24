import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF7',
        surface: '#FFFFFF',
        ink: '#1A1A1A',
        'ink-muted': '#5C5C5C',
        accent: '#2D4A3E',
        'accent-hover': '#243C32',
        border: '#E8E6DF',
        success: '#2D4A3E',
        error: '#B23A3A',
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'hm-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'hm-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'hm-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      borderRadius: {
        card: '1rem',
        button: '0.75rem',
        input: '0.5rem',
      },
      maxWidth: {
        site: '80rem',
      },
      spacing: {
        section: '5rem',
        'section-lg': '7rem',
      },
      keyframes: {
        'fade-slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-slide-down': 'fade-slide-down 0.2s ease-out',
        'pop-in': 'pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s backwards',
        'fade-in': 'fade-in 0.35s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
