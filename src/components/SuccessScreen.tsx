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
    <div className="flex flex-col items-center">
      {/* Card mit Success Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-[75vw] max-w-[400px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-midnight/10 p-8 sm:w-[70vw] sm:max-w-[440px]"
      >
        {/* Success Icon - Oben in Card */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 15,
            delay: 0.1 
          }}
          className="w-20 h-20 bg-status-good rounded-full flex items-center justify-center mb-6 mx-auto"
          style={{ boxShadow: '0 8px 32px rgba(52, 199, 89, 0.3)' }}
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
          <h2 className="text-2xl font-bold font-sans text-midnight">
            {tea.name} ausgewählt!
          </h2>
        </motion.div>

        {/* Brewing Info - DIREKT nach Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-8 mb-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌡️</span>
            <span className="text-2xl font-bold font-sans text-midnight">
              {tea.bruehgrad}°C
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">⚖️</span>
            <span className="text-2xl font-bold font-sans text-midnight">
              {tea.grammAnzahl}g
            </span>
          </div>
        </motion.div>

        {/* "Viel Spaß" - NACH Brewing Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-base text-midnight/60 font-sans">
            Viel Spaß beim Genießen
          </p>
        </motion.div>
      </motion.div>

      {/* Action Buttons - AUSSERHALB Card, gleiche Position wie Swipe */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center items-center gap-4 mt-8"
      >
        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex-1 max-w-[140px] py-3 px-6 bg-midnight/5 hover:bg-midnight/10 active:bg-midnight/15 rounded-ios-lg font-sans font-medium text-midnight/70 transition-colors"
        >
          Zurück
        </motion.button>

        {/* Pick Another Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onPickAnother}
          className="flex-1 max-w-[140px] py-3 px-6 rounded-ios-lg font-sans font-semibold text-white transition-all"
          style={{
            background: 'linear-gradient(145deg, #d4c47e, #b8a85a)',
            boxShadow: '0 2px 8px rgba(198,185,117,0.4)',
          }}
        >
          Noch einen Tee
        </motion.button>
      </motion.div>
    </div>
  );
};
