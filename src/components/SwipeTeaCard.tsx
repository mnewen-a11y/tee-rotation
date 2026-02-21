/**
 * SwipeTeaCard - Apple HIG Design (NO SWIPE - Buttons Only)
 * Creative Director Decision: Clear affordance > Hidden gestures
 */

import { motion } from 'framer-motion';
import { Tea, TEA_TYPE_LABELS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';
import { Leaf, Thermometer, Scale } from 'lucide-react';
import { designSystem as ds } from '@/design/design-tokens';
import { buttonVariants, progressBarStyles } from '@/design/component-utils';

interface SwipeTeaCardProps {
  tea: Tea;
  onSelect: () => void;
  onSkip: () => void;
  onTap: () => void;
}

export const SwipeTeaCard = ({ tea, onSelect, onSkip, onTap }: SwipeTeaCardProps) => {
  const { trigger: haptic } = useHaptic();
  
  const fillPercentage = tea.fuellstand;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative w-[85vw] max-w-[400px] mx-auto"
      role="article"
      aria-label={`Tee-Karte für ${tea.name}`}
    >
      {/* Card Container - Liquid Glass */}
      <div
        onClick={onTap}
        className="rounded-[32px] overflow-hidden cursor-pointer"
        style={{
          background: ds.glass.card.background,
          backdropFilter: ds.glass.card.backdropFilter,
          WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
          border: ds.glass.card.border,
          boxShadow: ds.shadows.glass
        }}
      >
        {/* Card Content */}
        <div className="p-8">
          {/* Tea Type Badge */}
          <div className="flex justify-center mb-6">
            <div 
              className="px-5 py-2 rounded-full flex items-center gap-2"
              style={{
                background: ds.colors.brand.gold,
                color: ds.colors.text.inverse
              }}
            >
              <Leaf className="w-4 h-4" aria-hidden="true" />
              <span 
                className="font-medium text-sm"
                style={{ 
                  fontFamily: ds.typography.fontFamily.system,
                  letterSpacing: ds.typography.letterSpacing.wide
                }}
              >
                {TEA_TYPE_LABELS[tea.teeArt]}
              </span>
            </div>
          </div>

          {/* Tea Name */}
          <h2 
            className="text-center mb-2"
            style={{
              fontSize: ds.typography.fontSize.largeTitle,
              fontWeight: ds.typography.fontWeight.bold,
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.primary,
              letterSpacing: ds.typography.letterSpacing.tight
            }}
          >
            {tea.name}
          </h2>

          {/* Hersteller */}
          {tea.hersteller && (
            <p 
              className="text-center mb-8"
              style={{
                fontSize: ds.typography.fontSize.body,
                color: ds.colors.text.secondary,
                fontFamily: ds.typography.fontFamily.system
              }}
            >
              {tea.hersteller}
            </p>
          )}

          {/* Brewing Info - Eine Reihe, zentriert */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Thermometer 
                className="w-5 h-5" 
                style={{ color: ds.colors.brand.gold }}
                aria-hidden="true"
              />
              <span 
                className="text-xl font-bold"
                style={{ 
                  color: ds.colors.text.primary,
                  fontFamily: ds.typography.fontFamily.system
                }}
              >
                {tea.bruehgrad}°
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Scale 
                className="w-5 h-5" 
                style={{ color: ds.colors.brand.gold }}
                aria-hidden="true"
              />
              <span 
                className="text-xl font-bold"
                style={{ 
                  color: ds.colors.text.primary,
                  fontFamily: ds.typography.fontFamily.system
                }}
              >
                {tea.grammAnzahl}g
              </span>
            </div>
          </div>

          {/* Füllstand Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span 
                className="text-sm font-medium"
                style={{ 
                  color: ds.colors.text.secondary,
                  fontFamily: ds.typography.fontFamily.system
                }}
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
            
            {/* Progress Bar mit Spring Animation */}
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
                transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.1 }}
                style={{
                  ...progressBarStyles.fill,
                  width: `${fillPercentage}%`
                }}
              />
            </div>
          </div>

          {/* Buttons - Apple HIG Style (NO SWIPE!) */}
          <div className="flex items-center gap-3 pt-6">
            {/* Skip Button - Secondary */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                haptic('light');
                onSkip();
              }}
              whileTap={{ scale: 0.95, opacity: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex-1"
              style={{
                ...buttonVariants.secondary,
                WebkitTapHighlightColor: 'transparent'
              }}
              aria-label="Diesen Tee überspringen"
            >
              Skip
            </motion.button>

            {/* Select Button - Primary */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                haptic('success');
                onSelect();
              }}
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
              aria-label="Diesen Tee auswählen"
            >
              Auswählen
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
