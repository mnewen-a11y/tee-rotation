// ============================================================
// Royal-Tea – CardFlipper Component
// Epic v1.1.0 – Dynamische Kannenauswahl
// TASK-005: CardFlipper (Safari-fix v3)
// ============================================================
// Safari-kompatibler Ansatz: KEIN preserve-3d auf dem Wrapper.
// Front und Back animieren UNABHÄNGIG voneinander.
// Front:  0deg → -180deg (dreht weg)
// Back:   180deg → 0deg  (dreht rein)
// Jedes Face hat eigenes backface-visibility: hidden.
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

  const transition = reducedMotion
    ? 'none'
    : 'transform 0.55s cubic-bezier(0.4, 0.0, 0.2, 1)';

  return (
    <div
      className={className}
      style={{
        perspective: 1200,
        WebkitPerspective: 1200,
        width: '100%',
        position: 'relative',
      }}
    >
      {/* ── FRONT ───────────────────────────────────────────
          Normalzustand: rotateY(0deg)   → sichtbar
          Geflippt:      rotateY(-180deg) → dreht weg, hidden
      */}
      <div
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          WebkitTransform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition,
          WebkitTransition: transition,
        }}
        aria-hidden={isFlipped}
      >
        {front}
      </div>

      {/* ── BACK ────────────────────────────────────────────
          Normalzustand: rotateY(180deg) → hidden (zeigt weg)
          Geflippt:      rotateY(0deg)   → sichtbar
          position: absolute → überlagert Front exakt
      */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          WebkitTransform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          transition,
          WebkitTransition: transition,
        }}
        aria-hidden={!isFlipped}
      >
        {back}
      </div>
    </div>
  );
};

export default CardFlipper;
