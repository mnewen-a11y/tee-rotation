/**
 * InfoModal - BATCH 1: Changelog + Roadmap Tabs
 */

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Upload } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  onExport: () => void;
  onImport: () => void;
}

type Tab = 'about' | 'changelog' | 'roadmap';

export const InfoModal = ({ isOpen, onClose, triggerRef, onExport, onImport }: InfoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('about');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && 
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  // Reset to About tab when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveTab('about');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40"
          aria-hidden="true"
        />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-lg mx-4 mb-0 sm:mb-4 max-h-[85vh] flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-modal-title"
        >
          {/* Header */}
          <div className="border-b border-midnight/10 p-6 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 id="info-modal-title" className="text-2xl font-bold text-midnight font-sans">
                Royal-Tea
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-midnight/5 rounded-ios transition-colors"
                aria-label="Schließen"
              >
                <X className="w-5 h-5 text-midnight/60" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 py-2 px-4 rounded-ios font-sans font-medium text-sm transition-colors ${
                  activeTab === 'about'
                    ? 'bg-midnight/10 text-midnight'
                    : 'text-midnight/50 hover:text-midnight/70'
                }`}
              >
                Über
              </button>
              <button
                onClick={() => setActiveTab('changelog')}
                className={`flex-1 py-2 px-4 rounded-ios font-sans font-medium text-sm transition-colors ${
                  activeTab === 'changelog'
                    ? 'bg-midnight/10 text-midnight'
                    : 'text-midnight/50 hover:text-midnight/70'
                }`}
              >
                Changelog
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`flex-1 py-2 px-4 rounded-ios font-sans font-medium text-sm transition-colors ${
                  activeTab === 'roadmap'
                    ? 'bg-midnight/10 text-midnight'
                    : 'text-midnight/50 hover:text-midnight/70'
                }`}
              >
                Roadmap
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-sm text-midnight/80 font-sans leading-relaxed">
                      Royal-Tea hilft dir, deinen Teevorrat optimal zu nutzen. Die App empfiehlt dir zur richtigen Tageszeit den passenden Tee und sorgt dafür, dass kein Tee vergessen wird.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-midnight mb-2 font-sans">Version</h3>
                    <p className="text-sm text-midnight/60 font-sans">0.14.0 (2026-02-21)</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-midnight mb-2 font-sans">Features</h3>
                    <ul className="text-sm text-midnight/80 font-sans space-y-1 list-disc list-inside">
                      <li>iOS 26 Liquid Glass Design</li>
                      <li>VoiceOver Support</li>
                      <li>Spring Animations</li>
                      <li>Cloud Sync (Supabase)</li>
                      <li>Zeit-basierte Empfehlungen</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-midnight mb-2 font-sans">Daten</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={onExport}
                        className="flex-1 py-2 px-4 bg-midnight/5 hover:bg-midnight/10 rounded-ios font-sans text-sm font-medium text-midnight flex items-center justify-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Exportieren
                      </button>
                      <button
                        onClick={onImport}
                        className="flex-1 py-2 px-4 bg-midnight/5 hover:bg-midnight/10 rounded-ios font-sans text-sm font-medium text-midnight flex items-center justify-center gap-2 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Importieren
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'changelog' && (
                <motion.div
                  key="changelog"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-bold text-midnight mb-3 font-sans">Version 0.14.0</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-midnight mb-2 text-sm">✨ Features</h4>
                        <ul className="text-sm text-midnight/80 space-y-1 list-disc list-inside font-sans">
                          <li>Liquid Glass Design (iOS 26)</li>
                          <li>VoiceOver Support komplett</li>
                          <li>Spring Animations</li>
                          <li>Button Press Feedback</li>
                          <li>Gold Checkmark Design</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-midnight mb-2 text-sm">🔧 Changes</h4>
                        <ul className="text-sm text-midnight/80 space-y-1 list-disc list-inside font-sans">
                          <li>Card höher positioniert (0.5rem)</li>
                          <li>Success Screen minimalistisch</li>
                          <li>Sentence Case (HIG)</li>
                          <li>Flat Gold Buttons</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-midnight mb-2 text-sm">🐛 Bugfixes</h4>
                        <ul className="text-sm text-midnight/80 space-y-1 list-disc list-inside font-sans">
                          <li>Doppelte Buttons entfernt</li>
                          <li>Header Blur gefixt</li>
                          <li>Begrüßung entfernt</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-midnight mb-2 text-sm">♿ Accessibility</h4>
                        <ul className="text-sm text-midnight/80 space-y-1 list-disc list-inside font-sans">
                          <li>9 VoiceOver Labels</li>
                          <li>4.5:1 Kontrast (WCAG AA)</li>
                          <li>Haptic Feedback konsistent</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-midnight/10">
                    <p className="text-xs text-midnight/50 font-sans">
                      HIG Conformance: 98%
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'roadmap' && (
                <motion.div
                  key="roadmap"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-bold text-midnight mb-3 font-sans">✅ Erledigt (98% HIG)</h3>
                    <ul className="text-sm text-midnight/60 space-y-1 list-disc list-inside font-sans">
                      <li>Typography (Sentence Case)</li>
                      <li>Buttons (HIG Colors)</li>
                      <li>Liquid Glass Materials</li>
                      <li>VoiceOver Labels</li>
                      <li>Haptic Feedback</li>
                      <li>Spring Animations</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-midnight mb-3 font-sans">🚀 Batch 2: Layouts</h3>
                    <ul className="text-sm text-midnight/80 space-y-1 list-disc list-inside font-sans">
                      <li>iPad Support (Responsive)</li>
                      <li>Empty States (Illustrationen)</li>
                      <li>Card Shuffle Animation</li>
                      <li>Micro-Interactions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-midnight mb-3 font-sans">💡 Batch 3: Advanced</h3>
                    <ul className="text-sm text-midnight/80 space-y-1 list-disc list-inside font-sans">
                      <li>Dark Mode (optional)</li>
                      <li>Performance Optimierung</li>
                      <li>Skeleton Loading</li>
                      <li>Dynamic Type Support</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-midnight mb-3 font-sans">🔮 Native App</h3>
                    <ul className="text-sm text-midnight/80 space-y-1 list-disc list-inside font-sans">
                      <li>Siri Intents ("wähle einen Tee")</li>
                      <li>Home Screen Widgets</li>
                      <li>Live Activities</li>
                      <li>Watch App</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};