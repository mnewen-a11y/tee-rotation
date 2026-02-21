/**
 * Royal-Tea Design System
 * Based on Apple Human Interface Guidelines (iOS 26)
 */

export const colors = {
  brand: {
    gold: '#C9AE4D',
    goldDark: '#B8952F',
    goldLight: '#D4C47E',
  },
  semantic: {
    primary: '#C9AE4D',
    systemBlue: '#007AFF',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
  },
  neutral: {
    midnight: '#0F172A',
    midnightLight: '#1D2646',
    cream: '#FFFFF0',
    white: '#FFFFFF',
    black: '#000000',
  },
  text: {
    primary: '#0F172A',
    secondary: 'rgba(15, 23, 42, 0.6)',
    tertiary: 'rgba(15, 23, 42, 0.4)',
    inverse: '#FFFFFF',
  },
  interactive: {
    hover: 'rgba(120, 120, 128, 0.08)',
    active: 'rgba(120, 120, 128, 0.16)',
    disabled: 'rgba(120, 120, 128, 0.3)',
  },
  background: {
    primary: '#FFFFF0',
    secondary: '#FFFFFF',
    tertiary: 'rgba(15, 23, 42, 0.05)',
    overlay: 'rgba(15, 23, 42, 0.4)',
  },
  category: {
    schwarz: '#8B4513',
    grün: '#4CAF50',
    oolong: '#DAA520',
    chai: '#A0522D',
    jasmin: '#C77DFF',
    kräuter: '#2E8B57',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

export const typography = {
  fontFamily: {
    system: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
    serif: "'Playfair Display', 'Times New Roman', serif",
  },
  fontSize: {
    largeTitle: '2.25rem',
    title1: '1.75rem',
    title2: '1.375rem',
    title3: '1.25rem',
    headline: '1.0625rem',
    body: '1rem',
    callout: '0.9375rem',
    subheadline: '0.9375rem',
    footnote: '0.8125rem',
    caption1: '0.75rem',
    caption2: '0.6875rem',
  },
  fontWeight: {
    ultralight: 100,
    thin: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
    black: 900,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.05em',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const radius = {
  none: '0',
  sm: '0.5rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '2.5rem',
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 32px rgba(15, 23, 42, 0.08)',
  xl: '0 20px 60px rgba(15, 23, 42, 0.12)',
  glass: '0 8px 32px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0, 0, 0, 0.12)',
} as const;

export const glass = {
  card: {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  header: {
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  },
  overlay: {
    background: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
} as const;

export const touchTarget = {
  minimum: '44px',
  small: '44px',
  medium: '48px',
  large: '56px',
} as const;

export const animation = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  },
  spring: {
    gentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
    standard: { type: 'spring' as const, stiffness: 300, damping: 30 },
    snappy: { type: 'spring' as const, stiffness: 400, damping: 25 },
  },
} as const;

export const components = {
  swipeCard: {
    width: {
      mobile: '85vw',
      mobileMax: '400px',
      tablet: '70vw',
      tabletMax: '440px',
    },
    height: {
      base: '430px',
      max: '50vh',
      min: '360px',
    },
  },
  button: {
    height: {
      small: '40px',
      medium: '48px',
      large: '56px',
    },
    padding: {
      horizontal: '1.5rem',
      vertical: '0.875rem',
    },
    radius: '0.875rem',
  },
  progressBar: {
    height: '8px',
    radius: '9999px',
    background: 'rgba(15, 23, 42, 0.08)',
    fill: 'linear-gradient(90deg, #C9AE4D, #B8952F)',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const designSystem = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  glass,
  touchTarget,
  animation,
  components,
  breakpoints,
} as const;

export type DesignSystem = typeof designSystem;

export default designSystem;
