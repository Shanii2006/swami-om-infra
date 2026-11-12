/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        asphalt: {
          950: '#121417',
          900: '#1C1F24',
          800: '#2A2F37',
          700: '#374151',
        },
        amber: {
          500: '#F59E0B',
          400: '#FBBF24',
          600: '#D97706',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Noto Sans Devanagari"', 'sans-serif'],
        sans: ['"Inter"', '"Noto Sans Devanagari"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
};
