// Version 0.15.0 - Type cache refresh
import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Thermometer, Package, Edit3, Trash2 } from 'lucide-react';
import { Tea, TEA_TYPE_COLORS, TEA_TYPE_LABELS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';
import { StarRating } from '@/components/StarRating';

interface TeaCardProps {
  tea: Tea;
  onDrink?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  variant?: 'list' | 'hero';
}

const SWIPE_THRESHOLD = -72; // px — ab hier Delete-Action sichtbar
const SWIPE_CONFIRM   = -120; // px — ab hier auto-delete

export const TeaCard = ({ tea, onDrink, onEdit, onDelete, variant = 'list' }: TeaCardProps) => {
  const { trigger: haptic } = useHaptic();
  const x = useMotionValue(0);
  const [swiping, setSwiping] = useState(false);
  const [deleteRevealed, setDeleteRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const fuellstandColor =
    tea.fuellstand > 70 ? 'text-green-500' :
    tea.fuellstand > 30 ? 'text-orange-400' :
    'text-red-500';

  // Delete-Hintergrund wird sichtbar ab -40px
  const deleteOpacity = useTransform(x, [-120, -40, 0], [1, 1, 0]);
  const deleteScale   = useTransform(x, [-120, -72, 0], [1, 0.85, 0.6]);

  const handleDragEnd = async (_: unknown, info: { offset: { x: number } }) => {
    const offsetX = info.offset.x;
    if (offsetX < SWIPE_CONFIRM) {
      // Zu weit geswiped → direkt löschen
      haptic('error');
      await animate(x, -500, { duration: 0.25 });
      onDelete?.();
    } else if (offsetX < SWIPE_THRESHOLD) {
      // Threshold erreicht → Delete-Button einrasten
      haptic('medium');
      animate(x, SWIPE_THRESHOLD, { type: 'spring', stiffness: 400, damping: 30 });
      setDeleteRevealed(true);
    } else {
      // Zurücksnappen
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
      setDeleteRevealed(false);
    }
  };

  const resetSwipe = () => {
    animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
    setDeleteRevealed(false);
  };

  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-white rounded-ios-xl p-8 shadow-ios-lg border border-midnight/10">
          <div className="flex items-center justify-center mb-6">
            <div className="px-6 py-2 rounded-full text-white font-medium text-sm tracking-wide"
              style={{ backgroundColor: TEA_TYPE_COLORS[tea.teeArt] }}>
              {TEA_TYPE_LABELS[tea.teeArt]}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center mb-2 text-midnight font-sans">{tea.name}</h1>
          {tea.hersteller && (
            <p className="text-center text-midnight/60 text-lg mb-8">{tea.hersteller}</p>
          )}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-midnight/5 rounded-ios-lg px-6 py-4 flex flex-col items-center">
              <Thermometer className="w-6 h-6 mb-1" style={{ color: TEA_TYPE_COLORS[tea.teeArt] }} />
              <span className="text-3xl font-bold text-midnight font-sans">{tea.bruehgrad}°</span>
            </div>
            <div className="bg-midnight/5 rounded-ios-lg px-6 py-4 flex flex-col items-center">
              <Package className="w-6 h-6 mb-1" style={{ color: TEA_TYPE_COLORS[tea.teeArt] }} />
              <span className="text-3xl font-bold text-midnight font-sans">{tea.grammAnzahl}g</span>
            </div>
          </div>
          {onDrink && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={onDrink}
              className="w-full bg-midnight text-white py-4 rounded-ios-lg font-semibold text-lg">
              Jetzt trinken
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={cardRef} className="relative mb-3 overflow-hidden rounded-ios-lg">

      {/* Delete-Hintergrund */}
      <motion.div
        style={{ opacity: deleteOpacity }}
        className="absolute inset-0 bg-red-500 rounded-ios-lg flex items-center justify-end pr-5"
        aria-hidden="true"
      >
        <motion.div style={{ scale: deleteScale }}>
          <Trash2 className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>

      {/* Karte — swipeable */}
      <motion.div
        style={{ x }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -160, right: 0 }}
        dragElastic={{ left: 0.1, right: 0.05 }}
        onDragStart={() => setSwiping(true)}
        onDragEnd={handleDragEnd}
        onDragTransitionEnd={() => setSwiping(false)}
        className="relative bg-white rounded-ios-lg p-4 shadow-ios border border-midnight/10 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0" onClick={deleteRevealed ? resetSwipe : undefined}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: TEA_TYPE_COLORS[tea.teeArt] }} />
              <h3 className="font-semibold text-midnight text-base font-sans truncate">
                {tea.name}
              </h3>
            </div>
            {tea.hersteller && (
              <p className="text-midnight/55 text-sm mb-2 truncate">{tea.hersteller}</p>
            )}
            {tea.rating && tea.rating > 0 && (
              <div className="mb-2">
                <StarRating value={tea.rating} readonly size="sm" />
              </div>
            )}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-midnight/60">
                <Thermometer className="w-3.5 h-3.5" />
                <span>{tea.bruehgrad}°C</span>
              </div>
              <div className="flex items-center gap-1 text-midnight/60">
                <Package className="w-3.5 h-3.5" />
                <span>{tea.grammAnzahl}g</span>
              </div>
              <span className={`font-medium ${fuellstandColor}`}>{tea.fuellstand}%</span>
            </div>
          </div>

          {/* Buttons — nur sichtbar wenn nicht geswiped */}
          {!swiping && !deleteRevealed && (
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              {onEdit && (
                <motion.button whileTap={{ scale: 0.88 }}
                  onClick={() => { haptic('light'); onEdit(); }}
                  className="p-2 hover:bg-midnight/8 rounded-ios transition-colors"
                  aria-label="Tee bearbeiten">
                  <Edit3 className="w-5 h-5 text-midnight/60" />
                </motion.button>
              )}
            </div>
          )}

          {/* Delete bestätigen wenn eingerastet */}
          {deleteRevealed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { haptic('error'); onDelete?.(); }}
              className="ml-2 px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-ios flex-shrink-0"
              aria-label="Löschen bestätigen">
              Löschen
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
