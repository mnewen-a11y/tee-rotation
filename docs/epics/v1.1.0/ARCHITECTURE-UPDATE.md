# CRITICAL ARCHITECTURE UPDATE - v1.1.0

**Date:** 2026-02-22  
**Discovery:** Supabase uses JSONB storage, not relational tables  
**Impact:** TASK-002 and TASK-003 are NO LONGER NEEDED

---

## What Changed

### Original Assumption (WRONG):
```
❌ Relational database with `teas` table
❌ Columns: id, name, dosierung_gross, dosierung_mittel, dosierung_klein
❌ Migration needed: ALTER TABLE ADD COLUMN
❌ Mapping: camelCase ↔ snake_case
```

### Actual Implementation (CORRECT):
```
✅ JSONB-based storage
✅ Table: royal_tea_sync (single row, id='shared')
✅ All teas stored as JSONB array: teas: Tea[]
✅ NO migration needed - new fields auto-saved
✅ NO column mapping needed
```

---

## Database Structure (ACTUAL)

```sql
CREATE TABLE royal_tea_sync (
  id TEXT PRIMARY KEY,              -- Always 'shared'
  teas JSONB NOT NULL DEFAULT '[]', -- Complete Tea[] array!
  queue JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ
);
```

**Example row:**
```json
{
  "id": "shared",
  "teas": [
    {
      "id": "1",
      "name": "Sencha",
      "teeArt": "grün",
      "grammAnzahl": 8,
      "dosierungGross": 8,    // ← New field, auto-saved!
      "dosierungMittel": 5,   // ← New field, auto-saved!
      "dosierungKlein": 2.5,  // ← New field, auto-saved!
      ...
    }
  ],
  "queue": [],
  "updated_at": "2026-02-22T..."
}
```

---

## Impact on Tasks

| Task | Original Status | New Status | Reason |
|------|----------------|------------|--------|
| TASK-001 | Must Do | ✅ DONE | tea.ts updated with new fields |
| TASK-002 | Must Do | ❌ CANCELLED | No migration needed (JSONB) |
| TASK-003 | Must Do | ❌ CANCELLED | supabase.ts already works |
| TASK-004 | Must Do | 🔨 NEXT | Test new fields save/load |

---

## Why No Migration Needed

**supabase.ts already handles this:**
```typescript
export const saveToSupabase = async (teas: Tea[]): Promise<boolean> => {
  const { error } = await supabase
    .from('royal_tea_sync')
    .upsert({
      id: 'shared',
      teas,  // ← Complete Tea[] serialized as JSONB
      queue,
      updated_at: new Date().toISOString(),
    });
  return !error;
};
```

**When we save:**
1. Tea objects have new fields (dosierungGross, etc.)
2. `saveToSupabase(teas)` serializes entire array to JSON
3. Supabase stores it in JSONB column
4. Done! No schema changes needed.

**When we load:**
1. `loadFromSupabase()` reads JSONB
2. Deserializes to Tea[]
3. TypeScript types ensure type safety
4. New fields present (or undefined if old data)

---

## Updated Task List

```
Phase 1: Data Layer (REVISED)
✅ TASK-001: Update TypeScript Interfaces → DONE
❌ TASK-002: Database Migration → CANCELLED (not applicable)
❌ TASK-003: Update Supabase Functions → CANCELLED (already works)
🔨 TASK-004: Test Data Layer → NEXT

Phase 2: Card Flip UI (unchanged)
⏳ TASK-005: Create CardFlipper Component
⏳ TASK-006: Create PotSelectionCard
⏳ TASK-007: Integrate Flip into App.tsx
...
```

---

## Documentation Updates Needed

**Files to update:**
1. ✅ ARCHITECTURE-UPDATE.md (this file)
2. 🔨 DEV-SPEC.md - Remove migration section, add JSONB explanation
3. 🔨 TASK-LIST.md - Mark TASK-002/003 as CANCELLED
4. 🔨 EPIC-v1.1.0.md - Update phase 1 estimate (now 30min instead of 3h)
5. 🔨 FIX-SUMMARY.md - Document this architectural discovery

---

## Testing Strategy (TASK-004)

Since no migration, focus on:
1. **Test new fields save correctly** (JSONB serialization)
2. **Test new fields load correctly** (JSONB deserialization)
3. **Test old teas still work** (backward compatibility)
4. **Test preset fallbacks** (when fields are undefined)

---

**Approved by:** Development Team  
**Status:** ✅ Architecture Confirmed  
**Next Action:** Update all documentation files
