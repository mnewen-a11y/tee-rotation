import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if running in browser (not PWA standalone)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');

    // Check if user dismissed recently (within 7 days)
    const dismissedAt = localStorage.getItem('install-prompt-dismissed-at');
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentlyDismissed = dismissedAt && parseInt(dismissedAt) > sevenDaysAgo;

    if (!isStandalone && !recentlyDismissed) {
      // Show after 2s
      setTimeout(() => setShowPrompt(true), 2000);
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed-at', Date.now().toString());
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-50"
        >
          <div 
            className="rounded-2xl p-4 shadow-2xl"
            style={{
              background: 'rgba(201, 174, 77, 0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/10"
              aria-label="Schließen"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="pr-8">
              <p className="text-sm font-semibold text-white mb-1">
                📱 Beste Erfahrung als App
              </p>
              <p className="text-xs text-white/90 mb-3">
                Installiere Royal-Tea auf deinem Home-Bildschirm für die optimale Nutzung.
              </p>
              <p className="text-xs text-white/80">
                Tippe auf <strong>Teilen</strong> → <strong>"Zum Home-Bildschirm"</strong>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
