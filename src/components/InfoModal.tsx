import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const RELEASE = 'R002 – v0.9.5';

const CURRENT_FEATURES = [
  'Tea-Rotation: Grid-Ansicht mit Kategorien (Schwarztee, Grüntee, Oolong, Chai, Jasmin, Kräuter)',
  'Kacheln auf- und zuklappbar pro Kategorie',
  'Tee anlegen, bearbeiten und löschen',
  'Füllstand-Tracking',
  'Export & Import als JSON',
  'Installierbar als PWA (Home-Bildschirm)',
  'Offline-Unterstützung via Service Worker',
];

const ROADMAP = [
  { version: 'v1.0.0', label: 'Apple Integration', items: ['Apple Shortcuts / Siri', 'iCloud / AWS S3 Sync', 'Multi-Device Support'] },
  { version: 'v1.1.0', label: 'Insights', items: ['Rating-System (1–5 ⭐)', 'Merkliste & Auto-Merken', 'Notizen & Fotos pro Tee'] },
  { version: 'v1.2.0', label: 'Progressive Web App', items: ['Push-Benachrichtigungen', 'Erweiterte Statistiken', 'Preis-Tracking'] },
];

export const InfoModal = ({ isOpen, onClose, triggerRef }: InfoModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = 'info-modal-title';

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
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-ios-xl shadow-ios-lg max-h-[85vh] overflow-hidden"
            style={{ backgroundColor: '#FFFFF0' }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
              <div className="w-10 h-1 bg-midnight/20 rounded-full" />
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
