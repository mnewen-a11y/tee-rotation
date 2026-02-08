import { motion } from 'framer-motion';
import { Thermometer } from 'lucide-react';
import { Tea, TEA_TYPE_COLORS } from '@/types/tea';

interface TeaGridCardProps {
  tea: Tea;
  onSelect: () => void;
  index: number;
}

export const TeaGridCard = ({ tea, onSelect, index }: TeaGridCardProps) => {
  const teaColor = TEA_TYPE_COLORS[tea.teeArt];
  const fuellstandColor = 
    tea.fuellstand > 70 ? 'bg-ios-green' :
    tea.fuellstand > 30 ? 'bg-ios-orange' :
    'bg-ios-red';

  // Show permanent checkmark if tea is selected (for backlog)
  const showCheckmark = tea.isSelected;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ 
        opacity: 1, 
        scale: showCheckmark ? 1.02 : 1,
      }}
      transition={{ 
        delay: index * 0.04,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={`group relative aspect-square rounded-ios-xl overflow-hidden shadow-ios-md hover:shadow-ios-lg transition-all bg-gold border-2 ${
        showCheckmark 
          ? 'border-ios-green shadow-ios-green/50' 
          : 'border-gold/20'
      }`}
    >
      {/* Tea Type Badge */}
      <div 
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: teaColor }}
      />
      
      {/* Selected Indicator */}
      {showCheckmark && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 left-2 w-8 h-8 bg-ios-green rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </motion.div>
      )}
      
      {/* Fuellstand Bar */}
      <div className="absolute top-3 right-3 w-1.5 h-16 bg-gray-200 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`${fuellstandColor} w-full absolute bottom-0 transition-all`}
          style={{ height: `${tea.fuellstand}%` }}
        />
      </div>

      {/* Content */}
      <div className="h-full flex flex-col items-center justify-center p-4 text-center relative z-10">
        {/* Tea Type Badge */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-md"
          style={{ backgroundColor: teaColor }}
        >
          <Thermometer className="w-6 h-6 text-white" />
        </div>

        {/* Tea Name */}
        <h3 className="font-bold text-base mb-1 line-clamp-2 text-midnight">
          {tea.name}
        </h3>

        {/* Hersteller */}
        {tea.hersteller && (
          <p className="text-xs text-midnight/60 line-clamp-1 mb-2">
            {tea.hersteller}
          </p>
        )}

        {/* Temperature Badge */}
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-midnight/10 rounded-lg text-xs font-medium text-midnight">
          <span>{tea.bruehgrad}°</span>
        </div>

        {/* Gramm */}
        <div className="absolute bottom-3 left-3 text-xs font-medium text-midnight/60">
          {tea.grammAnzahl}g
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.button>
  );
};
