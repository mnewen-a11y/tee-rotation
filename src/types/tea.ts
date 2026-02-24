// Fonts: Cormorant Garamond & Playfair Display — SIL OFL 1.1 (see ABOUT.md)

// ============================================================
// BESTEHENDE TYPES (v1.0.8) — NICHT VERÄNDERN
// ============================================================

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
  rating?: number;
  bestTimeOfDay?: TimeOfDay[];

  // NEW v1.1.0 – Pot-specific dosages
  dosierungGross?: number;
  dosierungMittel?: number;
  dosierungKlein?: number;
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

export const TEA_TYPE_DEFAULT_TIMES: Record<TeaType, TimeOfDay[]> = {
  schwarz:  ['morning', 'midday'],
  grün:     ['midday', 'afternoon'],
  oolong:   ['midday', 'afternoon'],
  chai:     ['morning', 'midday'],
  jasmin:   ['afternoon', 'evening'],
  kräuter:  ['evening'],
};

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, { label: string; emoji: string; icon: string }> = {
  morning:   { label: 'Morgen',     emoji: '☀️', icon: 'sunrise' },
  midday:    { label: 'Mittag',     emoji: '🌤️', icon: 'sun' },
  afternoon: { label: 'Nachmittag', emoji: '☕', icon: 'sunhaze' },
  evening:   { label: 'Abend',      emoji: '🌙', icon: 'moon' },
};

// ============================================================
// NEU v1.1.0 – Pot Selection Types
// ============================================================

export enum PotSize {
  KLEIN  = 'klein',
  MITTEL = 'mittel',
  GROSS  = 'gross',
}

export const DOSAGE_PRESETS: Record<TeaType, Record<PotSize, number>> = {
  schwarz:  { [PotSize.KLEIN]: 3,   [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  grün:     { [PotSize.KLEIN]: 2.5, [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  oolong:   { [PotSize.KLEIN]: 2.5, [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  chai:     { [PotSize.KLEIN]: 3,   [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  jasmin:   { [PotSize.KLEIN]: 2.5, [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  kräuter:  { [PotSize.KLEIN]: 3,   [PotSize.MITTEL]: 5.5, [PotSize.GROSS]: 9 },
};

export const POT_VOLUMES: Record<PotSize, number> = {
  [PotSize.KLEIN]:  400,
  [PotSize.MITTEL]: 700,
  [PotSize.GROSS]:  1000,
};

export interface PotConfig {
  size: PotSize;
  volume: number;  // ml
  dosage: number;  // g
}
