import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, RefreshCw, LayoutGrid } from 'lucide-react';
import { Tea, TeaType, TEA_TYPE_DEFAULT_TIMES } from '@/types/tea';
import { loadData, saveData } from '@/lib/storage';
import { saveToSupabase, subscribeToSync, loadFromSupabase } from '@/lib/supabase';
import { getRecommendedTeaTypes } from '@/lib/timeOfDay';
import { SwipeTeaCard } from '@/components/SwipeTeaCard';
import { SuccessScreen } from '@/components/SuccessScreen';
import { TeaForm } from '@/components/TeaForm';
import { RoyalTeaLogo } from '@/components/RoyalTeaLogo';
import { InfoModal } from '@/components/InfoModal';
import { InventorySheet } from '@/components/InventorySheet';
import { TeaGridCard } from '@/components/TeaGridCard';
import { useHaptic } from '@/hooks/useHaptic';
import { useServiceWorkerUpdate } from '@/hooks/useServiceWorkerUpdate';

const TEA_CATEGORY_ORDER: TeaType[] = ['schwarz', 'grün', 'oolong', 'chai', 'jasmin', 'kräuter'];

const TEA_CATEGORY_LABELS: Record<TeaType, string> = {
  schwarz: 'Schwarztee', grün: 'Grüntee', oolong: 'Oolong',
  chai: 'Chai', jasmin: 'Jasmin', kräuter: 'Kräuter',
};

const TEA_CATEGORY_COLORS: Record<TeaType, string> = {
  schwarz: '#8B4513', grün: '#4CAF50', oolong: '#DAA520',
  chai: '#A0522D', jasmin: '#C77DFF', kräuter: '#2E8B57',
};

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
  const [showAllTeas, setShowAllTeas] = useState(false);
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

  const teasByCategory = TEA_CATEGORY_ORDER.reduce((acc, type) => {
    acc[type] = availableTeas.filter(t => t.teeArt === type);
    return acc;
  }, {} as Record<TeaType, Tea[]>);

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
    const unsub = subscribeToSync(async () => {
      const supabaseData = await loadFromSupabase();
      if (supabaseData) {
        setTeas(supabaseData.teas);
        setQueue(supabaseData.queue);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (teas.length > 0) {
      saveData({ teas, queue });
    }
  }, [teas, queue]);

  const handleSelectTea = (tea: Tea) => {
    setTeas(prev => prev.map(t => 
      t.id === tea.id ? { ...t, zuletztGetrunken: new Date().toISOString() } : t
    ));
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
    haptic('light');
  };

  const handlePickAnother = () => {
    setSelectedTea(null);
    setCurrentIndex(prev => prev + 1);
    haptic('light');
  };

  const handleSaveTea = (teaData: Omit<Tea, 'id'>) => {
    if (editingTea) {
      const updatedTea: Tea = { ...teaData, id: editingTea.id };
      setTeas(prev => prev.map(t => t.id === editingTea.id ? updatedTea : t));
    } else {
      const newTea: Tea = { ...teaData, id: crypto.randomUUID() };
      setTeas(prev => [...prev, newTea]);
      setQueue(prev => [...prev, newTea.id]);
    }
    setIsFormOpen(false);
    setEditingTea(undefined);
    haptic('success');
  };

  const handleDeleteTea = (id: string) => {
    setTeas(prev => prev.filter(t => t.id !== id));
    setQueue(prev => prev.filter(qId => qId !== id));
    haptic('success');
  };

  const handleEditTea = (tea: Tea) => {
    setEditingTea(tea);
    setIsFormOpen(true);
    setIsInventoryOpen(false);
  };

  const handleSync = async () => {
    setSyncStatus('syncing');
    haptic('light');
    try {
      await saveToSupabase(teas, queue);
      setSyncStatus('ok');
      setTimeout(() => setSyncStatus('idle'), 2000);
    } catch {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }
  };

  const handleExportData = () => {
    const data = { teas, queue, exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `royal-tea-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (!parsed.teas || !Array.isArray(parsed.teas)) { alert('Ungültige Datei.'); return; }
        if (confirm(`${parsed.teas.length} Tees importieren? Bestehende Daten werden überschrieben.`)) {
          setTeas(parsed.teas);
          setQueue(parsed.queue || parsed.teas.map((t: Tea) => t.id));
          haptic('success');
        }
      } catch { alert('Fehler beim Lesen der Datei.'); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-midnight text-white font-sans">
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImportFile} />
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
          <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
            <RoyalTeaLogo size="sm" className="opacity-90" />
            <div className="flex items-center gap-2">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setIsInventoryOpen(true); haptic('light'); }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors" aria-label="Inventar öffnen">
                <LayoutGrid className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={handleSync}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors disabled:opacity-50"
                disabled={syncStatus === 'syncing' || teas.length === 0}>
                <RefreshCw className={`w-5 h-5 transition-colors ${syncStatus === 'syncing' ? 'text-gold animate-spin' : syncStatus === 'ok' ? 'text-green-400' : syncStatus === 'error' ? 'text-red-400' : teas.length === 0 ? 'text-white/30' : 'text-white'}`} />
              </motion.button>
              <motion.button ref={infoTriggerRef} whileTap={{ scale: 0.9 }} onClick={() => setIsInfoOpen(true)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors">
                <Info className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* Update Banner */}
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
                  whileTap={{ scale: 0.95 }}
                  onClick={applyUpdate}
                  className="bg-midnight text-white px-4 py-1 rounded-full text-xs font-semibold"
                >
                  Jetzt aktualisieren
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="max-w-3xl mx-auto px-6 py-8 min-h-[calc(100vh-80px)]" style={{ 
          backgroundColor: '#FFFFF0',
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" />
            </div>
          ) : showAllTeas ? (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-sans text-midnight">Alle Tees</h2>
                <button onClick={() => setShowAllTeas(false)} className="text-sm font-sans text-midnight/60 hover:text-midnight transition-colors">← Zurück</button>
              </div>
              
              {availableTeas.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold font-sans text-midnight mb-4">
                    Verfügbar ({availableTeas.length})
                  </h3>
                  <div className="space-y-6">
                    {TEA_CATEGORY_ORDER.map(type => {
                      const catTeas = teasByCategory[type];
                      if (catTeas.length === 0) return null;
                      return (
                        <div key={type}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: TEA_CATEGORY_COLORS[type] }} />
                            <h4 className="font-sans font-semibold text-midnight text-sm">{TEA_CATEGORY_LABELS[type]} ({catTeas.length})</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {catTeas.map((tea, i) => <TeaGridCard key={tea.id} tea={tea} index={i} onSelect={() => handleSelectTea(tea)} />)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {availableTeas.length > 0 && teas.filter(t => t.zuletztGetrunken).length > 0 && (
                <div className="border-t border-midnight/10 pt-6" />
              )}

              {teas.filter(t => t.zuletztGetrunken).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold font-sans text-midnight mb-4">
                    Bereits verwendet ({teas.filter(t => t.zuletztGetrunken).length})
                  </h3>
                  <div className="space-y-3">
                    {teas.filter(t => t.zuletztGetrunken).map((tea) => {
                      const lastUsed = tea.zuletztGetrunken ? new Date(tea.zuletztGetrunken) : null;
                      const timeAgo = lastUsed ? (() => {
                        const now = new Date();
                        const diffMs = now.getTime() - lastUsed.getTime();
                        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                        const diffDays = Math.floor(diffHours / 24);
                        
                        if (diffDays > 0) return `vor ${diffDays} Tag${diffDays > 1 ? 'en' : ''}`;
                        if (diffHours > 0) return `vor ${diffHours} Std`;
                        return 'gerade eben';
                      })() : '';

                      return (
                        <div 
                          key={tea.id}
                          onClick={() => {
                            if (confirm(`"${tea.name}" erneut verwenden?`)) {
                              setTeas(prev => prev.map(t => 
                                t.id === tea.id ? { ...t, zuletztGetrunken: undefined } : t
                              ));
                              haptic('success');
                            }
                          }}
                          className="bg-white rounded-ios-lg p-4 border border-midnight/10 cursor-pointer hover:bg-midnight/5 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-sans font-semibold text-midnight">{tea.name}</p>
                              <p className="text-xs text-midnight/50 font-sans mt-1">
                                ⏱️ {timeAgo}
                              </p>
                            </div>
                            <div className="text-midnight/30">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {availableTeas.length === 0 && teas.filter(t => t.zuletztGetrunken).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-midnight/60">Keine Tees vorhanden</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col touch-pan-x items-center justify-center" style={{ 
              paddingTop: '0.5rem',
              paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
              minHeight: 'calc(100vh - 60px)',
              overscrollBehavior: 'none'
            }}>
              {/* Premium UI - keine Begrüßung */}
              
              {availableTeas.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold text-midnight mb-2 font-sans">Alle Tees verwendet!</h3>
                  <p className="text-midnight/60 mb-6">Starte eine neue Rotation</p>
                  <div className="flex justify-center gap-4">
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setTeas(prev => prev.map(t => ({ ...t, zuletztGetrunken: undefined })));
                        setCurrentIndex(0);
                        haptic('success');
                      }}
                      className="bg-gold text-gold-text px-6 py-3 rounded-ios-lg font-medium font-sans"
                    >
                      Rotation neu starten
                    </motion.button>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsInventoryOpen(true)} 
                      className="bg-midnight/5 hover:bg-midnight/10 px-6 py-3 rounded-ios-lg font-medium font-sans text-midnight/70"
                    >
                      Inventar öffnen
                    </motion.button>
                  </div>
                </div>
              ) : selectedTea ? (
                <SuccessScreen tea={selectedTea} onBack={handleBackFromSuccess} onPickAnother={handlePickAnother} />
              ) : currentTea ? (
                <>
                  <SwipeTeaCard
                    tea={currentTea}
                    onSwipeRight={() => handleSelectTea(currentTea)}
                    onSwipeLeft={handleSkipTea}
                    onTap={() => handleSelectTea(currentTea)}
                  />
                  <div className="text-center mt-6">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAllTeas(true)}
                      className="text-sm font-sans text-midnight/60 hover:text-midnight transition-colors"
                    >
                      Alle Tees
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-midnight/60 mb-4">Noch keine Tees vorhanden</p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsInventoryOpen(true)}
                    className="bg-gold text-gold-text px-6 py-3 rounded-ios-lg font-medium font-sans"
                  >
                    Ersten Tee hinzufügen
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <TeaForm
            isOpen={isFormOpen}
            onClose={() => { setIsFormOpen(false); setEditingTea(undefined); }}
            onSave={handleSaveTea}
            editTea={editingTea}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInfoOpen && (
          <InfoModal
            triggerRef={infoTriggerRef}
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
            onExport={handleExportData}
            onImport={() => fileInputRef.current?.click()}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInventoryOpen && (
          <InventorySheet
            isOpen={isInventoryOpen}
            onClose={() => setIsInventoryOpen(false)}
            teas={teas}
            queue={queue}
            onEdit={handleEditTea}
            onDelete={handleDeleteTea}
            onAddNew={() => { setIsInventoryOpen(false); setIsFormOpen(true); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
