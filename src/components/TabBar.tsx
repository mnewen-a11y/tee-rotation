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
    <nav
      aria-label="Hauptnavigation"
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around"
      style={{
        height: '64px',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
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
            className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full focus:outline-none"
          >
            {/* Icon with badge */}
            <div className="relative">
              <Icon
                className="w-5 h-5"
                style={{ 
                  color: isActive ? '#C9AE4D' : 'rgba(0, 0, 0, 0.4)',
                  strokeWidth: 2,
                }}
              />
              
              {/* Badge count */}
              {tab.count !== undefined && tab.count > 0 && (
                <div
                  className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full text-[9px] font-bold"
                  style={{
                    background: '#EF4444',
                    color: '#FFFFFF',
                    padding: '0 3px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {tab.count}
                </div>
              )}
            </div>

            {/* Label */}
            <span
              className="text-[10px] font-medium"
              style={{
                color: isActive ? '#C9AE4D' : 'rgba(0, 0, 0, 0.4)',
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
