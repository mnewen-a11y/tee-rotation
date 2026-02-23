// ============================================================
// Royal-Tea – Pot Dosage Helper
// Epic v1.1.0 – Dynamische Kannenauswahl
// TASK-004: Test Data Layer
// ============================================================

import { type Tea, PotSize, DOSAGE_PRESETS } from '@/types/tea';

/**
 * Gibt die Dosierung (g) für einen Tee und eine Kannengröße zurück.
 * Nutzt tea-spezifischen Wert falls gesetzt, sonst DOSAGE_PRESETS als Fallback.
 */
export function getDosageForPot(tea: Tea, pot: PotSize): number {
  const presets = DOSAGE_PRESETS[tea.teeArt];

  switch (pot) {
    case PotSize.KLEIN:
      return tea.dosierungKlein  ?? presets[PotSize.KLEIN];
    case PotSize.MITTEL:
      return tea.dosierungMittel ?? presets[PotSize.MITTEL];
    case PotSize.GROSS:
      return tea.dosierungGross  ?? presets[PotSize.GROSS];
  }
}
