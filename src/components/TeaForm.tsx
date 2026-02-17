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
  const [grammAnzahl, setGrammAnzahl] = useState(8);
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
    setName('');
    setHersteller('');
    setTeeArt('schwarz');
    setBruehgrad(100);
    setGrammAnzahl(8);
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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet — Ivory */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-ios-xl shadow-ios-lg max-h-[90vh] overflow-hidden"
            style={{ backgroundColor: '#FFFFF0' }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-midnight/20 rounded-full" />
            </div>

            {/* Sheet Header — Midnight Strip */}
            <div className="flex items-center justify-between px-6 py-4 bg-midnight">
              <h2 className="text-2xl font-bold font-serif text-white">
                {editTea ? 'Tee bearbeiten' : 'Neuer Tee'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            {/* Form Body — Ivory */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="p-6 space-y-6">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-midnight/60 mb-2 font-sans">
                    Tee Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z.B. Darjeeling FTGFOP1"
                    className="w-full px-4 py-3 bg-white border border-midnight/15 rounded-ios focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-midnight placeholder-midnight/30 font-sans"
                    required
                  />
                </div>

                {/* Hersteller */}
                <div>
                  <label className="block text-sm font-medium text-midnight/60 mb-2 font-sans">
                    Hersteller (optional)
                  </label>
                  <input
                    type="text"
                    value={hersteller}
                    onChange={(e) => setHersteller(e.target.value)}
                    placeholder="z.B. Teekampagne"
                    className="w-full px-4 py-3 bg-white border border-midnight/15 rounded-ios focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-midnight placeholder-midnight/30 font-sans"
                  />
                </div>

                {/* Tee-Art */}
                <div>
                  <label className="block text-sm font-medium text-midnight/60 mb-2 font-sans">
                    Tee-Art
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-midnight/5 p-2 rounded-ios border border-midnight/10">
                    {(Object.keys(TEA_TYPE_LABELS) as TeaType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTeaTypeChange(type)}
                        className={`py-2 px-4 rounded-ios font-medium font-sans transition-all ${
                          teeArt === type
                            ? 'bg-gold text-gold-text shadow-sm'
                            : 'text-midnight/70 hover:bg-midnight/10'
                        }`}
                      >
                        {TEA_TYPE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brühtemperatur */}
                <div>
                  <label className="block text-sm font-medium text-midnight/60 mb-2 font-sans">
                    Brühtemperatur
                  </label>
                  <div className="bg-white border border-midnight/10 rounded-ios p-4">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => setBruehgrad(Math.max(70, bruehgrad - 5))}
                        className="w-10 h-10 flex items-center justify-center bg-midnight/5 hover:bg-midnight/10 rounded-full transition-colors"
                      >
                        <Minus className="w-5 h-5 text-midnight" />
                      </button>
                      <span className="text-4xl font-bold text-midnight font-serif">{bruehgrad}°C</span>
                      <button
                        type="button"
                        onClick={() => setBruehgrad(Math.min(100, bruehgrad + 5))}
                        className="w-10 h-10 flex items-center justify-center bg-midnight/5 hover:bg-midnight/10 rounded-full transition-colors"
                      >
                        <Plus className="w-5 h-5 text-midnight" />
                      </button>
                    </div>
                    <input
                      type="range" min="70" max="100" step="5"
                      value={bruehgrad}
                      onChange={(e) => setBruehgrad(parseInt(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>
                </div>

                {/* Gramm pro Kanne */}
                <div>
                  <label className="block text-sm font-medium text-midnight/60 mb-2 font-sans">
                    Gramm pro Kanne
                  </label>
                  <div className="bg-white border border-midnight/10 rounded-ios p-4">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => setGrammAnzahl(Math.max(2, grammAnzahl - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-midnight/5 hover:bg-midnight/10 rounded-full transition-colors"
                      >
                        <Minus className="w-5 h-5 text-midnight" />
                      </button>
                      <span className="text-4xl font-bold text-midnight font-serif">{grammAnzahl}g</span>
                      <button
                        type="button"
                        onClick={() => setGrammAnzahl(Math.min(20, grammAnzahl + 1))}
                        className="w-10 h-10 flex items-center justify-center bg-midnight/5 hover:bg-midnight/10 rounded-full transition-colors"
                      >
                        <Plus className="w-5 h-5 text-midnight" />
                      </button>
                    </div>
                    <input
                      type="range" min="2" max="20" step="1"
                      value={grammAnzahl}
                      onChange={(e) => setGrammAnzahl(parseInt(e.target.value))}
                      className="w-full accent-gold"
                    />
                    <div className="flex justify-between text-xs text-midnight/40 mt-2 font-sans">
                      <span>2g (kleine Kanne)</span>
                      <span>20g (große Kanne)</span>
                    </div>
                  </div>
                </div>

                {/* Füllstand */}
                <div>
                  <label className="block text-sm font-medium text-midnight/60 mb-2 font-sans">
                    Füllstand
                  </label>
                  <div className="bg-white border border-midnight/10 rounded-ios p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl font-bold text-midnight font-serif">{fuellstand}%</span>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        fuellstand > 70 ? 'bg-green-500' :
                        fuellstand > 30 ? 'bg-orange-400' :
                        'bg-red-500'
                      }`}>
                        <span className="text-xl font-bold text-white font-sans">{fuellstand}</span>
                      </div>
                    </div>
                    <input
                      type="range" min="0" max="100" step="5"
                      value={fuellstand}
                      onChange={(e) => setFuellstand(parseInt(e.target.value))}
                      className="w-full accent-gold"
                    />
                    <div className="flex justify-between text-xs text-midnight/40 mt-2 font-sans">
                      <span>Leer</span>
                      <span>Halb</span>
                      <span>Voll</span>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-midnight text-white font-semibold text-lg py-4 rounded-ios-lg shadow-sm transition-all hover:bg-midnight/90 font-sans"
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
