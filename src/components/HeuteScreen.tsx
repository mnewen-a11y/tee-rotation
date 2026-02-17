import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Thermometer, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tea, TEA_TYPE_COLORS, TEA_TYPE_LABELS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';

interface HeuteScreenProps {
  queue: Tea[];         // verfügbare Tees in Reihenfolge
  onSelect: (id: string) => void;
  onSkip: (id: string) => void;  // nach hinten schieben
  isLoading: boolean;
}

const SWIPE_THRESHOLD = 80;

export const HeuteScreen = ({ queue, onSelect, onSkip, isLoading }: HeuteScreenProps) => {
  const { trigger: haptic } = useHaptic();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const tea = queue[index];

  const goNext = () => {
    if (index >= queue.length - 1) return;
    haptic('light');
    setDirection(1);
    setIndex(i => i + 1);
  };

  const goPrev = () => {
    if (index <= 0) return;
    haptic('light');
    setDirection(-1);
    setIndex(i => i - 1);
  };

  const handleSelect = () => {
    haptic('success');
    setIsDone(true);
    onSelect(tea.id);
    setTimeout(() => { setIsDone(false); setIndex(0); }, 2500);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-48 h-64 bg-white/10 rounded-3xl"
        />
      </div>
    );
  }

  // Keine Tees
  if (queue.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl"
        >
          🍵
        </motion.div>
        <h2 className="text-2xl font-serif font-bold text-white">Alle Tees getrunken</h2>
        <p className="text-white/50 font-sans text-sm">
          Du hast heute alle Tees in deiner Rotation verwendet.
        </p>
      </div>
    );
  }

  // Ausgewählt — Erfolgsscreen
  if (isDone) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-7xl"
        >
          ✓
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl font-serif font-bold text-white"
        >
          {tea?.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 font-sans"
        >
          Guten Tee! ☕
        </motion.p>
      </div>
    );
  }

  const teaColor = TEA_TYPE_COLORS[tea.teeArt];

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 py-4">

      {/* Zähler */}
      <div className="flex items-center gap-2 self-end">
        {queue.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === index ? 20 : 6, opacity: i === index ? 1 : 0.3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="h-1.5 rounded-full bg-white"
          />
        ))}
      </div>

      {/* Tea Card — swipeable */}
      <div className="flex-1 flex items-center justify-center w-full max-w-sm">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={tea.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 120, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -120, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-grab active:cursor-grabbing select-none"
          >
            <div
              className="w-full rounded-3xl p-8 shadow-2xl"
              style={{
                background: `linear-gradient(145deg, #ffffff, #f8f6ee)`,
                boxShadow: `0 24px 64px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)`,
              }}
            >
              {/* Tee-Art Badge */}
              <div className="flex justify-between items-start mb-8">
                <motion.div
                  className="px-3 py-1 rounded-full text-white text-xs font-semibold font-sans tracking-wide"
                  style={{ backgroundColor: teaColor }}
                >
                  {TEA_TYPE_LABELS[tea.teeArt]}
                </motion.div>
                {/* Füllstand */}
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-midnight/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${tea.fuellstand}%`,
                        backgroundColor: tea.fuellstand > 70 ? '#4CAF50' : tea.fuellstand > 30 ? '#FF9800' : '#F44336'
                      }}
                    />
                  </div>
                  <span className="text-xs text-midnight/40 font-sans">{tea.fuellstand}%</span>
                </div>
              </div>

              {/* Tee Name */}
              <h1 className="text-3xl font-bold font-serif text-midnight leading-tight mb-1">
                {tea.name}
              </h1>
              {tea.hersteller && (
                <p className="text-midnight/50 font-sans text-sm mb-8">{tea.hersteller}</p>
              )}
              {!tea.hersteller && <div className="mb-8" />}

              {/* Temp + Gramm */}
              <div className="flex gap-3">
                <div className="flex-1 bg-midnight/5 rounded-2xl px-4 py-3 flex flex-col items-center">
                  <Thermometer className="w-4 h-4 mb-1" style={{ color: teaColor }} />
                  <span className="text-2xl font-bold font-serif text-midnight">{tea.bruehgrad}°</span>
                  <span className="text-xs text-midnight/40 font-sans mt-0.5">Celsius</span>
                </div>
                <div className="flex-1 bg-midnight/5 rounded-2xl px-4 py-3 flex flex-col items-center">
                  <Package className="w-4 h-4 mb-1" style={{ color: teaColor }} />
                  <span className="text-2xl font-bold font-serif text-midnight">{tea.grammAnzahl}g</span>
                  <span className="text-xs text-midnight/40 font-sans mt-0.5">pro Kanne</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation + Actions */}
      <div className="w-full max-w-sm space-y-3 pb-2">

        {/* Vor/Zurück + Index */}
        <div className="flex items-center justify-between px-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={goPrev}
            disabled={index === 0}
            className="p-2 rounded-full bg-white/10 disabled:opacity-25 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          <span className="text-white/40 text-sm font-sans">
            {index + 1} / {queue.length}
          </span>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={goNext}
            disabled={index === queue.length - 1}
            className="p-2 rounded-full bg-white/10 disabled:opacity-25 transition-opacity"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Hauptaktion */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSelect}
          className="w-full py-4 rounded-2xl font-semibold text-midnight font-sans text-base shadow-lg"
          style={{
            background: 'linear-gradient(145deg, #d4c47e, #b8a85a)',
            boxShadow: '0 8px 24px rgba(198,185,117,0.4)',
          }}
        >
          Das ist mein Tee ✓
        </motion.button>

      </div>
    </div>
  );
};
