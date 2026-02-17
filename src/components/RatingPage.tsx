/**
 * RatingPage — Bewertungen
 *
 * Entry: Header-Stern-Icon (outline/filled) → Tab 'rating'
 * Layout: Liste aller Tees (alphabetisch) → Bottom-Sheet pro Tee → Speichern
 * A11y: role="radiogroup" + role="radio" auf Sternen, ArrowLeft/Right, 1–5 Shortcuts, ESC=Abbrechen
 * Theme: Ivory (#FFFFF0) Background, Midnight text, Gold accents — kein Dark Mode
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, X, Check, Plus } from 'lucide-react';
import { Tea, TEA_TYPE_LABELS } from '@/types/tea';

// ── STAR RATING WIDGET ────────────────────────────────────────────────────────

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

// ── LABEL HELPER ─────────────────────────────────────────────────────────────

const ratingLabel = (v: number) => {
  if (v === 0) return 'Tippe auf einen Stern';
  if (v === 1) return 'Nicht meins';
  if (v === 2) return 'Geht so';
  if (v === 3) return 'Solide';
  if (v === 4) return 'Sehr gut';
  return 'Absoluter Favorit ⭐';
};

// ── RATING SHEET ─────────────────────────────────────────────────────────────

interface RatingSheetProps {
  tea: Tea;
  onClose: () => void;
  onSave: (teaId: string, rating: number) => void;
}

const RatingSheet = ({ tea, onClose, onSave }: RatingSheetProps) => {
  const [selected, setSelected] = useState<number>(tea.rating ?? 0);
  const [saved, setSaved] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus trap: close button on open
  useEffect(() => { closeRef.current?.focus(); }, []);

  // ESC closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && selected >= 1) handleSave();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  });

  const handleSave = () => {
    if (selected < 1 || selected > 5) return;
    onSave(tea.id, selected);
    setSaved(true);
    setTimeout(onClose, 650);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        aria-hidden="true"
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl shadow-ios-lg overflow-hidden"
        style={{ backgroundColor: '#FFFFF0' }}
        role="dialog"
        aria-modal="true"
        aria-label={`Bewertung für ${tea.name}`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-midnight/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-midnight">
          <div>
            <p className="text-xs text-white/45 font-sans uppercase tracking-wide mb-0.5">
              Bewertung für
            </p>
            <h2 className="text-xl font-bold font-serif text-white leading-tight">
              {tea.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Schließen"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8">
          {/* Tee info */}
          <p className="text-sm text-midnight/45 font-sans mb-8 text-center">
            {TEA_TYPE_LABELS[tea.teeArt]}
            {tea.hersteller ? ` · ${tea.hersteller}` : ''}
          </p>

          {/* Stars */}
          <div className="flex justify-center mb-3">
            <StarRating value={selected} onChange={setSelected} size="lg" />
          </div>
          <p className="text-center text-sm text-midnight/45 font-sans mb-8 h-5">
            {ratingLabel(selected)}
          </p>

          {/* Actions */}
          <div className="flex gap-3 pb-safe">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-ios-lg border border-midnight/20 text-midnight/65
                         font-sans font-medium hover:bg-midnight/5 transition-colors
                         focus-visible:ring-2 focus-visible:ring-gold"
            >
              Abbrechen
            </button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={selected === 0 || saved}
              className={`flex-grow py-3.5 rounded-ios-lg font-sans font-semibold
                          transition-all shadow-sm flex items-center justify-center gap-2
                          focus-visible:ring-2 focus-visible:ring-gold ${
                saved
                  ? 'bg-status-good text-white'
                  : selected === 0
                  ? 'bg-midnight/10 text-midnight/30 cursor-not-allowed'
                  : 'bg-gold text-gold-text hover:brightness-105'
              }`}
            >
              {saved
                ? <><Check className="w-4 h-4" /> Gespeichert</>
                : 'Speichern'
              }
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ── RATING PAGE ───────────────────────────────────────────────────────────────

interface RatingPageProps {
  teas: Tea[];
  onRateTea: (teaId: string, rating: number) => void;
  onNavigateToNew: () => void;
}

export const RatingPage = ({ teas, onRateTea, onNavigateToNew }: RatingPageProps) => {
  const [ratingTea, setRatingTea] = useState<Tea | null>(null);

  // Alphabetisch — begründung: bei langer Liste ist Findbarkeit > Chronologie
  const sorted = [...teas].sort((a, b) => a.name.localeCompare(b.name, 'de'));

  const rated   = teas.filter(t => t.rating).length;
  const unrated = teas.length - rated;

  return (
    <motion.div
      key="rating"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Page header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold font-serif text-midnight mb-1">Bewertungen</h2>
        <p className="text-sm text-midnight/45 font-sans">
          {rated} bewertet · {unrated} noch ausstehend
        </p>
      </div>

      {/* Empty state */}
      {teas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-midnight/5 rounded-full flex items-center justify-center mb-5">
            <Star className="w-8 h-8 text-midnight/20" />
          </div>
          <h3 className="text-lg font-semibold font-serif text-midnight mb-2">
            Du hast noch keine Tees angelegt.
          </h3>
          <p className="text-sm text-midnight/45 font-sans mb-6">
            Füge zuerst Tees hinzu, um sie zu bewerten.
          </p>
          <button
            onClick={onNavigateToNew}
            className="flex items-center gap-2 bg-gold text-gold-text px-5 py-3
                       rounded-ios-lg font-sans font-medium hover:brightness-105
                       transition-all focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Plus className="w-4 h-4" />
            Neuen Tee anlegen
          </button>
        </div>
      )}

      {/* Tea list */}
      {teas.length > 0 && (
        <div className="space-y-2" role="list" aria-label="Tees zur Bewertung">
          {sorted.map((tea) => (
            <motion.button
              key={tea.id}
              role="listitem"
              whileTap={{ scale: 0.99 }}
              onClick={() => setRatingTea(tea)}
              className="w-full text-left bg-white rounded-ios-lg px-4 py-3.5
                         border border-midnight/10 shadow-card
                         flex items-center justify-between
                         hover:bg-midnight/[0.02] transition-colors
                         focus-visible:ring-2 focus-visible:ring-gold focus:outline-none"
              aria-label={`${tea.name} bewerten${tea.rating ? `, aktuell ${tea.rating} von 5 Sternen` : ', noch nicht bewertet'}`}
            >
              <div className="flex-1 min-w-0">
                {/* Name */}
                <p className="font-serif font-semibold text-midnight text-base truncate leading-snug">
                  {tea.name}
                </p>
                {/* Meta */}
                <p className="text-xs text-midnight/40 font-sans mt-0.5">
                  {TEA_TYPE_LABELS[tea.teeArt]}
                  {tea.hersteller ? ` · ${tea.hersteller}` : ''}
                </p>
                {/* Rating or placeholder */}
                <div className="mt-1.5">
                  {tea.rating ? (
                    <StarRating value={tea.rating} readonly size="sm" />
                  ) : (
                    <span className="text-xs text-midnight/30 font-sans italic">
                      Noch nicht bewertet
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-midnight/20 flex-shrink-0 ml-3" aria-hidden="true" />
            </motion.button>
          ))}
        </div>
      )}

      {/* Rating sheet */}
      <AnimatePresence>
        {ratingTea && (
          <RatingSheet
            tea={ratingTea}
            onClose={() => setRatingTea(null)}
            onSave={(id, rating) => {
              onRateTea(id, rating);
              setRatingTea(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
