// Fonts: Cormorant Garamond & Playfair Display — SIL OFL 1.1 (see ABOUT.md)

export type TeaType = 'schwarz' | 'grün' | 'oolong' | 'chai' | 'jasmin' | 'kräuter';
export type SelectionMode = 'grid';
export type TimeOfDay = 'morning' | 'midday' | 'afternoon' | 'evening';

export interface Tea {
  id: string;
  name: string;
  hersteller?: string;
  teeArt: TeaType;
  bruehgrad: number;
  grammAnzahl: number;
  fuellstand: number;
  zuletztGetrunken?: string;
  isSelected?: boolean;
  rating?: number; // 1–5, optional
  bestTimeOfDay?: TimeOfDay[]; // Beste Tageszeiten für diesen Tee
}

export interface AppSettings {
  selectionMode: SelectionMode;
}

export const TEA_TYPE_DEFAULTS: Record<TeaType, { temp: number; gramm: number }> = {
  schwarz:  { temp: 100, gramm: 8 },
  grün:     { temp: 80,  gramm: 3 },
  oolong:   { temp: 90,  gramm: 8 },
  chai:     { temp: 90,  gramm: 8 },
  jasmin:   { temp: 80,  gramm: 4 },
  kräuter:  { temp: 100, gramm: 5 },
};

export const TEA_TYPE_COLORS: Record<TeaType, string> = {
  schwarz:  '#8B4513',
  grün:     '#4CAF50',
  oolong:   '#DAA520',
  chai:     '#A0522D',
  jasmin:   '#C77DFF',
  kräuter:  '#2E8B57',
};

export const TEA_TYPE_LABELS: Record<TeaType, string> = {
  schwarz:  'Schwarztee',
  grün:     'Grüntee',
  oolong:   'Oolong',
  chai:     'Chai',
  jasmin:   'Jasmin',
  kräuter:  'Kräuter',
};

// Smart Defaults für beste Tageszeiten basierend auf Tee-Typ
export const TEA_TYPE_DEFAULT_TIMES: Record<TeaType, TimeOfDay[]> = {
  schwarz:  ['morning', 'midday'],     // Koffein: Morgen & Mittag
  grün:     ['midday', 'afternoon'],   // Leichtes Koffein: Mittag & Nachmittag
  oolong:   ['midday', 'afternoon'],   // Mittleres Koffein
  chai:     ['morning', 'midday'],     // Stark: Morgen & Mittag
  jasmin:   ['afternoon', 'evening'],  // Leicht/Koffeinfrei: Nachmittag & Abend
  kräuter:  ['evening'],               // Koffeinfrei: Abend
};

// Labels für Tageszeiten
export const TIME_OF_DAY_LABELS: Record<TimeOfDay, { label: string; emoji: string }> = {
  morning:   { label: 'Morgen',      emoji: '☀️' },
  midday:    { label: 'Mittag',      emoji: '🌤️' },
  afternoon: { label: 'Nachmittag',  emoji: '☕' },
  evening:   { label: 'Abend',       emoji: '🌙' },
};
