/**
 * Fonts:
 *   - Inter            : SIL Open Font License 1.1  (rsms.me/inter)
 *   - Noto Sans        : SIL Open Font License 1.1  (google/fonts)
 *   - Source Sans 3    : SIL Open Font License 1.1  (adobe/source-sans)
 *   - Cormorant Garamond: SIL Open Font License 1.1 (google/fonts)
 *   - Playfair Display : SIL Open Font License 1.1  (google/fonts)
 * All fonts are libre / OFL – no proprietary fonts used.
 * See ABOUT.md for full license text references.
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
        // UI text: Inter → Noto Sans → Source Sans 3 → system fallbacks (all OFL)
        sans: ['Inter', 'Noto Sans', 'Source Sans 3', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
        // Headlines / tea names: Cormorant Garamond → Playfair Display (both OFL)
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        // Display / logo
        display: ['Playfair Display', 'Cormorant Garamond', 'serif'],
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
