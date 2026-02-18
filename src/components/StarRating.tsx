/**
 * StarRating — Wiederverwendbare Stern-Bewertung
 */

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;           // 0 = not rated
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'lg';
}

export const StarRating = ({
  value,
  onChange,
  readonly = false,
  size = 'sm',
}: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  const active = hover || value;
  const dim = size === 'lg' ? 'w-10 h-10' : 'w-5 h-5';

  return (
    <div
      role={readonly ? undefined : 'radiogroup'}
      aria-label="Bewertung"
      className="flex items-center gap-1"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role={readonly ? undefined : 'radio'}
          aria-checked={value === n}
          aria-label={`${n} von 5 Sternen auswählen`}
          disabled={readonly}
          tabIndex={readonly ? -1 : 0}
          onClick={() => !readonly && onChange?.(n)}
          onMouseEnter={() => !readonly && setHover(n)}
          onMouseLeave={() => !readonly && setHover(0)}
          onKeyDown={(e) => {
            if (readonly) return;
            if (e.key === 'ArrowRight' && value < 5) { e.preventDefault(); onChange?.(value + 1); }
            if (e.key === 'ArrowLeft'  && value > 1) { e.preventDefault(); onChange?.(value - 1); }
            if (['1','2','3','4','5'].includes(e.key)) onChange?.(parseInt(e.key));
          }}
          className={`rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            readonly ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <Star
            className={`${dim} transition-colors ${
              n <= active
                ? 'fill-gold stroke-gold'
                : 'fill-none stroke-midnight/25'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export const ratingLabel = (v: number) => {
  if (v === 0) return 'Tippe auf einen Stern';
  if (v === 1) return 'Nicht meins';
  if (v === 2) return 'Geht so';
  if (v === 3) return 'Solide';
  if (v === 4) return 'Sehr gut';
  return 'Absoluter Favorit ⭐';
};
