export type TeaType = 'schwarz' | 'grün' | 'oolong' | 'chai';

export type SelectionMode = 'grid';

export interface Tea {
  id: string;
  name: string;
  hersteller?: string;
  teeArt: TeaType;
  bruehgrad: number;
  grammAnzahl: number; // Gramm pro Kanne (2-20g)
  fuellstand: number; // 0-100 Prozent
  zuletztGetrunken?: string; // ISO date string
  isSelected?: boolean; // Für visuelles Highlighting nach Auswahl
}

export interface AppSettings {
  selectionMode: SelectionMode;
  darkMode: boolean;
}

export const TEA_TYPE_DEFAULTS: Record<TeaType, { temp: number; gramm: number }> = {
  schwarz: { temp: 100, gramm: 8 },  // Schwarztee: 8g (große Kanne 950ml)
  grün: { temp: 80, gramm: 3 },      // Grüntee: 3g (kleine Kanne 350ml)
  oolong: { temp: 90, gramm: 8 },    // Oolong: 8g (große Kanne)
  chai: { temp: 90, gramm: 8 },      // Chai: 8g (große Kanne)
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
