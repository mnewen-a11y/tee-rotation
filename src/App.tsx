import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Sparkles, Moon, Sun, Grid3x3, Layers } from 'lucide-react';
import { Tea, SelectionMode } from '@/types/tea';
import { loadData, saveData, loadSettings, saveSettings, generateId } from '@/lib/storage';
import { TeaCard } from '@/components/TeaCard';
import { TeaGridCard } from '@/components/TeaGridCard';
import { SwipeCard } from '@/components/SwipeCard';
import { TeaForm } from '@/components/TeaForm';
import { TabBar } from '@/components/TabBar';

function App() {
  const [activeTab, setActiveTab] = useState<'heute' | 'list' | 'new'>('heute');
  const [teas, setTeas] = useState<Tea[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [swipeStack, setSwipeStack] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTea, setEditingTea] = useState<Tea | undefined>();
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('grid');
  const [darkMode, setDarkMode] = useState(false);

  // Load data and settings on mount
  useEffect(() => {
    const data = loadData();
    const settings = loadSettings();
    
    setTeas(data.teas);
    setQueue(data.queue.length > 0 ? data.queue : data.teas.map(t => t.id));
    setSelectionMode(settings.selectionMode);
    setDarkMode(settings.darkMode);
    
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Initialize swipe stack when mode changes to swipe
  useEffect(() => {
    if (selectionMode === 'swipe' && swipeStack.length === 0 && queue.length > 0) {
      setSwipeStack([...queue].slice(0, 3)); // Show top 3 teas
    }
  }, [selectionMode, queue, swipeStack.length]);

  // Save data whenever it changes
  useEffect(() => {
    if (teas.length > 0 || queue.length > 0) {
      saveData({ teas, queue });
    }
  }, [teas, queue]);

  // Save settings when they change
  useEffect(() => {
    saveSettings({ selectionMode, darkMode });
  }, [selectionMode, darkMode]);

  // Handle tab change
  useEffect(() => {
    if (activeTab === 'new') {
      setIsFormOpen(true);
      setEditingTea(undefined);
    }
  }, [activeTab]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSelectionMode = () => {
    const newMode: SelectionMode = selectionMode === 'grid' ? 'swipe' : 'grid';
    setSelectionMode(newMode);
    
    // Reset swipe stack when switching to swipe mode
    if (newMode === 'swipe') {
      setSwipeStack([...queue].slice(0, 3));
    }
  };

  const handleAddTea = (teaData: Omit<Tea, 'id'>) => {
    const newTea: Tea = {
      ...teaData,
      id: generateId(),
    };
    setTeas([...teas, newTea]);
    setQueue([...queue, newTea.id]);
  };

  const handleUpdateTea = (teaData: Omit<Tea, 'id'>) => {
    if (!editingTea) return;
    
    const updatedTeas = teas.map(t => 
      t.id === editingTea.id ? { ...teaData, id: editingTea.id } : t
    );
    setTeas(updatedTeas);
    setEditingTea(undefined);
  };

  const handleDeleteTea = (id: string) => {
    setTeas(teas.filter(t => t.id !== id));
    setQueue(queue.filter(qId => qId !== id));
    setSwipeStack(swipeStack.filter(sId => sId !== id));
  };

  const handleSelectTea = (id: string) => {
    // Update last drunk date
    const updatedTeas = teas.map(t => 
      t.id === id ? { ...t, zuletztGetrunken: new Date().toISOString() } : t
    );
    setTeas(updatedTeas);

    // Move to end of queue
    const newQueue = queue.filter(qId => qId !== id);
    newQueue.push(id);
    setQueue(newQueue);
  };

  const handleSwipeLeft = (id: string) => {
    // Accept tea - move to end of queue
    handleSelectTea(id);
    
    // Remove from swipe stack and add next tea
    const newStack = swipeStack.filter(sId => sId !== id);
    const nextTeaIndex = queue.findIndex(qId => !newStack.includes(qId) && qId !== id);
    if (nextTeaIndex !== -1) {
      newStack.push(queue[nextTeaIndex]);
    }
    setSwipeStack(newStack);
  };

  const handleSwipeRight = (id: string) => {
    // Skip tea - move to end temporarily
    const newStack = swipeStack.filter(sId => sId !== id);
    newStack.push(id);
    setSwipeStack(newStack);
  };

  const handleEditTea = (tea: Tea) => {
    setEditingTea(tea);
    setIsFormOpen(true);
    setActiveTab('new');
  };

  const getTeaById = (id: string): Tea | undefined => {
    return teas.find(t => t.id === id);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-ios-bg dark:bg-gray-900 pb-20 transition-colors">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-ios border-b border-ios-border dark:border-gray-700 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-tea-green to-tea-oolong rounded-ios flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-ios-label dark:text-white">Tee Rotation</h1>
                  <p className="text-xs text-ios-secondary dark:text-gray-400">Dein persönlicher Tee-Begleiter</p>
                </div>
              </div>

              {/* Settings Buttons */}
              <div className="flex items-center gap-2">
                {activeTab === 'heute' && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSelectionMode}
                    className="p-2 bg-ios-bg dark:bg-gray-700 hover:bg-ios-border dark:hover:bg-gray-600 rounded-ios transition-colors"
                    title={selectionMode === 'grid' ? 'Swipe-Modus' : 'Grid-Modus'}
                  >
                    {selectionMode === 'grid' ? (
                      <Layers className="w-5 h-5 text-ios-label dark:text-white" />
                    ) : (
                      <Grid3x3 className="w-5 h-5 text-ios-label dark:text-white" />
                    )}
                  </motion.button>
                )}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className="p-2 bg-ios-bg dark:bg-gray-700 hover:bg-ios-border dark:hover:bg-gray-600 rounded-ios transition-colors"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-ios-label" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-3xl mx-auto px-6 py-6">
          <AnimatePresence mode="wait">
            {activeTab === 'heute' && (
              <motion.div
                key="heute"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {teas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-20 h-20 bg-ios-border dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <Coffee className="w-10 h-10 text-ios-secondary dark:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-ios-label dark:text-white mb-2">
                      Keine Tees vorhanden
                    </h3>
                    <p className="text-ios-secondary dark:text-gray-400 text-center mb-6">
                      Füge deinen ersten Tee hinzu, um zu beginnen.
                    </p>
                    <button
                      onClick={() => setActiveTab('new')}
                      className="bg-ios-blue text-white px-6 py-3 rounded-ios-lg font-medium"
                    >
                      Ersten Tee hinzufügen
                    </button>
                  </div>
                ) : selectionMode === 'grid' ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 justify-center mb-4">
                      <Sparkles className="w-5 h-5 text-ios-blue dark:text-blue-400" />
                      <h2 className="text-lg font-semibold text-ios-secondary dark:text-gray-400">
                        Wähle deinen Tee
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {queue.map((teaId, index) => {
                        const tea = getTeaById(teaId);
                        if (!tea) return null;
                        return (
                          <TeaGridCard
                            key={tea.id}
                            tea={tea}
                            onSelect={() => handleSelectTea(tea.id)}
                            index={index}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 justify-center mb-4">
                      <Sparkles className="w-5 h-5 text-ios-blue dark:text-blue-400" />
                      <h2 className="text-lg font-semibold text-ios-secondary dark:text-gray-400">
                        Swipe für deinen Tee
                      </h2>
                    </div>
                    
                    <div className="relative h-[600px] flex items-center justify-center">
                      {swipeStack.length === 0 && (
                        <div className="text-center">
                          <p className="text-ios-secondary dark:text-gray-400 mb-4">
                            Keine Tees mehr in der Queue
                          </p>
                          <button
                            onClick={() => setSwipeStack([...queue].slice(0, 3))}
                            className="bg-ios-blue text-white px-6 py-3 rounded-ios-lg font-medium"
                          >
                            Neu starten
                          </button>
                        </div>
                      )}
                      
                      {swipeStack.slice(0, 3).reverse().map((teaId, index) => {
                        const tea = getTeaById(teaId);
                        if (!tea) return null;
                        return (
                          <SwipeCard
                            key={tea.id}
                            tea={tea}
                            onSwipeLeft={() => handleSwipeLeft(tea.id)}
                            onSwipeRight={() => handleSwipeRight(tea.id)}
                            zIndex={swipeStack.length - index}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-ios-label dark:text-white mb-1">Meine Tees</h2>
                  <p className="text-sm text-ios-secondary dark:text-gray-400">
                    {teas.length} {teas.length === 1 ? 'Tee' : 'Tees'} in der Rotation
                  </p>
                </div>

                {teas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-20 h-20 bg-ios-border dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <Coffee className="w-10 h-10 text-ios-secondary dark:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-ios-label dark:text-white mb-2">
                      Noch keine Tees
                    </h3>
                    <p className="text-ios-secondary dark:text-gray-400 text-center mb-6">
                      Beginne deine Tee-Sammlung
                    </p>
                    <button
                      onClick={() => setActiveTab('new')}
                      className="bg-ios-blue text-white px-6 py-3 rounded-ios-lg font-medium"
                    >
                      Tee hinzufügen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {queue.map((teaId) => {
                      const tea = getTeaById(teaId);
                      if (!tea) return null;
                      return (
                        <TeaCard
                          key={tea.id}
                          tea={tea}
                          onEdit={() => handleEditTea(tea)}
                          onDelete={() => {
                            if (confirm(`"${tea.name}" wirklich löschen?`)) {
                              handleDeleteTea(tea.id);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Tea Form Modal */}
        <TeaForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTea(undefined);
            if (activeTab === 'new') {
              setActiveTab('heute');
            }
          }}
          onSave={editingTea ? handleUpdateTea : handleAddTea}
          editTea={editingTea}
        />

        {/* Tab Bar */}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
