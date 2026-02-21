/**
 * SwipeTeaCard - Premium Apple HIG Design
 * PHASE 1: Typography, Buttons, Accessibility
 */

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Tea, TEA_TYPE_LABELS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';
import { Leaf, Thermometer, Scale } from 'lucide-react';
import { designSystem as ds } from '@/design/design-tokens';
import { buttonVariants, progressBarStyles } from '@/design/component-utils';

interface SwipeTeaCardProps {
  tea: Tea;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onTap: () => void;
}

const SWIPE_THRESHOLD = 100;

export const SwipeTeaCard = ({ tea, onSwipeRight, onSwipeLeft, onTap }: SwipeTeaCardProps) => {
  const { trigger: haptic } = useHaptic();
  const cardRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-8, 0, 8]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  const acceptOpacity = useTransform(x, [0, SWIPE_THRESHOLD, 200], [0, 0.3, 0.8]);
  const rejectOpacity = useTransform(x, [-200, -SWIPE_THRESHOLD, 0], [0.8, 0.3, 0]);

  const handleDragStart = () => {
    isDragging.current = false;
    document.body.style.overflow = 'hidden';
  };

  const handleDrag = () => {
    isDragging.current = true;
  };
  
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    document.body.style.overflow = '';
    
    const swipeDistance = info.offset.x;
    
    if (Math.abs(swipeDistance) >= SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        haptic('success');
        onSwipeRight();
      } else {
        haptic('light');
        onSwipeLeft();
      }
    } else {
      x.set(0);
    }
  };

  const handleClick = () => {
    if (!isDragging.current) {
      onTap();
    }
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const fillPercentage = tea.fuellstand;

  return (
    <motion.div
      ref={cardRef}
      style={{ x, rotate, opacity, touchAction: 'pan-x' }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      className="relative w-[85vw] max-w-[400px] mx-auto cursor-grab active:cursor-grabbing"
      role="article"
      aria-label={`Tee-Karte für ${tea.name}`}
    >
      {/* Swipe Overlays */}
      <motion.div 
        style={{ opacity: acceptOpacity }}
        className="absolute inset-0 bg-green-500/20 pointer-events-none flex items-center justify-end pr-12 rounded-[32px]"
        aria-hidden="true"
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
        className="absolute inset-0 bg-gray-300/10 pointer-events-none flex items-center justify-start pl-12 rounded-[32px]"
        aria-hidden="true"
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

      {/* Premium Card - PHASE 2: Liquid Glass */}
      <div 
        className="rounded-[32px] overflow-hidden"
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
          
          {/* Tea Type Badge - PHASE 1: Sentence Case */}
          <div className="flex items-center gap-2 mb-6">
            <Leaf 
              className="w-4 h-4"
              style={{ color: ds.colors.text.secondary }}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span 
              className="text-xs font-semibold tracking-wide"
              style={{ color: ds.colors.text.secondary }}
            >
              {TEA_TYPE_LABELS[tea.teeArt]}
            </span>
          </div>

          {/* Large Title */}
          <h2 
            className="text-4xl font-bold tracking-tight mb-2"
            style={{ 
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.primary,
              letterSpacing: ds.typography.letterSpacing.tight
            }}
          >
            {tea.name}
          </h2>

          {/* Subtitle */}
          <p 
            className="text-lg mb-8 font-medium"
            style={{ color: ds.colors.text.secondary }}
          >
            {tea.hersteller}
          </p>

          {/* Inline Specs Row - PHASE 1: VoiceOver */}
          <div 
            className="flex items-center gap-6 mb-10"
            style={{ color: ds.colors.text.secondary }}
          >
            <div className="flex items-center gap-2">
              <Thermometer 
                className="w-5 h-5" 
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="text-base font-semibold">
                {tea.bruehgrad}°C
              </span>
              <span className="sr-only">Brühtemperatur {tea.bruehgrad} Grad Celsius</span>
            </div>
            <span style={{ color: ds.colors.text.tertiary }} aria-hidden="true">·</span>
            <div className="flex items-center gap-2">
              <Scale 
                className="w-5 h-5" 
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="text-base font-semibold">
                {tea.grammAnzahl}g
              </span>
              <span className="sr-only">Teemenge {tea.grammAnzahl} Gramm</span>
            </div>
          </div>

          {/* Füllstand Section - PHASE 1: Sentence Case */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span 
                className="text-xs font-semibold tracking-wide"
                style={{ color: ds.colors.text.secondary }}
              >
                Füllstand
              </span>
              <span 
                className="text-sm font-bold"
                style={{ color: ds.colors.brand.gold }}
                aria-label={`Füllstand ${fillPercentage} Prozent`}
              >
                {fillPercentage}%
              </span>
            </div>
            
            {/* PHASE 1: Progress Bar mit Design Tokens */}
            <div 
              style={progressBarStyles.container}
              role="progressbar"
              aria-valuenow={fillPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Tee-Füllstand"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fillPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  ...progressBarStyles.fill,
                  width: `${fillPercentage}%`
                }}
              />
            </div>
          </div>

          {/* PHASE 1: Buttons mit Design System */}
          <div className="flex items-center gap-3 pt-6">
            {/* Skip Button - Secondary */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                haptic('light');
                onSwipeLeft();
              }}
              className="flex-1 transition-all active:scale-95"
              style={{
                ...buttonVariants.secondary,
                WebkitTapHighlightColor: 'transparent'
              }}
              aria-label="Diesen Tee überspringen"
            >
              Skip
            </button>

            {/* Ok Button - Primary (Flat Gold per HIG) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                haptic('success');
                onSwipeRight();
              }}
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
              aria-label="Diesen Tee auswählen"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
