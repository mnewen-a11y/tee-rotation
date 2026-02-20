/**
 * SwipeTeaCard - Premium Apple HIG Design
 * Minimalistisch, luxuriös, viel Weißraum
 */

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Tea, TEA_TYPE_LABELS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';
import { Leaf, Thermometer, Scale } from 'lucide-react';

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

  // Füllstand Percentage
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
    >
      {/* Swipe Overlays */}
      <motion.div 
        style={{ opacity: acceptOpacity }}
        className="absolute inset-0 bg-green-500/20 pointer-events-none flex items-center justify-end pr-12 rounded-[32px]"
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

      {/* Premium Card */}
      <div 
        className="bg-white rounded-[32px] overflow-hidden"
        style={{
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12), 0 8px 24px rgba(15, 23, 42, 0.08)'
        }}
      >
        {/* Card Content */}
        <div className="px-8 py-10">
          
          {/* Tea Type Badge - Top */}
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-4 h-4 text-[#0F172A]/60" strokeWidth={2} />
            <span className="text-xs font-semibold tracking-wide uppercase text-[#0F172A]/60">
              {TEA_TYPE_LABELS[tea.teeArt]}
            </span>
          </div>

          {/* Large Title */}
          <h2 
            className="text-4xl font-bold tracking-tight mb-2"
            style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
              color: '#0F172A',
              letterSpacing: '-0.02em'
            }}
          >
            {tea.name}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-[#0F172A]/50 mb-8 font-medium">
            {tea.hersteller}
          </p>

          {/* Inline Specs Row - Apple HIG Style */}
          <div className="flex items-center gap-6 mb-10 text-[#0F172A]/70">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5" strokeWidth={2} />
              <span className="text-base font-semibold">{tea.bruehgrad}°C</span>
            </div>
            <span className="text-[#0F172A]/30">·</span>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5" strokeWidth={2} />
              <span className="text-base font-semibold">{tea.grammAnzahl}g</span>
            </div>
          </div>

          {/* Füllstand Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span 
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: '#0F172A', opacity: 0.6 }}
              >
                Füllstand
              </span>
              <span 
                className="text-sm font-bold"
                style={{ color: '#C9AE4D' }}
              >
                {fillPercentage}%
              </span>
            </div>
            
            {/* Premium Progress Bar */}
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: '#0F172A', opacity: 0.08 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fillPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #C9AE4D 0%, #B8952F 100%)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
