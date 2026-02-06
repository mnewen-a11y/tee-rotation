import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { Tea, TeaType, TEA_TYPE_DEFAULTS, TEA_TYPE_LABELS } from '@/types/tea';

interface TeaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tea: Omit<Tea, 'id'>) => void;
  editTea?: Tea;
}

export const TeaForm = ({ isOpen, onClose, onSave, editTea }: TeaFormProps) => {
  const [name, setName] = useState('');
  const [hersteller, setHersteller] = useState('');
  const [teeArt, setTeeArt] = useState<TeaType>('schwarz');
  const [bruehgrad, setBruehgrad] = useState(100);
  const [grammAnzahl, setGrammAnzahl] = useState(100);
  const [fuellstand, setFuellstand] = useState(100);

  useEffect(() => {
    if (editTea) {
      setName(editTea.name);
      setHersteller(editTea.hersteller || '');
      setTeeArt(editTea.teeArt);
      setBruehgrad(editTea.bruehgrad);
      setGrammAnzahl(editTea.grammAnzahl);
      setFuellstand(editTea.fuellstand);
    } else {
      setName('');
      setHersteller('');
      setTeeArt('schwarz');
      const defaults = TEA_TYPE_DEFAULTS['schwarz'];
      setBruehgrad(defaults.temp);
      setGrammAnzahl(defaults.gramm);
      setFuellstand(100);
    }
  }, [editTea, isOpen]);

  const handleTeaTypeChange = (type: TeaType) => {
    setTeeArt(type);
    const defaults = TEA_TYPE_DEFAULTS[type];
    setBruehgrad(defaults.temp);
    setGrammAnzahl(defaults.gramm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      hersteller: hersteller.trim() || undefined,
      teeArt,
      bruehgrad,
      grammAnzahl,
      fuellstand,
    });

    // Reset form
    setName('');
    setHersteller('');
    setTeeArt('schwarz');
    setBruehgrad(100);
    setGrammAnzahl(100);
    setFuellstand(100);
    onClose();
  };

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
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-ios-bg dark:bg-gray-800 rounded-t-ios-xl shadow-ios-lg max-h-[90vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-ios-secondary/30 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-ios-border dark:border-gray-700">
              <h2 className="text-2xl font-bold text-ios-label dark:text-white">
                {editTea ? 'Tee bearbeiten' : 'Neuer Tee'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/50 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-ios-secondary dark:text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-ios-secondary dark:text-gray-400 mb-2">
                    Tee Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z.B. Darjeeling FTGFOP1"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 rounded-ios border border-ios-border dark:border-gray-600 focus:ring-2 focus:ring-ios-blue focus:border-transparent outline-none transition-all text-ios-label dark:text-white"
                    required
                  />
                </div>

                {/* Hersteller */}
                <div>
                  <label className="block text-sm font-medium text-ios-secondary dark:text-gray-400 mb-2">
                    Hersteller (optional)
                  </label>
                  <input
                    type="text"
                    value={hersteller}
                    onChange={(e) => setHersteller(e.target.value)}
                    placeholder="z.B. Teekampagne"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 rounded-ios border border-ios-border dark:border-gray-600 focus:ring-2 focus:ring-ios-blue focus:border-transparent outline-none transition-all text-ios-label dark:text-white"
                  />
                </div>

                {/* Tea Type - Segmented Control */}
                <div>
                  <label className="block text-sm font-medium text-ios-secondary dark:text-gray-400 mb-2">
                    Tee-Art
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-white dark:bg-gray-700 p-2 rounded-ios border border-ios-border dark:border-gray-600">
                    {(Object.keys(TEA_TYPE_LABELS) as TeaType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTeaTypeChange(type)}
                        className={`py-2 px-4 rounded-ios font-medium transition-all ${
                          teeArt === type
                            ? 'bg-ios-blue text-white shadow-ios'
                            : 'text-ios-label dark:text-white hover:bg-ios-bg dark:hover:bg-gray-600'
                        }`}
                      >
                        {TEA_TYPE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bruehgrad */}
                <div>
                  <label className="block text-sm font-medium text-ios-secondary dark:text-gray-400 mb-2">
                    Brühtemperatur
                  </label>
                  <div className="bg-white dark:bg-gray-700 rounded-ios border border-ios-border dark:border-gray-600 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => setBruehgrad(Math.max(70, bruehgrad - 5))}
                        className="w-10 h-10 flex items-center justify-center bg-ios-bg dark:bg-gray-600 hover:bg-ios-border dark:hover:bg-gray-500 rounded-full transition-colors"
                      >
                        <Minus className="w-5 h-5 text-ios-label dark:text-white" />
                      </button>
                      <span className="text-4xl font-bold text-ios-label dark:text-white">{bruehgrad}°C</span>
                      <button
                        type="button"
                        onClick={() => setBruehgrad(Math.min(100, bruehgrad + 5))}
                        className="w-10 h-10 flex items-center justify-center bg-ios-bg dark:bg-gray-600 hover:bg-ios-border dark:hover:bg-gray-500 rounded-full transition-colors"
                      >
                        <Plus className="w-5 h-5 text-ios-label dark:text-white" />
                      </button>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="100"
                      step="5"
                      value={bruehgrad}
                      onChange={(e) => setBruehgrad(parseInt(e.target.value))}
                      className="w-full accent-ios-blue"
                    />
                  </div>
                </div>

                {/* Gramm Anzahl */}
                <div>
                  <label className="block text-sm font-medium text-ios-secondary dark:text-gray-400 mb-2">
                    Gramm pro Kanne
                  </label>
                  <div className="bg-white dark:bg-gray-700 rounded-ios border border-ios-border dark:border-gray-600 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => setGrammAnzahl(Math.max(2, grammAnzahl - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-ios-bg dark:bg-gray-600 hover:bg-ios-border dark:hover:bg-gray-500 rounded-full transition-colors"
                      >
                        <Minus className="w-5 h-5 text-ios-label dark:text-white" />
                      </button>
                      <span className="text-4xl font-bold text-ios-label dark:text-white">{grammAnzahl}g</span>
                      <button
                        type="button"
                        onClick={() => setGrammAnzahl(Math.min(20, grammAnzahl + 1))}
                        className="w-10 h-10 flex items-center justify-center bg-ios-bg dark:bg-gray-600 hover:bg-ios-border dark:hover:bg-gray-500 rounded-full transition-colors"
                      >
                        <Plus className="w-5 h-5 text-ios-label dark:text-white" />
                      </button>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      step="1"
                      value={grammAnzahl}
                      onChange={(e) => setGrammAnzahl(parseInt(e.target.value))}
                      className="w-full accent-ios-blue"
                    />
                    <div className="flex justify-between text-xs text-ios-secondary dark:text-gray-400 mt-2">
                      <span>2g (kleine Kanne)</span>
                      <span>20g (große Kanne)</span>
                    </div>
                  </div>
                </div>

                {/* Füllstand */}
                <div>
                  <label className="block text-sm font-medium text-ios-secondary dark:text-gray-400 mb-2">
                    Füllstand
                  </label>
                  <div className="bg-white dark:bg-gray-700 rounded-ios border border-ios-border dark:border-gray-600 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl font-bold text-ios-label dark:text-white">{fuellstand}%</span>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        fuellstand > 70 ? 'bg-ios-green' :
                        fuellstand > 30 ? 'bg-ios-orange' :
                        'bg-ios-red'
                      }`}>
                        <span className="text-2xl font-bold text-white">{fuellstand}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={fuellstand}
                      onChange={(e) => setFuellstand(parseInt(e.target.value))}
                      className="w-full accent-ios-blue"
                    />
                    <div className="flex justify-between text-xs text-ios-secondary dark:text-gray-400 mt-2">
                      <span>Leer</span>
                      <span>Halb</span>
                      <span>Voll</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-ios-blue hover:bg-opacity-90 text-white font-semibold text-lg py-4 rounded-ios-lg shadow-ios transition-all"
                >
                  {editTea ? 'Änderungen speichern' : 'Tee hinzufügen'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
