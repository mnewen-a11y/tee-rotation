# UX Specification: Dynamic Pot Selection

**Version:** v1.1.0  
**Last Updated:** 2026-02-22  
**Owner:** UX Design  
**Status:** ✅ Final - Approved by Michael

---

## Overview

This document defines the complete user experience for dynamic pot size selection, including user flows, interaction patterns, behavioral specifications, and the finalized auto-save edit mode design.

---

## Core User Flows

### Flow 1: Standard Selection (90% of cases)

```
START: Rotation Tab
│
├─ User sees recommended tea card (Sencha)
│  └─ Card shows: Name, Brand, Temp, Dosierung (Groß), Füllstand
│
├─ User taps [Auswählen]
│  └─ Haptic feedback (10ms)
│  └─ Card begins 3D flip (0.6s animation)
│
├─ Pot Selection Card appears
│  └─ Title: "Sencha"
│  └─ Subtitle: "Kanne wählen"
│  └─ Klein (2,5g) PRE-SELECTED ← Preset for Grüntee
│  └─ Mittel (5g) available
│  └─ Groß (8g) available
│
├─ DECISION: Is Klein (preset) correct?
│  │
│  ├─ YES (90% of cases)
│  │  └─ User taps [Bestätigen]
│  │     └─ Card flips back (0.6s)
│  │     └─ Success overlay appears
│  │     └─ Füllstand: 30g → 27,5g
│  │     └─ Success shows: "Sencha ausgewählt! Klein • 2,5g"
│  │     └─ Auto-dismiss after 2s
│  │     └─ Returns to Rotation Tab
│  │     └─ END ✓
│  │
│  └─ NO (10% of cases)
│     └─ GO TO Flow 2 (Change Pot Size)
│
END: Back on Rotation Tab, füllstand updated
```

---

### Flow 2: Change Pot Size (10% of cases)

```
CONTINUES FROM: Flow 1, user on Pot Selection Card

├─ Klein is pre-selected but incorrect
│
├─ User taps [Mittel] row
│  └─ Haptic feedback (10ms)
│  └─ Klein deselects (gold border → transparent)
│  └─ Mittel selects (transparent → gold border)
│  └─ Dosage updates: 2,5g → 5g
│
├─ DECISION: Is dosage (5g) correct?
│  │
│  ├─ YES (99% of pot-change cases)
│  │  └─ User taps [Bestätigen]
│  │     └─ Success flow as above
│  │     └─ "Mittel • 5g"
│  │     └─ END ✓
│  │
│  └─ NO (1% edge case - custom dosage needed)
│     └─ GO TO Flow 3 (Edit Dosage)
│
END: Pot selection confirmed
```

---

### Flow 3: Edit Dosage (1% edge case)

```
CONTINUES FROM: Flow 2, user has selected pot

├─ Mittel is selected (5g dosage)
│
├─ User taps ✏️ icon (only visible on selected pot)
│  └─ Haptic feedback (10ms)
│  └─ Row enters Edit Mode
│     ├─ Border: Gold → Blue
│     ├─ Background: Light gold → Bright white
│     ├─ Shadow: Gold glow → Blue glow
│     ├─ Dosage display: 5g (gold, 30px) → 5g (blue, 28px)
│     ├─ Edit icon: Hidden
│     └─ Edit UI appears: [−] 5g [+]
│
├─ User adjusts dosage
│  ├─ Tap [+] → 5,5g (auto-saved immediately)
│  │  └─ Haptic (5ms)
│  │  └─ Scale animation (1.0 → 1.15 → 1.0)
│  ├─ Tap [+] → 6g (auto-saved)
│  ├─ Tap [−] → 5,5g (auto-saved)
│  └─ Final value: 5,5g
│
├─ User exits Edit Mode
│  ├─ Option A: Tap outside row
│  ├─ Option B: Tap [Bestätigen] button
│  └─ Result: Edit mode exits
│     ├─ Border: Blue → Gold
│     ├─ Background: White → Light gold
│     ├─ Dosage: 5,5g (stays updated!)
│     └─ Edit icon: Reappears
│
├─ User taps [Bestätigen]
│  └─ Success: "Mittel • 5,5g" (custom dosage)
│  └─ Füllstand: 30g → 24,5g
│  └─ END ✓
│
END: Custom dosage saved and used
```

---

### Flow 4: Cancel Selection

```
START: User on Pot Selection Card

├─ User realizes wrong tea selected
│
├─ User taps [← Zurück]
│  └─ Card flips back to front (0.6s)
│  └─ NO füllstand change
│  └─ NO data persisted
│  └─ Returns to Rotation Tab
│  └─ User can select correct tea
│
END: Operation cancelled, no changes made
```

---

### Flow 5: Low Füllstand Warning

```
START: User selects pot

├─ System checks: füllstand >= selected dosage?
│  │
│  ├─ YES (enough tea)
│  │  └─ Normal flow continues
│  │  └─ END ✓
│  │
│  └─ NO (not enough tea)
│     ├─ Warning badge appears on pot row
│     │  └─ "⚠️ Nur noch 3g verfügbar"
│     ├─ Pot still selectable (graceful degradation)
│     ├─ User can tap [Bestätigen] anyway
│     │  └─ Füllstand: 3g → 0g
│     │  └─ Success screen shows warning
│     │     └─ "Sencha ausgewählt! Tee aufgebraucht"
│     └─ END ⚠️
│
END: Tea used up, user warned
```

---

### Flow 6: Fix Mistake from Sammlung

```
START: User made mistake in pot selection

├─ Example: Selected Groß (8g) but used Klein (2,5g)
│  └─ Füllstand now incorrect: 30g → 22g (should be 27,5g)
│
├─ User goes to Sammlung Tab
│
├─ User finds "Sencha" card
│
├─ User taps Edit button (✏️)
│  └─ Edit modal opens
│  └─ Direct gramm input: 22g
│
├─ User corrects füllstand
│  └─ Types: 27,5g
│  └─ Saves
│
END: Füllstand corrected, system accurate again
```

---

## Interaction Patterns

### Card Flip Animation

**Trigger:** User taps [Auswählen] on tea card

**Behavior:**
```css
/* Front card rotates on Y-axis */
transform: rotateY(0deg) → rotateY(180deg)
duration: 0.6s
timing: cubic-bezier(0.4, 0.0, 0.2, 1)

/* Backface culling prevents mirror effect */
backface-visibility: hidden

/* Same card dimensions maintained */
width: 100% (max 380px)
height: 520px (constant)
```

**Physics:**
- Natural ease-out (not linear)
- No bounce (too playful for tea app)
- Respects `prefers-reduced-motion`

**Milestones:**
```
0ms:    Front visible (0deg)
300ms:  Both invisible (90deg) ← Transition point
600ms:  Back visible (180deg)
```

---

### Pot Row Selection

**Trigger:** User taps anywhere on pot row

**Immediate Feedback (< 50ms):**
```
Visual:
- Border: transparent → 2px #C9AE4D
- Background: rgba(255,255,255,0.5) → rgba(201,174,77,0.12)
- Shadow: none → 0 6px 20px rgba(201,174,77,0.2)
- Edit icon: opacity 0 → 0.5

Haptic:
- Light tap (10ms vibration)

State:
- Previous selection auto-deselects
- Only one row selected at a time
```

**States:**
```
Normal (not selected):
├─ Border: transparent
├─ Background: rgba(255,255,255,0.5)
├─ Shadow: none
├─ Edit icon: hidden (opacity 0)
└─ Cursor: pointer

Selected (not editing):
├─ Border: 2px #C9AE4D
├─ Background: rgba(201,174,77,0.12)
├─ Shadow: 0 6px 20px rgba(201,174,77,0.2)
├─ Edit icon: visible (opacity 0.5)
└─ Cursor: pointer

Editing:
├─ Border: 2px #3b82f6 (blue)
├─ Background: rgba(255,255,255,0.9)
├─ Shadow: 0 8px 24px rgba(59,130,246,0.25)
├─ Edit icon: hidden
├─ Edit UI: visible ([−] value [+])
└─ Cursor: default
```

---

### Edit Mode Behavior

**Entry:**

1. **Trigger:** User taps ✏️ icon on selected pot row

2. **Pre-conditions:**
   - Pot must be selected (gold border)
   - Edit icon visible (opacity 0.5)

3. **Transition (0.3s):**
   ```
   Simultaneous changes:
   ├─ Border: Gold → Blue
   ├─ Background: Light gold → Bright white
   ├─ Shadow: Gold glow → Blue glow
   ├─ Edit icon: Fade out
   ├─ Normal dosage: Fade out
   └─ Edit UI: Fade in
   ```

4. **Edit UI Layout:**
   ```
   [−]  5g  [+]
    ↑   ↑   ↑
   38px 60px 38px
   
   Gap: 12px between elements
   Total width: ~158px
   ```

---

**Adjustment:**

1. **Trigger:** User taps [+] or [−] button

2. **Behavior (per tap):**
   ```
   ├─ Value adjusts by ±0.5g
   ├─ Range enforcement: Math.max(0, Math.min(20, value))
   ├─ AUTO-SAVE immediately (no confirm needed)
   ├─ Display updates: "5g" → "5,5g"
   ├─ Scale animation: 1.0 → 1.15 → 1.0 (150ms)
   ├─ Haptic feedback: 5ms vibration
   └─ Normal dosage display also updates (for when exiting)
   ```

3. **Button States:**
   ```
   Normal:
   ├─ Background: rgba(59,130,246,0.1)
   ├─ Border: 1.5px rgba(59,130,246,0.3)
   └─ Color: #3b82f6
   
   Active (pressed):
   ├─ Background: #3b82f6 (solid blue)
   ├─ Color: white
   ├─ Transform: scale(0.95)
   └─ Haptic: 5ms
   ```

---

**Exit:**

1. **Triggers:**
   - User taps outside pot row
   - User taps [Bestätigen] button
   - User selects different pot

2. **Transition (0.3s):**
   ```
   ├─ Edit UI: Fade out
   ├─ Normal dosage: Fade in (with updated value!)
   ├─ Edit icon: Fade in
   ├─ Border: Blue → Gold
   ├─ Background: White → Light gold
   └─ Shadow: Blue glow → Gold glow
   ```

3. **Result:**
   - Changed value persists (auto-saved)
   - Row returns to selected state
   - Ready for [Bestätigen]

---

## Preset Logic

### Default Dosages by Tea Type

| Tea Type | Klein (400ml) | Mittel (700ml) | Groß (1L) |
|----------|---------------|----------------|-----------|
| Grüntee | 2,5g | 5g | 8g |
| Schwarztee | 3g | 5g | 8g |
| Oolong | 2,5g | 5g | 8g |
| Weißtee | 2,5g | 5g | 8g |
| Kräutertee | 3g | 5,5g | 9g |
| Früchtetee | 3g | 5,5g | 9g |

### Auto-Selection Logic

**On card flip to pot selection:**

```typescript
// 1. Check tea type
const teaType = selectedTea.type; // e.g., "Grüntee"

// 2. Get preset for Klein pot
const kleinPreset = DOSAGE_PRESETS[teaType].klein; // 2.5g

// 3. Auto-select Klein
setSelectedPot(PotSize.KLEIN);

// 4. Use preset or custom dosage
const dosage = selectedTea.dosierungKlein ?? kleinPreset;

// Result: Klein row has gold border, 2,5g displayed
```

**Rationale:**
- Klein (400ml) is most commonly used pot size
- Preset matches tea type automatically  
- User can override with 1-2 taps if needed

---

## Edge Cases

### Case 1: Füllstand < Dosage

**Scenario:** User has 3g left, selects Groß (8g)

**Behavior:**
```
1. Warning badge on Groß row:
   "⚠️ Nicht genug"

2. Pot still selectable (graceful degradation)

3. If user taps [Bestätigen]:
   ├─ Füllstand: 3g → 0g
   ├─ Success screen: "Groß • 8g"
   ├─ Additional warning: "Tee aufgebraucht"
   └─ User knows to refill

4. No blocking - user decides
```

---

### Case 2: Füllstand = 0g

**Scenario:** Tea is completely empty

**Behavior:**
```
1. On Rotation Card (Front):
   ├─ [Auswählen] button DISABLED
   ├─ Grey out
   ├─ Message: "Aufgebraucht • Bitte auffüllen"
   └─ Cannot flip card

2. User must refill from Sammlung:
   ├─ Go to Sammlung tab
   ├─ Edit füllstand
   └─ Set new amount (e.g., 100g)
```

---

### Case 3: Rapid Pot Selection

**Scenario:** User taps multiple pots quickly

**Behavior:**
```
Each tap:
├─ Previous selection deselects instantly
├─ New selection applies instantly
├─ Haptic on each tap (10ms)
├─ No lag or queueing
└─ Last tap wins
```

---

### Case 4: Edit Mode During Selection Change

**Scenario:** User in edit mode, then selects different pot

**Behavior:**
```
1. User editing Klein (in edit mode)
2. User taps Mittel row
3. Result:
   ├─ Klein edit mode exits (auto-saved) ← VALUES PERSIST!
   ├─ Klein deselects
   ├─ Mittel selects
   └─ Mittel NOT in edit mode (normal state)
```

**CRITICAL:** Klein's edited value is auto-saved immediately when switching to Mittel. The custom dosage persists in database and will be used for future Klein selections.

---

### Case 5: Network Error During Confirm

**Scenario:** Supabase sync fails when user confirms

**Behavior:**
```
Optimistic UI:
├─ Local state updates immediately
├─ Füllstand bar animates
├─ Success screen shows
├─ User sees instant feedback

Background:
├─ Sync queued for retry
├─ 3 retry attempts (exponential backoff)
├─ If all fail: Toast notification
   └─ "Änderung wird beim nächsten Sync gespeichert"

Result:
└─ User experience uninterrupted
```

---

## Accessibility

### VoiceOver Labels

**Pot Row (Normal):**
```
"Klein, vierhundert Milliliter, zwei komma fünf Gramm, Taste"
```

**Pot Row (Selected):**
```
"Klein, vierhundert Milliliter, zwei komma fünf Gramm, ausgewählt, Taste"
```

**Edit Icon:**
```
"Dosierung bearbeiten, Taste"
```

**Adjust Buttons (Edit Mode):**
```
Minus: "Verringern, Taste"
Plus: "Erhöhen, Taste"
```

**Dosage Value (Edit Mode):**
```
"Zwei komma fünf Gramm"
(updates dynamically with each adjustment)
```

---

### Keyboard Navigation

**Tab Order:**
```
1. Pot Row 1 (Klein)
2. Pot Row 2 (Mittel)
3. Pot Row 3 (Groß)
4. [← Zurück] button
5. [Bestätigen] button
```

**Interactions:**
```
Enter/Space: Select pot row
Tab: Next element
Shift+Tab: Previous element
Escape: Exit edit mode (if active)
```

**In Edit Mode:**
```
Enter/Space on [+]: Increase
Enter/Space on [−]: Decrease
Escape: Exit edit mode
Tab: Move to next button
```

---

### Reduced Motion

**For users with `prefers-reduced-motion: reduce`:**

```css
.card-flipper {
  transition: none;
}

/* Instant transition instead of flip */
/* Opacity fade as fallback */
```

**Behavior:**
- Card flip becomes instant opacity transition
- All other animations remain (scale, color)
- Haptics still work

---

## Performance Targets

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Card flip | 60 FPS | Chrome DevTools Performance |
| Tap to visual feedback | < 100ms | Manual observation |
| Edit mode entry | < 150ms | Tap to UI visible |
| Value adjustment | < 50ms | Tap to number update |
| Füllstand animation | Smooth | 60 FPS required |
| Success screen | < 2s total | Auto-dismiss timing |

---

## Haptic Feedback Schedule

| Action | Pattern | Duration | Feel |
|--------|---------|----------|------|
| Pot selection | Light | 10ms | Tap confirmation |
| Edit mode enter | Light | 10ms | Mode change |
| Dosage adjust [+]/[−] | Light | 5ms | Increment feedback |
| Save (N/A - auto-save) | N/A | N/A | N/A |
| Success confirmation | Medium | 50ms | Completion |
| Warning (low tea) | Double | 50-50ms | Alert |
| Error | Heavy | 100ms | Problem |

---

## Error States

### Invalid Edit State

**Trigger:** Somehow value goes < 0 or > 20

**Behavior:**
```
├─ Clamp value: Math.max(0, Math.min(20, value))
├─ Display clamped value
├─ Visual feedback: Brief red border flash
├─ Haptic: Error (100ms heavy)
└─ Auto-corrects, no user action needed
```

---

## Future Enhancements (v1.2+)

1. **Smart Presets from History**
   - "You usually use Mittel for this tea"
   - Auto-select based on past behavior

2. **Custom Pot Sizes**
   - User can add "My 500ml Kyusu"
   - Saved per-user

3. **Batch Brewing Counter**
   - "How many aufgüsse?" (1-5)
   - Füllstand -= (dosage × aufgüsse)

4. **Dosage Recommendations**
   - ML model suggests optimal dosage
   - Based on brewing history

---

## Acceptance Criteria (UX)

✅ Card flip is smooth and natural (60 FPS)  
✅ Pot selection feels instant (< 100ms)  
✅ Preset (Klein) is auto-selected correctly  
✅ Edit mode is discoverable but not intrusive  
✅ Auto-save feels natural (no explicit save)  
✅ Exit edit is intuitive (tap outside works)  
✅ Füllstand calculation is always accurate  
✅ Low stock warning appears when needed  
✅ Success screen provides clear confirmation  
✅ No accessibility violations  
✅ Works identically in Safari + PWA  
✅ Zero performance regressions vs v1.0.8  

---

**Approved by:** Michael (Product Owner)  
**Date:** 2026-02-22  
**Status:** ✅ Final
