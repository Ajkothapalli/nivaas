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
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
    },
  },
  plugins: [],
}

export default config
