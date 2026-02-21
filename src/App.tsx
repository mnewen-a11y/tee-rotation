import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, RefreshCw } from 'lucide-react';
import { Tea, TEA_TYPE_DEFAULT_TIMES } from '@/types/tea';
import { loadData, saveData, generateId } from '@/lib/storage';
import { saveToSupabase, subscribeToSync, loadFromSupabase } from '@/lib/supabase';
import { getRecommendedTeaTypes } from '@/lib/timeOfDay';
import { SwipeTeaCard } from '@/components/SwipeTeaCard';
import { SuccessScreen } from '@/components/SuccessScreen';
import { TeaForm } from '@/components/TeaForm';
import { RoyalTeaLogo } from '@/components/RoyalTeaLogo';
import { InfoModal } from '@/components/InfoModal';
import { InstallPrompt } from '@/components/InstallPrompt';
import { InventorySheet } from '@/components/InventorySheet';
import { TabBar, type TabId } from '@/components/TabBar';
import { CollectionView } from '@/components/CollectionView';
import { useHaptic } from '@/hooks/useHaptic';
import { useServiceWorkerUpdate } from '@/hooks/useServiceWorkerUpdate';
import { designSystem as ds } from '@/design/design-tokens';

type SyncStatus = 'idle' | 'syncing' | 'ok' | 'error';

function App() {
  const [teas, setTeas] = useState<Tea[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTea, setSelectedTea] = useState<Tea | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTea, setEditingTea] = useState<Tea | undefined>();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [isLoading, setIsLoading] = useState(true);

  const { trigger: haptic } = useHaptic();
  const { updateAvailable, applyUpdate } = useServiceWorkerUpdate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const infoTriggerRef = useRef<HTMLButtonElement>(null);

  const availableTeas = teas.filter(t => !t.zuletztGetrunken);
  const recommendedTypes = getRecommendedTeaTypes();
  const recommendedTeas = availableTeas.filter(t => recommendedTypes.includes(t.teeArt));
  const suggestedTeas = recommendedTeas.length > 0 ? recommendedTeas : availableTeas;
  
  const currentTea = suggestedTeas.length > 0 ? suggestedTeas[currentIndex % suggestedTeas.length] : null;

  useEffect(() => {
    const initData = async () => {
      const supabaseData = await loadFromSupabase();
      
      const migrateTeas = (teas: Tea[]): Tea[] => {
        return teas.map(tea => {
          if (!tea.bestTimeOfDay || tea.bestTimeOfDay.length === 0) {
            return {
              ...tea,
              bestTimeOfDay: TEA_TYPE_DEFAULT_TIMES[tea.teeArt]
            };
          }
          return tea;
        });
      };
      
      if (supabaseData) {
        const migratedTeas = migrateTeas(supabaseData.teas);
        setTeas(migratedTeas);
        setQueue(supabaseData.queue.length > 0 ? supabaseData.queue : migratedTeas.map(t => t.id));
        saveData({ teas: migratedTeas, queue: supabaseData.queue });
        if (migratedTeas.some((t, i) => t.bestTimeOfDay !== supabaseData.teas[i].bestTimeOfDay)) {
          saveToSupabase(migratedTeas, supabaseData.queue);
        }
      } else {
        const localData = loadData();
        const migratedTeas = migrateTeas(localData.teas);
        setTeas(migratedTeas);
        setQueue(localData.queue.length > 0 ? localData.queue : migratedTeas.map(t => t.id));
        saveData({ teas: migratedTeas, queue: localData.queue });
      }
      setTimeout(() => setIsLoading(false), 400);
    };
    initData();
  }, []);

  useEffect(() => {
    if (teas.length > 0 || queue.length > 0) {
      saveData({ teas, queue });
      const timer = setTimeout(() => { if (teas.length > 0) saveToSupabase(teas, queue); }, 2000);
      return () => clearTimeout(timer);
    }
  }, [teas, queue]);

  useEffect(() => {
    const cleanup = subscribeToSync((data) => {
      setTeas(data.teas);
      setQueue(data.queue.length > 0 ? data.queue : data.teas.map(t => t.id));
      saveData({ teas: data.teas, queue: data.queue });
    });
    return cleanup;
  }, []);

  const handleAddTea = (teaData: Omit<Tea, 'id'>) => {
    const t: Tea = { ...teaData, id: generateId() };
    setTeas(prev => [...prev, t]);
    setQueue(prev => [...prev, t.id]);
    haptic('success');
  };

  const handleUpdateTea = (teaData: Omit<Tea, 'id'>) => {
    if (!editingTea) return;
    setTeas(prev => prev.map(t => t.id === editingTea.id ? { ...teaData, id: editingTea.id } : t));
    haptic('success');
  };

  const handleDeleteTea = (id: string) => {
    setTeas(prev => prev.filter(t => t.id !== id));
    setQueue(prev => prev.filter(qid => qid !== id));
    haptic('light');
  };

  const handleSelectTea = (tea: Tea) => {
    setTeas(prev => prev.map(t => t.id === tea.id ? { ...t, zuletztGetrunken: new Date().toISOString() } : t));
    setQueue(prev => { const filtered = prev.filter(id => id !== tea.id); return [...filtered, tea.id]; });
    setSelectedTea(tea);
    haptic('success');
  };

  const handleSkipTea = () => { 
    setCurrentIndex(prev => prev + 1);
    haptic('light'); 
  };

  const handleBackFromSuccess = () => {
    setSelectedTea(null);
    setCurrentIndex(0);
  };

  const handlePickAnother = () => {
    setSelectedTea(null);
    setCurrentIndex(prev => prev + 1);
  };

  const handleSync = async () => {
    if (teas.length === 0) { alert('⚠️ Keine Tees zum Synchronisieren vorhanden.'); return; }
    setSyncStatus('syncing');
    const ok = await saveToSupabase(teas, queue);
    setSyncStatus(ok ? 'ok' : 'error');
    setTimeout(() => setSyncStatus('idle'), 2000);
  };

  const handleExport = () => {
    const data = JSON.stringify({ teas, queue }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `royal-tea-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    haptic('success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const importedData = JSON.parse(ev.target?.result as string);
        if (importedData.teas && Array.isArray(importedData.teas)) {
          setTeas(importedData.teas);
          setQueue(importedData.queue || importedData.teas.map((t: Tea) => t.id));
          haptic('success');
          alert('✅ Import erfolgreich!');
        }
      } catch {
        alert('❌ Ungültige Datei');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-midnight text-white font-sans">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImport}
        accept="application/json"
        className="hidden" 
      />
      
      <div className="min-h-screen pb-8">
        <header 
          className="border-b border-white/10 sticky top-0 z-20"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <div style={{ height: 'env(safe-area-inset-top, 0px)' }} aria-hidden="true" />
          <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
            <RoyalTeaLogo size="sm" className="opacity-90" />
            <div className="flex items-center gap-2">
              <motion.button 
                whileTap={{ scale: 0.9, opacity: 0.8 }} 
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={handleSync}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors disabled:opacity-50"
                disabled={syncStatus === 'syncing' || teas.length === 0}
                aria-label={
                  syncStatus === 'syncing' ? 'Synchronisiere...' :
                  syncStatus === 'ok' ? 'Synchronisation erfolgreich' :
                  syncStatus === 'error' ? 'Synchronisation fehlgeschlagen' :
                  teas.length === 0 ? 'Synchronisierung nicht verfügbar' :
                  'Mit Cloud synchronisieren'
                }
              >
                <RefreshCw 
                  className={`w-5 h-5 transition-colors ${syncStatus === 'syncing' ? 'text-gold animate-spin' : syncStatus === 'ok' ? 'text-green-400' : syncStatus === 'error' ? 'text-red-400' : teas.length === 0 ? 'text-white/30' : 'text-white'}`} 
                  aria-hidden="true"
                />
              </motion.button>
              <motion.button 
                ref={infoTriggerRef} 
                whileTap={{ scale: 0.9, opacity: 0.8 }} 
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => { haptic('light'); setIsInfoOpen(true); }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors"
                aria-label="App-Informationen anzeigen"
              >
                <Info className="w-5 h-5 text-white" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {updateAvailable && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-gold text-gold-text px-6 py-3 text-center text-sm font-sans font-medium sticky top-[calc(env(safe-area-inset-top)+56px)] z-10"
            >
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                <span>✨ Neue Version verfügbar!</span>
                <motion.button
                  whileTap={{ scale: 0.95, opacity: 0.85 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => { haptic('success'); applyUpdate(); }}
                  className="bg-midnight text-white px-4 py-1 rounded-full text-xs font-semibold"
                  aria-label="App jetzt aktualisieren"
                >
                  Jetzt aktualisieren
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="max-w-3xl mx-auto px-6 py-8 min-h-[calc(100vh-80px)] pb-28" style={{ 
          backgroundColor: '#FFFFF0',
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {isLoading ? (
            <div 
              className="flex items-center justify-center h-96"
              role="status"
              aria-label="Lädt Tee-Daten"
            >
              <div 
                className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full"
                aria-hidden="true"
              />
              <span className="sr-only">Lädt Tee-Daten...</span>
            </div>
          ) : activeTab === 'today' ? (
            <div className="flex flex-col touch-pan-x items-center justify-center" style={{ 
              paddingTop: '0rem',
              marginTop: '-2rem',
              paddingBottom: 'max(8rem, env(safe-area-inset-bottom))',
              minHeight: 'calc(100vh - 60px)',
              overscrollBehavior: 'none'
            }}>
              {availableTeas.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center justify-center text-center px-8"
                  style={{ paddingTop: '4rem' }}
                >
                  {/* Minimalist Checkmark */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2
                    }}
                    className="mb-12"
                  >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="58"
                        stroke={ds.colors.brand.gold}
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                      <motion.path
                        d="M 35 60 L 52 77 L 85 44"
                        stroke={ds.colors.brand.gold}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      />
                    </svg>
                  </motion.div>

                  {/* Heading */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-3xl font-bold mb-16"
                    style={{
                      fontFamily: ds.typography.fontFamily.system,
                      color: ds.colors.text.primary,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Rotation abgeschlossen
                  </motion.h3>

                  {/* Action Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="w-full max-w-[280px]"
                  >
                    <motion.button 
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      onClick={() => {
                        setTeas(prev => prev.map(t => ({ ...t, zuletztGetrunken: undefined })));
                        setCurrentIndex(0);
                        haptic('success');
                      }}
                      style={{
                        width: '100%',
                        background: ds.colors.brand.gold,
                        color: ds.colors.text.inverse,
                        borderRadius: ds.radius.md,
                        padding: `${ds.spacing[3.5]} ${ds.spacing[6]}`,
                        fontWeight: ds.typography.fontWeight.semibold,
                        fontSize: ds.typography.fontSize.body,
                        minHeight: ds.touchTarget.medium,
                        boxShadow: '0 4px 16px rgba(201, 174, 77, 0.25)',
                        fontFamily: ds.typography.fontFamily.system,
                        border: 'none'
                      }}
                      aria-label="Rotation zurücksetzen"
                    >
                      Zurücksetzen
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : selectedTea ? (
                <SuccessScreen 
                  tea={selectedTea}
                  onBack={handleBackFromSuccess}
                  onPickAnother={handlePickAnother}
                />
              ) : (
                <>
                  {currentTea ? (
                    <AnimatePresence mode="wait">
                      <SwipeTeaCard
                        key={`${currentTea.id}-${currentIndex}`}
                        tea={currentTea} 
                        onSelect={() => handleSelectTea(currentTea)}
                        onSkip={handleSkipTea}
                      />
                    </AnimatePresence>
                  ) : (
                    <div className="text-center py-12 text-midnight/60">
                      Keine Tees verfügbar
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <CollectionView 
              teas={teas}
              onTeaSelect={(tea) => {
                if (tea.zuletztGetrunken) {
                  setTeas(prev => prev.map(t => t.id === tea.id ? { ...t, zuletztGetrunken: undefined } : t));
                  haptic('success');
                } else {
                  handleSelectTea(tea);
                  setActiveTab('today');
                }
              }}
              onTeaEdit={(tea) => { setEditingTea(tea); setIsFormOpen(true); }}
            />
          )}
        </main>
      </div>

      <TabBar 
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          haptic('light');
        }}
        todayCount={availableTeas.length}
        collectionCount={teas.length}
      />

      <TeaForm 
        isOpen={isFormOpen} 
        onClose={() => { setIsFormOpen(false); setEditingTea(undefined); }} 
        onSave={editingTea ? handleUpdateTea : handleAddTea} 
        editTea={editingTea} 
      />
      <InfoModal 
        isOpen={isInfoOpen} 
        onClose={() => setIsInfoOpen(false)} 
        triggerRef={infoTriggerRef} 
        onExport={handleExport} 
        onImport={() => fileInputRef.current?.click()} 
      />
      <InventorySheet 
        isOpen={isInventoryOpen} 
        onClose={() => setIsInventoryOpen(false)} 
        teas={teas} 
        queue={queue} 
        onEdit={(tea) => { setEditingTea(tea); setIsFormOpen(true); setIsInventoryOpen(false); }} 
        onDelete={handleDeleteTea} 
        onAddNew={() => { setIsFormOpen(true); setEditingTea(undefined); setIsInventoryOpen(false); }} 
      />

      {/* Install Prompt - nur im Browser */}
      <InstallPrompt />
    </div>
  );
}

export default App;
