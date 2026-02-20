/**
 * Royal-Tea Component Utilities
 * Reusable component patterns and variants
 */

import { designSystem as ds } from './design-tokens';

// ============================================================================
// SHARED COMPONENT STYLES
// ============================================================================

/**
 * Card Styles - Used in SwipeCard, SuccessScreen, TeaGridCard
 */
export const cardStyles = {
  // Base card style (white, rounded, shadow)
  base: {
    background: ds.colors.background.secondary,
    borderRadius: ds.radius['2xl'],
    boxShadow: ds.shadows.xl,
    border: `1px solid ${ds.colors.neutral.midnight}1A`, // 10% opacity
  },

  // Liquid Glass variant (iOS 26)
  glass: {
    background: ds.glass.card.background,
    backdropFilter: ds.glass.card.backdropFilter,
    WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
    borderRadius: ds.radius['2xl'],
    boxShadow: ds.shadows.glass,
    border: ds.glass.card.border,
  },

  // Padding variants
  padding: {
    compact: { padding: `${ds.spacing[6]} ${ds.spacing[6]}` },  // 24px
    comfortable: { padding: `${ds.spacing[8]} ${ds.spacing[8]}` }, // 32px
    spacious: { padding: `${ds.spacing[10]} ${ds.spacing[8]}` },   // 40px 32px
  },
} as const;

/**
 * Button Variants - HIG Conformant
 */
export const buttonVariants = {
  primary: {
    background: ds.colors.semantic.primary,
    color: ds.colors.text.inverse,
    borderRadius: ds.radius.md,
    padding: `${ds.spacing[3.5]} ${ds.spacing[6]}`, // 14px 24px
    fontWeight: ds.typography.fontWeight.semibold,
    fontSize: ds.typography.fontSize.body,
    minHeight: ds.touchTarget.medium,
    boxShadow: ds.shadows.sm,
  },

  secondary: {
    background: ds.colors.interactive.active, // System Gray Fill
    color: ds.colors.text.primary,
    borderRadius: ds.radius.md,
    padding: `${ds.spacing[3.5]} ${ds.spacing[6]}`,
    fontWeight: ds.typography.fontWeight.semibold,
    fontSize: ds.typography.fontSize.body,
    minHeight: ds.touchTarget.medium,
  },

  destructive: {
    background: ds.colors.semantic.error,
    color: ds.colors.text.inverse,
    borderRadius: ds.radius.md,
    padding: `${ds.spacing[3.5]} ${ds.spacing[6]}`,
    fontWeight: ds.typography.fontWeight.semibold,
    fontSize: ds.typography.fontSize.body,
    minHeight: ds.touchTarget.medium,
  },

  ghost: {
    background: 'transparent',
    color: ds.colors.semantic.primary,
    borderRadius: ds.radius.md,
    padding: `${ds.spacing[3.5]} ${ds.spacing[6]}`,
    fontWeight: ds.typography.fontWeight.medium,
    fontSize: ds.typography.fontSize.body,
    minHeight: ds.touchTarget.medium,
  },
} as const;

/**
 * Typography Presets - HIG Typography Scale
 */
export const textStyles = {
  largeTitle: {
    fontFamily: ds.typography.fontFamily.system,
    fontSize: ds.typography.fontSize.largeTitle,
    fontWeight: ds.typography.fontWeight.bold,
    letterSpacing: ds.typography.letterSpacing.tight,
    lineHeight: ds.typography.lineHeight.tight,
    color: ds.colors.text.primary,
  },

  title: {
    fontFamily: ds.typography.fontFamily.system,
    fontSize: ds.typography.fontSize.title1,
    fontWeight: ds.typography.fontWeight.bold,
    letterSpacing: ds.typography.letterSpacing.tight,
    lineHeight: ds.typography.lineHeight.normal,
    color: ds.colors.text.primary,
  },

  headline: {
    fontFamily: ds.typography.fontFamily.system,
    fontSize: ds.typography.fontSize.headline,
    fontWeight: ds.typography.fontWeight.semibold,
    letterSpacing: ds.typography.letterSpacing.normal,
    lineHeight: ds.typography.lineHeight.normal,
    color: ds.colors.text.primary,
  },

  body: {
    fontFamily: ds.typography.fontFamily.system,
    fontSize: ds.typography.fontSize.body,
    fontWeight: ds.typography.fontWeight.regular,
    letterSpacing: ds.typography.letterSpacing.normal,
    lineHeight: ds.typography.lineHeight.normal,
    color: ds.colors.text.primary,
  },

  bodySecondary: {
    fontFamily: ds.typography.fontFamily.system,
    fontSize: ds.typography.fontSize.body,
    fontWeight: ds.typography.fontWeight.regular,
    letterSpacing: ds.typography.letterSpacing.normal,
    lineHeight: ds.typography.lineHeight.normal,
    color: ds.colors.text.secondary,
  },

  caption: {
    fontFamily: ds.typography.fontFamily.system,
    fontSize: ds.typography.fontSize.caption1,
    fontWeight: ds.typography.fontWeight.medium,
    letterSpacing: ds.typography.letterSpacing.wide,
    lineHeight: ds.typography.lineHeight.normal,
    color: ds.colors.text.secondary,
  },

  label: {
    fontFamily: ds.typography.fontFamily.system,
    fontSize: ds.typography.fontSize.caption1,
    fontWeight: ds.typography.fontWeight.semibold,
    letterSpacing: ds.typography.letterSpacing.wide,
    lineHeight: ds.typography.lineHeight.normal,
    color: ds.colors.text.secondary,
    textTransform: 'uppercase' as const,
  },
} as const;

/**
 * Progress Bar (Füllstand)
 */
export const progressBarStyles = {
  container: {
    height: ds.components.progressBar.height,
    borderRadius: ds.components.progressBar.radius,
    background: ds.components.progressBar.background,
    overflow: 'hidden' as const,
  },

  fill: {
    height: '100%',
    borderRadius: ds.components.progressBar.radius,
    background: ds.components.progressBar.fill,
    transition: 'width 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate inline specs row style (Thermometer + Scale icons)
 */
export const inlineSpecsStyle = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: ds.spacing[6], // 24px between specs
    color: ds.colors.text.secondary,
  },

  spec: {
    display: 'flex',
    alignItems: 'center',
    gap: ds.spacing[2], // 8px between icon and text
  },

  separator: {
    color: ds.colors.text.tertiary,
    fontSize: ds.typography.fontSize.body,
  },
} as const;

/**
 * Badge style (Tea type indicator)
 */
export const badgeStyle = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: ds.spacing[2],
    padding: `${ds.spacing[1]} ${ds.spacing[3]}`,
    borderRadius: ds.radius.md,
    background: ds.colors.background.tertiary,
  },

  text: {
    fontSize: ds.typography.fontSize.caption1,
    fontWeight: ds.typography.fontWeight.semibold,
    letterSpacing: ds.typography.letterSpacing.wide,
    color: ds.colors.text.secondary,
  },
} as const;

/**
 * List separator (HIG inset style)
 */
export const listSeparatorStyle = {
  borderBottom: `1px solid ${ds.colors.neutral.midnight}1A`,
  marginLeft: ds.spacing[4],  // 16px inset
  marginRight: ds.spacing[4],
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get category color by tea type
 */
export function getCategoryColor(type: keyof typeof ds.colors.category): string {
  return ds.colors.category[type] || ds.colors.category.schwarz;
}

/**
 * Create responsive width classes
 */
export function getResponsiveCardWidth() {
  return {
    width: ds.components.swipeCard.width.mobile,
    maxWidth: ds.components.swipeCard.width.mobileMax,
    '@media (min-width: 768px)': {
      width: ds.components.swipeCard.width.tablet,
      maxWidth: ds.components.swipeCard.width.tabletMax,
    },
  };
}

/**
 * Active button scale animation (HIG tap feedback)
 */
export const activeButtonScale = {
  whileTap: { scale: 0.95 },
  transition: ds.animation.spring.standard,
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export const componentUtils = {
  cardStyles,
  buttonVariants,
  textStyles,
  progressBarStyles,
  inlineSpecsStyle,
  badgeStyle,
  listSeparatorStyle,
  getCategoryColor,
  getResponsiveCardWidth,
  activeButtonScale,
} as const;

export default componentUtils;
