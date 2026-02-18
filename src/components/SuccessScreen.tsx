/**
 * SuccessScreen - Zeigt Bestätigung nach Tee-Auswahl
 */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Tea } from '@/types/tea';

interface SuccessScreenProps {
  tea: Tea;
  onBack: () => void;
  onPickAnother: () => void;
}

export const SuccessScreen = ({ tea, onBack, onPickAnother }: SuccessScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex flex-col items-center justify-center py-20"
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
        className="w-24 h-24 bg-status-good rounded-full flex items-center justify-center mb-6"
        style={{ boxShadow: '0 8px 32px rgba(52, 199, 89, 0.3)' }}
      >
        <Check className="w-12 h-12 text-white" strokeWidth={3} />
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold font-sans text-midnight mb-2">
          {tea.name} ausgewählt!
        </h2>
        <p className="text-lg text-midnight/60 font-sans">
          Viel Spaß beim Genießen
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 w-full max-w-md px-6"
      >
        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex-1 py-3 px-6 bg-midnight/5 hover:bg-midnight/10 active:bg-midnight/15 rounded-ios-lg font-sans font-medium text-midnight/70 transition-colors"
        >
          Zurück
        </motion.button>

        {/* Pick Another Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onPickAnother}
          className="flex-1 py-3 px-6 rounded-ios-lg font-sans font-semibold text-white transition-all"
          style={{
            background: 'linear-gradient(145deg, #d4c47e, #b8a85a)',
            boxShadow: '0 2px 8px rgba(198,185,117,0.4)',
          }}
        >
          Noch einen Tee
        </motion.button>
      </motion.div>

      {/* Brewing Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex items-center gap-6 text-midnight/50"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌡️</span>
          <span className="text-lg font-sans font-medium">
            {tea.bruehgrad}°C
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          <span className="text-lg font-sans font-medium">
            {tea.grammAnzahl}g
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
