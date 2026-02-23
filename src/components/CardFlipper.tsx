// ============================================================
// Royal-Tea – CardFlipper Component
// Epic v1.1.0 – Dynamische Kannenauswahl
// TASK-005: Create CardFlipper Component (Safari fix)
// ============================================================
// Fix: CSS Grid stacking statt position:absolute
// → Container-Höhe kollabiert nicht mehr auf 0px
// Fix: Explizite -webkit- Prefixes für backface-visibility
// → Kein gespiegelter Content in Safari
// ============================================================

import React from 'react';

interface CardFlipperProps {
  isFlipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export const CardFlipper: React.FC<CardFlipperProps> = ({
  isFlipped,
  front,
  back,
  className = '',
}) => {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    // Scene: perspective container, keine feste Breite – nimmt Parent-Breite
    <div
      className={className}
      style={{
        perspective: 1000,
        WebkitPerspective: 1000,
        width: '100%',
      }}
    >
      {/* Card: rotiert als Einheit */}
      <div
        style={{
          // CSS Grid: beide Faces stapeln sich in 1/1
          display: 'grid',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: reducedMotion
            ? 'none'
            : 'transform 0.55s cubic-bezier(0.4, 0.0, 0.2, 1)',
          WebkitTransition: reducedMotion
            ? 'none'
            : '-webkit-transform 0.55s cubic-bezier(0.4, 0.0, 0.2, 1)',
          width: '100%',
        }}
      >
        {/* Front face */}
        <div
          style={{
            gridArea: '1 / 1',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          aria-hidden={isFlipped}
        >
          {front}
        </div>

        {/* Back face – vorgekippt um 180deg */}
        <div
          style={{
            gridArea: '1 / 1',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            WebkitTransform: 'rotateY(180deg)',
          }}
          aria-hidden={!isFlipped}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default CardFlipper;
