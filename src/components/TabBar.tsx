import { motion } from 'framer-motion';
import { Home, List, Plus } from 'lucide-react';

interface TabBarProps {
  activeTab: 'heute' | 'list' | 'new';
  onTabChange: (tab: 'heute' | 'list' | 'new') => void;
}

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const tabs = [
    { id: 'heute' as const, icon: Home, label: 'Heute' },
    { id: 'list' as const, icon: List, label: 'Meine Tees' },
    { id: 'new' as const, icon: Plus, label: 'Neu' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-ios border-t border-ios-border dark:border-gray-700 safe-area-bottom">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center py-2 px-6 relative min-w-[80px]"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-ios-blue dark:text-blue-400' : 'text-ios-secondary dark:text-gray-400'
                    }`}
                  />
                </motion.div>
                <span
                  className={`text-xs mt-1 font-medium transition-colors ${
                    isActive ? 'text-ios-blue dark:text-blue-400' : 'text-ios-secondary dark:text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-ios-blue dark:bg-blue-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
