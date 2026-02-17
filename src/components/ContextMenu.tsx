import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3 } from 'lucide-react';

interface ContextMenuItem {
  label: string;
  icon: typeof Edit3;
  action: () => void;
  destructive?: boolean;
}

interface ContextMenuProps {
  isOpen: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export const ContextMenu = ({ isOpen, x, y, items, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isOpen, onClose]);

  // Sicherstellen dass Menu nicht aus dem Viewport ragt
  const menuX = Math.min(x, window.innerWidth - 200);
  const menuY = Math.min(y, window.innerHeight - items.length * 52 - 20);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="fixed z-50 rounded-ios-lg overflow-hidden shadow-ios-lg min-w-[180px]"
            style={{
              left: menuX,
              top: menuY,
              background: 'rgba(29,38,70,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transformOrigin: 'top left',
            }}
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={i}
                  whileTap={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  onClick={() => { item.action(); onClose(); }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-sans font-medium transition-colors
                    ${item.destructive ? 'text-red-400' : 'text-white/90'}
                    ${i < items.length - 1 ? 'border-b border-white/8' : ''}
                  `}
                >
                  <span>{item.label}</span>
                  <Icon className="w-4 h-4 opacity-80" />
                </motion.button>
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
