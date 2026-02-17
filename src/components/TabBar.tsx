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
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-midnight/95 backdrop-blur-ios border-t border-white/10 safe-area-bottom"
      aria-label="Hauptnavigation"
    >
      <div className="max-w-3xl mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            const isStar = tab.id === 'rating';

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center py-2 px-4 relative min-w-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-ios"
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.12 : 1 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${isActive ? 'text-gold' : 'text-white/55'}`}
                    fill={isStar && isActive ? 'currentColor' : 'none'}
                    strokeWidth={isStar && isActive ? 0 : 2}
                  />
                </motion.div>
                <span className={`text-xs mt-1 font-sans font-medium transition-colors ${isActive ? 'text-gold' : 'text-white/55'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
