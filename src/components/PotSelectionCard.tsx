// ============================================================
// Royal-Tea – PotSelectionCard Component
// Epic v1.1.0 – Dynamische Kannenauswahl
// TASK-006: Create PotSelectionCard Component
// ============================================================

import React, { useState } from 'react';
import type { Tea } from '@/types/tea';
import { PotSize, POT_VOLUMES } from '@/types/tea';
import { getDosageForPot } from '@/lib/potDosage';

interface PotSelectionCardProps {
  tea: Tea;
  onConfirm: (pot: PotSize) => void;
  onBack: () => void;
}

const POT_META: Record<PotSize, { label: string; subtitle: string }> = {
  [PotSize.KLEIN]:  { label: 'Klein',  subtitle: `${POT_VOLUMES[PotSize.KLEIN]} ml` },
  [PotSize.MITTEL]: { label: 'Mittel', subtitle: `${POT_VOLUMES[PotSize.MITTEL]} ml` },
  [PotSize.GROSS]:  { label: 'Groß',   subtitle: `${POT_VOLUMES[PotSize.GROSS]} ml` },
};

const POT_ORDER: PotSize[] = [PotSize.KLEIN, PotSize.MITTEL, PotSize.GROSS];

export const PotSelectionCard: React.FC<PotSelectionCardProps> = ({
  tea,
  onConfirm,
  onBack,
}) => {
  const [selectedPot, setSelectedPot] = useState<PotSize>(PotSize.GROSS);

  return (
    <div
      className="w-full flex flex-col rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* HEADER */}
      <div className="px-6 pt-6 pb-4">
        <p className="text-white/50 text-sm font-medium tracking-wide uppercase">
          Kannengröße wählen
        </p>
        <h2
          className="text-white text-2xl font-semibold mt-1"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"' }}
        >
          {tea.name}
        </h2>
        {tea.hersteller && (
          <p className="text-white/60 text-sm mt-0.5">{tea.hersteller}</p>
        )}
      </div>

      <div className="mx-6 h-px bg-white/10" />

      {/* POT LIST – iOS Settings Style, 72px rows */}
      <div className="flex flex-col px-4 py-2">
        {POT_ORDER.map((pot, index) => {
          const meta       = POT_META[pot];
          const dosage     = getDosageForPot(tea, pot);
          const isSelected = selectedPot === pot;
          const isLast     = index === POT_ORDER.length - 1;

          return (
            <React.Fragment key={pot}>
              <button
                onClick={() => setSelectedPot(pot)}
                className={[
                  'flex items-center justify-between w-full px-4 rounded-2xl',
                  'transition-colors duration-150 active:bg-white/10',
                  isSelected ? 'bg-white/[0.12]' : 'bg-transparent',
                ].join(' ')}
                style={{ minHeight: 72 }}
                aria-pressed={isSelected}
                aria-label={`${meta.label}, ${meta.subtitle}, ${dosage}g`}
              >
                {/* Left */}
                <div className="flex flex-col items-start">
                  <span className="text-white text-base font-medium">{meta.label}</span>
                  <span className="text-white/50 text-sm">{meta.subtitle}</span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <span className="text-white/70 text-base tabular-nums">{dosage}g</span>
                  <div
                    className={[
                      'w-6 h-6 rounded-full flex items-center justify-center',
                      'transition-all duration-200',
                      isSelected
                        ? 'bg-amber-400 scale-100 opacity-100'
                        : 'bg-white/10 scale-90 opacity-40',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path
                        d="M1 4L4.5 7.5L11 1"
                        stroke={isSelected ? '#1a1a1a' : 'white'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {!isLast && <div className="ml-4 h-px bg-white/8" aria-hidden="true" />}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mx-6 h-px bg-white/10" />

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 px-6 py-5">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-2xl text-white/70 text-base font-medium
                     transition-all duration-150 active:scale-95"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            minHeight: 52,
          }}
          aria-label="Zurück zur Teeauswahl"
        >
          Zurück
        </button>

        <button
          onClick={() => onConfirm(selectedPot)}
          className="py-3.5 rounded-2xl text-amber-950 text-base font-semibold
                     transition-all duration-150 active:scale-95"
          style={{
            flex: 2,
            background: 'linear-gradient(135deg, #F6C347 0%, #E8A020 100%)',
            minHeight: 52,
            boxShadow: '0 4px 16px rgba(246, 195, 71, 0.3)',
          }}
          aria-label={`${POT_META[selectedPot].label}e Kanne bestätigen`}
        >
          Bestätigen
        </button>
      </div>

    </div>
  );
};

export default PotSelectionCard;
