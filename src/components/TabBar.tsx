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
    { id: 'today',      icon: RefreshCw,    label: 'Rotation',  count: todayCount },
    { id: 'collection', icon: LayoutGrid,   label: 'Sammlung',  count: collectionCount },
  ];

  return (
    <nav
      aria-label="Hauptnavigation"
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-center gap-2 px-6"
      style={{
        height: '64px',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.1)',
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
            className="relative flex-1 flex flex-col items-center justify-center gap-1 focus:outline-none transition-all duration-200"
            style={{
              maxWidth: '120px',
              minHeight: '48px',
            }}
          >
            {/* Icon with badge */}
            <div className="relative">
              <Icon
                className="w-6 h-6 transition-all duration-200"
                style={{ 
                  color: isActive ? '#C9AE4D' : 'rgba(255, 255, 255, 0.5)',
                  strokeWidth: isActive ? 2.5 : 2,
                }}
              />
              
              {/* Badge count */}
              {tab.count !== undefined && tab.count > 0 && (
                <div
                  className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background: isActive ? '#C9AE4D' : '#EF4444',
                    color: '#FFFFFF',
                    padding: '0 4px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {tab.count}
                </div>
              )}
            </div>

            {/* Label */}
            <span
              className="text-[11px] font-medium transition-all duration-200"
              style={{
                color: isActive ? '#C9AE4D' : 'rgba(255, 255, 255, 0.5)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
