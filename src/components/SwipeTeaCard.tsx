/**
 * SwipeTeaCard - Apple HIG Design
 * v1.1.0: Pot selection slides up from within card
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tea, TEA_TYPE_LABELS, PotSize, POT_VOLUMES, DOSAGE_PRESETS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';
import { Leaf, Thermometer, Scale } from 'lucide-react';
import { designSystem as ds } from '@/design/design-tokens';
import { buttonVariants, progressBarStyles } from '@/design/component-utils';

interface SwipeTeaCardProps {
  tea: Tea;
  onSelect: (pot: PotSize, dosage: number) => void;
  onSkip: () => void;
}

const POT_ORDER: PotSize[] = [PotSize.KLEIN, PotSize.MITTEL, PotSize.GROSS];

const POT_LABELS: Record<PotSize, string> = {
  [PotSize.KLEIN]:  'Klein',
  [PotSize.MITTEL]: 'Mittel',
  [PotSize.GROSS]:  'Groß',
};

export const SwipeTeaCard = ({ tea, onSelect, onSkip }: SwipeTeaCardProps) => {
  const { trigger: haptic } = useHaptic();
  const fillPercentage = tea.fuellstand;

  // Pot selection state
  const [isSelectingPot, setIsSelectingPot] = useState(false);
  const [committedPot, setCommittedPot] = useState<PotSize | null>(null);

  // Editable dosages – tea-specific if set, else preset
  const presets = DOSAGE_PRESETS[tea.teeArt];
  const [dosages, setDosages] = useState<Record<PotSize, number>>({
    [PotSize.KLEIN]:  tea.dosierungKlein  ?? presets[PotSize.KLEIN],
    [PotSize.MITTEL]: tea.dosierungMittel ?? presets[PotSize.MITTEL],
    [PotSize.GROSS]:  tea.dosierungGross  ?? presets[PotSize.GROSS],
  });

  const adjustDosage = (pot: PotSize, delta: number) => {
    setDosages(prev => ({
      ...prev,
      [pot]: Math.max(0.5, Math.round((prev[pot] + delta) * 2) / 2), // 0.5g steps
    }));
  };

  const handlePotCommit = (pot: PotSize) => {
    if (committedPot) return; // prevent double tap
    haptic('success');
    setCommittedPot(pot);
    setTimeout(() => {
      onSelect(pot, dosages[pot]);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative w-[85vw] max-w-[400px] mx-auto"
      role="article"
      aria-label={`Tee-Karte für ${tea.name}`}
    >
      {/* Card Container - overflow hidden für slide-up */}
      <div
        className="rounded-[32px] overflow-hidden relative"
        style={{
          background: ds.glass.card.background,
          backdropFilter: ds.glass.card.backdropFilter,
          WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
          border: ds.glass.card.border,
          boxShadow: ds.shadows.glass,
        }}
      >
        {/* ── FRONT CONTENT ──────────────────────────────── */}
        <div className="p-8">
          {/* Tea Type Badge */}
          <div className="flex justify-center mb-6">
            <div
              className="px-5 py-2 rounded-full flex items-center gap-2"
              style={{ background: ds.colors.brand.gold, color: ds.colors.text.inverse }}
            >
              <Leaf className="w-4 h-4" aria-hidden="true" />
              <span
                className="font-medium text-sm"
                style={{
                  fontFamily: ds.typography.fontFamily.system,
                  letterSpacing: ds.typography.letterSpacing.wide,
                }}
              >
                {TEA_TYPE_LABELS[tea.teeArt]}
              </span>
            </div>
          </div>

          {/* Tea Name */}
          <h2
            className="text-center mb-2"
            style={{
              fontSize: ds.typography.fontSize.largeTitle,
              fontWeight: ds.typography.fontWeight.bold,
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.primary,
              letterSpacing: ds.typography.letterSpacing.tight,
            }}
          >
            {tea.name}
          </h2>

          {/* Hersteller */}
          {tea.hersteller && (
            <p
              className="text-center mb-8"
              style={{
                fontSize: ds.typography.fontSize.body,
                color: ds.colors.text.secondary,
                fontFamily: ds.typography.fontFamily.system,
              }}
            >
              {tea.hersteller}
            </p>
          )}

          {/* Brewing Info */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5" style={{ color: ds.colors.brand.gold }} aria-hidden="true" />
              <span className="text-xl font-bold" style={{ color: ds.colors.text.primary, fontFamily: ds.typography.fontFamily.system }}>
                {tea.bruehgrad}°
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5" style={{ color: ds.colors.brand.gold }} aria-hidden="true" />
              <span className="text-xl font-bold" style={{ color: ds.colors.text.primary, fontFamily: ds.typography.fontFamily.system }}>
                {tea.grammAnzahl}g
              </span>
            </div>
          </div>

          {/* Füllstand */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium" style={{ color: ds.colors.text.secondary, fontFamily: ds.typography.fontFamily.system }}>
                Füllstand
              </span>
              <span className="text-sm font-bold" style={{ color: ds.colors.brand.gold }} aria-label={`Füllstand ${fillPercentage} Prozent`}>
                {fillPercentage}%
              </span>
            </div>
            <div
              style={progressBarStyles.container}
              role="progressbar"
              aria-valuenow={fillPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fillPercentage}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.1 }}
                style={{ ...progressBarStyles.fill, width: `${fillPercentage}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-6">
            <motion.button
              onClick={(e) => { e.stopPropagation(); haptic('light'); onSkip(); }}
              whileTap={{ scale: 0.95, opacity: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex-1"
              style={{ ...buttonVariants.secondary, WebkitTapHighlightColor: 'transparent' }}
              aria-label="Diesen Tee überspringen"
            >
              Weiter
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); haptic('light'); setIsSelectingPot(true); }}
              whileTap={{ scale: 0.95, opacity: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex-1"
              style={{
                background: ds.colors.brand.gold,
                color: ds.colors.text.inverse,
                borderRadius: ds.radius.md,
                padding: `${ds.spacing[3.5]} ${ds.spacing[6]}`,
                fontWeight: ds.typography.fontWeight.semibold,
                fontSize: ds.typography.fontSize.body,
                minHeight: ds.touchTarget.medium,
                boxShadow: ds.shadows.sm,
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-label="Diesen Tee auswählen"
            >
              Auswählen
            </motion.button>
          </div>
        </div>

        {/* ── POT SELECTION – slides up from within card ── */}
        <AnimatePresence>
          {isSelectingPot && (
            <motion.div
              key="pot-selection"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute inset-0 rounded-[32px]"
              style={{
                background: ds.glass.card.background,
                backdropFilter: ds.glass.card.backdropFilter,
                WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
              }}
            >
              <div className="p-8 h-full flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ color: ds.colors.text.primary, fontFamily: ds.typography.fontFamily.system, letterSpacing: ds.typography.letterSpacing.tight }}
                  >
                    Für welche Kanne?
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: ds.colors.text.secondary, fontFamily: ds.typography.fontFamily.system }}
                  >
                    {tea.name}
                  </p>
                </div>

                {/* Pot Rows */}
                <div className="flex flex-col gap-2 flex-1">
                  {POT_ORDER.map((pot) => {
                    const isCommitted = committedPot === pot;
                    const volume = POT_VOLUMES[pot];

                    return (
                      <motion.button
                        key={pot}
                        onClick={() => handlePotCommit(pot)}
                        animate={{
                          background: isCommitted ? ds.colors.brand.gold : 'rgba(255,255,255,0.14)',
                          scale: isCommitted ? 1.02 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="flex items-center justify-between w-full px-5 rounded-2xl"
                        style={{
                          minHeight: 72,
                          border: `1.5px solid ${isCommitted ? ds.colors.brand.gold : 'rgba(0,0,0,0.18)'}`,
                        }}
                        aria-label={`${POT_LABELS[pot]}, ${volume}ml, ${dosages[pot]}g`}
                        disabled={!!committedPot}
                      >
                        {/* Left: label + volume */}
                        <div className="flex flex-col items-start">
                          <span
                            className="text-base font-semibold"
                            style={{ color: isCommitted ? ds.colors.text.inverse : ds.colors.text.primary, fontFamily: ds.typography.fontFamily.system }}
                          >
                            {POT_LABELS[pot]}
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: isCommitted ? 'rgba(0,0,0,0.5)' : ds.colors.text.secondary }}
                          >
                            {volume} ml
                          </span>
                        </div>

                        {/* Right: [−] dosage [+] */}
                        <div
                          className="flex items-center gap-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={(e) => { e.stopPropagation(); adjustDosage(pot, -0.5); }}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: isCommitted ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)',
                              color: isCommitted ? ds.colors.text.inverse : ds.colors.text.primary,
                              fontSize: 18,
                              minWidth: 32,
                            }}
                            aria-label={`${POT_LABELS[pot]} Dosierung verringern`}
                            disabled={!!committedPot}
                          >
                            −
                          </motion.button>

                          <span
                            className="text-base font-bold tabular-nums"
                            style={{
                              color: isCommitted ? ds.colors.text.inverse : ds.colors.brand.gold,
                              fontFamily: ds.typography.fontFamily.system,
                              minWidth: 36,
                              textAlign: 'center',
                            }}
                          >
                            {dosages[pot]}g
                          </span>

                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={(e) => { e.stopPropagation(); adjustDosage(pot, 0.5); }}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: isCommitted ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)',
                              color: isCommitted ? ds.colors.text.inverse : ds.colors.text.primary,
                              fontSize: 18,
                              minWidth: 32,
                            }}
                            aria-label={`${POT_LABELS[pot]} Dosierung erhöhen`}
                            disabled={!!committedPot}
                          >
                            +
                          </motion.button>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Back Button */}
                <div className="pt-6">
                  <motion.button
                    onClick={() => { setIsSelectingPot(false); setCommittedPot(null); }}
                    whileTap={{ scale: 0.95, opacity: 0.85 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-full"
                    style={{
                      ...buttonVariants.secondary,
                      WebkitTapHighlightColor: 'transparent',
                    }}
                    aria-label="Zurück zur Tee-Karte"
                  >
                    Zurück
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
