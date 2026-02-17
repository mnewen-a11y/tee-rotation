export type TeaType = 'schwarz' | 'grün' | 'oolong' | 'chai';

export type SelectionMode = 'grid' | 'swipe';

export interface Tea {
  id: string;
  name: string;
  hersteller?: string;
  teeArt: TeaType;
  bruehgrad: number;
  grammAnzahl: number; // Gramm-Menge
  fuellstand: number; // 0-100 Prozent
  zuletztGetrunken?: string; // ISO date string
}

export interface AppSettings {
  selectionMode: SelectionMode;
  darkMode: boolean;
}

export const TEA_TYPE_DEFAULTS: Record<TeaType, number> = {
  schwarz: 100,
  grün: 80,
  oolong: 90,
  chai: 90,
};

export const TEA_TYPE_COLORS: Record<TeaType, string> = {
  schwarz: '#8B4513',
  grün: '#4CAF50',
  oolong: '#DAA520',
  chai: '#A0522D',
};

export const TEA_TYPE_LABELS: Record<TeaType, string> = {
  schwarz: 'Schwarztee',
  grün: 'Grüntee',
  oolong: 'Oolong',
  chai: 'Chai',
};
