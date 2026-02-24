/**
 * CollectionView - Alle Tees Grid (Tab 2)
 * v1.1.0: Auffüllen Sektion + Inline Refill
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tea, TEA_TYPE_LABELS } from '@/types/tea';
import { Thermometer, Scale } from 'lucide-react';
import { designSystem as ds } from '@/design/design-tokens';

interface CollectionViewProps {
  teas: Tea[];
  onTeaSelect: (tea: Tea) => void;
  onTeaEdit: (tea: Tea) => void;
  onTeaRefill: (tea: Tea, newFuellstand: number) => void;
}

const FUELLSTAND_MAX = 200; // g – Referenzwert für Progress Bar

export const CollectionView = ({ teas, onTeaSelect, onTeaEdit, onTeaRefill }: CollectionViewProps) => {
  const availableTeas = teas.filter(t => !t.zuletztGetrunken && t.fuellstand > 0);
  const usedTeas      = teas.filter(t => t.zuletztGetrunken && t.fuellstand > 0);
  const emptyTeas     = teas.filter(t => t.fuellstand <= 0);

  return (
    <div
      className="overflow-y-auto pt-4"
      style={{
        height: 'calc(100vh - 48px)',
        paddingBottom: 'calc(10.3rem + env(safe-area-inset-bottom, 0))',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Verfügbare Tees */}
      {availableTeas.length > 0 && (
        <Section title={`Verfügbar (${availableTeas.length})`}>
          {availableTeas.map((tea, i) => (
            <TeaGridItem key={tea.id} tea={tea} index={i}
              onSelect={() => onTeaSelect(tea)}
              onEdit={() => onTeaEdit(tea)}
            />
          ))}
        </Section>
      )}

      {/* Verwendet */}
      {usedTeas.length > 0 && (
        <Section title={`Verwendet (${usedTeas.length})`}>
          {usedTeas.map((tea, i) => (
            <TeaGridItem key={tea.id} tea={tea} index={i} isUsed
              onSelect={() => onTeaSelect(tea)}
              onEdit={() => onTeaEdit(tea)}
            />
          ))}
        </Section>
      )}

      {/* Auffüllen */}
      {emptyTeas.length > 0 && (
        <Section title={`Auffüllen (${emptyTeas.length})`}>
          {emptyTeas.map((tea, i) => (
            <RefillGridItem key={tea.id} tea={tea} index={i}
              onEdit={() => onTeaEdit(tea)}
              onRefill={(newFuellstand) => onTeaRefill(tea, newFuellstand)}
            />
          ))}
        </Section>
      )}

      {/* Empty State */}
      {teas.length === 0 && (
        <div className="text-center py-20 px-6">
          <p className="text-base" style={{ color: ds.colors.text.tertiary }}>
            Noch keine Tees vorhanden
          </p>
        </div>
      )}
    </div>
  );
};

// ── Section Wrapper ───────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2
      className="text-xs font-semibold mb-3 px-6 uppercase tracking-wide"
      style={{ fontFamily: ds.typography.fontFamily.system, color: ds.colors.text.tertiary }}
    >
      {title}
    </h2>
    <div className="grid grid-cols-2 gap-4 px-6">
      {children}
    </div>
  </div>
);

// ── Tea Grid Item (normal) ────────────────────────────────────

interface TeaGridItemProps {
  tea: Tea;
  index: number;
  onSelect: () => void;
  onEdit: () => void;
  isUsed?: boolean;
}

const TeaGridItem = ({ tea, index, onSelect, onEdit, isUsed }: TeaGridItemProps) => {
  const fillPct = Math.min(100, Math.round((tea.fuellstand / FUELLSTAND_MAX) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: ds.glass.card.background,
        backdropFilter: ds.glass.card.backdropFilter,
        WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
        border: ds.glass.card.border,
        boxShadow: ds.shadows.glass,
        opacity: isUsed ? 0.6 : 1,
      }}
    >
      <div className="p-4">
        <div className="inline-block px-3 py-1 rounded-full mb-3 text-xs font-medium"
          style={{ background: ds.colors.brand.gold, color: ds.colors.text.inverse }}>
          {TEA_TYPE_LABELS[tea.teeArt]}
        </div>

        <h3 className="font-bold mb-1 truncate"
          style={{ fontSize: ds.typography.fontSize.headline, fontFamily: ds.typography.fontFamily.system, color: ds.colors.text.primary }}>
          {tea.name}
        </h3>

        {tea.hersteller && (
          <p className="text-xs mb-3 truncate" style={{ color: ds.colors.text.secondary }}>
            {tea.hersteller}
          </p>
        )}

        <div className="flex items-center gap-3 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <Thermometer className="w-3 h-3" style={{ color: ds.colors.brand.gold }} aria-hidden="true" />
            <span style={{ color: ds.colors.text.secondary }}>{tea.bruehgrad}°</span>
          </div>
          <div className="flex items-center gap-1">
            <Scale className="w-3 h-3" style={{ color: ds.colors.brand.gold }} aria-hidden="true" />
            <span style={{ color: ds.colors.text.secondary }}>{tea.grammAnzahl}g</span>
          </div>
        </div>

        {/* Füllstand Progress */}
        <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <div className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${fillPct}%`, background: ds.colors.brand.gold }} />
        </div>
        <p className="text-[10px] mt-1" style={{ color: ds.colors.text.tertiary }}>
          {tea.fuellstand}g
        </p>

        <div className="flex items-center justify-between mt-2">
          {isUsed ? (
            <button onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="text-[11px] font-medium" style={{ color: ds.colors.brand.gold }}>
              Zurücksetzen
            </button>
          ) : <div />}

          <button onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="flex-shrink-0 p-1" style={{ color: ds.colors.brand.gold }}
            aria-label="Tee bearbeiten">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Refill Grid Item ──────────────────────────────────────────

interface RefillGridItemProps {
  tea: Tea;
  index: number;
  onEdit: () => void;
  onRefill: (newFuellstand: number) => void;
}

const RefillGridItem = ({ tea, index, onEdit, onRefill }: RefillGridItemProps) => {
  const [isRefilling, setIsRefilling] = useState(false);
  const [inputValue, setInputValue] = useState('100');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenRefill = () => {
    setInputValue('100');
    setIsRefilling(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleConfirm = () => {
    const val = parseInt(inputValue, 10);
    if (!val || val <= 0) return;
    onRefill(val);
    setIsRefilling(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: ds.glass.card.background,
        backdropFilter: ds.glass.card.backdropFilter,
        WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
        border: `1px solid rgba(246, 195, 71, 0.3)`,
        boxShadow: ds.shadows.glass,
      }}
    >
      {/* Normal View */}
      <div className="p-4">
        <div className="inline-block px-3 py-1 rounded-full mb-3 text-xs font-medium"
          style={{ background: 'rgba(246,195,71,0.2)', color: ds.colors.brand.gold }}>
          {TEA_TYPE_LABELS[tea.teeArt]}
        </div>

        <h3 className="font-bold mb-1 truncate"
          style={{ fontSize: ds.typography.fontSize.headline, fontFamily: ds.typography.fontFamily.system, color: ds.colors.text.primary }}>
          {tea.name}
        </h3>

        {tea.hersteller && (
          <p className="text-xs mb-3 truncate" style={{ color: ds.colors.text.secondary }}>
            {tea.hersteller}
          </p>
        )}

        {/* Empty indicator */}
        <div className="relative h-1 rounded-full overflow-hidden mb-1" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: '0%', background: ds.colors.brand.gold }} />
        </div>
        <p className="text-[10px] mt-1 mb-3" style={{ color: ds.colors.brand.gold }}>
          Leer
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={(e) => { e.stopPropagation(); handleOpenRefill(); }}
            className="text-[11px] font-semibold"
            style={{ color: ds.colors.brand.gold }}
          >
            Auffüllen
          </button>

          <button onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="flex-shrink-0 p-1" style={{ color: ds.colors.brand.gold }}
            aria-label="Tee bearbeiten">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Refill Slide-up */}
      <AnimatePresence>
        {isRefilling && (
          <motion.div
            key="refill"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="absolute inset-0 rounded-2xl flex flex-col justify-between p-4"
            style={{
              background: ds.glass.card.background,
              backdropFilter: ds.glass.card.backdropFilter,
              WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
            }}
          >
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: ds.colors.text.secondary }}>
                Neuer Füllstand
              </p>
              <h3 className="font-bold truncate mb-4"
                style={{ fontSize: ds.typography.fontSize.headline, color: ds.colors.text.primary }}>
                {tea.name}
              </h3>

              {/* Input */}
              <div className="flex items-center gap-2 justify-center">
                <input
                  ref={inputRef}
                  type="number"
                  min="1"
                  max="500"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleConfirm()}
                  className="w-20 text-center text-2xl font-bold rounded-xl py-2 outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: `1px solid ${ds.colors.brand.gold}`,
                    color: ds.colors.text.primary,
                    fontFamily: ds.typography.fontFamily.system,
                  }}
                  aria-label="Füllstand in Gramm"
                />
                <span className="text-lg font-semibold" style={{ color: ds.colors.text.secondary }}>g</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4 justify-center">
              <button
                onClick={() => setIsRefilling(false)}
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.12)',
                  minWidth: 44, minHeight: 44,
                }}
                aria-label="Abbrechen"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="rgba(0,0,0,0.45)" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
              <button
                onClick={handleConfirm}
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: parseInt(inputValue) > 0 ? ds.colors.brand.gold : 'rgba(0,0,0,0.08)',
                  minWidth: 44, minHeight: 44,
                }}
                aria-label="Auffüllen bestätigen"
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5L5 9L13 1" stroke={parseInt(inputValue) > 0 ? '#1a1a1a' : 'rgba(0,0,0,0.25)'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
