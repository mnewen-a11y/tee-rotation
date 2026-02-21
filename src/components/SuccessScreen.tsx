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
    <div className="flex flex-col items-center justify-center" style={{ paddingTop: '2rem' }}>
      {/* Card mit Success Content - HÖHER positioniert */}
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
          {/* Apple-Style Success Icon - subtiler */}
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
              background: ds.colors.semantic.success,
              boxShadow: '0 4px 16px rgba(52, 199, 89, 0.2)'
            }}
          >
            <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
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

          {/* Buttons IN Card - wie SwipeCard */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 pt-6 border-t"
            style={{ borderColor: ds.colors.text.primary, opacity: 0.08 }}
          >
            <button
              onClick={onBack}
              className="flex-1 transition-all active:scale-95"
              style={{
                ...buttonVariants.secondary,
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              Zurück
            </button>
            <button
              onClick={onPickAnother}
              className="flex-1 transition-all active:scale-95"
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
            >
              Neuer Tee
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
