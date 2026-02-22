// ============================================================
// Royal-Tea – Type Definitions
// Epic v1.1.0 – Dynamische Kannenauswahl
// TASK-001: TypeScript Interfaces
// ============================================================

// ------------------------------------------------------------
// Tea Types
// ------------------------------------------------------------

export type TeaType =
  | 'Grüntee'
  | 'Schwarztee'
  | 'Oolong'
  | 'Weißtee'
  | 'Kräutertee'
  | 'Früchtetee';

// ------------------------------------------------------------
// Pot Size Enum
// ------------------------------------------------------------

export enum PotSize {
  KLEIN  = 'klein',
  MITTEL = 'mittel',
  GROSS  = 'gross',
}

// ------------------------------------------------------------
// Tea Interface
// ------------------------------------------------------------

export interface Tea {
  // Existing fields
  id: string;
  name: string;
  brand: string;
  type: TeaType;
  temp: number;
  fuellstand: number;
  zuletztGetrunken?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Pot-specific dosages (NEW in v1.1.0)
  // dosierungGross replaces the previous 'dosierung' field
  dosierungGross: number;    // g – required (default 8g)
  dosierungMittel?: number;  // g – optional, falls back to DOSAGE_PRESETS
  dosierungKlein?: number;   // g – optional, falls back to DOSAGE_PRESETS
}

// ------------------------------------------------------------
// Dosage Presets
// Source: UI-SPEC.md – Dosage Table
//
// | Tea Type    | Klein (400ml) | Mittel (700ml) | Groß (1L) |
// |-------------|---------------|----------------|-----------|
// | Grüntee     | 2.5g          | 5g             | 8g        |
// | Schwarztee  | 3g            | 5g             | 8g        |
// | Oolong      | 2.5g          | 5g             | 8g        |
// | Weißtee     | 2.5g          | 5g             | 8g        |
// | Kräutertee  | 3g            | 5.5g           | 9g        |
// | Früchtetee  | 3g            | 5.5g           | 9g        |
// ------------------------------------------------------------

export const DOSAGE_PRESETS: Record<TeaType, Record<PotSize, number>> = {
  'Grüntee':    { [PotSize.KLEIN]: 2.5, [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  'Schwarztee': { [PotSize.KLEIN]: 3,   [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  'Oolong':     { [PotSize.KLEIN]: 2.5, [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  'Weißtee':    { [PotSize.KLEIN]: 2.5, [PotSize.MITTEL]: 5,   [PotSize.GROSS]: 8 },
  'Kräutertee': { [PotSize.KLEIN]: 3,   [PotSize.MITTEL]: 5.5, [PotSize.GROSS]: 9 },
  'Früchtetee': { [PotSize.KLEIN]: 3,   [PotSize.MITTEL]: 5.5, [PotSize.GROSS]: 9 },
};

// ------------------------------------------------------------
// Pot Config
// Helper type für UI-Rendering und Berechnungen
// ------------------------------------------------------------

export interface PotConfig {
  size: PotSize;
  volume: number;  // ml
  dosage: number;  // g
}

// ------------------------------------------------------------
// Pot Volume Lookup
// Kanonische Volumen pro Größe (aus UI-SPEC.md)
// ------------------------------------------------------------

export const POT_VOLUMES: Record<PotSize, number> = {
  [PotSize.KLEIN]:  400,
  [PotSize.MITTEL]: 700,
  [PotSize.GROSS]:  1000,
};
