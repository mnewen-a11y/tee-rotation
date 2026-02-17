import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, PanInfo } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { Tea, TeaType, TEA_TYPE_DEFAULTS, TEA_TYPE_LABELS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';

interface TeaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tea: Omit<Tea, 'id'>) => void;
  editTea?: Tea;
}

export const TeaForm = ({ isOpen, onClose, onSave, editTea }: TeaFormProps) => {
  const { trigger: haptic } = useHaptic();
  const [name, setName] = useState('');
  const [hersteller, setHersteller] = useState('');
  const [teeArt, setTeeArt] = useState<TeaType>('schwarz');
  const [bruehgrad, setBruehgrad] = useState(100);
  const [grammAnzahl, setGrammAnzahl] = useState(8);
  const [fuellstand, setFuellstand] = useState(100);

  const sheetY = useMotionValue(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      animate(sheetY, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  }, [isOpen]);

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
      const d = TEA_TYPE_DEFAULTS['schwarz'];
      setBruehgrad(d.temp);
      setGrammAnzahl(d.gramm);
      setFuellstand(100);
    }
  }, [editTea, isOpen]);

  const handleTeaTypeChange = (type: TeaType) => {
    haptic('light');
    setTeeArt(type);
    const d = TEA_TYPE_DEFAULTS[type];
    setBruehgrad(d.temp);
    setGrammAnzahl(d.gramm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    haptic('success');
    onSave({
      name: name.trim(),
      hersteller: hersteller.trim() || undefined,
      teeArt, bruehgrad, grammAnzahl, fuellstand,
    });
    onClose();
  };

  // Drag-to-Dismiss
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      haptic('light');
      onClose();
    } else {
      animate(sheetY, 0, { type: 'spring', stiffness: 400, damping: 30 });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            style={{ y: sheetY, backgroundColor: '#FFFFF0' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.02, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-ios-xl shadow-ios-lg max-h-[92vh] overflow-hidden flex flex-col"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 bg-midnight/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-midnight flex-shrink-0">
              <h2 className="text-xl font-bold font-serif text-white">
                {editTea ? 'Tee bearbeiten' : 'Neuer Tee'}
              </h2>
              <button onClick={() => { haptic('light'); onClose(); }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Schließen">
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div ref={scrollRef} className="overflow-y-auto flex-1">
              <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-5">

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-midnight/50 uppercase tracking-wide mb-2 font-sans">
                      Tee Name *
                    </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                      placeholder="z.B. Darjeeling FTGFOP1" required
                      className="w-full px-4 py-3 bg-white border border-midnight/15 rounded-ios focus:ring-2 focus:ring-gold focus:border-transparent outline-none text-midnight placeholder-midnight/30 font-sans text-base"
                    />
                  </div>

                  {/* Hersteller */}
                  <div>
                    <label className="block text-xs font-semibold text-midnight/50 uppercase tracking-wide mb-2 font-sans">
                      Hersteller (optional)
                    </label>
                    <input type="text" value={hersteller} onChange={e => setHersteller(e.target.value)}
                      placeholder="z.B. Mariage Frères"
                      className="w-full px-4 py-3 bg-white border border-midnight/15 rounded-ios focus:ring-2 focus:ring-gold focus:border-transparent outline-none text-midnight placeholder-midnight/30 font-sans text-base"
                    />
                  </div>

                  {/* Tee-Art */}
                  <div>
                    <label className="block text-xs font-semibold text-midnight/50 uppercase tracking-wide mb-2 font-sans">
                      Tee-Art
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(TEA_TYPE_LABELS) as TeaType[]).map(type => (
                        <motion.button
                          key={type} type="button"
                          whileTap={{ scale: 0.94 }}
                          onClick={() => handleTeaTypeChange(type)}
                          className={`py-2.5 px-3 rounded-ios text-sm font-medium font-sans transition-all ${
                            teeArt === type
                              ? 'bg-midnight text-white shadow-ios-md'
                              : 'bg-white border border-midnight/15 text-midnight/70'
                          }`}
                        >
                          {TEA_TYPE_LABELS[type]}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Brühtemperatur */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-midnight/50 uppercase tracking-wide font-sans">
                        Brühtemperatur
                      </label>
                      <span className="text-lg font-bold text-midnight font-serif">{bruehgrad}°C</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button type="button" whileTap={{ scale: 0.88 }}
                        onClick={() => { haptic('light'); setBruehgrad(v => Math.max(60, v - 5)); }}
                        className="w-10 h-10 bg-midnight/8 rounded-full flex items-center justify-center flex-shrink-0">
                        <Minus className="w-4 h-4 text-midnight" />
                      </motion.button>
                      <input type="range" min={60} max={100} step={5} value={bruehgrad}
                        onChange={e => setBruehgrad(Number(e.target.value))}
                        className="flex-1 accent-gold" />
                      <motion.button type="button" whileTap={{ scale: 0.88 }}
                        onClick={() => { haptic('light'); setBruehgrad(v => Math.min(100, v + 5)); }}
                        className="w-10 h-10 bg-midnight/8 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plus className="w-4 h-4 text-midnight" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Gramm */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-midnight/50 uppercase tracking-wide font-sans">
                        Gramm pro Kanne
                      </label>
                      <span className="text-lg font-bold text-midnight font-serif">{grammAnzahl}g</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button type="button" whileTap={{ scale: 0.88 }}
                        onClick={() => { haptic('light'); setGrammAnzahl(v => Math.max(1, v - 1)); }}
                        className="w-10 h-10 bg-midnight/8 rounded-full flex items-center justify-center flex-shrink-0">
                        <Minus className="w-4 h-4 text-midnight" />
                      </motion.button>
                      <input type="range" min={1} max={20} step={1} value={grammAnzahl}
                        onChange={e => setGrammAnzahl(Number(e.target.value))}
                        className="flex-1 accent-gold" />
                      <motion.button type="button" whileTap={{ scale: 0.88 }}
                        onClick={() => { haptic('light'); setGrammAnzahl(v => Math.min(20, v + 1)); }}
                        className="w-10 h-10 bg-midnight/8 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plus className="w-4 h-4 text-midnight" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Füllstand */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-midnight/50 uppercase tracking-wide font-sans">
                        Füllstand
                      </label>
                      <span className="text-lg font-bold text-midnight font-serif">{fuellstand}%</span>
                    </div>
                    <input type="range" min={0} max={100} step={10} value={fuellstand}
                      onChange={e => setFuellstand(Number(e.target.value))}
                      className="w-full accent-gold" />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-midnight text-white py-4 rounded-ios-lg font-semibold text-base font-sans mt-2 shadow-ios-md"
                  >
                    {editTea ? 'Änderungen speichern' : 'Tee hinzufügen'}
                  </motion.button>

                  {/* Safe area padding */}
                  <div style={{ height: 'max(env(safe-area-inset-bottom, 0px), 16px)' }} />
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
