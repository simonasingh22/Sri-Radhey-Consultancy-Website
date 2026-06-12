/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F2B5B', // Navy Blue
          light: '#1e3d73',
          dark: '#081a3b',
        },
        secondary: {
          DEFAULT: '#0A6E4F', // Forest Green
          light: '#0e8f67',
          dark: '#064c37',
        },
        accent: {
          DEFAULT: '#C8A44D', // Gold
          light: '#d6ba73',
          dark: '#a88432',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F4F7FA', // Off-white/slate light
        },
        text: {
          DEFAULT: '#1A1A1A', // Off-black
          muted: '#5A6A85',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(15, 43, 91, 0.1)',
        'premium-hover': '0 20px 40px -15px rgba(15, 43, 91, 0.15)',
      }
    },
  },
  plugins: [],
}
