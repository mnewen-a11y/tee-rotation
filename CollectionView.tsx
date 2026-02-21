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
    <div 
      className="overflow-y-auto pt-4"
      style={{
        height: 'calc(100vh - 48px)', // header only
        paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0))', // TabBar content + safe-area
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Verfügbare Tees */}
      {availableTeas.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xs font-semibold mb-3 px-6 uppercase tracking-wide"
            style={{
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.tertiary
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
            className="text-xs font-semibold mb-3 px-6 uppercase tracking-wide"
            style={{
              fontFamily: ds.typography.fontFamily.system,
              color: ds.colors.text.tertiary
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

const TeaGridItem = ({ tea, index, onSelect, onEdit, isUsed }: TeaGridItemProps) => {
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
      className="rounded-2xl overflow-hidden relative"
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
        {/* Tea Type Badge - Nur Info */}
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

        {/* Action Row - IMMER VORHANDEN */}
        <div className="flex items-center justify-between mt-2">
          {/* Left: Reset button (nur bei used) */}
          {isUsed && tea.zuletztGetrunken ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="text-[11px] font-medium"
              style={{ color: ds.colors.brand.gold }}
            >
              Zurücksetzen
            </button>
          ) : (
            <div />
          )}

          {/* Right: Edit button - Minimal Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="flex-shrink-0 p-1"
            style={{ color: ds.colors.brand.gold }}
            aria-label="Tee bearbeiten"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
