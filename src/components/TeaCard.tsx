import { motion } from 'framer-motion';
import { Thermometer, Package, Trash2, Edit3 } from 'lucide-react';
import { Tea, TEA_TYPE_COLORS, TEA_TYPE_LABELS } from '@/types/tea';

interface TeaCardProps {
  tea: Tea;
  onDrink?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  variant?: 'list' | 'hero';
}

export const TeaCard = ({ tea, onDrink, onEdit, onDelete, variant = 'list' }: TeaCardProps) => {
  const fuellstandColor = 
    tea.fuellstand > 70 ? 'text-ios-green' :
    tea.fuellstand > 30 ? 'text-ios-orange' :
    'text-ios-red';

  const fuellstandBgColor = 
    tea.fuellstand > 70 ? 'bg-ios-green' :
    tea.fuellstand > 30 ? 'bg-ios-orange' :
    'bg-ios-red';

  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-ios rounded-ios-xl p-8 shadow-ios-lg border border-ios-border dark:border-gray-700">
          {/* Tea Type Badge */}
          <div className="flex items-center justify-center mb-6">
            <div
              className="px-6 py-2 rounded-full text-white font-medium text-sm tracking-wide"
              style={{ backgroundColor: TEA_TYPE_COLORS[tea.teeArt] }}
            >
              {TEA_TYPE_LABELS[tea.teeArt]}
            </div>
          </div>

          {/* Tea Name */}
          <h1 className="text-4xl font-bold text-center mb-2 text-ios-label dark:text-white">
            {tea.name}
          </h1>

          {/* Hersteller */}
          {tea.hersteller && (
            <p className="text-center text-ios-secondary dark:text-gray-400 text-lg mb-8">
              {tea.hersteller}
            </p>
          )}

          {/* Temperature & Gramm Display */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-ios-bg dark:bg-gray-700 rounded-ios-lg px-6 py-4 flex flex-col items-center">
              <Thermometer className="w-6 h-6 text-ios-blue dark:text-blue-400 mb-1" />
              <span className="text-3xl font-bold text-ios-label dark:text-white">{tea.bruehgrad}°</span>
            </div>
            <div className="bg-ios-bg dark:bg-gray-700 rounded-ios-lg px-6 py-4 flex flex-col items-center">
              <Package className="w-6 h-6 text-ios-blue dark:text-blue-400 mb-1" />
              <span className="text-3xl font-bold text-ios-label dark:text-white">{tea.grammAnzahl}g</span>
            </div>
          </div>

          {/* Füllstand Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ios-secondary dark:text-gray-400">Füllstand</span>
              <span className={`text-sm font-bold ${fuellstandColor}`}>{tea.fuellstand}%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${fuellstandBgColor} transition-all rounded-full`}
                style={{ width: `${tea.fuellstand}%` }}
              />
            </div>
          </div>

          {/* Drink Button */}
          {onDrink && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onDrink}
              className="w-full bg-ios-green hover:bg-opacity-90 text-white font-semibold text-xl py-5 rounded-ios-lg shadow-ios transition-all"
            >
              Getrunken
            </motion.button>
          )}

          <p className="text-center text-ios-secondary dark:text-gray-400 text-sm mt-4">
            Deine Tee-Regentin weiß Bescheid ☕
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-ios rounded-ios-lg p-4 shadow-ios border border-ios-border dark:border-gray-700 mb-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: TEA_TYPE_COLORS[tea.teeArt] }}
            />
            <h3 className="font-semibold text-ios-label dark:text-white text-lg">{tea.name}</h3>
          </div>
          
          {tea.hersteller && (
            <p className="text-ios-secondary dark:text-gray-400 text-sm mb-2">{tea.hersteller}</p>
          )}

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-ios-secondary dark:text-gray-400">
              <Thermometer className="w-4 h-4" />
              <span>{tea.bruehgrad}°C</span>
            </div>
            <div className="flex items-center gap-1 text-ios-secondary dark:text-gray-400">
              <Package className="w-4 h-4" />
              <span>{tea.grammAnzahl}g</span>
            </div>
            <div className={`flex items-center gap-1 ${fuellstandColor} font-medium`}>
              <span>{tea.fuellstand}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onEdit}
              className="p-2 hover:bg-ios-bg dark:hover:bg-gray-700 rounded-ios transition-colors"
            >
              <Edit3 className="w-5 h-5 text-ios-blue dark:text-blue-400" />
            </motion.button>
          )}
          {onDelete && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onDelete}
              className="p-2 hover:bg-ios-bg dark:hover:bg-gray-700 rounded-ios transition-colors"
            >
              <Trash2 className="w-5 h-5 text-ios-red dark:text-red-400" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
