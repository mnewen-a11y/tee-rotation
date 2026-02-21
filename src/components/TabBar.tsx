import { motion } from 'framer-motion';
import { RefreshCw, LayoutGrid } from 'lucide-react';

export type TabId = 'today' | 'collection';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  todayCount?: number;
  collectionCount?: number;
}

export const TabBar = ({ activeTab, onTabChange, todayCount, collectionCount }: TabBarProps) => {
  const tabs: { id: TabId; icon: typeof RefreshCw; label: string; count?: number }[] = [
    { id: 'today',      icon: RefreshCw,   label: 'Rotation',  count: todayCount },
    { id: 'collection', icon: LayoutGrid,  label: 'Sammlung',  count: collectionCount },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 flex justify-center"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
    >
      {/* Dunkles Glas — midnight, immer lesbar */}
      <nav
        aria-label="Hauptnavigation"
        className="relative flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          background: 'rgba(18, 24, 48, 0.85)',
          backdropFilter: 'blur(40px) saturate(160%)',
          WebkitBackdropFilter: 'blur(40px) saturate(160%)',
          boxShadow: [
            '0 8px 32px rgba(0,0,0,0.30)',
            '0 2px 8px rgba(0,0,0,0.20)',
            'inset 0 1px 0 rgba(255,255,255,0.10)',
            'inset 0 -1px 0 rgba(0,0,0,0.15)',
          ].join(', '),
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-col items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-full"
              style={{ minWidth: '68px', padding: '6px 4px' }}
            >
              {/* Active pill */}
              {isActive && (
                <motion.div
                  layoutId="tabPill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.1)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}

              <motion.div
                animate={{ scale: isActive ? 1.08 : 1, y: isActive ? -1 : 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="relative z-10"
              >
                <div className="relative">
                  <Icon
                    className="w-[22px] h-[22px]"
                    style={{ color: isActive ? '#c6b975' : 'rgba(255,255,255,0.60)' }}
                    strokeWidth={isActive ? 2 : 1.75}
                  />
                  
                  {/* Badge count */}
                  {tab.count !== undefined && tab.count > 0 && (
                    <div
                      className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full text-[9px] font-bold"
                      style={{
                        background: isActive ? '#c6b975' : '#EF4444',
                        color: '#FFFFFF',
                        padding: '0 3px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {tab.count}
                    </div>
                  )}
                </div>
              </motion.div>
              <span
                className="text-[10px] font-sans font-medium mt-0.5 relative z-10 leading-none"
                style={{ color: isActive ? '#c6b975' : 'rgba(255,255,255,0.55)' }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
