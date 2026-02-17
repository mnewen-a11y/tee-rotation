import { motion } from 'framer-motion';
import { Thermometer } from 'lucide-react';
import { Tea, TEA_TYPE_COLORS, TEA_TYPE_LABELS } from '@/types/tea';

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

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className="group relative aspect-square rounded-ios-xl overflow-hidden shadow-ios hover:shadow-ios-lg transition-all bg-white dark:bg-gray-800 border border-ios-border dark:border-gray-700"
    >
      {/* Tea Color Background */}
      <div 
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: teaColor }}
      />
      
      {/* Fuellstand Bar */}
      <div className="absolute top-3 right-3 w-1.5 h-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`${fuellstandColor} w-full absolute bottom-0 transition-all`}
          style={{ height: `${tea.fuellstand}%` }}
        />
      </div>

      {/* Content */}
      <div className="h-full flex flex-col items-center justify-center p-4 text-center">
        {/* Tea Type Badge */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
          style={{ backgroundColor: teaColor }}
        >
          <Thermometer className="w-6 h-6 text-white" />
        </div>

        {/* Tea Name */}
        <h3 className="font-bold text-base mb-1 line-clamp-2 text-ios-label dark:text-white">
          {tea.name}
        </h3>

        {/* Hersteller */}
        {tea.hersteller && (
          <p className="text-xs text-ios-secondary dark:text-gray-400 line-clamp-1 mb-2">
            {tea.hersteller}
          </p>
        )}

        {/* Temperature Badge */}
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-ios-bg dark:bg-gray-700 rounded-lg text-xs font-medium text-ios-label dark:text-white">
          <span>{tea.bruehgrad}°</span>
        </div>

        {/* Gramm */}
        <div className="absolute bottom-3 left-3 text-xs font-medium text-ios-secondary dark:text-gray-400">
          {tea.grammAnzahl}g
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.button>
  );
};
