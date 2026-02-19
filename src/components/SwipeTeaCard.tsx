/**
 * SwipeTeaCard - Tinder-Style Tee-Auswahl
 * Apple UX: Single Card, Swipe Gestures, Haptic Feedback
 */

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Tea, TEA_TYPE_LABELS, TIME_OF_DAY_LABELS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';
import { StarRating } from '@/components/StarRating';
import { SunriseIcon, SunIcon, SunHazeIcon, MoonIcon } from '@/Icons';

interface SwipeTeaCardProps {
  tea: Tea;
  onSwipeRight: () => void;  // Tee auswählen
  onSwipeLeft: () => void;   // Nächster Tee
  onTap: () => void;          // Details/Bearbeiten
}

const SWIPE_THRESHOLD = 100; // Mindest-Distance für Swipe

export const SwipeTeaCard = ({ tea, onSwipeRight, onSwipeLeft, onTap }: SwipeTeaCardProps) => {
  const { trigger: haptic } = useHaptic();
  const cardRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  // Farb-Overlay basierend auf Swipe-Richtung
  const acceptOpacity = useTransform(x, [0, SWIPE_THRESHOLD, 200], [0, 0.3, 0.8]);
  const rejectOpacity = useTransform(x, [-200, -SWIPE_THRESHOLD, 0], [0.8, 0.3, 0]);

  const handleDragStart = () => {
    isDragging.current = false;
  };

  const handleDrag = () => {
    isDragging.current = true;
  };

  // iOS: Verhindere Background-Scroll während Swipe
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current) {
      e.preventDefault();
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    
    if (offset > SWIPE_THRESHOLD) {
      // Swipe Right → Auswählen
      haptic('success');
      onSwipeRight();
    } else if (offset < -SWIPE_THRESHOLD) {
      // Swipe Left → Überspringen
      haptic('light');
      onSwipeLeft();
    } else {
      // Zurück zur Mitte
      x.set(0);
    }
  };

  const handleClick = () => {
    // Nur Tap-Action wenn nicht gedragged wurde
    if (!isDragging.current) {
      onTap();
    }
    isDragging.current = false;
  };

  // Füllstand als Dots
  const fullDots = Math.round(tea.fuellstand / 10);
  const emptyDots = 10 - fullDots;

  return (
    <motion.div
      ref={cardRef}
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      className="relative w-full max-w-sm mx-auto h-[480px] max-h-[60vh] min-h-[360px] cursor-grab active:cursor-grabbing sm:h-[520px] sm:max-h-[65vh]"
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-midnight/10">
        
        {/* Swipe Overlays - Improved Feedback */}
        <motion.div 
          style={{ opacity: acceptOpacity }}
          className="absolute inset-0 bg-green-500/20 pointer-events-none flex items-center justify-end pr-12"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: acceptOpacity.get() > 0.1 ? 1 : 0.8 }}
            transition={{ duration: 0.15 }}
            className="text-7xl font-bold text-green-600"
          >
            ✓
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={{ opacity: rejectOpacity }}
          className="absolute inset-0 bg-gray-300/10 pointer-events-none flex items-center justify-start pl-12"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: rejectOpacity.get() > 0.1 ? 1 : 0.8 }}
            transition={{ duration: 0.15 }}
            className="text-7xl font-bold text-gray-500"
          >
            →
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8">
          
          {/* Top Section */}
          <div>
            {/* Tea Type Badge */}
            <div className="inline-block px-3 py-1 bg-midnight/5 rounded-full mb-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: tea.teeArt === 'schwarz' ? '#8B4513' : 
                                          tea.teeArt === 'grün' ? '#4CAF50' :
                                          tea.teeArt === 'oolong' ? '#DAA520' :
                                          tea.teeArt === 'chai' ? '#A0522D' :
                                          tea.teeArt === 'jasmin' ? '#C77DFF' : '#2E8B57' }}
                />
                <span className="text-xs font-sans font-medium text-midnight/60">
                  {TEA_TYPE_LABELS[tea.teeArt]}
                </span>
              </div>
            </div>

            {/* Tea Name */}
            <h2 className="text-4xl font-bold font-sans text-midnight mb-2 leading-tight">
              {tea.name}
            </h2>

            {/* Hersteller */}
            {tea.hersteller && (
              <p className="text-lg text-midnight/50 font-sans mb-4">
                {tea.hersteller}
              </p>
            )}

            {/* Rating */}
            {tea.rating && (
              <div className="mb-6">
                <StarRating value={tea.rating} readonly size="lg" />
              </div>
            )}

            {/* Beste Tageszeiten Badges */}
            {tea.bestTimeOfDay && tea.bestTimeOfDay.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tea.bestTimeOfDay.map(time => {
                  const { icon } = TIME_OF_DAY_LABELS[time];
                  const IconComponent = 
                    icon === 'sunrise' ? SunriseIcon :
                    icon === 'sun' ? SunIcon :
                    icon === 'sunhaze' ? SunHazeIcon :
                    MoonIcon;
                  
                  return (
                    <div 
                      key={time}
                      className="px-2.5 py-1.5 bg-gold/15 rounded-full flex items-center"
                      aria-label={TIME_OF_DAY_LABELS[time].label}
                    >
                      <IconComponent size={18} className="text-gold-text" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            {/* Brewing Info */}
            <div className="flex items-center gap-6">
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
            </div>

            {/* Füllstand */}
            <div>
              <p className="text-xs font-sans font-medium text-midnight/40 uppercase tracking-wide mb-2">
                Füllstand
              </p>
              <div className="flex gap-1">
                {[...Array(fullDots)].map((_, i) => (
                  <div key={`full-${i}`} className="w-4 h-4 rounded-full bg-gold" />
                ))}
                {[...Array(emptyDots)].map((_, i) => (
                  <div key={`empty-${i}`} className="w-4 h-4 rounded-full bg-midnight/10" />
                ))}
              </div>
              <p className="text-sm font-sans text-midnight/60 mt-1">
                {tea.fuellstand}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute inset-0 rounded-3xl shadow-2xl pointer-events-none" 
           style={{ 
             boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 1px rgba(0,0,0,0.1)' 
           }} 
      />
    </motion.div>
  );
};
