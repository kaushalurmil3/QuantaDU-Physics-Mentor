/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dce5f2',
          200: '#b9cbE5',
          300: '#8aacd2',
          400: '#5c8ab8',
          500: '#3a6c9e',
          600: '#2b5480',
          700: '#234367',
          800: '#1a3350',
          900: '#122339',
          950: '#0b1626',
        },
        amber: {
          accent: '#f5a623',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(11, 22, 38, 0.08), 0 4px 14px rgba(11, 22, 38, 0.06)',
        'card-hover': '0 2px 6px rgba(11, 22, 38, 0.1), 0 10px 28px rgba(11, 22, 38, 0.12)',
      },
    },
  },
  plugins: [],
};
