import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2 } from 'lucide-react';
import { Tea, TEA_TYPE_COLORS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';
import { useLongPress } from '@/hooks/useLongPress';
import { ContextMenu } from '@/components/ContextMenu';
import { StarRating } from '@/components/StarRating';

interface TeaGridCardProps {
  tea: Tea;
  onSelect: () => void;
  index: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TeaGridCard = ({ tea, onSelect, index, onEdit, onDelete }: TeaGridCardProps) => {
  const { trigger: haptic } = useHaptic();
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const teaColor = TEA_TYPE_COLORS[tea.teeArt];

  const longPress = useLongPress({
    onLongPress: (x, y) => {
      haptic('medium');
      setMenuPos({ x, y });
    },
  });

  const contextItems = [
    ...(onEdit   ? [{ label: 'Bearbeiten', icon: Edit3,  action: onEdit }] : []),
    ...(onDelete ? [{ label: 'Löschen',    icon: Trash2, action: onDelete, destructive: true }] : []),
  ];
  const fuellstandColor =
    tea.fuellstand > 70 ? 'bg-green-500' :
    tea.fuellstand > 30 ? 'bg-orange-400' :
    'bg-red-500';

  const showCheckmark = tea.isSelected;

  return (
  <>
    <motion.button
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: showCheckmark ? 1.02 : 1 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.94, filter: 'brightness(0.92)' }}
      onClick={() => { haptic('medium'); onSelect(); }}
      {...longPress}
      aria-label={`${tea.name} auswählen`}
      className={`group relative aspect-square rounded-ios-xl overflow-hidden shadow-ios-md hover:shadow-ios-lg transition-all bg-white border-2 ${
        showCheckmark ? 'border-green-500 shadow-green-200' : 'border-gold/20'
      }`}
    >


      {/* Ausgewählt-Häkchen */}
      {showCheckmark && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 left-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10"
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </motion.div>
      )}

      {/* Inhalt */}
      <div className="h-full flex flex-col justify-center px-3 pt-4 pb-3 relative z-10">

        {/* Tee-Art Farbpunkt */}
        <div
          className="w-2.5 h-2.5 rounded-full mb-2 flex-shrink-0"
          style={{ backgroundColor: teaColor }}
          aria-hidden="true"
        />

        {/* Tee-Name */}
        <h3
          className="font-bold text-sm leading-tight text-midnight font-sans mb-0.5 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {tea.name}
        </h3>

        {/* Hersteller */}
        {tea.hersteller && (
          <p className="text-xs text-midnight/50 truncate mb-1">{tea.hersteller}</p>
        )}

        {/* Rating */}
        {tea.rating && tea.rating > 0 && (
          <div className="mb-1">
            <StarRating value={tea.rating} readonly size="sm" />
          </div>
        )}

        {/* Temperatur · Gramm · Füllstand-Balken */}
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <span className="text-xs font-medium text-midnight/70 bg-midnight/8 px-1.5 py-0.5 rounded-md flex-shrink-0">
            {tea.bruehgrad}°C
          </span>
          <span className="text-xs font-medium text-midnight/50 flex-shrink-0">
            {tea.grammAnzahl}g
          </span>

          {/* Füllstand-Balken — horizontal, füllt restlichen Platz */}
          <div
            className="flex-1 h-1.5 bg-midnight/10 rounded-full overflow-hidden"
            aria-label={`Füllstand ${tea.fuellstand}%`}
            role="meter"
            aria-valuenow={tea.fuellstand}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`${fuellstandColor} h-full rounded-full transition-all`}
              style={{ width: `${tea.fuellstand}%` }}
            />
          </div>
        </div>
      </div>

      {/* Hover-Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.button>

    {/* Context Menu */}
    {contextItems.length > 0 && (
      <ContextMenu
        isOpen={!!menuPos}
        x={menuPos?.x ?? 0}
        y={menuPos?.y ?? 0}
        items={contextItems}
        onClose={() => setMenuPos(null)}
      />
    )}
  </>
  );
};
