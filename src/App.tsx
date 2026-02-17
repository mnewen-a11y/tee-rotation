/**
 * App.tsx — Royal-Tea R004 v0.9.7
 * - Light theme only (no dark mode)
 * - Ivory (#FFFFF0) content background
 * - Tabs: Heute | Meine Tees | Neu | Bewerten
 * - Export / Import (JSON)
 * - Kategorisierte Tee-Auswahl mit Accordion
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Sparkles, ChevronDown, Download, Upload } from 'lucide-react';
import { Tea, TeaType } from '@/types/tea';
import { loadData, saveData, loadSettings, saveSettings, generateId } from '@/lib/storage';
import { TeaCard } from '@/components/TeaCard';
import { TeaGridCard } from '@/components/TeaGridCard';
import { TeaForm } from '@/components/TeaForm';
import { TabBar, TabId } from '@/components/TabBar';
import { RoyalTeaLogo } from '@/components/RoyalTeaLogo';
import { RatingPage } from '@/components/RatingPage';

// ── Constants ────────────────────────────────────────────────────────────────
const TEA_CATEGORY_ORDER: TeaType[] = ['schwarz', 'grün', 'oolong', 'chai'];
const TEA_CATEGORY_LABELS: Record<TeaType, string> = {
  schwarz: 'Schwarztee', grün: 'Grüntee', oolong: 'Oolong', chai: 'Chai',
};
const TEA_CATEGORY_COLORS: Record<TeaType, string> = {
  schwarz: '#8B4513', grün: '#4CAF50', oolong: '#DAA520', chai: '#A0522D',
};

const IVORY = '#FFFFF0';

function App() {
  const [activeTab, setActiveTab]   = useState<TabId>('heute');
  const [teas, setTeas]             = useState<Tea[]>([]);
  const [queue, setQueue]           = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTea, setEditingTea] = useState<Tea | undefined>();
  const [openCategories, setOpenCategories] = useState<Record<TeaType, boolean>>({
    schwarz: true, grün: true, oolong: true, chai: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const data     = loadData();
    const settings = loadSettings();
    setTeas(data.teas);
    setQueue(data.queue.length > 0 ? data.queue : data.teas.map(t => t.id));
    // Ensure light mode is never overridden by stale class
    document.documentElement.classList.remove('dark');
    void settings;
  }, []);

  useEffect(() => {
    if (teas.length > 0 || queue.length > 0) saveData({ teas, queue });
  }, [teas, queue]);

  useEffect(() => {
    saveSettings({ selectionMode: 'grid' });
  }, []);

  useEffect(() => {
    if (activeTab === 'new') { setIsFormOpen(true); setEditingTea(undefined); }
  }, [activeTab]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getTeaById = (id: string) => teas.find(t => t.id === id);

  const toggleCategory = (type: TeaType) =>
    setOpenCategories(prev => ({ ...prev, [type]: !prev[type] }));

  // ── CRUD ─────────────────────────────────────────────────────────────────
  const handleAddTea = (data: Omit<Tea, 'id'>) => {
    const t: Tea = { ...data, id: generateId() };
    setTeas(prev => [...prev, t]);
    setQueue(prev => [...prev, t.id]);
  };

  const handleUpdateTea = (data: Omit<Tea, 'id'>) => {
    if (!editingTea) return;
    setTeas(prev => prev.map(t => t.id === editingTea.id ? { ...data, id: editingTea.id } : t));
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

  const handleEditTea = (tea: Tea) => {
    setEditingTea(tea); setIsFormOpen(true); setActiveTab('new');
  };

  // ── Rating ────────────────────────────────────────────────────────────────
  const handleRateTea = (teaId: string, rating: number) => {
    if (rating < 1 || rating > 5) return;
    setTeas(prev => prev.map(t =>
      t.id === teaId ? { ...t, rating, ratingUpdatedAt: new Date().toISOString() } : t
    ));
  };

  // ── Export / Import ───────────────────────────────────────────────────────
  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify({ version: '1.0.0', exportDate: new Date().toISOString(), teas, queue }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = `royal-tea-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
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

  // ── Derived ───────────────────────────────────────────────────────────────
  const availableTeas = queue
    .map(id => getTeaById(id))
    .filter((t): t is Tea => !!t && !t.zuletztGetrunken);

  const usedTeas = teas
    .filter(t => t.zuletztGetrunken)
    .sort((a, b) =>
      new Date(b.zuletztGetrunken!).getTime() - new Date(a.zuletztGetrunken!).getTime()
    );

  const teasByCategory = TEA_CATEGORY_ORDER.reduce((acc, type) => {
    acc[type] = availableTeas.filter(t => t.teeArt === type); return acc;
  }, {} as Record<TeaType, Tea[]>);

  // ── Empty state helper ────────────────────────────────────────────────────
  const EmptyState = ({ message, cta }: { message: string; cta?: () => void }) => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 bg-midnight/8 rounded-full flex items-center justify-center mb-4">
        <Coffee className="w-10 h-10 text-midnight/25" />
      </div>
      <p className="text-midnight/50 text-center mb-6 font-sans text-sm max-w-xs">{message}</p>
      {cta && (
        <button onClick={cta}
          className="bg-gold text-gold-text px-6 py-3 rounded-ios-lg font-sans font-medium
                     hover:brightness-105 transition-all focus-visible:ring-2 focus-visible:ring-gold">
          Ersten Tee hinzufügen
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-midnight">
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept=".json" className="hidden"
        onChange={handleImportFile} aria-hidden="true" tabIndex={-1} />

      <div className="min-h-screen pb-20">

        {/* ── HEADER (Midnight) ──────────────────────────────────────────────── */}
        <header className="bg-midnight/90 backdrop-blur-ios border-b border-white/10 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <RoyalTeaLogo size="sm" className="opacity-90" />

              <div className="flex items-center gap-1.5" role="toolbar" aria-label="Aktionen">
                {/* Export */}
                <motion.button whileTap={{ scale: 0.88 }} onClick={handleExport}
                  title="Daten exportieren"
                  aria-label="Daten exportieren"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors
                             focus-visible:ring-2 focus-visible:ring-gold focus:outline-none">
                  <Download className="w-5 h-5 text-white" aria-hidden="true" />
                </motion.button>

                {/* Import */}
                <motion.button whileTap={{ scale: 0.88 }} onClick={() => fileInputRef.current?.click()}
                  title="Daten importieren"
                  aria-label="Daten importieren"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-ios transition-colors
                             focus-visible:ring-2 focus-visible:ring-gold focus:outline-none">
                  <Upload className="w-5 h-5 text-white" aria-hidden="true" />
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* ── CONTENT (Ivory) ─────────────────────────────────────────────────── */}
        <main
          className="max-w-3xl mx-auto px-6 py-6"
          style={{ backgroundColor: IVORY, minHeight: 'calc(100vh - 136px)' }}
        >
          <AnimatePresence mode="wait">

            {/* ── TAB: HEUTE ─────────────────────────────────────────────────── */}
            {activeTab === 'heute' && (
              <motion.div key="heute"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
              >
                {teas.length === 0 ? (
                  <EmptyState
                    message="Füge deinen ersten Tee hinzu, um zu beginnen."
                    cta={() => setActiveTab('new')}
                  />
                ) : (
                  <>
                    {/* Verfügbare Tees — nach Kategorie */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-5">
                        <Sparkles className="w-5 h-5 text-gold" aria-hidden="true" />
                        <h2 className="text-lg font-semibold font-serif text-midnight/70">
                          Wähle deinen Tee
                        </h2>
                      </div>

                      {availableTeas.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-midnight/50 mb-1 font-sans text-sm">Alle Tees wurden verwendet! 🎉</p>
                          <p className="text-xs text-midnight/30 font-sans">
                            Klicke unten auf einen Tee um ihn erneut zu verwenden
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {TEA_CATEGORY_ORDER.map(type => {
                            const catTeas = teasByCategory[type];
                            if (catTeas.length === 0) return null;
                            const isOpen = openCategories[type];

                            return (
                              <div key={type}
                                className="rounded-ios-xl overflow-hidden border border-midnight/10 shadow-card">
                                {/* Accordion header */}
                                <button
                                  onClick={() => toggleCategory(type)}
                                  aria-expanded={isOpen}
                                  aria-controls={`cat-${type}`}
                                  className="w-full flex items-center justify-between px-4 py-3
                                             bg-midnight/5 hover:bg-midnight/10 transition-colors
                                             focus:outline-none focus-visible:ring-inset focus-visible:ring-2
                                             focus-visible:ring-gold"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: TEA_CATEGORY_COLORS[type] }}
                                      aria-hidden="true" />
                                    <span className="font-serif font-semibold text-midnight">
                                      {TEA_CATEGORY_LABELS[type]}
                                    </span>
                                    <span className="text-sm text-midnight/35 font-sans">
                                      ({catTeas.length})
                                    </span>
                                  </div>
                                  <motion.div animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown className="w-5 h-5 text-midnight/35" aria-hidden="true" />
                                  </motion.div>
                                </button>

                                {/* Accordion body */}
                                <AnimatePresence initial={false}>
                                  {isOpen && (
                                    <motion.div
                                      id={`cat-${type}`}
                                      key="body"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                                      className="overflow-hidden"
                                    >
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3"
                                        style={{ backgroundColor: 'rgba(255,255,240,0.9)' }}>
                                        {catTeas.map((tea, i) => (
                                          <TeaGridCard key={tea.id} tea={tea}
                                            onSelect={() => handleSelectTea(tea.id)} index={i} />
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Zuletzt verwendet */}
                    {usedTeas.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-midnight/10">
                        <div className="flex items-center gap-2 mb-4">
                          <h2 className="text-xl font-bold font-serif text-midnight">Zuletzt verwendet</h2>
                          <span className="text-sm text-midnight/40 font-sans">({usedTeas.length})</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                          {usedTeas.map((tea, i) => (
                            <TeaGridCard key={tea.id} tea={{ ...tea, isSelected: true }}
                              onSelect={() => handleUnselectTea(tea.id)} index={i} />
                          ))}
                        </div>
                        <p className="text-center text-xs text-midnight/30 italic font-sans">
                          💡 Klicke auf einen Tee um ihn erneut zu verwenden
                        </p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* ── TAB: MEINE TEES ────────────────────────────────────────────── */}
            {activeTab === 'list' && (
              <motion.div key="list"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
              >
                <div className="mb-5">
                  <h2 className="text-xl font-bold font-serif text-midnight mb-1">Meine Tees</h2>
                  <p className="text-sm text-midnight/45 font-sans">
                    {teas.length} {teas.length === 1 ? 'Tee' : 'Tees'} in der Rotation
                  </p>
                </div>
                {teas.length === 0 ? (
                  <EmptyState message="Beginne deine Tee-Sammlung." cta={() => setActiveTab('new')} />
                ) : (
                  <div className="space-y-3">
                    {queue.map(teaId => {
                      const tea = getTeaById(teaId);
                      if (!tea) return null;
                      return (
                        <TeaCard key={tea.id} tea={tea}
                          onEdit={() => handleEditTea(tea)}
                          onDelete={() => {
                            if (confirm(`"${tea.name}" wirklich löschen?`)) handleDeleteTea(tea.id);
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── TAB: BEWERTUNGEN ───────────────────────────────────────────── */}
            {activeTab === 'rating' && (
              <RatingPage
                teas={teas}
                onRateTea={handleRateTea}
                onNavigateToNew={() => setActiveTab('new')}
              />
            )}

          </AnimatePresence>
        </main>

        {/* ── FORM SHEET ─────────────────────────────────────────────────────── */}
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

        {/* ── TAB BAR ────────────────────────────────────────────────────────── */}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
