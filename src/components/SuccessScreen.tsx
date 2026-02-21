/**
 * SuccessScreen - PHASE 2: Liquid Glass Design
 */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Tea } from '@/types/tea';
import { designSystem as ds } from '@/design/design-tokens';

interface SuccessScreenProps {
  tea: Tea;
  onBack: () => void;
  onPickAnother: () => void;
}

export const SuccessScreen = ({ tea, onBack, onPickAnother }: SuccessScreenProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* Card mit Success Content - PHASE 2: Liquid Glass */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-[75vw] max-w-[400px] mx-auto rounded-3xl overflow-hidden p-8 sm:w-[70vw] sm:max-w-[440px]"
        style={{
          background: ds.glass.card.background,
          backdropFilter: ds.glass.card.backdropFilter,
          WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
          border: ds.glass.card.border,
          boxShadow: ds.shadows.glass
        }}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 15,
            delay: 0.1 
          }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto"
          style={{ 
            background: ds.colors.semantic.success,
            boxShadow: '0 8px 32px rgba(52, 199, 89, 0.3)'
          }}
        >
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </motion.div>

        {/* Tee Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h2 
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.primary
            }}
          >
            {tea.name}
          </h2>
          <p 
            className="text-sm"
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
          className="text-center mb-6"
        >
          <div 
            className="flex items-center justify-center gap-4 text-2xl font-bold mb-2"
            style={{ color: ds.colors.text.primary }}
          >
            <span>🌡️ {tea.bruehgrad}°C</span>
            <span>⚖️ {tea.grammAnzahl}g</span>
          </div>
          <p 
            className="text-base"
            style={{
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.secondary
            }}
          >
            Viel Spaß beim Genießen!
          </p>
        </motion.div>
      </motion.div>

      {/* Buttons außerhalb Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center items-center gap-4 mt-8 w-[75vw] max-w-[400px]"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-2xl font-semibold text-base transition-all"
          style={{
            background: 'rgba(120, 120, 128, 0.16)',
            color: ds.colors.text.primary
          }}
        >
          Zurück
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onPickAnother}
          className="flex-1 py-3 px-6 rounded-2xl font-semibold text-base transition-all"
          style={{
            background: ds.colors.brand.gold,
            color: ds.colors.text.inverse,
            boxShadow: ds.shadows.sm
          }}
        >
          Neuer Tee
        </motion.button>
      </motion.div>
    </div>
  );
};
