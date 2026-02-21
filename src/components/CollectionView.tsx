/**
 * CollectionView - Alle Tees Grid (Tab 2)
 * Apple HIG Grid Pattern
 */

import { motion } from 'framer-motion';
import { Tea, TEA_TYPE_LABELS } from '@/types/tea';
import { Thermometer, Scale } from 'lucide-react';
import { designSystem as ds } from '@/design/design-tokens';

interface CollectionViewProps {
  teas: Tea[];
  onTeaSelect: (tea: Tea) => void;
  onTeaEdit: (tea: Tea) => void;
}

export const CollectionView = ({ teas, onTeaSelect, onTeaEdit }: CollectionViewProps) => {
  const availableTeas = teas.filter(t => !t.zuletztGetrunken);
  const usedTeas = teas.filter(t => t.zuletztGetrunken);

  return (
    <div className="pb-24 pt-4">
      {/* Verfügbare Tees */}
      {availableTeas.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xl font-bold mb-4 px-6"
            style={{
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.primary
            }}
          >
            Verfügbar ({availableTeas.length})
          </h2>
          <div className="grid grid-cols-2 gap-4 px-6">
            {availableTeas.map((tea, index) => (
              <TeaGridItem 
                key={tea.id}
                tea={tea}
                index={index}
                onSelect={() => onTeaSelect(tea)}
                onEdit={() => onTeaEdit(tea)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bereits verwendet */}
      {usedTeas.length > 0 && (
        <div>
          <h2 
            className="text-xl font-bold mb-4 px-6"
            style={{
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.primary
            }}
          >
            Verwendet ({usedTeas.length})
          </h2>
          <div className="grid grid-cols-2 gap-4 px-6">
            {usedTeas.map((tea, index) => (
              <TeaGridItem 
                key={tea.id}
                tea={tea}
                index={index}
                onSelect={() => onTeaSelect(tea)}
                onEdit={() => onTeaEdit(tea)}
                isUsed
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {teas.length === 0 && (
        <div className="text-center py-20 px-6">
          <p 
            className="text-base mb-4"
            style={{ color: ds.colors.text.tertiary }}
          >
            Noch keine Tees vorhanden
          </p>
        </div>
      )}
    </div>
  );
};

interface TeaGridItemProps {
  tea: Tea;
  index: number;
  onSelect: () => void;
  onEdit: () => void;
  isUsed?: boolean;
}

const TeaGridItem = ({ tea, index, onEdit, isUsed }: TeaGridItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        delay: index * 0.05 
      }}
      onClick={onEdit}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: ds.glass.card.background,
        backdropFilter: ds.glass.card.backdropFilter,
        WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
        border: ds.glass.card.border,
        boxShadow: ds.shadows.glass,
        opacity: isUsed ? 0.6 : 1
      }}
    >
      <div className="p-4">
        {/* Tea Type Badge */}
        <div 
          className="inline-block px-3 py-1 rounded-full mb-3 text-xs font-medium"
          style={{
            background: ds.colors.brand.gold,
            color: ds.colors.text.inverse
          }}
        >
          {TEA_TYPE_LABELS[tea.teeArt]}
        </div>

        {/* Tea Name */}
        <h3 
          className="font-bold mb-1 truncate"
          style={{
            fontSize: ds.typography.fontSize.headline,
            fontFamily: ds.typography.fontFamily.system,
            color: ds.colors.text.primary
          }}
        >
          {tea.name}
        </h3>

        {/* Hersteller */}
        {tea.hersteller && (
          <p 
            className="text-xs mb-3 truncate"
            style={{ color: ds.colors.text.secondary }}
          >
            {tea.hersteller}
          </p>
        )}

        {/* Brewing Info */}
        <div className="flex items-center gap-3 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <Thermometer 
              className="w-3 h-3" 
              style={{ color: ds.colors.brand.gold }}
              aria-hidden="true"
            />
            <span style={{ color: ds.colors.text.secondary }}>
              {tea.bruehgrad}°
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Scale 
              className="w-3 h-3" 
              style={{ color: ds.colors.brand.gold }}
              aria-hidden="true"
            />
            <span style={{ color: ds.colors.text.secondary }}>
              {tea.grammAnzahl}g
            </span>
          </div>
        </div>

        {/* Füllstand */}
        <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
          <div 
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ 
              width: `${tea.fuellstand}%`,
              background: ds.colors.brand.gold
            }}
          />
        </div>
        <p className="text-[10px] mt-1" style={{ color: ds.colors.text.tertiary }}>
          {tea.fuellstand}% Füllstand
        </p>

        {/* Used Badge */}
        {isUsed && tea.zuletztGetrunken && (
          <div 
            className="mt-2 text-[10px] font-medium"
            style={{ color: ds.colors.text.tertiary }}
          >
            Verwendet
          </div>
        )}
      </div>
    </motion.div>
  );
};
