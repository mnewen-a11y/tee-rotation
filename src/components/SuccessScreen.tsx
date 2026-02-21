/**
 * SuccessScreen - PHASE 2: Liquid Glass Design
 * Apple HIG Success Pattern
 */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Tea } from '@/types/tea';
import { designSystem as ds } from '@/design/design-tokens';
import { buttonVariants } from '@/design/component-utils';

interface SuccessScreenProps {
  tea: Tea;
  onBack: () => void;
  onPickAnother: () => void;
}

export const SuccessScreen = ({ tea, onBack, onPickAnother }: SuccessScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center" style={{ paddingTop: '0.5rem' }}>
      {/* Card mit Success Content - HÖHER positioniert (0.5rem) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-[85vw] max-w-[400px] mx-auto rounded-[32px] overflow-hidden"
        style={{
          background: ds.glass.card.background,
          backdropFilter: ds.glass.card.backdropFilter,
          WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
          border: ds.glass.card.border,
          boxShadow: ds.shadows.glass
        }}
      >
        {/* Card Content */}
        <div className="px-8 py-10">
          {/* Gold Checkmark - Creme Circle + Gold Border + Gold Check */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 15,
              delay: 0.1 
            }}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-8 mx-auto"
            style={{ 
              background: ds.colors.background.primary,
              border: `1px solid ${ds.colors.brand.gold}`,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <Check 
              className="w-8 h-8" 
              strokeWidth={2.5}
              style={{ color: ds.colors.brand.gold }}
            />
          </motion.div>

          {/* Tee Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h2 
              className="text-3xl font-bold mb-2"
              style={{
                fontFamily: ds.typography.fontFamily.system,
                color: ds.colors.text.primary,
                letterSpacing: ds.typography.letterSpacing.tight
              }}
            >
              {tea.name}
            </h2>
            <p 
              className="text-base"
              style={{ color: ds.colors.text.secondary }}
            >
              {tea.hersteller}
            </p>
          </motion.div>

          {/* Brüh-Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <div 
              className="flex items-center justify-center gap-4 text-2xl font-bold"
              style={{ color: ds.colors.text.primary }}
            >
              <span>🌡️ {tea.bruehgrad}°C</span>
              <span>⚖️ {tea.grammAnzahl}g</span>
            </div>
          </motion.div>

          {/* Buttons IN Card - KEIN Separator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <motion.button
              onClick={onBack}
              whileTap={{ scale: 0.95, opacity: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex-1"
              style={{
                ...buttonVariants.secondary,
                WebkitTapHighlightColor: 'transparent'
              }}
              aria-label="Zurück zur Tee-Auswahl"
            >
              Zurück
            </motion.button>
            <motion.button
              onClick={onPickAnother}
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
                WebkitTapHighlightColor: 'transparent'
              }}
              aria-label="Weiter zum nächsten Tee"
            >
              Weiter
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
