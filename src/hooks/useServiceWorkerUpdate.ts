/**
 * useServiceWorkerUpdate - Detects and prompts for SW updates
 */

import { useEffect, useState } from 'react';

export const useServiceWorkerUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Check for updates every 30 seconds
      const interval = setInterval(() => {
        navigator.serviceWorker.ready.then((reg) => {
          reg.update();
        });
      }, 30000);

      // Listen for new SW waiting to activate
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        if (reg.waiting) {
          setUpdateAvailable(true);
        }

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New SW is installed and waiting
                setUpdateAvailable(true);
              }
            });
          }
        });
      });

      return () => clearInterval(interval);
    }
  }, []);

  const applyUpdate = () => {
    if (registration?.waiting) {
      // Tell waiting SW to skip waiting and activate
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Listen for controlling SW to change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Reload to get new version
        window.location.reload();
      });
    }
  };

  return { updateAvailable, applyUpdate };
};
