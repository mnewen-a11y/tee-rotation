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
        <div className="bg-gold backdrop-blur-ios rounded-ios-xl p-8 shadow-ios-lg border border-gold/20">
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
          <h1 className="text-4xl font-bold text-center mb-2 text-gold-text font-serif">
            {tea.name}
          </h1>

          {/* Hersteller */}
          {tea.hersteller && (
            <p className="text-center text-gold-text/60 text-lg mb-8">
              {tea.hersteller}
            </p>
          )}

          {/* Temperature & Gramm Display */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-midnight/10 rounded-ios-lg px-6 py-4 flex flex-col items-center">
              <Thermometer className="w-6 h-6 mb-1" style={{ color: TEA_TYPE_COLORS[tea.teeArt] }} />
              <span className="text-3xl font-bold text-gold-text font-serif">{tea.bruehgrad}°</span>
            </div>
            <div className="bg-midnight/10 rounded-ios-lg px-6 py-4 flex flex-col items-center">
              <Package className="w-6 h-6 mb-1" style={{ color: TEA_TYPE_COLORS[tea.teeArt] }} />
              <span className="text-3xl font-bold text-gold-text font-serif">{tea.grammAnzahl}g</span>
            </div>
          </div>

          {/* Füllstand Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gold-text/60">Füllstand</span>
              <span className={`text-sm font-bold ${fuellstandColor}`}>{tea.fuellstand}%</span>
            </div>
            <div className="h-3 bg-midnight/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${fuellstandBgColor} transition-all rounded-full`}
                style={{ width: `${tea.fuellstand}%` }}
              />
            </div>
          </div>

          {/* Drink Button */}
          {onDrink && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onDrink}
              className="w-full bg-midnight text-white py-4 rounded-ios-lg font-semibold text-lg shadow-lg hover:bg-midnight/90 transition-colors"
            >
              Jetzt trinken
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-gold backdrop-blur-ios rounded-ios-lg p-4 shadow-ios border border-gold/20 mb-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: TEA_TYPE_COLORS[tea.teeArt] }}
            />
            <h3 className="font-semibold text-gold-text text-lg">{tea.name}</h3>
          </div>
          
          {tea.hersteller && (
            <p className="text-gold-text/60 text-sm mb-2">{tea.hersteller}</p>
          )}

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-gold-text/60">
              <Thermometer className="w-4 h-4" />
              <span>{tea.bruehgrad}°C</span>
            </div>
            <div className="flex items-center gap-1 text-gold-text/60">
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
              className="p-2 hover:bg-midnight/10 rounded-ios transition-colors"
            >
              <Edit3 className="w-5 h-5 text-midnight" />
            </motion.button>
          )}
          {onDelete && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onDelete}
              className="p-2 hover:bg-midnight/10 rounded-ios transition-colors"
            >
              <Trash2 className="w-5 h-5 text-ios-red" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
