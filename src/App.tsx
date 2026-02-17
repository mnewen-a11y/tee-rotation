import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info, RefreshCw } from 'lucide-react';
import { Tea, TeaType } from '@/types/tea';
import { loadData, saveData, generateId } from '@/lib/storage';
import { saveToSupabase, subscribeToSync } from '@/lib/supabase';
import { TeaCard } from '@/components/TeaCard';
import { TeaGridCard } from '@/components/TeaGridCard';
// TeaGridCard nur noch in Meine Tees Tab
import { TeaForm } from '@/components/TeaForm';
import { TabBar, TabId } from '@/components/TabBar';
import { RoyalTeaLogo } from '@/components/RoyalTeaLogo';
import { InfoModal } from '@/components/InfoModal';
import { RatingPage } from '@/components/RatingPage';
import { HeuteScreen } from '@/components/HeuteScreen';
import { useHaptic } from '@/hooks/useHaptic';
import { useTabDirection } from '@/hooks/useTabDirection';

const TEA_CATEGORY_ORDER: TeaType[] = ['schwarz', 'grün', 'oolong', 'chai', 'jasmin', 'kräuter'];

const TEA_CATEGORY_LABELS: Record<TeaType, string> = {
  schwarz: 'Schwarztee', grün: 'Grüntee', oolong: 'Oolong',
  chai: 'Chai', jasmin: 'Jasmin', kräuter: 'Kräuter',
};

const TEA_CATEGORY_COLORS: Record<TeaType, string> = {
  schwarz: '#8B4513', grün: '#4CAF50', oolong: '#DAA520',
  chai: '#A0522D', jasmin: '#C77DFF', kräuter: '#2E8B57',
};

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('heute');
  const [teas, setTeas] = useState<Tea[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTea, setEditingTea] = useState<Tea | undefined>();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'ok' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<TeaType, boolean>>({
    schwarz: true, grün: true, oolong: true, chai: true, jasmin: true, kräuter: true,
  });

  const { trigger: haptic } = useHaptic();
  const { getDirection } = useTabDirection();
  const [slideDir, setSlideDir] = useState(1);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const infoTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const data = loadData();
    setTeas(data.teas);
    setQueue(data.queue.length > 0 ? data.queue : data.teas.map(t => t.id));
    setTimeout(() => setIsLoading(false), 400); // kurze Mindest-Ladezeit für Skeleton
  }, []);

  useEffect(() => {
    if (teas.length > 0 || queue.length > 0) saveData({ teas, queue });
  }, [teas, queue]);

  // Realtime Subscription — aktualisiert App wenn Partner Änderungen macht
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const setup = () => {
      cleanup = subscribeToSync((data) => {
        setTeas(data.teas);
        setQueue(data.queue);
        saveData({ teas: data.teas, queue: data.queue });
        setSyncStatus('ok');
        setTimeout(() => setSyncStatus('idle'), 2000);
      });
    };
    setup();
    return () => { cleanup?.(); };
  }, []);

  useEffect(() => {
    if (activeTab === 'new' && !editingTea) {
      setIsFormOpen(true);
    }
  }, [activeTab]);

  const toggleCategory = (type: TeaType) =>
    setOpenCategories(prev => ({ ...prev, [type]: !prev[type] }));

  const handleAddTea = (teaData: Omit<Tea, 'id'>) => {
    const t: Tea = { ...teaData, id: generateId() };
    setTeas(prev => [...prev, t]);
    setQueue(prev => [...prev, t.id]);
  };

  const handleUpdateTea = (teaData: Omit<Tea, 'id'>) => {
    if (!editingTea) return;
    setTeas(prev => prev.map(t => t.id === editingTea.id ? { ...teaData, id: editingTea.id } : t));
    setEditingTea(undefined);
  };

  const handleDeleteTea = (id: string) => {
    setTeas(prev => prev.filter(t => t.id !== id));
    setQueue(prev => prev.filter(q => q !== id));
  };

  const handleSelectTea = (id: string) => {
    setTeas(prev => prev.map(t =>
      t.id === id ? { ...t, zuletztGetrunken: new Date().toISOString(), isSelected: true }
                  : { ...t, isSelected: false }
    ));
    const q = queue.filter(q => q !== id); q.push(id); setQueue(q);
    setTimeout(() => setTeas(prev => prev.map(t => ({ ...t, isSelected: false }))), 2000);
  };

  const handleUnselectTea = (id: string) => {
    setTeas(prev => prev.map(t =>
      t.id === id ? { ...t, zuletztGetrunken: undefined, isSelected: true }
                  : { ...t, isSelected: false }
    ));
    const q = queue.filter(q => q !== id); q.unshift(id); setQueue(q);
    setTimeout(() => setTeas(prev => prev.map(t => ({ ...t, isSelected: false }))), 2000);
  };

  const handleSkipTea = (id: string) => {
    haptic('light');
    setQueue(prev => {
      const q = prev.filter(q => q !== id);
      q.push(id);
      return q;
    });
  };

  const handleEditTea = (tea: Tea) => {
    setEditingTea(tea);
    setIsFormOpen(true);
    // KEIN setActiveTab('new') — das würde editingTea via useEffect zurücksetzen
  };

  const getTeaById = (id: string) => teas.find(t => t.id === id);

  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify({ version: '1.0.0', exportDate: new Date().toISOString(), teas, queue }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `royal-tea-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (!parsed.teas || !Array.isArray(parsed.teas)) { alert('Ungültige Datei.'); return; }
        if (confirm(`${parsed.teas.length} Tees importieren? Bestehende Daten werden überschrieben.`)) {
          setTeas(parsed.teas);
          setQueue(parsed.queue ?? parsed.teas.map((t: Tea) => t.id));
        }
      } catch { alert('Datei konnte nicht gelesen werden.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSync = async () => {
    setSyncStatus('syncing');
    const ok = await saveToSupabase(teas, queue);
    setSyncStatus(ok ? 'ok' : 'error');
    setTimeout(() => setSyncStatus('idle'), 2000);
  };

  const availableTeas = queue
    .map(id => getTeaById(id))
    .filter((t): t is Tea => !!t && !t.zuletztGetrunken);

  const usedTeas = teas
    .filter(t => t.zuletztGetrunken)
    .sort((a, b) => new Date(b.zuletztGetrunken!).getTime() - new Date(a.zuletztGetrunken!).getTime());

  const teasByCategory = TEA_CATEGORY_ORDER.reduce((acc, type) => {
    acc[type] = availableTeas.filter(t => t.teeArt === type);
    return acc;
  }, {} as Record<TeaType, Tea[]>);

  return (
    <div className="min-h-screen bg-midnight">
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImportFile} />

      <div className="min-h-screen pb-28">

        {/* HEADER
             - Unsichtbarer Spacer oben = env(safe-area-inset-top) für PWA-Modus
             - Eigentlicher Inhalt: feste Höhe h-14, items-center → Logo + Buttons immer aligned
             - Header-Gesamthöhe wächst nur um die tatsächliche Status-Bar-Höhe */}
        <header className="bg-midnight/80 backdrop-blur-ios border-b border-white/10 sticky top-0 z-20">
          {/* Safe-area Spacer — nur sichtbar im PWA-Modus */}
          <div style={{ height: 'env(safe-area-inset-top, 0px)' }} aria-hidden="true" />
          {/* Header-Inhalt — fixe Höhe, vertikal zentriert */}
          <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
            <RoyalTeaLogo size="sm" className="opacity-90" />
            <div className="flex items-center gap-2">

              {/* Sync-Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSync}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors"
                aria-label="Mit Partner synchronisieren"
                disabled={syncStatus === 'syncing'}
              >
                <RefreshCw
                  className={`w-5 h-5 transition-colors ${
                    syncStatus === 'syncing' ? 'text-gold animate-spin' :
                    syncStatus === 'ok'      ? 'text-green-400' :
                    syncStatus === 'error'   ? 'text-red-400' :
                    'text-white'
                  }`}
                />
              </motion.button>

              <motion.button
                ref={infoTriggerRef}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsInfoOpen(true)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors"
                aria-label="App-Informationen"
                aria-haspopup="dialog"
                aria-expanded={isInfoOpen}>
                <Info className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main
          className="max-w-3xl mx-auto px-6 py-6 min-h-[calc(100vh-140px)] transition-colors duration-300"
          style={{ backgroundColor: activeTab === 'heute' ? '#1d2646' : '#FFFFF0' }}>
          <AnimatePresence mode="wait" custom={slideDir}>

            {/* TAB: HEUTE — ein Screen, eine Entscheidung */}
            {activeTab === 'heute' && (
              <motion.div key="heute"
                custom={slideDir}
                initial={{ opacity: 0, x: slideDir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDir * -40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex flex-col"
                style={{ minHeight: 'calc(100vh - 180px)' }}
              >
                <HeuteScreen
                  queue={availableTeas}
                  onSelect={handleSelectTea}
                  onSkip={handleSkipTea}
                  isLoading={isLoading}
                />
              </motion.div>
            )}

            {/* TAB: MEINE TEES */}
            {activeTab === 'list' && (
              <motion.div key="list"
                custom={slideDir}
                initial={{ opacity: 0, x: slideDir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDir * -40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <div className="mb-4">
                  <h2 className="text-xl font-bold font-serif text-midnight mb-1">Meine Tees</h2>
                  <p className="text-sm text-midnight/60 font-sans">
                    {teas.length} {teas.length === 1 ? 'Tee' : 'Tees'} in der Rotation
                  </p>
                </div>
                {teas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-20 h-20 bg-midnight/10 rounded-full flex items-center justify-center mb-4">
                      <Coffee className="w-10 h-10 text-midnight/40" />
                    </div>
                    <h3 className="text-xl font-semibold text-midnight mb-2 font-serif">Noch keine Tees</h3>
                    <p className="text-midnight/60 text-center mb-6 font-sans">Beginne deine Tee-Sammlung</p>
                    <button onClick={() => setActiveTab('new')}
                      className="bg-gold text-gold-text px-6 py-3 rounded-ios-lg font-medium font-sans">
                      Tee hinzufügen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {queue.map(teaId => {
                      const tea = getTeaById(teaId); if (!tea) return null;
                      return (
                        <TeaCard key={tea.id} tea={tea}
                          onEdit={() => handleEditTea(tea)}
                          onDelete={() => { if (confirm(`"${tea.name}" wirklich löschen?`)) handleDeleteTea(tea.id); }}
                        />
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB: BEWERTEN */}
            {activeTab === 'rating' && (
              <motion.div key="rating"
                custom={slideDir}
                initial={{ opacity: 0, x: slideDir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDir * -40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <RatingPage
                  teas={teas}
                  onRateTea={(id, rating) =>
                    setTeas(prev => prev.map(t => t.id === id ? { ...t, rating } : t))
                  }
                  onNavigateToNew={() => setActiveTab('new')}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        <TabBar activeTab={activeTab} onTabChange={(tab) => {
          haptic('light');
          setSlideDir(getDirection(tab));
          setActiveTab(tab);
        }} />

        <TeaForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTea(undefined);
            if (activeTab === 'new') setActiveTab('heute');
          }}
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

      </div>
    </div>
  );
}

export default App;
