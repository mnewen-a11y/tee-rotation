/**
 * Royal-Tea Design System
 * Based on Apple Human Interface Guidelines (iOS 26)
 * 
 * This file serves as the single source of truth for all design decisions.
 * All components should reference these tokens instead of hardcoded values.
 */

// ============================================================================
// COLORS - Based on HIG Color System
// ============================================================================

export const colors = {
  // Brand Colors
  brand: {
    gold: '#C9AE4D',           // Primary brand color
    goldDark: '#B8952F',       // Darker variant for gradients/hover
    goldLight: '#D4C47E',      // Lighter variant for highlights
  },

  // Semantic Colors (iOS System Colors)
  semantic: {
    primary: '#C9AE4D',        // Primary actions (brand gold)
    systemBlue: '#007AFF',     // Alternative: HIG system blue
    success: '#34C759',        // Success states (HIG Green)
    error: '#FF3B30',          // Error states (HIG Red)
    warning: '#FF9500',        // Warning states (HIG Orange)
  },

  // Neutrals
  neutral: {
    midnight: '#0F172A',       // Primary dark (text, backgrounds)
    midnightLight: '#1D2646',  // Lighter variant
    cream: '#FFFFF0',          // Background cream
    white: '#FFFFFF',          // Pure white
    black: '#000000',          // Pure black
  },

  // Text Colors (HIG Contrast Requirements: 4.5:1 minimum)
  text: {
    primary: '#0F172A',                    // High contrast (7:1+)
    secondary: 'rgba(15, 23, 42, 0.6)',   // Medium contrast (~4.5:1)
    tertiary: 'rgba(15, 23, 42, 0.4)',    // Low contrast (disabled)
    inverse: '#FFFFFF',                    // On dark backgrounds
  },

  // Interactive States
  interactive: {
    hover: 'rgba(120, 120, 128, 0.08)',   // HIG hover state
    active: 'rgba(120, 120, 128, 0.16)',  // HIG active state
    disabled: 'rgba(120, 120, 128, 0.3)', // HIG disabled
  },

  // Backgrounds
  background: {
    primary: '#FFFFF0',                    // Main cream background
    secondary: '#FFFFFF',                  // Card backgrounds
    tertiary: 'rgba(15, 23, 42, 0.05)',   // Subtle backgrounds
    overlay: 'rgba(15, 23, 42, 0.4)',     // Modal overlays
  },

  // Category Colors (Tea Types)
  category: {
    schwarz: '#8B4513',
    grün: '#4CAF50',
    oolong: '#DAA520',
    chai: '#A0522D',
    jasmin: '#C77DFF',
    kräuter: '#2E8B57',
  },
} as const;

// ============================================================================
// SPACING - Based on HIG 8pt Grid System
// ============================================================================

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

// ============================================================================
// TYPOGRAPHY - Based on SF Pro Display/Text
// ============================================================================

export const typography = {
  // Font Family (HIG System Fonts)
  fontFamily: {
    system: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
    serif: "'Playfair Display', 'Times New Roman', serif",
  },

  // Font Sizes (HIG Dynamic Type Scale)
  fontSize: {
    largeTitle: '2.25rem',    // 36px - Large Title
    title1: '1.75rem',        // 28px - Title 1
    title2: '1.375rem',       // 22px - Title 2
    title3: '1.25rem',        // 20px - Title 3
    headline: '1.0625rem',    // 17px - Headline
    body: '1rem',             // 16px - Body (minimum per HIG)
    callout: '0.9375rem',     // 15px - Callout
    subheadline: '0.9375rem', // 15px - Subheadline
    footnote: '0.8125rem',    // 13px - Footnote
    caption1: '0.75rem',      // 12px - Caption 1
    caption2: '0.6875rem',    // 11px - Caption 2
  },

  // Font Weights (SF Pro has 9 weights)
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

  // Letter Spacing (HIG Optical Sizing)
  letterSpacing: {
    tight: '-0.02em',         // Headlines
    normal: '0em',            // Body text
    wide: '0.05em',           // Labels/CAPS
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============================================================================
// RADIUS - Based on HIG Rounded Corners
// ============================================================================

export const radius = {
  none: '0',
  sm: '0.5rem',      // 8px  - Small elements
  md: '0.875rem',    // 14px - Buttons (HIG standard)
  lg: '1rem',        // 16px - Cards (small)
  xl: '1.5rem',      // 24px - Cards (medium)
  '2xl': '2rem',     // 32px - Cards (large) - SwipeCard
  '3xl': '2.5rem',   // 40px - XL Cards
  full: '9999px',    // Pill shape
} as const;

// ============================================================================
// SHADOWS - Based on HIG Elevation System
// ============================================================================

export const shadows = {
  // Flat (no shadow)
  none: 'none',

  // Subtle elevation (iOS style - very soft)
  sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
  
  // Medium elevation
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  
  // High elevation (SwipeCard)
  lg: '0 8px 32px rgba(15, 23, 42, 0.08)',
  
  // Maximum elevation
  xl: '0 20px 60px rgba(15, 23, 42, 0.12)',

  // Liquid Glass shadow
  glass: '0 8px 32px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0, 0, 0, 0.12)',
} as const;

// ============================================================================
// LIQUID GLASS EFFECTS - iOS 26 Design Language
// ============================================================================

export const glass = {
  // Translucent backgrounds with blur
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

// ============================================================================
// TOUCH TARGETS - HIG Accessibility Requirements
// ============================================================================

export const touchTarget = {
  // Minimum 44×44pt per HIG
  minimum: '44px',
  
  // Recommended sizes
  small: '44px',
  medium: '48px',
  large: '56px',
} as const;

// ============================================================================
// ANIMATIONS - HIG Motion Guidelines
// ============================================================================

export const animation = {
  // Durations (HIG prefers spring-based, these are fallbacks)
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },

  // Easing (HIG prefers springs, but these are CSS fallbacks)
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  },

  // Framer Motion Spring Presets (HIG preferred)
  spring: {
    gentle: { type: 'spring', stiffness: 200, damping: 25 },
    standard: { type: 'spring', stiffness: 300, damping: 30 },
    snappy: { type: 'spring', stiffness: 400, damping: 25 },
  },
} as const;

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  // SwipeCard
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

  // Buttons
  button: {
    height: {
      small: '40px',
      medium: '48px',  // HIG standard
      large: '56px',
    },
    padding: {
      horizontal: spacing[6],   // 24px
      vertical: spacing[3.5],   // 14px
    },
    radius: radius.md,          // 14px per HIG
  },

  // Progress Bar (Füllstand)
  progressBar: {
    height: '8px',              // 2 * 4px grid
    radius: radius.full,
    background: 'rgba(15, 23, 42, 0.08)',
    fill: 'linear-gradient(90deg, #C9AE4D, #B8952F)',
  },
} as const;

// ============================================================================
// BREAKPOINTS - Responsive Design
// ============================================================================

export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
} as const;

// ============================================================================
// EXPORT ALL
// ============================================================================

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

// Type-safe access
export type DesignSystem = typeof designSystem;

// Default export
export default designSystem;
