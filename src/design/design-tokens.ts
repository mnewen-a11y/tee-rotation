# In design-tokens.ts, Zeile ~48-60:

# ERSETZE:
export const spacing = {
  0: '0',           // 0px
  1: '0.25rem',     // 4px  - Tight spacing
  2: '0.5rem',      // 8px  - Standard unit
  3: '0.75rem',     // 12px - Compact
  4: '1rem',        // 16px - Base spacing
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px - Medium spacing
  8: '2rem',        // 32px - Large spacing
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px - XL spacing
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
} as const;

# MIT:
export const spacing = {
  0: '0',           // 0px
  1: '0.25rem',     // 4px  - Tight spacing
  2: '0.5rem',      // 8px  - Standard unit
  3: '0.75rem',     // 12px - Compact
  3.5: '0.875rem',  // 14px - Button padding (HIG standard)
  4: '1rem',        // 16px - Base spacing
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px - Medium spacing
  8: '2rem',        // 32px - Large spacing
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px - XL spacing
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
} as const;

# Hinzugefügt: 3.5: '0.875rem' (14px)
