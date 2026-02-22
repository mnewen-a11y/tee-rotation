# Epic: Dynamic Pot Size Selection with Füllstand Calculation

**Epic ID:** ROYAL-TEA-EPIC-001  
**Version:** v1.1.0  
**Status:** ✅ Ready for Development  
**Priority:** High  
**Created:** 2026-02-22  
**Target Release:** v1.1.0  
**Approved:** Michael (Product Owner)

---

## Executive Summary

Implement dynamic pot size selection (Klein/Mittel/Groß) with automatic füllstand calculation based on selected pot's dosage. Users can accurately track tea consumption across different pot sizes while maintaining 100% Apple HIG conformance and maximum joy of use.

**Key Innovation:** Card-flip interaction + inline auto-save edit mode (3 elements only).

---

## Business Value

### Problem Statement
Royal-Tea v1.0.8 assumes all tea servings use 8g dosage (Groß pot). Users brewing with different pot sizes (400ml Klein, 700ml Mittel, 1L Groß) cannot accurately track füllstand, causing:
- ❌ Inaccurate inventory tracking
- ❌ Manual workarounds required
- ❌ Reduced trust in rotation system
- ❌ Frustration for users with multiple pot sizes

### Solution
Card-flip interaction pattern with minimal edit mode:

1. **Front Card:** User selects tea from rotation
2. **Card Flip:** 3D animation to pot selection screen
3. **Pot Selection:** Choose Klein/Mittel/Groß (preset based on tea type)
4. **Optional Edit:** Inline adjustment with [−] value [+] (auto-save)
5. **Confirmation:** Füllstand updates automatically
6. **Success:** Clear feedback with pot size + dosage

### Success Metrics
- ✅ 95%+ users select correct pot on first use
- ✅ Zero füllstand tracking errors reported
- ✅ 100% Apple HIG conformance maintained
- ✅ Sub-3-tap flow for 90% of use cases
- ✅ Edit mode used by <5% of users (presets accurate)

### ROI
- **User Satisfaction:** Accurate tracking = trust in system
- **Retention:** No manual workarounds = continued app usage
- **Differentiation:** Feature not found in competing tea apps

---

## User Stories

### US-001: View Available Pot Sizes
**As a** tea enthusiast  
**I want to** see all my pot size options with dosages  
**So that** I can choose the right pot for my brewing session

**Acceptance Criteria:**
- [ ] All 3 pot sizes displayed (Klein 400ml / Mittel 700ml / Groß 1L)
- [ ] Each pot shows volume (ml) and dosage (g)
- [ ] Klein pre-selected with tea-type-specific preset dosage
- [ ] Visual hierarchy: Dosage most prominent (30px bold gold)
- [ ] 72px row height (HIG tap target compliant)

**Priority:** P0 (Must Have)

---

### US-002: Select Pot Size
**As a** user  
**I want to** select my pot with one tap  
**So that** füllstand reduces by correct amount instantly

**Acceptance Criteria:**
- [ ] Single tap selects pot
- [ ] Immediate visual feedback (< 100ms)
- [ ] Gold border + background change
- [ ] Haptic feedback (10ms vibration)
- [ ] Selected state persists until confirmed or changed

**Priority:** P0 (Must Have)

---

### US-003: Edit Dosage Inline (Edge Case)
**As a** user with custom preferences  
**I want to** adjust dosage with +/− buttons  
**So that** I can fine-tune for my specific brewing method

**Acceptance Criteria:**
- [ ] Edit icon (✏️) visible only on selected pot (opacity 0.5)
- [ ] Tap ✏️ → Row enters edit mode (blue border)
- [ ] Edit UI shows: [−] dosage [+] (3 elements only)
- [ ] Each tap adjusts by ±0.5g (auto-saves immediately)
- [ ] Range: 0–20g
- [ ] Scale animation on value change
- [ ] Haptic feedback per tap (5ms)
- [ ] Exit edit: Tap outside row OR [Bestätigen] button

**Priority:** P1 (Should Have)

---

### US-004: Confirm Selection
**As a** user  
**I want to** confirm my pot choice  
**So that** füllstand updates and I see clear feedback

**Acceptance Criteria:**
- [ ] [Bestätigen] button commits selection
- [ ] Card flips back to front (0.6s animation)
- [ ] Success overlay appears with:
  - ✅ Large checkmark icon (bounce animation)
  - Tea name
  - Pot size + dosage (e.g., "Klein • 2,5g")
- [ ] Füllstand bar animates to new value (0.5s)
- [ ] Success overlay auto-dismisses after 2s
- [ ] Returns to rotation tab

**Priority:** P0 (Must Have)

---

### US-005: Cancel Selection
**As a** user  
**I want to** go back if I selected wrong tea  
**So that** no changes are made

**Acceptance Criteria:**
- [ ] [← Zurück] button cancels operation
- [ ] Card flips back to front (no füllstand change)
- [ ] No data persisted to database
- [ ] Returns to rotation tab

**Priority:** P0 (Must Have)

---

### US-006: Low Füllstand Warning
**As a** user  
**I want to** see warning when tea is running low  
**So that** I know to refill soon

**Acceptance Criteria:**
- [ ] Warning if füllstand < selected pot's dosage
- [ ] Warning badge: "⚠️ Nur noch Xg verfügbar"
- [ ] Pot still selectable (graceful degradation)
- [ ] If confirmed: Füllstand → 0g
- [ ] Warning in success screen: "Tee aufgebraucht"

**Priority:** P1 (Should Have)

---

### US-007: Fix Mistakes from Sammlung
**As a** user who made a mistake  
**I want to** edit füllstand from Sammlung tab  
**So that** I can correct errors without re-brewing

**Acceptance Criteria:**
- [ ] Edit button on tea cards in Sammlung
- [ ] Opens edit modal with direct gramm input
- [ ] Can adjust füllstand manually
- [ ] Serves as safety net for pot selection errors

**Priority:** P0 (Must Have - already exists in v1.0.8)

---

## Technical Architecture

### Data Model Changes

#### Tea Interface (Updated)
```typescript
interface Tea {
  // Existing fields (unchanged)
  id: string;
  name: string;
  brand: string;
  type: TeaType; // 'Grüntee' | 'Schwarztee' | 'Oolong' | etc.
  temp: number;
  fuellstand: number;
  zuletztGetrunken?: Date;
  
  // NEW: Pot-specific dosages
  dosierungGross: number;   // Default 8g (was 'dosierung')
  dosierungMittel?: number; // Default 5g
  dosierungKlein?: number;  // Default 2.5g (Grün) or 3g (Schwarz)
}
```

#### Pot Size Enum (New)
```typescript
enum PotSize {
  KLEIN = 'klein',
  MITTEL = 'mittel',
  GROSS = 'gross'
}

interface PotConfig {
  size: PotSize;
  volume: number;  // ml
  dosage: number;  // g
}
```

#### Default Presets by Tea Type
```typescript
const DOSAGE_PRESETS: Record<TeaType, {klein: number, mittel: number, gross: number}> = {
  'Grüntee':     { klein: 2.5, mittel: 5, gross: 8 },
  'Schwarztee':  { klein: 3,   mittel: 5, gross: 8 },
  'Oolong':      { klein: 2.5, mittel: 5, gross: 8 },
  'Weißtee':     { klein: 2.5, mittel: 5, gross: 8 },
  'Kräutertee':  { klein: 3,   mittel: 5.5, gross: 9 },
  'Früchtetee':  { klein: 3,   mittel: 5.5, gross: 9 }
};
```

### State Management

#### New State (App.tsx)
```typescript
const [selectedTea, setSelectedTea] = useState<Tea | null>(null);
const [selectedPot, setSelectedPot] = useState<PotSize>(PotSize.KLEIN);
const [isCardFlipped, setIsCardFlipped] = useState(false);
const [editingPot, setEditingPot] = useState<PotSize | null>(null);
const [customDosages, setCustomDosages] = useState<Record<PotSize, number>>({});
```

### Component Architecture

#### New Components
1. **PotSelectionCard** - Back side of flip card
   - Header (tea name + subtitle)
   - PotRow list (3 rows)
   - Action buttons (Zurück / Bestätigen)

2. **PotRow** - Individual pot option
   - Left: Name + volume
   - Right: Dosage display + edit icon
   - Edit mode: [−] value [+]
   - Auto-save on each adjustment

3. **SuccessScreen** (Updated)
   - Shows tea name + pot size + dosage
   - Example: "Sencha ausgewählt! Klein • 2,5g"

#### Modified Components
1. **SwipeTeaCard** - Triggers card flip (not direct selection)
2. **App.tsx** - Manages flip state + pot selection logic
3. **CollectionView** - No changes (backward compatible)

---

## UX Flow Diagram

```
┌─────────────────────────────────────────┐
│ Rotation Tab                            │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🍃 Grüntee                          │ │
│ │ Sencha                              │ │
│ │ Keiko Green Tea                     │ │
│ │ 🌡️ 70° ⚖️ 8g                        │ │
│ │ ▓▓▓▓▓░░░ 60%                       │ │
│ │                                     │ │
│ │ [Auswählen] ← TAP                   │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              ↓
        Card Flip (0.6s)
              ↓
┌─────────────────────────────────────────┐
│ Pot Selection                           │
│                                         │
│         Sencha                          │
│      Kanne wählen                       │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ KLEIN     2,5g ✏️ ← Pre-selected   │ │
│ │ 400ml                               │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ MITTEL      5g  ○                   │ │
│ │ 700ml                               │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ GROSS       8g  ○                   │ │
│ │ 1 Liter                             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [← Zurück] [Bestätigen]                 │
└─────────────────────────────────────────┘
              ↓
        [Bestätigen] TAP
              ↓
┌─────────────────────────────────────────┐
│ Success Overlay                         │
│                                         │
│            ✅                           │
│     Sencha ausgewählt!                  │
│      Klein • 2,5g                       │
│                                         │
│  (Auto-dismiss after 2s)                │
└─────────────────────────────────────────┘
              ↓
        Returns to Rotation Tab
```

---

## Design Decisions

### 1. Card Flip Over Modal
**Decision:** 3D card flip animation  
**Rationale:**
- ✅ Maintains spatial context
- ✅ Same card size (520px) - consistent
- ✅ Elegant, iOS-native feel
- ✅ No overlay clutter
- ❌ Alternative (bottom sheet) wastes space on füllstand preview

### 2. List Over Grid
**Decision:** 3 vertical rows (S/M/L)  
**Rationale:**
- ✅ iOS Settings pattern
- ✅ Scales to 4+ pots easily
- ✅ 72px rows = HIG compliant
- ✅ Better information hierarchy
- ❌ Alternative (2×2 grid) doesn't scale well

### 3. No Checkmarks
**Decision:** Border color indicates selection  
**Rationale:**
- ✅ "Border IS the indicator" (Jony Ive principle)
- ✅ Cleaner, more minimal
- ✅ One less visual element
- ✅ Gold border is clear enough

### 4. Auto-Save Edit Mode
**Decision:** [−] value [+] only (no Save/Cancel buttons)  
**Rationale:**
- ✅ Only 3 elements = maximum minimalism
- ✅ Auto-save = iOS Settings pattern
- ✅ [Bestätigen] already exists at card level
- ✅ Safety net exists: Edit from Sammlung if mistake
- ✅ Jony Ive approved: "Perfect."
- ❌ Alternative (Save/Cancel) = 5 elements, too busy

---

## Implementation Phases

### Phase 1: Data Layer (EST: 2-3h)
**Tasks:**
- Update Tea interface (add dosierungKlein, dosierungMittel)
- Create migration script for existing teas
- Implement preset logic per tea type
- Update Supabase schema
- Test data persistence

**Deliverables:**
- [ ] Updated TypeScript interfaces
- [ ] Migration script tested
- [ ] Supabase schema updated
- [ ] All existing teas have presets

---

### Phase 2: Card Flip UI (EST: 3-4h)
**Tasks:**
- Create PotSelectionCard component
- Implement 3D flip animation (CSS transforms)
- Add flip state management (App.tsx)
- Connect SwipeTeaCard → flip trigger
- Test flip on Safari + PWA

**Deliverables:**
- [ ] PotSelectionCard component
- [ ] Smooth 60 FPS flip animation
- [ ] State management working
- [ ] Works in Safari browser + PWA mode

---

### Phase 3: Pot Selection (EST: 2-3h)
**Tasks:**
- Create PotRow component
- Implement selection logic
- Add haptic feedback
- Pre-select Klein based on tea type
- Visual states (normal/selected)

**Deliverables:**
- [ ] PotRow component functional
- [ ] Selection works with haptics
- [ ] Presets auto-select Klein
- [ ] Visual polish complete

---

### Phase 4: Inline Edit Mode (EST: 2-3h)
**Tasks:**
- Add edit icon (visible only on selected)
- Implement edit mode UI ([−] value [+])
- Auto-save logic (±0.5g steps)
- Exit edit on outside click
- Animations (scale on change)

**Deliverables:**
- [ ] Edit mode fully functional
- [ ] Auto-save working
- [ ] Animations smooth
- [ ] Exit logic correct

---

### Phase 5: Confirmation & Success (EST: 2-3h)
**Tasks:**
- Update SuccessScreen component
- Show pot size + dosage
- Füllstand calculation & update
- Success animation (bounce checkmark)
- Card flip back to front
- Return to rotation tab

**Deliverables:**
- [ ] Success screen updated
- [ ] Füllstand updates correctly
- [ ] Animations complete
- [ ] Flow end-to-end working

---

### Phase 6: Edge Cases & Polish (EST: 2-3h)
**Tasks:**
- Low füllstand warning
- Füllstand = 0 state
- Rapid selection handling
- Network error handling
- Animation performance tuning
- Accessibility (VoiceOver)

**Deliverables:**
- [ ] All edge cases handled
- [ ] Warnings implemented
- [ ] 60 FPS guaranteed
- [ ] Accessibility tested

---

### Phase 7: Testing & Documentation (EST: 1-2h)
**Tasks:**
- Manual testing (Safari + PWA)
- Test on iPhone 12 mini
- Update all documentation
- Create release notes
- HIG audit update

**Deliverables:**
- [ ] All test cases passed
- [ ] CHANGELOG.md updated
- [ ] README.md updated
- [ ] RELEASE-NOTES-v1.1.0.md created
- [ ] APPLE-HIG-AUDIT-v1.1.0.md updated

---

**Total Estimate:** 14-19 hours development

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Card flip lag on old devices | Medium | Medium | Test on iPhone 8, optimize CSS transforms |
| Edit mode state conflicts | Low | Low | Clear state management, exit guards |
| Migration breaks existing teas | Low | High | Thorough testing, rollback plan |
| Users don't find edit icon | Low | Low | Only 1% need it, progressive disclosure is intentional |
| Preset dosages incorrect | Medium | Medium | User testing, adjustable per-tea |

---

## Dependencies

### External
- None (self-contained feature)

### Internal
- ✅ v1.0.8 TabBar fixes deployed
- ✅ Supabase connection stable
- ✅ Apple HIG audit methodology established

---

## Rollout Plan

### Pre-Release
1. Deploy to Vercel staging environment
2. Test on iPhone 12 mini (Safari + PWA)
3. Verify migration script on test database
4. Check all animations at 60 FPS

### Release Day
1. Run migration script (add presets to existing teas)
2. Deploy to production (Vercel main branch)
3. Monitor Supabase for sync errors
4. Watch for user feedback

### Post-Release
1. Monitor füllstand accuracy (week 1)
2. Check edit mode usage (< 5% expected)
3. Collect user feedback
4. Plan v1.1.1 polish if needed

### Success Criteria
- [ ] Zero füllstand calculation bugs reported
- [ ] 95%+ successful pot selections
- [ ] No performance regressions
- [ ] HIG conformance maintained at 99%+
- [ ] Positive user feedback

---

## Documentation Updates

- [x] CHANGELOG.md (v1.1.0 entry)
- [x] README.md (features section)
- [x] RELEASE-NOTES-v1.1.0.md
- [x] APPLE-HIG-AUDIT-v1.1.0.md
- [x] PROJECT-STATUS.md (update)

---

## Related Documents

- [UX Specification](./specs/UX-SPEC.md) - Complete user flows and interactions
- [UI Specification](./specs/UI-SPEC.md) - Visual design and measurements
- [Dev Specification](./specs/DEV-SPEC.md) - Technical implementation details
- [Task List](./tasks/TASK-LIST.md) - Prioritized task breakdown
- [Test Cases](./tests/TEST-CASES.md) - All test scenarios
- [Acceptance Criteria](./tests/ACCEPTANCE-CRITERIA.md) - Definition of done

---

## Approvals

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Owner | Michael | 2026-02-22 | ✅ Approved |
| UX Design | Claude | 2026-02-22 | ✅ Approved |
| Apple Excellence Review | Jony Ive (spirit) | 2026-02-22 | ✅ "Perfect." |
| Lead Developer | Michael | TBD | Pending |

---

## Next Steps

1. ✅ Review this Epic document
2. ✅ Review all specification documents
3. ✅ Approve task breakdown
4. 🚀 Begin Phase 1: Data Layer
5. 📝 Daily standup updates in PROJECT-STATUS.md

---

**Version History:**
- v1.0 (2026-02-22): Initial creation
- v1.0 (2026-02-22): Finalized with auto-save edit mode

**Status:** ✅ Ready for Development
