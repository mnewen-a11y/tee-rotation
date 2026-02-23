// ============================================================
// Royal-Tea – CardFlipper Component
// Epic v1.1.0 – Dynamische Kannenauswahl
// TASK-005: Create CardFlipper Component
// ============================================================
// Kein separates CSS file – 3D transforms via inline styles
// (backface-visibility, rotateY, perspective nicht in Tailwind)
// ============================================================

import React from 'react';

interface CardFlipperProps {
  isFlipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

// ── STYLES ───────────────────────────────────────────────────

const CARD_WIDTH = 520; // px – aus UI-SPEC.md

const styles = {
  scene: {
    width: CARD_WIDTH,
    perspective: 1000,
    WebkitPerspective: 1000,
  } as React.CSSProperties,

  card: (isFlipped: boolean, reducedMotion: boolean): React.CSSProperties => ({
    width: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    transition: reducedMotion
      ? 'none'
      : 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
    WebkitTransition: reducedMotion
      ? 'none'
      : '-webkit-transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
  }),

  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  } as React.CSSProperties,

  back: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    WebkitTransform: 'rotateY(180deg)',
  } as React.CSSProperties,
} as const;

// ── COMPONENT ────────────────────────────────────────────────

export const CardFlipper: React.FC<CardFlipperProps> = ({
  isFlipped,
  front,
  back,
  className = '',
}) => {
  // prefers-reduced-motion: iOS Accessibility Support
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      style={styles.scene}
      className={className}
      aria-live="polite"
    >
      {/* Card wrapper – rotates as one unit */}
      <div style={styles.card(isFlipped, reducedMotion)}>

        {/* Front face */}
        <div
          style={styles.face}
          aria-hidden={isFlipped}
        >
          {front}
        </div>

        {/* Back face */}
        <div
          style={styles.back}
          aria-hidden={!isFlipped}
        >
          {back}
        </div>

      </div>
    </div>
  );
};

export default CardFlipper;
