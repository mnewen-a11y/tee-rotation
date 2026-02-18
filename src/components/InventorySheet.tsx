/**
 * InventorySheet - Bottom Sheet für Tee-Verwaltung
 * Ersetzt "Meine Tees" Tab
 */

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Tea } from '@/types/tea';
import { TeaCard } from '@/components/TeaCard';
import { useHaptic } from '@/hooks/useHaptic';

interface InventorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  teas: Tea[];
  queue: string[];
  onEdit: (tea: Tea) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export const InventorySheet = ({ 
  isOpen, 
  onClose, 
  teas, 
  queue,
  onEdit, 
  onDelete,
  onAddNew 
}: InventorySheetProps) => {
  const { trigger: haptic } = useHaptic();
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sheetY = useMotionValue(0);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    sheetY.set(0);
  }, [isOpen, sheetY]);

  // Native touch handling
  useEffect(() => {
    const sheet = sheetRef.current;
    const scroll = scrollRef.current;
    if (!sheet || !scroll) return;

    const onTouchStart = (e: TouchEvent) => {
      dragStartY.current = e.touches[0].clientY;
      isDragging.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const deltaY = e.touches[0].clientY - dragStartY.current;
      const scrollTop = scroll.scrollTop;

      if (deltaY > 0 && scrollTop <= 0) {
        isDragging.current = true;
        e.preventDefault();
        sheetY.set(deltaY);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const deltaY = e.changedTouches[0].clientY - dragStartY.current;

      if (deltaY > 100) {
        haptic('light');
        animate(sheetY, window.innerHeight, {
          type: 'spring', stiffness: 300, damping: 30,
          onComplete: onClose,
        });
      } else {
        animate(sheetY, 0, { type: 'spring', stiffness: 400, damping: 30 });
      }
      isDragging.current = false;
    };

    sheet.addEventListener('touchstart', onTouchStart, { passive: true });
    sheet.addEventListener('touchmove', onTouchMove, { passive: false });
    sheet.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      sheet.removeEventListener('touchstart', onTouchStart);
      sheet.removeEventListener('touchmove', onTouchMove);
      sheet.removeEventListener('touchend', onTouchEnd);
    };
  }, [isOpen, onClose, haptic, sheetY]);

  const getTeaById = (id: string) => teas.find(t => t.id === id);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            style={{ y: sheetY, backgroundColor: '#FFFFF0' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
          >
            {/* Drag Handle */}
            <div className="flex justify-center items-center py-4 flex-shrink-0">
              <div className="w-12 h-1.5 bg-midnight/25 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-midnight flex-shrink-0">
              <h2 className="text-xl font-bold font-sans text-white">
                Inventar
              </h2>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { haptic('light'); onAddNew(); }}
                  className="p-2 bg-gold rounded-full"
                  aria-label="Neuen Tee hinzufügen"
                >
                  <Plus className="w-5 h-5 text-midnight" strokeWidth={2.5} />
                </motion.button>
                <button
                  onClick={() => { haptic('light'); onClose(); }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Schließen"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div ref={scrollRef} className="overflow-y-auto flex-1 px-6 py-4">
              <p className="text-sm text-midnight/60 font-sans mb-4">
                {teas.length} {teas.length === 1 ? 'Tee' : 'Tees'} in der Rotation
              </p>

              {teas.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-midnight/40 font-sans">
                    Noch keine Tees vorhanden
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pb-8">
                  {queue.map(teaId => {
                    const tea = getTeaById(teaId);
                    if (!tea) return null;
                    return (
                      <TeaCard
                        key={tea.id}
                        tea={tea}
                        onEdit={() => onEdit(tea)}
                        onDelete={() => {
                          if (confirm(`"${tea.name}" wirklich löschen?`)) {
                            onDelete(tea.id);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
