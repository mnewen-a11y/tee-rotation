import { useEffect, useRef } from 'react';
import { useMotionValue, animate } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Upload } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  onExport: () => void;
  onImport: () => void;
}

const RELEASE = 'R005 – v1.0.0';

const CURRENT_FEATURES = [
  'Tee-Rotation: Grid-Ansicht mit Kategorien (Schwarztee, Grüntee, Oolong, Chai, Jasmin, Kräuter)',
  'Kategorien auf- und zuklappbar',
  'Tee anlegen, bearbeiten und löschen',
  'Automatische Brühtemperatur je Tee-Art',
  'Füllstand-Tracking mit Farbindikator',
  'Bewertungs-System (1–5 Sterne)',
  'Realtime-Sync via Supabase — Änderungen sofort auf allen Geräten',
  'Export & Import als JSON',
  'iOS 26 Liquid Glass Tab Bar',
  'Installierbar als PWA (Home-Bildschirm)',
  'Offline-Unterstützung via Service Worker',
  'Freie Fonts (SIL OFL 1.1): Inter, Cormorant Garamond',
];

const ROADMAP = [
  { version: 'v1.1.0', label: 'Insights', items: ['Notizen & Fotos pro Tee', 'Brüh-Historie', 'Preis-Tracking pro Tee'] },
  { version: 'v1.2.0', label: 'Apple Integration', items: ['Apple Shortcuts / Siri', 'Widget für Home-Bildschirm', 'Benachrichtigungen'] },
  { version: 'v1.3.0', label: 'Erweiterte PWA', items: ['Push-Benachrichtigungen', 'Erweiterte Statistiken', 'Mehrere Rotationen'] },
];

export const InfoModal = ({ isOpen, onClose, triggerRef, onExport, onImport }: InfoModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = 'info-modal-title';
  const sheetY = useMotionValue(0);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  // Fokus-Trap + ESC
  useEffect(() => {
    if (!isOpen) return;

    // Fokus auf Close-Button setzen
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Fokus-Trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Fokus zurück zum Trigger nach Schließen
  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  // Drag-to-Dismiss — native Touch Events
  useEffect(() => {
    const sheet = modalRef.current;
    const scroll = scrollRef.current;
    if (!sheet || !scroll || !isOpen) return;

    const onTouchStart = (e: TouchEvent) => {
      dragStartY.current = e.touches[0].clientY;
      isDragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const deltaY = e.touches[0].clientY - dragStartY.current;
      if (deltaY > 0 && scroll.scrollTop <= 0) {
        isDragging.current = true;
        e.preventDefault();
        sheetY.set(deltaY);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const deltaY = e.changedTouches[0].clientY - dragStartY.current;
      if (deltaY > 100) {
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
  }, [isOpen]);

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
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{ y: sheetY, backgroundColor: '#FFFFF0' }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-ios-xl shadow-ios-lg max-h-[85vh] flex flex-col"
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3" aria-hidden="true">
              <div className="w-12 h-1.5 bg-midnight/25 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-midnight">
              <div>
                <h2 id={titleId} className="text-xl font-bold font-serif text-white">
                  Royal-Tea
                </h2>
                <p className="text-xs text-white/50 font-sans mt-0.5">{RELEASE}</p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Info-Modal schließen"
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-90px)] p-6 space-y-6">

              {/* Aktuelle Funktionen */}
              <section aria-labelledby="info-features">
                <h3 id="info-features" className="text-base font-semibold font-serif text-midnight mb-3">
                  Aktuelle Funktionen
                </h3>
                <ul className="space-y-2" role="list">
                  {CURRENT_FEATURES.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-midnight/75 font-sans">
                      <span className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              <hr className="border-midnight/10" />

              {/* Roadmap */}
              <section aria-labelledby="info-roadmap">
                <h3 id="info-roadmap" className="text-base font-semibold font-serif text-midnight mb-3">
                  Feature-Roadmap
                </h3>
                <div className="space-y-4">
                  {ROADMAP.map((release) => (
                    <div key={release.version}>
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="text-xs font-bold font-sans text-gold bg-midnight/8 px-2 py-0.5 rounded-md">
                          {release.version}
                        </span>
                        <span className="text-sm font-semibold font-serif text-midnight">
                          {release.label}
                        </span>
                      </div>
                      <ul className="space-y-1 pl-3" role="list">
                        {release.items.map((item, i) => (
                          <li key={i} className="text-sm text-midnight/65 font-sans flex items-start gap-2">
                            <span className="text-midnight/30 flex-shrink-0" aria-hidden="true">–</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-midnight/10" />

              {/* Backup */}
              <section aria-labelledby="info-backup">
                <h3 id="info-backup" className="text-base font-semibold font-serif text-midnight mb-3">
                  Datensicherung
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => { onExport(); onClose(); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-midnight/8 hover:bg-midnight/15 rounded-ios-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-midnight/70" />
                    <span className="text-sm font-medium text-midnight font-sans">Exportieren</span>
                  </button>
                  <button
                    onClick={() => { onImport(); onClose(); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-midnight/8 hover:bg-midnight/15 rounded-ios-lg transition-colors"
                  >
                    <Upload className="w-4 h-4 text-midnight/70" />
                    <span className="text-sm font-medium text-midnight font-sans">Importieren</span>
                  </button>
                </div>
              </section>

              <hr className="border-midnight/10" />

              {/* Backup */}
              <section aria-labelledby="info-backup">
                <h3 id="info-backup" className="text-base font-semibold font-serif text-midnight mb-3">
                  Datensicherung
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => { onExport(); onClose(); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-midnight/8 hover:bg-midnight/12 rounded-ios-lg transition-colors text-sm font-medium text-midnight font-sans"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Exportieren
                  </button>
                  <button
                    onClick={() => { onImport(); onClose(); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-midnight/8 hover:bg-midnight/12 rounded-ios-lg transition-colors text-sm font-medium text-midnight font-sans"
                  >
                    <Upload className="w-4 h-4" aria-hidden="true" />
                    Importieren
                  </button>
                </div>
                <p className="text-xs text-midnight/40 font-sans mt-2">
                  Sync läuft automatisch via Supabase. Export/Import nur für manuelle Backups.
                </p>
              </section>

              <hr className="border-midnight/10" />

              {/* Footer */}
              <p className="text-xs text-midnight/35 font-sans text-center pb-2">
                Fonts: Cormorant Garamond & Playfair Display (SIL OFL 1.1)
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
