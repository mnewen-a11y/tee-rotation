/**
 * Fonts:
 *   - System Font Stack: Native fonts for each platform
 *     - iOS/macOS: SF Pro (Apple's system font)
 *     - Android: Roboto
 *     - Windows: Segoe UI
 *   - Serif: System serif stack with fallbacks
 * Using system fonts = better performance, native feel, accessibility
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // System Font Stack - automatically uses SF Pro on iOS/macOS
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        // Serif AUCH auf Sans umgestellt für Konsistenz
        serif: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        // Display = same as sans
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        midnight:    '#1d2646',
        gold:        '#c6b975',
        'gold-text': '#242b46',
        ivory:       '#FFFFF0',
        status: {
          good:    '#34C759',
          warning: '#FF9500',
          danger:  '#FF3B30',
        },
        tea: {
          black:   '#8B4513',
          green:   '#4CAF50',
          oolong:  '#DAA520',
          chai:    '#A0522D',
          jasmin:  '#C77DFF',
          kräuter: '#2E8B57',
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
