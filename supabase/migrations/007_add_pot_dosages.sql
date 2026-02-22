-- ============================================================
-- Migration: 007_add_pot_dosages
-- Epic v1.1.0 – Dynamische Kannenauswahl
-- TASK-002: Database Migration
-- ============================================================
-- Adds dosierung_klein + dosierung_mittel columns to teas table.
-- dosierung_gross maps to existing gramm_anzahl (no rename).
-- Backfill uses tee_art values: 'schwarz', 'grün', 'oolong',
-- 'chai', 'jasmin', 'kräuter'
-- ============================================================

-- ------------------------------------------------------------
-- UP
-- ------------------------------------------------------------

ALTER TABLE teas
  ADD COLUMN IF NOT EXISTS dosierung_klein  DECIMAL(4,1),
  ADD COLUMN IF NOT EXISTS dosierung_mittel DECIMAL(4,1);

-- Backfill: Presets basierend auf tee_art
-- Quelle: DOSAGE_PRESETS in src/types/tea.ts
UPDATE teas SET
  dosierung_klein  = CASE tee_art
    WHEN 'schwarz' THEN 3.0
    WHEN 'grün'    THEN 2.5
    WHEN 'oolong'  THEN 2.5
    WHEN 'chai'    THEN 3.0
    WHEN 'jasmin'  THEN 2.5
    WHEN 'kräuter' THEN 3.0
    ELSE 3.0  -- safe fallback
  END,
  dosierung_mittel = CASE tee_art
    WHEN 'schwarz' THEN 5.0
    WHEN 'grün'    THEN 5.0
    WHEN 'oolong'  THEN 5.0
    WHEN 'chai'    THEN 5.0
    WHEN 'jasmin'  THEN 5.0
    WHEN 'kräuter' THEN 5.5
    ELSE 5.0  -- safe fallback
  END
WHERE dosierung_klein IS NULL
   OR dosierung_mittel IS NULL;

-- ============================================================
-- ROLLBACK
-- ============================================================
-- Zum Rückgängigmachen:
--
-- ALTER TABLE teas
--   DROP COLUMN IF EXISTS dosierung_klein,
--   DROP COLUMN IF EXISTS dosierung_mittel;
-- ============================================================
