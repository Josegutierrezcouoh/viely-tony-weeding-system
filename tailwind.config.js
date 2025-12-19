/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f8e6f7',
          100: '#e8b8e4',
          200: '#d98ad1',
          300: '#ca5cbe',
          400: '#bb2eab',
          500: '#CA38F2',  // Color más claro
          600: '#8A048C',  // Principal
          700: '#73026B',  // Principal oscuro
          800: '#5c0256',
          900: '#4a0145',
        },
      },
    },
  },
  plugins: [],
}
