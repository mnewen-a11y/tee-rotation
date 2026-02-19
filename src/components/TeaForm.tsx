import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { Tea, TeaType, TimeOfDay, TEA_TYPE_DEFAULTS, TEA_TYPE_LABELS, TEA_TYPE_DEFAULT_TIMES, TIME_OF_DAY_LABELS } from '@/types/tea';
import { useHaptic } from '@/hooks/useHaptic';
import { StarRating, ratingLabel } from '@/components/StarRating';
import { SunriseIcon } from '../../Icons/SunriseIcon';
import { SunIcon } from '../../Icons/SunIcon';
import { SunHazeIcon } from '../../Icons/SunHazeIcon';
import { MoonIcon } from '../../Icons/MoonIcon';

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
  const [rating, setRating] = useState<number>(0);
  const [bestTimeOfDay, setBestTimeOfDay] = useState<TimeOfDay[]>([]);

  // Sheet drag state
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sheetY = useMotionValue(0);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    sheetY.set(0);
  }, [isOpen]);

  useEffect(() => {
    if (editTea) {
      setName(editTea.name);
      setHersteller(editTea.hersteller || '');
      setTeeArt(editTea.teeArt);
      setBruehgrad(editTea.bruehgrad);
      setGrammAnzahl(editTea.grammAnzahl);
      setFuellstand(editTea.fuellstand);
      setRating(editTea.rating || 0);
      setBestTimeOfDay(editTea.bestTimeOfDay || TEA_TYPE_DEFAULT_TIMES[editTea.teeArt]);
    } else {
      setName('');
      setHersteller('');
      setTeeArt('schwarz');
      const d = TEA_TYPE_DEFAULTS['schwarz'];
      setBruehgrad(d.temp);
      setGrammAnzahl(d.gramm);
      setFuellstand(100);
      setRating(0);
      setBestTimeOfDay(TEA_TYPE_DEFAULT_TIMES['schwarz']); // Smart Default
    }
  }, [editTea, isOpen]);

  // Native touch handling — funktioniert überall auf dem Sheet
  useEffect(() => {
    const sheet = sheetRef.current;
    const scroll = scrollRef.current;
    if (!sheet || !scroll) return;

    const onTouchStart = (e: TouchEvent) => {
      dragStartY.current = e.touches[0].clientY;
      isDragging.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const deltaY = e.touches[0].clientY - dragStartY.current;
      const scrollTop = scroll.scrollTop;

      // Nur nach unten ziehen erlaubt, und nur wenn Scroll ganz oben
      if (deltaY > 0 && scrollTop <= 0) {
        isDragging.current = true;
        e.preventDefault(); // verhindert Scroll
        sheetY.set(deltaY);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const deltaY = e.changedTouches[0].clientY - dragStartY.current;

      if (deltaY > 100) {
        haptic('light');
        animate(sheetY, window.innerHeight, {
          type: 'spring', stiffness: 300, damping: 30,
          onComplete: onClose,
        });
      } else {
        animate(sheetY, 0, { type: 'spring', stiffness: 400, damping: 30 });
      }
      isDragging.current = false;
    };

    sheet.addEventListener('touchstart', onTouchStart, { passive: true });
    sheet.addEventListener('touchmove', onTouchMove, { passive: false });
    sheet.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      sheet.removeEventListener('touchstart', onTouchStart);
      sheet.removeEventListener('touchmove', onTouchMove);
      sheet.removeEventListener('touchend', onTouchEnd);
    };
  }, [isOpen]);

  const handleTeaTypeChange = (type: TeaType) => {
    haptic('light');
    setTeeArt(type);
    const d = TEA_TYPE_DEFAULTS[type];
    setBruehgrad(d.temp);
    setGrammAnzahl(d.gramm);
    // Update Smart Default für Tageszeiten wenn Typ geändert wird
    if (!editTea) { // Nur bei neuem Tee, nicht beim Editieren
      setBestTimeOfDay(TEA_TYPE_DEFAULT_TIMES[type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    haptic('success');
    onSave({
      name: name.trim(),
      hersteller: hersteller.trim() || undefined,
      teeArt, bruehgrad, grammAnzahl, fuellstand,
      rating: rating > 0 ? rating : undefined,
      zuletztGetrunken: editTea?.zuletztGetrunken, // Bewahre Status (verwendet/verfügbar)
      bestTimeOfDay: bestTimeOfDay.length > 0 ? bestTimeOfDay : undefined, // Speichere Tageszeiten
    });
    onClose();
  };

  const toggleTimeOfDay = (time: TimeOfDay) => {
    setBestTimeOfDay(prev => 
      prev.includes(time)
        ? prev.filter(t => t !== time) // Remove
        : [...prev, time] // Add
    );
    haptic('light');
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
            ref={sheetRef}
            style={{ y: sheetY, backgroundColor: '#FFFFF0' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-ios-xl shadow-ios-lg max-h-[92vh] flex flex-col"
          >
            {/* Drag Handle — visuell */}
            <div className="flex justify-center items-center py-4 flex-shrink-0 select-none">
              <div className="w-12 h-1.5 bg-midnight/25 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-midnight flex-shrink-0">
              <h2 className="text-xl font-bold font-sans text-white">
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
                      <span className="text-lg font-bold text-midnight font-sans">{bruehgrad}°C</span>
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
                      <span className="text-lg font-bold text-midnight font-sans">{grammAnzahl}g</span>
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
                      <span className="text-lg font-bold text-midnight font-sans">{fuellstand}%</span>
                    </div>
                    <input type="range" min={0} max={100} step={10} value={fuellstand}
                      onChange={e => setFuellstand(Number(e.target.value))}
                      className="w-full accent-gold" />
                  </div>

                  {/* Bewertung — nur im Edit-Modus */}
                  {editTea && (
                    <div className="pt-2 pb-1">
                      <label className="block text-xs font-semibold text-midnight/50 uppercase tracking-wide mb-3 font-sans">
                        Bewertung
                      </label>
                      <div className="flex flex-col items-center gap-2 bg-white rounded-ios-lg p-4 border border-midnight/10">
                        <StarRating value={rating} onChange={setRating} size="lg" />
                        <p className="text-sm text-midnight/45 font-sans min-h-[20px]">
                          {ratingLabel(rating)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Beste Tageszeiten */}
                  <div className="pt-2 pb-1">
                    <label className="block text-xs font-semibold text-midnight/50 uppercase tracking-wide mb-3 font-sans">
                      Beste Tageszeiten
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['morning', 'midday', 'afternoon', 'evening'] as TimeOfDay[]).map(time => {
                        const { label, icon } = TIME_OF_DAY_LABELS[time];
                        const isSelected = bestTimeOfDay.includes(time);
                        const IconComponent = 
                          icon === 'sunrise' ? SunriseIcon :
                          icon === 'sun' ? SunIcon :
                          icon === 'sunhaze' ? SunHazeIcon :
                          MoonIcon;
                        
                        return (
                          <motion.button
                            key={time}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggleTimeOfDay(time)}
                            className={`
                              flex items-center gap-3 p-4 rounded-ios-lg font-sans font-medium text-sm
                              transition-all border-2
                              ${isSelected 
                                ? 'bg-gold/10 border-gold text-midnight' 
                                : 'bg-white border-midnight/10 text-midnight/60'
                              }
                            `}
                          >
                            <div className={`
                              w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0
                              ${isSelected ? 'bg-gold border-gold' : 'bg-white border-midnight/20'}
                            `}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <IconComponent size={20} className={isSelected ? 'text-gold-text' : 'text-midnight/50'} />
                            <span>{label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-midnight/40 font-sans mt-2">
                      Mehrfachauswahl möglich
                    </p>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-midnight text-white py-4 rounded-ios-lg font-semibold text-base font-sans mt-2 shadow-ios-md"
                  >
                    {editTea ? 'Änderungen speichern' : 'Tee hinzufügen'}
                  </motion.button>

                  <div style={{ height: 'max(env(safe-area-inset-bottom, 0px), 24px)' }} />
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
