/**
 * TabBar - iOS Native Tab Bar Pattern
 * Apple HIG Compliant
 */

import { motion } from 'framer-motion';
import { Star, List } from 'lucide-react';
import { designSystem as ds } from '@/design/design-tokens';

export type TabId = 'today' | 'collection';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  todayCount?: number;
  collectionCount?: number;
}

export const TabBar = ({ activeTab, onTabChange, todayCount, collectionCount }: TabBarProps) => {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-30 border-t"
      style={{
        background: ds.glass.card.background,
        backdropFilter: ds.glass.card.backdropFilter,
        WebkitBackdropFilter: ds.glass.card.WebkitBackdropFilter,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)',
      }}
    >
      <div className="flex items-center justify-around px-4 pt-2 pb-1">
        {/* Tab 1: Für Dich */}
        <motion.button
          onClick={() => onTabChange('today')}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex-1 flex flex-col items-center gap-1 py-2 relative"
          aria-label="Für Dich Tab"
          aria-current={activeTab === 'today' ? 'page' : undefined}
        >
          <div className="relative">
            <Star 
              className="w-6 h-6"
              fill={activeTab === 'today' ? ds.colors.brand.gold : 'none'}
              style={{ 
                color: activeTab === 'today' ? ds.colors.brand.gold : ds.colors.text.tertiary,
                strokeWidth: activeTab === 'today' ? 0 : 2
              }}
              aria-hidden="true"
            />
            {todayCount !== undefined && todayCount > 0 && (
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: ds.colors.semantic.error,
                  color: ds.colors.text.inverse
                }}
                aria-label={`${todayCount} Tees verfügbar`}
              >
                {todayCount > 9 ? '9+' : todayCount}
              </div>
            )}
          </div>
          <span 
            className="text-[10px] font-medium"
            style={{
              fontFamily: ds.typography.fontFamily.system,
              color: activeTab === 'today' ? ds.colors.brand.gold : ds.colors.text.tertiary
            }}
          >
            Für Dich
          </span>
        </motion.button>

        {/* Tab 2: Sammlung */}
        <motion.button
          onClick={() => onTabChange('collection')}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex-1 flex flex-col items-center gap-1 py-2 relative"
          aria-label="Sammlung Tab"
          aria-current={activeTab === 'collection' ? 'page' : undefined}
        >
          <div className="relative">
            <List 
              className="w-6 h-6"
              style={{ 
                color: activeTab === 'collection' ? ds.colors.brand.gold : ds.colors.text.tertiary,
                strokeWidth: activeTab === 'collection' ? 2.5 : 2
              }}
              aria-hidden="true"
            />
            {collectionCount !== undefined && collectionCount > 0 && (
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: ds.colors.text.tertiary,
                  color: ds.colors.text.inverse
                }}
                aria-label={`${collectionCount} Tees in Sammlung`}
              >
                {collectionCount > 99 ? '99+' : collectionCount}
              </div>
            )}
          </div>
          <span 
            className="text-[10px] font-medium"
            style={{
              fontFamily: ds.typography.fontFamily.system,
              color: activeTab === 'collection' ? ds.colors.brand.gold : ds.colors.text.tertiary
            }}
          >
            Sammlung
          </span>
        </motion.button>
      </div>
    </div>
  );
};
