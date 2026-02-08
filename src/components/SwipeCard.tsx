import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { X, Check, Thermometer, Package } from 'lucide-react';
import { Tea, TEA_TYPE_COLORS, TEA_TYPE_LABELS } from '@/types/tea';

interface SwipeCardProps {
  tea: Tea;
  onSwipeLeft: () => void;  // Accept tea
  onSwipeRight: () => void; // Skip tea
  zIndex: number;
}

export const SwipeCard = ({ tea, onSwipeLeft, onSwipeRight, zIndex }: SwipeCardProps) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const teaColor = TEA_TYPE_COLORS[tea.teeArt];
  const fuellstandColor = 
    tea.fuellstand > 70 ? 'bg-ios-green' :
    tea.fuellstand > 30 ? 'bg-ios-orange' :
    'bg-ios-red';

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      setExitX(-500);
      setTimeout(() => onSwipeLeft(), 200);
    } else if (info.offset.x > 100) {
      setExitX(500);
      setTimeout(() => onSwipeRight(), 200);
    }
  };

  return (
    <motion.div
      className="absolute w-full max-w-md"
      style={{
        x,
        rotate,
        opacity,
        zIndex,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ duration: 0.2 }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="relative bg-white bg-midnight rounded-3xl shadow-2xl overflow-hidden border-2 border-white/10">
        {/* Swipe Indicators */}
        <motion.div
          className="absolute top-8 left-8 z-10"
          style={{ opacity: useTransform(x, [-200, -50], [1, 0]) }}
        >
          <div className="bg-ios-green text-white px-6 py-3 rounded-2xl font-bold text-xl flex items-center gap-2 shadow-lg rotate-12">
            <Check className="w-6 h-6" />
            Trinken!
          </div>
        </motion.div>

        <motion.div
          className="absolute top-8 right-8 z-10"
          style={{ opacity: useTransform(x, [50, 200], [0, 1]) }}
        >
          <div className="bg-ios-red text-white px-6 py-3 rounded-2xl font-bold text-xl flex items-center gap-2 shadow-lg -rotate-12">
            <X className="w-6 h-6" />
            Später
          </div>
        </motion.div>

        {/* Card Content */}
        <div className="p-8">
          {/* Tea Type Badge */}
          <div className="flex justify-center mb-6">
            <div
              className="px-6 py-2 rounded-full text-white font-medium text-sm tracking-wide shadow-lg"
              style={{ backgroundColor: teaColor }}
            >
              {TEA_TYPE_LABELS[tea.teeArt]}
            </div>
          </div>

          {/* Tea Name */}
          <h2 className="text-4xl font-bold text-center mb-2 text-white text-white">
            {tea.name}
          </h2>

          {/* Hersteller */}
          {tea.hersteller && (
            <p className="text-center text-white/60 text-lg mb-8">
              {tea.hersteller}
            </p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Temperature */}
            <div className="bg-ios-bg bg-white/10 rounded-2xl p-6 flex flex-col items-center">
              <Thermometer className="w-8 h-8 text-gold mb-2" />
              <span className="text-3xl font-bold text-white text-white">{tea.bruehgrad}°</span>
              <span className="text-xs text-white/60 mt-1">Celsius</span>
            </div>

            {/* Gramm */}
            <div className="bg-ios-bg bg-white/10 rounded-2xl p-6 flex flex-col items-center">
              <Package className="w-8 h-8 text-gold mb-2" />
              <span className="text-3xl font-bold text-white text-white">{tea.grammAnzahl}</span>
              <span className="text-xs text-white/60 mt-1">Gramm</span>
            </div>
          </div>

          {/* Fuellstand Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white/60">Füllstand</span>
              <span className="text-sm font-bold text-white text-white">{tea.fuellstand}%</span>
            </div>
            <div className="h-3 bg-gray-200 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${fuellstandColor} transition-all rounded-full`}
                style={{ width: `${tea.fuellstand}%` }}
              />
            </div>
          </div>

          {/* Swipe Instructions */}
          <div className="text-center">
            <p className="text-sm text-white/60">
              ← Wischen zum Trinken • Wischen zum Überspringen →
            </p>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ 
            background: `linear-gradient(135deg, ${teaColor}22 0%, transparent 50%)` 
          }}
        />
      </div>
    </motion.div>
  );
};
