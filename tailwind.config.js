/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode intentionally removed — Light theme only
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        display: ['Playfair Display', 'Cormorant Garamond', 'serif'],
      },
      colors: {
        midnight: '#1d2646',
        gold: '#c6b975',
        'gold-text': '#242b46',
        ivory: '#FFFFF0',
        // Status (kept for fill-level indicators)
        status: {
          good:    '#34C759',
          warning: '#FF9500',
          danger:  '#FF3B30',
        },
        // Tea-type accents
        tea: {
          black:  '#8B4513',
          green:  '#4CAF50',
          oolong: '#DAA520',
          chai:   '#A0522D',
        },
      },
      borderRadius: {
        'ios':    '12px',
        'ios-lg': '20px',
        'ios-xl': '24px',
      },
      boxShadow: {
        'ios':    '0 2px 8px rgba(0,0,0,0.04)',
        'ios-md': '0 4px 16px rgba(0,0,0,0.08)',
        'ios-lg': '0 8px 40px rgba(0,0,0,0.18)',
      },
      backdropBlur: {
        'ios': '24px',
      },
    },
  },
  plugins: [],
}
