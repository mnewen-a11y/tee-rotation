# Test Cases: v1.1.0 Dynamic Pot Selection

**Epic:** ROYAL-TEA-EPIC-001  
**Version:** v1.1.0  
**Last Updated:** 2026-02-22  
**Status:** Ready for Testing

---

## Test Environment

### Devices
- **Primary:** iPhone 12 mini (iOS 17+)
- **Secondary:** iPhone 14 Pro (if available)
- **Desktop:** Safari on macOS (for debugging)

### Test Modes
- **Safari Browser:** https://royal-tea.vercel.app
- **PWA Mode:** Add to Home Screen → Launch

### Prerequisites
- Fresh Supabase database with test data
- Multiple teas with varying füllstand levels
- All tea types represented (Grüntee, Schwarztee, etc.)

---

## Test Case Categories

1. Data Layer (TC-001 to TC-005)
2. Card Flip (TC-006 to TC-010)
3. Pot Selection (TC-011 to TC-015)
4. Edit Mode (TC-016 to TC-020)
5. Confirmation (TC-021 to TC-025)
6. Edge Cases (TC-026 to TC-030)
7. Performance (TC-031 to TC-035)
8. Accessibility (TC-036 to TC-040)

---

## Data Layer Tests

### TC-001: Tea Object Has All Dosage Fields
**Priority:** P0  
**Type:** Integration

**Preconditions:**
- Fresh deployment
- Database migration run

**Steps:**
1. Open browser console
2. Inspect a tea object from state/API
3. Check for fields: `dosierungGross`, `dosierungMittel`, `dosierungKlein`

**Expected Result:**
- ✅ All fields present
- ✅ Klein/Mittel may be null (uses presets)
- ✅ Groß always has value

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-002: Presets Apply Correctly by Tea Type
**Priority:** P0  
**Type:** Unit

**Test Data:**
| Tea Type | Klein Expected | Mittel Expected | Groß Expected |
|----------|----------------|-----------------|---------------|
| Grüntee | 2.5g | 5g | 8g |
| Schwarztee | 3g | 5g | 8g |
| Kräutertee | 3g | 5.5g | 9g |

**Steps:**
1. For each tea type
2. Create tea without custom dosages
3. Check preset values applied

**Expected Result:**
- ✅ Presets match table above
- ✅ Values correct for each type

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-003: Custom Dosage Persists After Save
**Priority:** P0  
**Type:** Integration

**Steps:**
1. Select tea (e.g., Sencha)
2. Flip to pot selection
3. Select Klein pot
4. Enter edit mode (tap ✏️)
5. Adjust to custom value (e.g., 3.5g)
6. Tap [Bestätigen]
7. Close app
8. Reopen app
9. Select same tea again
10. Check Klein dosage

**Expected Result:**
- ✅ Klein shows 3.5g (custom value)
- ✅ Not 2.5g (preset)

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-004: Füllstand Calculation Accuracy
**Priority:** P0  
**Type:** Functional

**Test Data:**
| Initial | Pot | Dosage | Expected Result |
|---------|-----|--------|-----------------|
| 50g | Klein | 2.5g | 47.5g |
| 30g | Mittel | 5g | 25g |
| 10g | Groß | 8g | 2g |
| 3g | Groß | 8g | 0g (not -5g!) |

**Steps:**
1. For each row in table
2. Set tea füllstand to Initial
3. Select Pot
4. Tap [Bestätigen]
5. Check füllstand value

**Expected Result:**
- ✅ All calculations match Expected Result column
- ✅ Never negative

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-005: Database Sync After Confirm
**Priority:** P0  
**Type:** Integration

**Steps:**
1. Note tea ID
2. Select tea
3. Select Mittel pot (5g)
4. Tap [Bestätigen]
5. Open Supabase dashboard
6. Query tea by ID
7. Check `fuellstand` and `zuletzt_getrunken` fields

**Expected Result:**
- ✅ `fuellstand` reduced by 5g
- ✅ `zuletzt_getrunken` updated to now
- ✅ `updated_at` updated

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

## Card Flip Tests

### TC-006: Card Flip Animation Smoothness
**Priority:** P0  
**Type:** Visual/Performance

**Steps:**
1. Open app on iPhone 12 mini (PWA mode)
2. Go to Rotation tab
3. Tap [Auswählen] on tea card
4. Observe flip animation
5. Tap [← Zurück]
6. Observe flip back

**Expected Result:**
- ✅ Smooth 60 FPS (no stuttering)
- ✅ 3D effect visible
- ✅ No visual glitches
- ✅ Back card fully visible after flip

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-007: Card Flip Triggers Correctly
**Priority:** P0  
**Type:** Functional

**Steps:**
1. Start on Rotation tab
2. Note tea name (e.g., "Sencha")
3. Tap [Auswählen]
4. Wait for flip to complete

**Expected Result:**
- ✅ Card flips to pot selection
- ✅ Header shows tea name ("Sencha")
- ✅ Subtitle shows "Kanne wählen"
- ✅ Klein pot pre-selected

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-008: Card Dimensions Remain Constant
**Priority:** P1  
**Type:** Visual

**Steps:**
1. Measure card height on front (use browser DevTools)
2. Flip to back
3. Measure card height on back
4. Compare

**Expected Result:**
- ✅ Both sides exactly 520px height
- ✅ No layout shift during flip
- ✅ No content cut off

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-009: Cancel Returns Without Changes
**Priority:** P0  
**Type:** Functional

**Steps:**
1. Note initial füllstand (e.g., 50g)
2. Select tea
3. Flip to pot selection
4. Select Groß (8g)
5. Tap [← Zurück] (cancel)
6. Check füllstand

**Expected Result:**
- ✅ Card flips back to front
- ✅ Füllstand unchanged (still 50g)
- ✅ No database write
- ✅ Back on Rotation tab

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-010: Reduced Motion Fallback
**Priority:** P1  
**Type:** Accessibility

**Steps:**
1. Open iPhone Settings
2. Accessibility → Motion → Reduce Motion ON
3. Open Royal-Tea app
4. Tap [Auswählen]
5. Observe transition

**Expected Result:**
- ✅ No 3D flip (accessibility)
- ✅ Opacity crossfade instead
- ✅ Still functional
- ✅ Content switches correctly

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

## Pot Selection Tests

### TC-011: Klein Pre-Selected on Flip
**Priority:** P0  
**Type:** Functional

**Test Data:**
Test with 3 different tea types

**Steps:**
1. Select Grüntee (Sencha)
2. Tap [Auswählen]
3. Observe pot selection

**Expected Result:**
- ✅ Klein row has gold border
- ✅ Klein row has light gold background
- ✅ Klein row has shadow
- ✅ Mittel and Groß not selected

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-012: Pot Selection Changes State
**Priority:** P0  
**Type:** Functional

**Steps:**
1. Start with Klein selected
2. Tap Mittel row
3. Observe visual change
4. Tap Groß row
5. Observe visual change

**Expected Result:**
- ✅ Tap on Mittel: Klein deselects, Mittel selects
- ✅ Tap on Groß: Mittel deselects, Groß selects
- ✅ Haptic feedback on each tap (10ms)
- ✅ Only one pot selected at a time

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-013: Edit Icon Visibility
**Priority:** P1  
**Type:** Visual

**Steps:**
1. Flip to pot selection
2. Klein is selected
3. Check for edit icon (✏️)
4. Tap Mittel
5. Check Klein for edit icon
6. Check Mittel for edit icon

**Expected Result:**
- ✅ Edit icon visible on selected pot only
- ✅ Opacity ~0.5 (subtle)
- ✅ Icon disappears when pot deselected
- ✅ Icon appears when pot selected

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-014: Rapid Selection Handling
**Priority:** P1  
**Type:** Stress

**Steps:**
1. Tap Klein
2. Immediately tap Mittel
3. Immediately tap Groß
4. Immediately tap Klein
5. Repeat 10 times rapidly

**Expected Result:**
- ✅ No visual glitches
- ✅ Selection state always correct
- ✅ Last tap wins
- ✅ No lag or freeze

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-015: Dosage Displays Correctly
**Priority:** P0  
**Type:** Functional

**Test Data:**
Grüntee (Sencha) with no custom dosages

**Steps:**
1. Select Sencha
2. Flip to pot selection
3. Read dosage values for each pot

**Expected Result:**
- ✅ Klein: 2,5g
- ✅ Mittel: 5g
- ✅ Groß: 8g
- ✅ All values visible and readable

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

## Edit Mode Tests

### TC-016: Enter Edit Mode
**Priority:** P1  
**Type:** Functional

**Steps:**
1. Select tea
2. Flip to pot selection
3. Klein is selected
4. Tap ✏️ icon

**Expected Result:**
- ✅ Row enters edit mode
- ✅ Border: Gold → Blue
- ✅ Background: Light gold → Bright white
- ✅ Edit icon disappears
- ✅ Edit UI appears: [−] 2,5g [+]
- ✅ Transition smooth (0.3s)

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-017: Adjust Dosage with + Button
**Priority:** P1  
**Type:** Functional

**Steps:**
1. Enter edit mode (Klein at 2,5g)
2. Tap [+] button once
3. Observe value
4. Tap [+] again
5. Observe value

**Expected Result:**
- ✅ First tap: 2,5g → 3g
- ✅ Second tap: 3g → 3,5g
- ✅ Haptic feedback each tap (5ms)
- ✅ Scale animation on value
- ✅ Auto-save (no confirm needed)

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-018: Adjust Dosage with − Button
**Priority:** P1  
**Type:** Functional

**Steps:**
1. Enter edit mode (Klein at 2,5g)
2. Tap [−] button 5 times
3. Observe value
4. Tap [−] again
5. Observe value

**Expected Result:**
- ✅ After 5 taps: 0g (2.5 - 2.5)
- ✅ After 6th tap: Still 0g (clamped at minimum)
- ✅ Cannot go negative
- ✅ All taps have haptic feedback

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-019: Edit Mode Auto-Save
**Priority:** P1  
**Type:** Functional

**Steps:**
1. Enter edit mode (Klein at 2,5g)
2. Tap [+] 3 times (now 4g)
3. Tap outside pot row to exit
4. Observe Klein dosage

**Expected Result:**
- ✅ Edit mode exits
- ✅ Klein dosage shows 4g (not 2,5g)
- ✅ Value persisted without save button
- ✅ Edit icon reappears

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-020: Exit Edit Mode Methods
**Priority:** P1  
**Type:** Functional

**Test all exit methods:**

**Method 1: Tap outside**
1. Enter edit mode
2. Tap empty space on card
3. Edit mode exits ✓

**Method 2: Tap [Bestätigen]**
1. Enter edit mode
2. Tap [Bestätigen] button
3. Edit mode exits ✓
4. Card flips back ✓

**Method 3: Select different pot**
1. Klein in edit mode
2. Tap Mittel row
3. Klein edit exits ✓
4. Mittel selected (not in edit) ✓

**Expected Result:**
- ✅ All 3 methods exit correctly
- ✅ Changes persisted in all cases

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

## Confirmation Tests

### TC-021: Confirm with Klein Pot
**Priority:** P0  
**Type:** End-to-End

**Steps:**
1. Tea: Sencha, Füllstand: 50g
2. Select tea → Flip
3. Klein pre-selected (2,5g)
4. Tap [Bestätigen]
5. Observe

**Expected Result:**
- ✅ Card flips back
- ✅ Success overlay appears
- ✅ Message: "Sencha ausgewählt! Klein • 2,5g"
- ✅ Füllstand bar: 50g → 47,5g
- ✅ Overlay dismisses after 2s
- ✅ Returns to Rotation tab

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-022: Confirm with Mittel Pot
**Priority:** P0  
**Type:** End-to-End

**Steps:**
1. Tea: Schwarztee, Füllstand: 40g
2. Select tea → Flip
3. Tap Mittel (5g)
4. Tap [Bestätigen]
5. Observe

**Expected Result:**
- ✅ Success: "Schwarztee ausgewählt! Mittel • 5g"
- ✅ Füllstand: 40g → 35g

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-023: Confirm with Custom Dosage
**Priority:** P1  
**Type:** End-to-End

**Steps:**
1. Tea: Oolong, Füllstand: 30g
2. Select tea → Flip
3. Klein selected
4. Enter edit mode
5. Adjust to 4g
6. Exit edit
7. Tap [Bestätigen]
8. Observe

**Expected Result:**
- ✅ Success: "Oolong ausgewählt! Klein • 4g"
- ✅ Füllstand: 30g → 26g
- ✅ Custom dosage persisted to database

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-024: Success Screen Animation
**Priority:** P1  
**Type:** Visual

**Steps:**
1. Confirm any pot selection
2. Watch success screen closely

**Expected Result:**
- ✅ Black overlay fades in (0.3s)
- ✅ Checkmark ✅ icon scales up with bounce
- ✅ Text fades in
- ✅ Stays visible ~2s
- ✅ Fades out smoothly
- ✅ Returns to rotation

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-025: Multiple Confirmations in Row
**Priority:** P1  
**Type:** Stress

**Steps:**
1. Select tea 1 → Confirm
2. Immediately select tea 2 → Confirm
3. Immediately select tea 3 → Confirm
4. Verify all füllstände

**Expected Result:**
- ✅ All 3 teas updated correctly
- ✅ No race conditions
- ✅ All success screens show
- ✅ Database in consistent state

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

## Edge Case Tests

### TC-026: Low Füllstand Warning
**Priority:** P1  
**Type:** Functional

**Steps:**
1. Tea with füllstand = 3g
2. Select tea → Flip
3. Tap Groß (8g)
4. Observe warning
5. Tap [Bestätigen]
6. Observe result

**Expected Result:**
- ✅ Warning badge: "⚠️ Nur noch 3g verfügbar"
- ✅ Groß still selectable
- ✅ After confirm: Füllstand → 0g
- ✅ Success: "Tee aufgebraucht" warning

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-027: Empty Tea (Füllstand = 0)
**Priority:** P0  
**Type:** Functional

**Steps:**
1. Tea with füllstand = 0g
2. Go to Rotation tab
3. Observe [Auswählen] button

**Expected Result:**
- ✅ Button disabled (grayed out)
- ✅ Text: "Aufgebraucht"
- ✅ Cannot tap button
- ✅ Card does not flip

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-028: Maximum Dosage Limit (20g)
**Priority:** P1  
**Type:** Boundary

**Steps:**
1. Enter edit mode
2. Tap [+] many times
3. Try to exceed 20g

**Expected Result:**
- ✅ Value stops at 20g
- ✅ Cannot go above 20g
- ✅ Button still responsive
- ✅ No error shown

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-029: Network Error During Confirm
**Priority:** P1  
**Type:** Error Handling

**Steps:**
1. Disconnect device from internet
2. Select tea → Flip
3. Select pot
4. Tap [Bestätigen]
5. Observe

**Expected Result:**
- ✅ Success screen still shows (optimistic UI)
- ✅ Local state updates
- ✅ No error shown to user
- ✅ Reconnect → Sync happens in background

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-030: Rapid Card Flip (Spam Auswählen)
**Priority:** P1  
**Type:** Stress

**Steps:**
1. Tap [Auswählen] rapidly 10 times
2. Observe behavior

**Expected Result:**
- ✅ No visual glitches
- ✅ Card flips once (ignores extra taps)
- ✅ Or queues flips gracefully
- ✅ No crash or freeze

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

## Performance Tests

### TC-031: Card Flip FPS (60 FPS Target)
**Priority:** P0  
**Type:** Performance

**Tools:** Chrome DevTools Performance Tab

**Steps:**
1. Open app in Safari
2. Start DevTools recording
3. Tap [Auswählen]
4. Wait for flip complete
5. Stop recording
6. Analyze FPS

**Expected Result:**
- ✅ Consistent 60 FPS
- ✅ No frame drops
- ✅ < 16.7ms per frame

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-032: Edit Mode Transition Performance
**Priority:** P1  
**Type:** Performance

**Steps:**
1. Enter edit mode
2. Check transition smoothness
3. Adjust value 20 times
4. Exit edit mode
5. Check transition smoothness

**Expected Result:**
- ✅ Entry smooth (< 150ms)
- ✅ Each adjustment instant (< 50ms)
- ✅ Exit smooth (< 150ms)
- ✅ No lag perceived

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-033: Memory Usage (No Leaks)
**Priority:** P1  
**Type:** Performance

**Steps:**
1. Open app
2. Note initial memory (DevTools)
3. Perform 50 tea selections (flip → confirm)
4. Check memory again

**Expected Result:**
- ✅ Memory increase < 10MB
- ✅ No continuous growth
- ✅ Garbage collection working

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-034: PWA vs Browser Performance
**Priority:** P1  
**Type:** Performance Comparison

**Steps:**
1. Test flip in Safari browser
2. Note FPS
3. Test same flip in PWA
4. Note FPS
5. Compare

**Expected Result:**
- ✅ Both achieve 60 FPS
- ✅ PWA may be slightly faster
- ✅ No significant difference

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-035: Old Device Performance (iPhone 8 if available)
**Priority:** P1  
**Type:** Compatibility

**Steps:**
1. If iPhone 8 available
2. Install PWA
3. Test card flip
4. Test edit mode

**Expected Result:**
- ✅ 60 FPS or close (55+ acceptable)
- ✅ No crashes
- ✅ Fully functional

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

## Accessibility Tests

### TC-036: VoiceOver Navigation
**Priority:** P1  
**Type:** Accessibility

**Steps:**
1. Enable VoiceOver on iPhone
2. Navigate to pot selection screen
3. Swipe through elements

**Expected Result:**
- ✅ All pots announced correctly
  - "Klein, vierhundert Milliliter, zwei komma fünf Gramm, Taste"
- ✅ Edit icon announced: "Dosierung bearbeiten, Taste"
- ✅ Buttons announced correctly
- ✅ Tab order logical

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-037: Keyboard Navigation
**Priority:** P1  
**Type:** Accessibility

**Steps:**
1. Connect Bluetooth keyboard to iPhone
2. Navigate pot selection with Tab key
3. Select pot with Enter

**Expected Result:**
- ✅ Tab moves through pots
- ✅ Enter selects pot
- ✅ Focus visible (blue outline)
- ✅ Can reach all interactive elements

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-038: Focus Indicators Visible
**Priority:** P1  
**Type:** Accessibility

**Steps:**
1. Use keyboard navigation
2. Tab through all elements
3. Check each focus state

**Expected Result:**
- ✅ Blue 3px outline visible
- ✅ 2px offset from element
- ✅ Never invisible
- ✅ Meets WCAG 2.1 standards

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-039: Color Contrast (WCAG AA)
**Priority:** P1  
**Type:** Accessibility

**Tool:** WebAIM Contrast Checker

**Elements to Check:**
| Element | FG | BG | Ratio | Pass |
|---------|----|----|-------|------|
| Card Title | #1a1f3a | White | >4.5:1 | [ ] |
| Dosage Gold | #C9AE4D | White | >4.5:1 | [ ] |
| Pot Name | rgba(0,0,0,0.5) | White | >4.5:1 | [ ] |
| Edit Blue | #3b82f6 | White | >4.5:1 | [ ] |

**Expected Result:**
- ✅ All pass WCAG AA (4.5:1)

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-040: Tap Target Sizes (44pt Minimum)
**Priority:** P0  
**Type:** Accessibility (HIG Compliance)

**Elements to Measure:**

| Element | Height | Width | HIG Pass |
|---------|--------|-------|----------|
| Pot Row | 72px | Full | [ ] ✅ |
| Edit Icon | 22px + padding | 22px + padding | [ ] |
| Adjust [+] | 38px | 38px | [ ] ⚠️ |
| Adjust [−] | 38px | 38px | [ ] ⚠️ |
| [Bestätigen] | 51px | 50% | [ ] ✅ |

**Expected Result:**
- ✅ All ≥44pt (adjust buttons close, acceptable)

**Actual Result:** [ ]  
**Status:** [ ] Pass [ ] Fail  
**Notes:**

---

### TC-033: Migration Preserves Existing Data
**Priority:** P0  
**Prerequisites:** Fresh migration on test database

**Steps:**
1. Note existing tea count before migration
2. Run migration `007_add_pot_dosages.sql`
3. Query all teas

**Expected:**
- ✅ Same number of teas exist
- ✅ All `fuellstand` values unchanged
- ✅ All `dosierung_gross` = old `dosierung` value
- ✅ All teas have `dosierung_klein` (preset applied)
- ✅ All teas have `dosierung_mittel` (preset applied)
- ✅ No NULL values in new columns

**Actual:** _____

**Status:** ☐ Pass ☐ Fail

---

### TC-034: Custom Dosage Persists Across Pots
**Priority:** P1  
**Prerequisites:** On pot selection

**Steps:**
1. Select Klein pot
2. Edit Klein to 3,5g (custom)
3. Exit edit mode
4. Select Mittel pot (switch)
5. Tap [Bestätigen]
6. Return to same tea
7. Flip to pot selection
8. Check Klein dosage

**Expected:**
- ✅ Klein shows 3,5g (custom saved!)
- ✅ Custom dosage persisted even though Mittel was confirmed
- ✅ Future selections remember 3,5g for Klein

**Actual:** _____

**Status:** ☐ Pass ☐ Fail

---

### TC-035: Migration Rollback Works
**Priority:** P1  
**Prerequisites:** Migration applied to test DB

**Steps:**
1. Run rollback migration
2. Check table structure
3. Query existing teas

**Expected:**
- ✅ `dosierung` column exists (renamed back)
- ✅ `dosierung_klein` column removed
- ✅ `dosierung_mittel` column removed
- ✅ All tea data intact
- ✅ No data loss

**Actual:** _____

**Status:** ☐ Pass ☐ Fail

---

## Test Summary Template

### Execution Summary
- **Date Tested:** ___________
- **Tester:** ___________
- **Device:** ___________
- **App Version:** v1.1.0
- **Build:** ___________

### Results
- **Total Test Cases:** 40
- **Passed:** ___
- **Failed:** ___
- **Blocked:** ___
- **Not Tested:** ___

### Critical Bugs Found
1. 
2. 
3. 

### Minor Issues
1. 
2. 
3. 

### Sign-Off
- [ ] All P0 tests passed
- [ ] No critical bugs
- [ ] Ready for production

**Tester Signature:** ___________  
**Date:** ___________

---

**Status:** ✅ Ready for Testing  
**Last Updated:** 2026-02-22
