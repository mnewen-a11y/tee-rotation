# Acceptance Criteria: v1.1.0 Dynamic Pot Selection

**Epic:** ROYAL-TEA-EPIC-001  
**Version:** v1.1.0  
**Last Updated:** 2026-02-22  
**Status:** Definition of Done

---

## Overview

This document defines the complete acceptance criteria for v1.1.0. **ALL criteria must be met** before the feature is considered complete and ready for production release.

---

## Functional Requirements

### FR-001: Pot Size Selection
**Status:** [ ] Complete

- [ ] User can select from 3 pot sizes (Klein/Mittel/Groß)
- [ ] Only one pot can be selected at a time
- [ ] Selection state is visually clear (gold border + background)
- [ ] Haptic feedback (10ms) on each selection
- [ ] Selection change is instant (< 100ms)

**Verification:** Manual test TC-011, TC-012

---

### FR-002: Auto-Selection with Presets
**Status:** [ ] Complete

- [ ] Klein pot auto-selected when card flips
- [ ] Preset dosage based on tea type:
  - [ ] Grüntee: Klein 2.5g / Mittel 5g / Groß 8g
  - [ ] Schwarztee: Klein 3g / Mittel 5g / Groß 8g
  - [ ] Kräutertee: Klein 3g / Mittel 5.5g / Groß 9g
- [ ] Preset applies when no custom dosage set
- [ ] Custom dosage overrides preset when saved

**Verification:** Manual test TC-002, TC-011

---

### FR-003: Card Flip Interaction
**Status:** [ ] Complete

- [ ] Tap [Auswählen] triggers card flip
- [ ] 3D rotateY(180deg) animation
- [ ] Duration: 0.6s
- [ ] Timing: cubic-bezier(0.4, 0.0, 0.2, 1)
- [ ] Front card shows tea details
- [ ] Back card shows pot selection
- [ ] Card dimensions constant (520px height)
- [ ] Smooth at 60 FPS

**Verification:** Manual test TC-006, TC-007, TC-008, Performance test TC-031

---

### FR-004: Inline Dosage Editing
**Status:** [ ] Complete

- [ ] Edit icon (✏️) visible only on selected pot
- [ ] Tap ✏️ enters edit mode
- [ ] Edit UI shows: [−] value [+]
- [ ] [+] button increases by 0.5g
- [ ] [−] button decreases by 0.5g
- [ ] Value range: 0–20g (clamped)
- [ ] Each tap: haptic feedback (5ms)
- [ ] Each change: scale animation (1.0 → 1.15 → 1.0)
- [ ] Auto-save (no save button needed)
- [ ] Exit methods work:
  - [ ] Tap outside row
  - [ ] Tap [Bestätigen]
  - [ ] Select different pot

**Verification:** Manual test TC-016 through TC-020

---

### FR-005: Füllstand Calculation
**Status:** [ ] Complete

- [ ] Füllstand reduces by selected pot's dosage
- [ ] Calculation: `newFüllstand = max(0, current - dosage)`
- [ ] Never goes negative
- [ ] Accurate for all pot sizes:
  - [ ] Klein dosage correct
  - [ ] Mittel dosage correct
  - [ ] Groß dosage correct
- [ ] Custom dosages calculated correctly

**Verification:** Manual test TC-004, TC-021, TC-022, TC-023

---

### FR-006: Confirmation Flow
**Status:** [ ] Complete

- [ ] [Bestätigen] button commits selection
- [ ] Card flips back to front (0.6s)
- [ ] Success overlay appears
- [ ] Success message format: "{Tea} ausgewählt! {Pot} • {Dosage}g"
- [ ] Example: "Sencha ausgewählt! Klein • 2,5g"
- [ ] Füllstand bar animates to new value (0.5s)
- [ ] Overlay auto-dismisses after 2s
- [ ] Returns to Rotation tab
- [ ] Database updated with new füllstand

**Verification:** Manual test TC-021, TC-022, TC-023, TC-024

---

### FR-007: Cancellation Flow
**Status:** [ ] Complete

- [ ] [← Zurück] button available
- [ ] Tap triggers card flip back
- [ ] No füllstand change
- [ ] No database write
- [ ] Returns to Rotation tab
- [ ] User can select different tea

**Verification:** Manual test TC-009

---

### FR-008: Low Füllstand Warning
**Status:** [ ] Complete

- [ ] Warning when `füllstand < dosage`
- [ ] Warning badge: "⚠️ Nur noch Xg verfügbar"
- [ ] Pot still selectable (not disabled)
- [ ] If confirmed: füllstand → 0g
- [ ] Success screen shows warning: "Tee aufgebraucht"

**Verification:** Manual test TC-026

---

### FR-009: Empty Tea Handling
**Status:** [ ] Complete

- [ ] When füllstand = 0g:
  - [ ] [Auswählen] button disabled
  - [ ] Button text: "Aufgebraucht"
  - [ ] Button grayed out
  - [ ] Cannot flip card
- [ ] User must refill from Sammlung tab

**Verification:** Manual test TC-027

---

## Data Requirements

### DR-001: Database Schema
**Status:** [ ] Complete

- [ ] `dosierung_klein` column exists (DECIMAL(4,1))
- [ ] `dosierung_mittel` column exists (DECIMAL(4,1))
- [ ] `dosierung_gross` column exists (renamed from `dosierung`)
- [ ] All existing teas backfilled with presets
- [ ] Migration rollback tested and works

**Verification:** Database inspection, manual test TC-001

---

### DR-002: Data Persistence
**Status:** [ ] Complete

- [ ] Custom dosages save to database
- [ ] Füllstand updates persist
- [ ] `zuletzt_getrunken` updates on confirm
- [ ] `updated_at` timestamp updates
- [ ] Data survives app reload
- [ ] Supabase sync works correctly

**Verification:** Manual test TC-003, TC-005

---

### DR-003: Data Integrity
**Status:** [ ] Complete

- [ ] No negative füllstand values in database
- [ ] Dosage values within valid range (0-20g)
- [ ] No data loss during migration
- [ ] Existing teas unaffected by changes
- [ ] All CRUD operations functional

**Verification:** Manual test TC-004, database queries

---

## UI/UX Requirements

### UX-001: Apple HIG Compliance
**Status:** [ ] Complete

- [ ] All tap targets ≥44pt minimum
  - [ ] Pot rows: 72px ✓
  - [ ] Buttons: ≥44px ✓
  - [ ] Adjust buttons: 38px (close, acceptable) ✓
- [ ] Visual feedback < 100ms
- [ ] Animations natural and smooth
- [ ] Follows iOS native patterns
- [ ] No modals (inline editing)
- [ ] Haptic feedback appropriate

**Verification:** Manual inspection, test TC-040

---

### UX-002: Joy of Use
**Status:** [ ] Complete

- [ ] Card flip feels delightful
- [ ] Preset selection reduces taps (90% use Klein)
- [ ] Edit mode discoverable but not intrusive
- [ ] Auto-save feels natural
- [ ] Success feedback satisfying
- [ ] No frustrating interactions
- [ ] Sub-3-tap flow for majority

**Verification:** User feedback, manual testing

---

### UX-003: Visual Design Quality
**Status:** [ ] Complete

- [ ] Liquid Glass effect consistent
- [ ] Typography hierarchy clear:
  - [ ] Dosage most prominent (30px gold)
  - [ ] Pot name secondary (13px uppercase)
  - [ ] Volume tertiary (17px)
- [ ] Colors from design system
- [ ] Spacing consistent (8px grid)
- [ ] Border radius consistent
- [ ] Shadows appropriate
- [ ] No icons (typography-focused) ✓

**Verification:** Visual inspection against UI spec

---

### UX-004: Animations
**Status:** [ ] Complete

- [ ] Card flip: 60 FPS, 0.6s duration
- [ ] Row selection: smooth transition (0.3s)
- [ ] Edit mode entry/exit: smooth (0.3s)
- [ ] Dosage change: scale animation (0.15s)
- [ ] Füllstand bar: smooth update (0.5s)
- [ ] Success screen: bounce animation (0.6s)
- [ ] All animations GPU-accelerated (transform/opacity)

**Verification:** Performance test TC-031, TC-032

---

## Technical Requirements

### TR-001: TypeScript Implementation
**Status:** [ ] Complete

- [ ] All types defined correctly
- [ ] No `any` types used
- [ ] Tea interface updated
- [ ] PotSize enum created
- [ ] DOSAGE_PRESETS constant defined
- [ ] Helper functions typed
- [ ] Zero TypeScript errors

**Verification:** Build succeeds, no TS errors

---

### TR-002: Component Architecture
**Status:** [ ] Complete

- [ ] CardFlipper component created
- [ ] PotSelectionCard component created
- [ ] PotRow component created
- [ ] SuccessScreen component updated
- [ ] SwipeTeaCard modified correctly
- [ ] App.tsx state management correct
- [ ] All components follow React best practices

**Verification:** Code review

---

### TR-003: State Management
**Status:** [ ] Complete

- [ ] State flow clear and predictable
- [ ] No unnecessary re-renders
- [ ] State updates atomic
- [ ] No race conditions
- [ ] Clean state on unmount
- [ ] Optimistic UI for network requests

**Verification:** Code review, manual testing

---

### TR-004: Performance
**Status:** [ ] Complete

- [ ] Card flip: 60 FPS sustained
- [ ] Edit mode: instant response (< 50ms)
- [ ] No memory leaks
- [ ] Bundle size increase < 20KB
- [ ] First contentful paint unchanged
- [ ] Works on iPhone 12 mini (target device)
- [ ] Works on iPhone 8 (if available)

**Verification:** Performance tests TC-031 through TC-035

---

### TR-005: Browser Compatibility
**Status:** [ ] Complete

- [ ] Safari (iOS 17+) ✓
- [ ] Safari (macOS) ✓
- [ ] PWA mode (Add to Home Screen) ✓
- [ ] Chrome (optional, for debugging) ✓
- [ ] No browser-specific bugs

**Verification:** Manual testing on devices

---

## Accessibility Requirements

### AC-001: VoiceOver Support
**Status:** [ ] Complete

- [ ] All interactive elements have labels
- [ ] Pot rows announced correctly
- [ ] Edit icon announced: "Dosierung bearbeiten"
- [ ] Buttons announced clearly
- [ ] State changes announced
- [ ] Tab order logical

**Verification:** Accessibility test TC-036, TC-037

---

### AC-002: Keyboard Navigation
**Status:** [ ] Complete

- [ ] All elements reachable via Tab
- [ ] Enter/Space select elements
- [ ] Escape exits edit mode
- [ ] Focus indicators visible (3px blue)
- [ ] Focus never trapped
- [ ] Shortcuts intuitive

**Verification:** Accessibility test TC-037, TC-038

---

### AC-003: WCAG 2.1 AA Compliance
**Status:** [ ] Complete

- [ ] Color contrast ≥4.5:1 for all text
  - [ ] Card title: Pass ✓
  - [ ] Dosage gold: Pass ✓
  - [ ] Pot name: Pass ✓
  - [ ] Edit blue: Pass ✓
- [ ] Tap targets ≥44pt (see UX-001)
- [ ] Focus indicators visible
- [ ] No color-only information
- [ ] Text scalable

**Verification:** Accessibility test TC-039, TC-040

---

### AC-004: Reduced Motion
**Status:** [ ] Complete

- [ ] `prefers-reduced-motion` detected
- [ ] Card flip becomes opacity fade
- [ ] All other animations remain
- [ ] Functionality unchanged
- [ ] No disorientation

**Verification:** Manual test TC-010

---

## Testing Requirements

### TE-001: Manual Test Coverage
**Status:** [ ] Complete

- [ ] All 40 test cases executed
- [ ] All P0 tests passed
- [ ] All P1 tests passed (or documented exceptions)
- [ ] Edge cases tested
- [ ] Performance tests passed
- [ ] Accessibility tests passed
- [ ] No critical bugs

**Verification:** Test summary completed

---

### TE-002: Device Testing
**Status:** [ ] Complete

- [ ] Tested on iPhone 12 mini (primary)
- [ ] Tested in Safari browser
- [ ] Tested in PWA mode
- [ ] Tested on additional device (if available)
- [ ] No device-specific bugs

**Verification:** Test devices logged in summary

---

### TE-003: Regression Testing
**Status:** [ ] Complete

- [ ] Existing features unaffected:
  - [ ] Rotation algorithm still works
  - [ ] Sammlung edit still works
  - [ ] TabBar navigation works
  - [ ] Füllstand display accurate
  - [ ] All v1.0.8 features functional
- [ ] No new console errors
- [ ] No performance regressions

**Verification:** Regression test suite

---

## Documentation Requirements

### DO-001: Code Documentation
**Status:** [ ] Complete

- [ ] All new components have JSDoc comments
- [ ] Complex logic explained
- [ ] Props interfaces documented
- [ ] Helper functions documented
- [ ] README.md updated

**Verification:** Code review

---

### DO-002: User-Facing Documentation
**Status:** [ ] Complete

- [ ] CHANGELOG.md updated (v1.1.0 entry)
- [ ] README.md features section updated
- [ ] RELEASE-NOTES-v1.1.0.md created
- [ ] Version number incremented everywhere

**Verification:** Documentation review

---

### DO-003: Technical Documentation
**Status:** [ ] Complete

- [ ] EPIC-v1.1.0.md finalized
- [ ] UX-SPEC.md complete
- [ ] UI-SPEC.md complete
- [ ] DEV-SPEC.md complete
- [ ] TASK-LIST.md complete
- [ ] TEST-CASES.md complete
- [ ] ACCEPTANCE-CRITERIA.md complete
- [ ] APPLE-HIG-AUDIT-v1.1.0.md updated
- [ ] PROJECT-STATUS.md updated

**Verification:** All docs present in repo

---

## Deployment Requirements

### DE-001: Pre-Deployment
**Status:** [ ] Complete

- [ ] Database migration tested locally
- [ ] Migration tested on staging
- [ ] Build succeeds without errors
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Preview build tested

**Verification:** Build logs clean

---

### DE-002: Production Deployment
**Status:** [ ] Complete

- [ ] Migration run on production database
- [ ] All existing teas have presets
- [ ] Code deployed to Vercel
- [ ] Deployment successful
- [ ] No errors in production logs
- [ ] Smoke test passed

**Verification:** Production monitoring

---

### DE-003: Post-Deployment Monitoring
**Status:** [ ] Complete

- [ ] Monitor for 1 hour post-deploy
- [ ] Check Supabase for errors
- [ ] Check Vercel logs
- [ ] No user-reported bugs (first 24h)
- [ ] Füllstand accuracy verified
- [ ] Edit mode usage < 5% (as expected)

**Verification:** Monitoring dashboards

---

## Sign-Off Checklist

### Product Owner Approval
- [ ] All functional requirements met
- [ ] UX requirements met
- [ ] Joy of Use achieved
- [ ] Jony Ive would approve ("Perfect.")

**Signature:** ________________  
**Date:** ________________

---

### Technical Lead Approval
- [ ] All technical requirements met
- [ ] Code quality acceptable
- [ ] Performance targets met
- [ ] No technical debt introduced

**Signature:** ________________  
**Date:** ________________

---

### QA Approval
- [ ] All test cases passed
- [ ] No critical bugs
- [ ] No blocking issues
- [ ] Ready for production

**Signature:** ________________  
**Date:** ________________

---

## Definition of Done

**v1.1.0 is considered DONE when:**

✅ All functional requirements complete (FR-001 through FR-009)  
✅ All data requirements complete (DR-001 through DR-003)  
✅ All UI/UX requirements complete (UX-001 through UX-004)  
✅ All technical requirements complete (TR-001 through TR-005)  
✅ All accessibility requirements complete (AC-001 through AC-004)  
✅ All testing requirements complete (TE-001 through TE-003)  
✅ All documentation requirements complete (DO-001 through DO-003)  
✅ All deployment requirements complete (DE-001 through DE-003)  
✅ All sign-offs obtained  
✅ Zero critical bugs  
✅ Production deployment successful  
✅ Monitoring shows no issues  

---

## Final Status

**Overall Status:** [ ] COMPLETE - Ready for Release

**Date Completed:** ________________  
**Released to Production:** ________________  
**Version:** v1.1.0

---

**Last Updated:** 2026-02-22  
**Document Owner:** Michael (Product Owner)
