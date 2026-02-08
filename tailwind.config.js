/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        midnight: '#1d2646',
        gold: '#c6b975',
        'gold-text': '#242b46',
        ios: {
          bg: '#F2F2F7',
          card: '#FFFFFF',
          border: '#E5E5EA',
          label: '#000000',
          secondary: '#8E8E93',
          blue: '#007AFF',
          green: '#34C759',
          orange: '#FF9500',
          red: '#FF3B30',
        },
        tea: {
          black: '#8B4513',
          green: '#4CAF50',
          oolong: '#DAA520',
          chai: '#A0522D',
        }
      },
      borderRadius: {
        'ios': '12px',
        'ios-lg': '20px',
        'ios-xl': '24px',
      },
      boxShadow: {
        'ios': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'ios-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        'ios': '24px',
      }
    },
  },
  plugins: [],
}
