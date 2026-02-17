import { motion } from 'framer-motion';
import { Home, List, Plus, Star } from 'lucide-react';

export type TabId = 'heute' | 'list' | 'new' | 'rating';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const tabs: { id: TabId; icon: typeof Home; label: string }[] = [
    { id: 'heute',  icon: Home,  label: 'Heute'      },
    { id: 'list',   icon: List,  label: 'Meine Tees' },
    { id: 'new',    icon: Plus,  label: 'Neu'        },
    { id: 'rating', icon: Star,  label: 'Bewerten'   },
  ];

  return (
    /* Outer wrapper — safe area + positioning */
    <div
      className="fixed bottom-0 left-0 right-0 z-30 flex justify-center"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
    >
      {/* Liquid Glass pill */}
      <nav
        aria-label="Hauptnavigation"
        className="relative flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          boxShadow: [
            '0 8px 32px rgba(0, 0, 0, 0.25)',
            '0 2px 8px rgba(0, 0, 0, 0.15)',
            'inset 0 1px 0 rgba(255, 255, 255, 0.35)',
            'inset 0 -1px 0 rgba(0, 0, 0, 0.08)',
          ].join(', '),
          border: '1px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const isStar = tab.id === 'rating';
          const isNew = tab.id === 'new';

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-col items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-full"
              style={{ minWidth: isNew ? '52px' : '68px', padding: '6px 4px' }}
            >
              {/* Active background pill */}
              {isActive && !isNew && (
                <motion.div
                  layoutId="tabPill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.22)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.06)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}

              {/* + Button — gold pill */}
              {isNew ? (
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(145deg, #d4c47e, #b8a85a)',
                    boxShadow: '0 4px 12px rgba(198,185,117,0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
                  }}
                >
                  <Plus className="w-5 h-5 text-midnight" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <>
                  <motion.div
                    animate={{ scale: isActive ? 1.08 : 1, y: isActive ? -1 : 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="relative z-10"
                  >
                    <Icon
                      className="w-[22px] h-[22px] transition-colors duration-200"
                      style={{ color: isActive ? '#c6b975' : 'rgba(255,255,255,0.65)' }}
                      fill={isStar && isActive ? '#c6b975' : 'none'}
                      strokeWidth={isActive ? 2 : 1.75}
                    />
                  </motion.div>
                  <span
                    className="text-[10px] font-sans font-medium mt-0.5 relative z-10 transition-colors duration-200 leading-none"
                    style={{ color: isActive ? '#c6b975' : 'rgba(255,255,255,0.55)' }}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
