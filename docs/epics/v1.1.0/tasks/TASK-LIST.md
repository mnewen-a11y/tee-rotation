# Task List: v1.1.0 Dynamic Pot Selection

**Epic:** ROYAL-TEA-EPIC-001  
**Version:** v1.1.0  
**Last Updated:** 2026-02-22  
**Status:** Ready for Execution

---

## Task Execution Order

Tasks are organized by phase and must be completed in order within each phase.  
**Total Estimate:** 14-19 hours

---

## Phase 1: Data Layer (EST: 2-3h)

### TASK-001: Update TypeScript Interfaces
**Priority:** P0 (Must Have)  
**Estimate:** 30min  
**Dependencies:** None

**Description:**
Update Tea interface to include pot-specific dosages.

**Subtasks:**
- [ ] Add `dosierungGross: number` (rename from `dosierung`)
- [ ] Add `dosierungMittel?: number` (optional)
- [ ] Add `dosierungKlein?: number` (optional)
- [ ] Create `PotSize` enum (klein/mittel/gross)
- [ ] Create `DOSAGE_PRESETS` constant with defaults per tea type
- [ ] Update all type imports throughout codebase

**Files Changed:**
- `src/types/Tea.ts` (or wherever Tea is defined)
- `src/constants/presets.ts` (new file)

**Acceptance:**
- ✅ No TypeScript errors
- ✅ All existing code still compiles

---

### TASK-002: Create Database Migration
**Priority:** P0 (Must Have)  
**Estimate:** 45min  
**Dependencies:** TASK-001

**Description:**
Create Supabase migration file and document manual execution workflow.

**IMPORTANT:** No Supabase CLI installed - migrations are executed MANUALLY in Dashboard!

**Subtasks:**
- [ ] Create directory: `mkdir -p supabase/migrations`
- [ ] Create migration file `supabase/migrations/007_add_pot_dosages.sql`
- [ ] Add `dosierung_klein` column (DECIMAL(4,1))
- [ ] Add `dosierung_mittel` column (DECIMAL(4,1))
- [ ] Rename `dosierung` → `dosierung_gross` (or keep as `gramm_anzahl` - see Reality vs Specs)
- [ ] Write backfill query for existing teas
- [ ] Write rollback script as comment
- [ ] Commit to Git with clear message: "Manual execution required in Dashboard"
- [ ] Document execution workflow in commit message

**Files Changed:**
- `supabase/migrations/007_add_pot_dosages.sql` (new - directory must be created first!)

**Execution Workflow (AFTER commit):**
```bash
# 1. File is committed
git add supabase/migrations/007_add_pot_dosages.sql
git commit -m "feat: Add pot dosage migration (TASK-002)

Migration must be executed MANUALLY:
1. Open Supabase Dashboard
2. SQL Editor
3. Copy/paste SQL content
4. Execute"

# 2. THEN execute manually:
# - Open Supabase Dashboard
# - Go to SQL Editor  
# - Copy SQL from file
# - Execute
# - Verify results
```

**Acceptance:**
- ✅ Directory `supabase/migrations/` exists
- ✅ Migration file created with correct SQL
- ✅ Backfill based on tea type
- ✅ Rollback script included
- ✅ Committed with workflow documentation
- ✅ Manual execution workflow clear

---

### TASK-003: Update Database Query Functions
**Priority:** P0 (Must Have)  
**Estimate:** 45min  
**Dependencies:** TASK-002

**Description:**
Update Supabase query functions to handle new columns.

**Subtasks:**
- [ ] Update `getTeas()` to map new columns
- [ ] Update `updateTea()` to handle new fields
- [ ] Add helper function `getDosageForPot(tea, pot)`
- [ ] Test queries return correct data

**Files Changed:**
- `src/lib/supabase.ts` (or database utils)

**Acceptance:**
- ✅ Queries return all dosage fields
- ✅ Updates persist correctly
- ✅ Helper functions work as expected

---

### TASK-004: Test Data Layer
**Priority:** P0 (Must Have)  
**Estimate:** 30min  
**Dependencies:** TASK-003

**Description:**
End-to-end testing of data layer changes.

**Subtasks:**
- [ ] Create test tea with all dosages
- [ ] Update dosages via `updateTea()`
- [ ] Verify data persists in Supabase
- [ ] Test preset fallback logic
- [ ] Verify existing teas unaffected

**Acceptance:**
- ✅ All CRUD operations work
- ✅ Presets apply correctly
- ✅ No data loss

---

## Phase 2: Card Flip UI (EST: 3-4h)

### TASK-005: Create CardFlipper Component
**Priority:** P0 (Must Have)  
**Estimate:** 1h  
**Dependencies:** TASK-001

**Description:**
Build reusable card flip container component.

**Subtasks:**
- [ ] Create `CardFlipper.tsx`
- [ ] Implement 3D transform CSS
- [ ] Add `isFlipped` prop
- [ ] Set up front/back card slots
- [ ] Test backface culling works
- [ ] Add `prefers-reduced-motion` support

**Files Changed:**
- `src/components/CardFlipper.tsx` (new)
- `src/styles/card-flip.css` (new)

**Acceptance:**
- ✅ Flip animation smooth at 60 FPS
- ✅ Card size constant (520px)
- ✅ Works in Safari + PWA
- ✅ Reduced motion fallback works

---

### TASK-006: Create PotSelectionCard Component
**Priority:** P0 (Must Have)  
**Estimate:** 1.5h  
**Dependencies:** TASK-005

**Description:**
Build pot selection screen (back of card).

**Subtasks:**
- [ ] Create `PotSelectionCard.tsx`
- [ ] Implement header (tea name + subtitle)
- [ ] Add pot list container (3 rows)
- [ ] Add action buttons (Zurück/Bestätigen)
- [ ] Style with Liquid Glass background
- [ ] Match front card dimensions exactly

**Files Changed:**
- `src/components/PotSelectionCard.tsx` (new)

**Acceptance:**
- ✅ Layout matches UI spec
- ✅ Same card size as front
- ✅ All elements positioned correctly

---

### TASK-007: Integrate Flip into App.tsx
**Priority:** P0 (Must Have)  
**Estimate:** 1h  
**Dependencies:** TASK-006

**Description:**
Wire up card flip to app state.

**Subtasks:**
- [ ] Add `isCardFlipped` state to App.tsx
- [ ] Add `selectedTea` state
- [ ] Update SwipeTeaCard's `onSelect` to trigger flip
- [ ] Wrap tea card in CardFlipper
- [ ] Test flip triggered by [Auswählen]
- [ ] Test flip back on [← Zurück]

**Files Changed:**
- `src/App.tsx`
- `src/components/SwipeTeaCard.tsx`

**Acceptance:**
- ✅ Tap [Auswählen] flips card
- ✅ Tap [← Zurück] flips back
- ✅ No füllstand change on cancel

---

### TASK-008: Test Card Flip Flow
**Priority:** P0 (Must Have)  
**Estimate:** 30min  
**Dependencies:** TASK-007

**Description:**
Manual testing of complete flip interaction.

**Subtasks:**
- [ ] Test on Safari browser
- [ ] Test on PWA (iPhone 12 mini)
- [ ] Verify 60 FPS animation
- [ ] Test rapid taps (no glitches)
- [ ] Verify reduced motion works

**Acceptance:**
- ✅ Smooth on all devices
- ✅ No visual glitches
- ✅ State management correct

---

## Phase 3: Pot Selection (EST: 2-3h)

### TASK-009: Create PotRow Component
**Priority:** P0 (Must Have)  
**Estimate:** 1.5h  
**Dependencies:** TASK-006

**Description:**
Build individual pot row with selection logic.

**Subtasks:**
- [ ] Create `PotRow.tsx`
- [ ] Implement left side (name + volume)
- [ ] Implement right side (dosage + edit icon)
- [ ] Add selection state styling
- [ ] Add tap handlers
- [ ] Add haptic feedback
- [ ] Ensure 72px height (HIG compliant)

**Files Changed:**
- `src/components/PotRow.tsx` (new)

**Acceptance:**
- ✅ Layout matches UI spec
- ✅ Selection works correctly
- ✅ Haptics trigger properly
- ✅ Meets HIG tap targets

---

### TASK-010: Implement Auto-Selection Logic
**Priority:** P0 (Must Have)  
**Estimate:** 45min  
**Dependencies:** TASK-009

**Description:**
Pre-select Klein pot based on tea type.

**Subtasks:**
- [ ] Add `selectedPot` state (default: KLEIN)
- [ ] On card flip, set selectedPot to KLEIN
- [ ] Apply preset dosage from tea type
- [ ] Render Klein row with selected state
- [ ] Test all tea types get correct preset

**Files Changed:**
- `src/App.tsx`
- `src/components/PotSelectionCard.tsx`

**Acceptance:**
- ✅ Klein always pre-selected
- ✅ Correct dosage for tea type
- ✅ Visual state correct

---

### TASK-011: Test Pot Selection
**Priority:** P0 (Must Have)  
**Estimate:** 30min  
**Dependencies:** TASK-010

**Description:**
Manual testing of pot selection.

**Subtasks:**
- [ ] Test selecting different pots
- [ ] Verify only one selected at a time
- [ ] Test rapid selection changes
- [ ] Verify haptics work
- [ ] Test all 3 rows

**Acceptance:**
- ✅ Selection state correct
- ✅ No visual bugs
- ✅ Haptics consistent

---

## Phase 4: Inline Edit Mode (EST: 2-3h)

### TASK-012: Implement Edit Mode UI
**Priority:** P1 (Should Have)  
**Estimate:** 1.5h  
**Dependencies:** TASK-009

**Description:**
Add inline edit with +/− buttons.

**Subtasks:**
- [ ] Add `isEditing` state to PotRow
- [ ] Show edit icon only on selected row
- [ ] Implement edit mode entry (tap ✏️)
- [ ] Build edit UI: [−] value [+]
- [ ] Add adjust button handlers
- [ ] Style edit mode (blue border, white bg)
- [ ] **CRITICAL: Ensure adjust buttons = 44px tap target (38px + 3px padding)**

**Files Changed:**
- `src/components/PotRow.tsx`

**Acceptance:**
- ✅ Edit icon visible only when selected
- ✅ Edit mode UI matches spec
- ✅ Only 3 elements ([−] value [+])

---

### TASK-013: Implement Auto-Save Logic
**Priority:** P1 (Should Have)  
**Estimate:** 45min  
**Dependencies:** TASK-012

**Description:**
Auto-save dosage changes immediately.

**Subtasks:**
- [ ] Add `customDosages` state to App.tsx
- [ ] On adjust, update state immediately
- [ ] Pass `onEdit` callback to PotRow
- [ ] Update display value on each tap
- [ ] Add scale animation on change
- [ ] Test values persist when exiting edit

**Files Changed:**
- `src/App.tsx`
- `src/components/PotRow.tsx`

**Acceptance:**
- ✅ Changes save instantly
- ✅ No save button needed
- ✅ Values persist correctly

---

### TASK-014: Implement Edit Mode Exit
**Priority:** P1 (Should Have)  
**Estimate:** 30min  
**Dependencies:** TASK-013

**Description:**
Exit edit mode on outside click or [Bestätigen].

**Subtasks:**
- [ ] Add click-outside listener
- [ ] Exit edit when clicking outside row
- [ ] Exit edit when tapping [Bestätigen]
- [ ] Exit edit when selecting different pot
- [ ] Smooth transition back to normal state

**Files Changed:**
- `src/components/PotRow.tsx`

**Acceptance:**
- ✅ All exit triggers work
- ✅ Transition smooth
- ✅ State cleaned up

---

### TASK-015: Test Edit Mode
**Priority:** P1 (Should Have)  
**Estimate:** 30min  
**Dependencies:** TASK-014

**Description:**
Manual testing of edit functionality.

**Subtasks:**
- [ ] Test entering edit mode
- [ ] Test +/− buttons
- [ ] Test auto-save
- [ ] Test exiting edit
- [ ] Test edge cases (0g, 20g limits)
- [ ] Verify animations smooth

**Acceptance:**
- ✅ Edit mode fully functional
- ✅ No bugs or glitches
- ✅ Limits enforced

---

## Phase 5: Confirmation & Success (EST: 2-3h)

### TASK-016: Implement Confirmation Logic
**Priority:** P0 (Must Have)  
**Estimate:** 1h  
**Dependencies:** TASK-013

**Description:**
Handle [Bestätigen] button with füllstand calculation.

**Subtasks:**
- [ ] Add `handleConfirm` to App.tsx
- [ ] Get dosage for selected pot
- [ ] Calculate new füllstand
- [ ] Update tea in database
- [ ] Save custom dosages if changed
- [ ] Flip card back to front
- [ ] Show success screen

**Files Changed:**
- `src/App.tsx`

**Acceptance:**
- ✅ Füllstand calculates correctly
- ✅ Database updates successfully
- ✅ Card flips back

---

### TASK-017: Update SuccessScreen Component
**Priority:** P0 (Must Have)  
**Estimate:** 45min  
**Dependencies:** TASK-016

**Description:**
Show pot size + dosage in success message.

**Subtasks:**
- [ ] Update SuccessScreen props (add pot, dosage)
- [ ] Update message format: "{tea} ausgewählt! {pot} • {dosage}g"
- [ ] Example: "Sencha ausgewählt! Klein • 2,5g"
- [ ] Test all pot sizes display correctly

**Files Changed:**
- `src/components/SuccessScreen.tsx`

**Acceptance:**
- ✅ Message includes pot + dosage
- ✅ All pot sizes work
- ✅ Formatting correct

---

### TASK-018: Implement Füllstand Animation
**Priority:** P0 (Must Have)  
**Estimate:** 30min  
**Dependencies:** TASK-017

**Description:**
Animate füllstand bar to new value.

**Subtasks:**
- [ ] Trigger füllstand bar update on confirm
- [ ] Smooth transition (0.5s)
- [ ] Update percentage text
- [ ] Test with various values

**Files Changed:**
- `src/components/TeaCard.tsx` (or wherever füllstand bar is)

**Acceptance:**
- ✅ Bar animates smoothly
- ✅ Percentage updates
- ✅ Visually satisfying

---

### TASK-019: Test Confirmation Flow
**Priority:** P0 (Must Have)  
**Estimate:** 30min  
**Dependencies:** TASK-018

**Description:**
End-to-end testing of complete flow.

**Subtasks:**
- [ ] Test Klein pot selection + confirm
- [ ] Test Mittel pot selection + confirm
- [ ] Test Groß pot selection + confirm
- [ ] Test with custom dosage
- [ ] Verify database updates
- [ ] Verify füllstand accuracy

**Acceptance:**
- ✅ All pots work correctly
- ✅ Füllstand always accurate
- ✅ Success message correct

---

## Phase 6: Edge Cases & Polish (EST: 2-3h)

### TASK-020: Implement Low Füllstand Warning
**Priority:** P1 (Should Have)  
**Estimate:** 1h  
**Dependencies:** TASK-016

**Description:**
Show warning when füllstand < dosage.

**Subtasks:**
- [ ] Add warning check in PotRow
- [ ] Show "⚠️ Nur noch Xg verfügbar" badge
- [ ] Still allow selection (graceful degradation)
- [ ] Show warning in success screen if füllstand → 0
- [ ] Test with various low values

**Files Changed:**
- `src/components/PotRow.tsx`
- `src/components/SuccessScreen.tsx`

**Acceptance:**
- ✅ Warning shows when appropriate
- ✅ Still functional
- ✅ User informed

---

### TASK-021: Handle Füllstand = 0 State
**Priority:** P0 (Must Have)  
**Estimate:** 30min  
**Dependencies:** TASK-020

**Description:**
Disable [Auswählen] when tea is empty.

**Subtasks:**
- [ ] Check füllstand in SwipeTeaCard
- [ ] Disable button if füllstand === 0
- [ ] Change text to "Aufgebraucht"
- [ ] Prevent card flip
- [ ] Test with empty tea

**Files Changed:**
- `src/components/SwipeTeaCard.tsx`

**Acceptance:**
- ✅ Button disabled when empty
- ✅ Clear message shown
- ✅ Cannot flip card

---

### TASK-022: Optimize Animation Performance
**Priority:** P1 (Should Have)  
**Estimate:** 45min  
**Dependencies:** TASK-008

**Description:**
Ensure 60 FPS on all animations.

**Subtasks:**
- [ ] Profile with Chrome DevTools
- [ ] Check card flip FPS
- [ ] Optimize CSS if needed
- [ ] Test on iPhone 12 mini
- [ ] Add `will-change` where beneficial

**Acceptance:**
- ✅ Consistent 60 FPS
- ✅ No janky animations
- ✅ Smooth on mobile

---

### TASK-023: Add Accessibility Support
**Priority:** P1 (Should Have)  
**Estimate:** 45min  
**Dependencies:** TASK-019

**Description:**
VoiceOver labels and keyboard navigation.

**Subtasks:**
- [ ] Add aria-labels to pot rows
- [ ] Add aria-labels to buttons
- [ ] Test with VoiceOver on iPhone
- [ ] Ensure keyboard tab order correct
- [ ] Test focus states visible

**Files Changed:**
- All interactive components

**Acceptance:**
- ✅ VoiceOver reads correctly
- ✅ Keyboard navigation works
- ✅ Focus visible

---

## Phase 7: Testing & Documentation (EST: 1-2h)

### TASK-024: Manual Testing (Full Flow)
**Priority:** P0 (Must Have)  
**Estimate:** 45min  
**Dependencies:** All previous tasks

**Description:**
Comprehensive manual testing.

**Checklist:**
- [ ] Test all 3 pots (Klein/Mittel/Groß)
- [ ] Test all tea types (6 types)
- [ ] Test edit mode (enter/adjust/exit)
- [ ] Test auto-save
- [ ] Test low füllstand warning
- [ ] Test füllstand = 0
- [ ] Test cancellation (← Zurück)
- [ ] Test in Safari browser
- [ ] Test in PWA mode
- [ ] Test on iPhone 12 mini
- [ ] Test rapid interactions
- [ ] Verify database sync

**Acceptance:**
- ✅ All test cases pass
- ✅ No bugs found

---

### TASK-025: Update Documentation
**Priority:** P0 (Must Have)  
**Estimate:** 45min  
**Dependencies:** TASK-024

**Description:**
Update all project documentation.

**Subtasks:**
- [ ] Update CHANGELOG.md (v1.1.0 entry)
- [ ] Update README.md (features)
- [ ] Create RELEASE-NOTES-v1.1.0.md
- [ ] Update APPLE-HIG-AUDIT-v1.1.0.md
- [ ] Update PROJECT-STATUS.md

**Files Changed:**
- `CHANGELOG.md`
- `README.md`
- `docs/RELEASE-NOTES-v1.1.0.md`
- `docs/APPLE-HIG-AUDIT-v1.1.0.md`
- `PROJECT-STATUS.md`

**Acceptance:**
- ✅ All docs updated
- ✅ Version numbers correct
- ✅ Feature list complete

---

### TASK-026: Deploy to Production
**Priority:** P0 (Must Have)  
**Estimate:** 30min  
**Dependencies:** TASK-025

**Description:**
Deploy v1.1.0 to production with correct migration sequence.

**CRITICAL: Migration must run BEFORE code deploy!**

**Subtasks:**
- [ ] **STEP 1:** Run migration on production Supabase (MANUALLY in Dashboard!)
  ```
  1. Open production Supabase Dashboard
  2. Go to SQL Editor
  3. Copy content from supabase/migrations/007_add_pot_dosages.sql
  4. Execute SQL
  ```
  
- [ ] **STEP 2:** Verify migration success (in Dashboard SQL Editor)
  ```sql
  -- Check columns exist
  SELECT column_name 
  FROM information_schema.columns 
  WHERE table_name = 'teas' 
  AND column_name IN ('dosierung_klein', 'dosierung_mittel', 'dosierung_gross');
  
  -- Verify all teas have presets (or check if gramm_anzahl used)
  SELECT COUNT(*) FROM teas WHERE dosierung_klein IS NULL;
  -- Should return 0 (or adjust based on your schema)
  ```
  
- [ ] **STEP 3:** ONLY AFTER migration verified → Push code to main branch

- [ ] **STEP 4:** Monitor Vercel deployment logs

- [ ] **STEP 5:** Verify deployment success (check Vercel build logs)

- [ ] **STEP 6:** Quick smoke test on production URL
  - Select a tea
  - Flip card
  - Select pot
  - Confirm
  - Verify füllstand updates

- [ ] **STEP 7:** Monitor for errors (first 30 minutes)
  - Check Vercel logs
  - Check Supabase logs  
  - Check browser console (no errors)

**Rollback Plan (if issues):**
```bash
# Revert code
git revert <commit-hash>
git push origin main

# Rollback migration (manually in Dashboard if needed)
# Run rollback SQL from migration file comments
```

**Acceptance:**
- ✅ Deployment successful
- ✅ No errors in console
- ✅ Feature works in production

---

## Summary

**Total Tasks:** 26  
**Total Phases:** 7  
**Total Estimate:** 14-19 hours

### Critical Path
```
TASK-001 → TASK-002 → TASK-003 → TASK-004
   ↓
TASK-005 → TASK-006 → TASK-007 → TASK-008
   ↓
TASK-009 → TASK-010 → TASK-011
   ↓
TASK-012 → TASK-013 → TASK-014 → TASK-015
   ↓
TASK-016 → TASK-017 → TASK-018 → TASK-019
   ↓
TASK-020 → TASK-021 → TASK-022 → TASK-023
   ↓
TASK-024 → TASK-025 → TASK-026
```

### Priority Breakdown
- **P0 (Must Have):** 19 tasks
- **P1 (Should Have):** 7 tasks

---

**Status:** ✅ Ready for Execution  
**Last Updated:** 2026-02-22
