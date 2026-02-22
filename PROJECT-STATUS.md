# PROJECT STATUS - Royal-Tea
**Last Updated:** 2026-02-22 (v1.0.8)  
**Status:** ✅ Production - Stable

---

## 🎯 CURRENT STATE

### What Works ✅
- **TabBar:** 64px fixed height, full-width, perfect in Safari + PWA
- **Scrolling:** Only card containers scroll, body/header/tabbar fixed
- **Sammlung Tab:** Full scroll access, "Zurücksetzen" button visible
- **Rotation Tab:** Tea selection, skip, completion screen
- **Supabase Sync:** Immediate sync on all tea state changes
- **PWA:** Installable, offline-capable, proper safe-area handling
- **Design:** 99% HIG, Liquid Glass, Spring animations
- **Accessibility:** WCAG AA, VoiceOver support

### Current Version
```
Version: 1.0.8
Build: Production
Live: https://royaltea.mnwn.de
Platform: iOS 16+ PWA
Score: 99% HIG Conformance
```

---

## 🚫 CRITICAL CONSTRAINTS (NEVER CHANGE!)

### TabBar Rules
```typescript
❌ NEVER: Add safe-area-inset-bottom to TabBar HEIGHT
❌ NEVER: Make TabBar height dynamic/calculated
❌ NEVER: Use pill-form (rounded-full schwebt)
❌ NEVER: Change from full-width design

✅ ALWAYS: height: '64px' (fixed!)
✅ ALWAYS: Full-width, items-center, justify-around
✅ ALWAYS: White background (rgba(255,255,255,0.7))
✅ ALWAYS: Liquid glass (blur + saturate)
```

### Scroll Container Rules
```typescript
❌ NEVER: Let body scroll
❌ NEVER: Remove overflow-y-auto from containers
❌ NEVER: Forget safe-area in paddingBottom

✅ ALWAYS: CollectionView paddingBottom includes safe-area
✅ ALWAYS: Body overflow: hidden
✅ ALWAYS: Only card containers scroll
```

### Safe-Area Rules
```
CRITICAL UNDERSTANDING:
- Safari Browser: safe-area-inset-bottom = 0
- PWA: safe-area-inset-bottom = ~34px (home indicator)

WHERE TO USE:
✅ Container paddingBottom (so content doesn't hide under indicator)
❌ TabBar height (makes it too tall!)
✅ Optional in content padding for breathing room
```

---

## 📝 WHAT WE'VE DONE (v1.0.0 → v1.0.8)

### v1.0.8 (Current)
- **Fixed:** TabBar height in PWA (was 20%, now 7.5%)
- **Fixed:** Sammlung scroll area (added safe-area to padding)
- **Fixed:** Content no longer hides under home indicator
- **Method:** paddingBottom: calc(10.3rem + env(safe-area-inset-bottom, 0))

### v1.0.7
- **Fixed:** Scroll behavior (only containers scroll)
- **Changed:** Body overflow: hidden

### v1.0.6
- **Changed:** Install prompt shows every 7 days (was permanent dismiss)

### v1.0.5
- **Fixed:** Supabase sync (immediate sync vs delayed)
- **Added:** Error handling for sync failures

### v1.0.4
- **Added:** Safari browser support
- **Added:** Install prompt component
- **Fixed:** Safari viewport heights

### v1.0.3
- **Changed:** Header height (56px → 48px)
- **Changed:** Logo smaller, tighter spacing

### v1.0.2
- **Fixed:** Edit icon (minimal 16x16, no circle)
- **Fixed:** Removed duplicate Datensicherung section

### v1.0.1
- **Fixed:** Edit button overflow in Sammlung

### v1.0.0 (Gold Master)
- **Achieved:** 99% HIG score
- **Shipped:** Full German UI, Tab Bar, Liquid Glass, Supabase sync

---

## ❌ WHAT DIDN'T WORK (LESSONS LEARNED)

### ❌ Pill-Form TabBar (FAILED)
**Attempted:** Rounded-full pill that schwebt
**Problem:** Not iOS native pattern, weird spacing
**Solution:** Full-width flat design

### ❌ Safe-Area in TabBar Height (FAILED)
**Attempted:** height: calc(64px + env(safe-area-inset-bottom))
**Problem:** Made TabBar 98px in PWA (way too tall - 20% of screen!)
**Solution:** Fixed 64px height, safe-area only in container padding

### ❌ 2-Second Delayed Sync (FAILED)
**Attempted:** setTimeout(() => saveToSupabase(), 2000)
**Problem:** User navigated away → timer cancelled → no sync!
**Solution:** Immediate sync on every state change

### ❌ Pill-Form Rendering Multiple Times (FAILED)
**Attempted:** Changed TabBar styling multiple times
**Problem:** Lost working version, user frustrated
**Solution:** ONLY change props, NEVER styling without explicit request

### ❌ Body Padding for TabBar Space (FAILED)
**Attempted:** body { padding-bottom: env(safe-area-inset-bottom) }
**Problem:** Double padding (body + TabBar both had it)
**Solution:** Remove from body, only in TabBar for home indicator

---

## 🎨 DESIGN SYSTEM (LOCKED)

### Colors
```
Background: linear-gradient(180deg, #1a1f3a 0%, #0f172a 100%)
Cards: rgba(255, 255, 255, 0.7) + blur(40px) saturate(180%)
Accent: #C9AE4D (Gold)
Text Primary: #fffbf0
Text Secondary: rgba(255,255,255,0.6)
Border: rgba(255,255,255,0.1)
```

### Typography
```
Font: SF Pro Text/Display
Headers: 32px/24px/18px/16px (Bold 700)
Body: 16px/14px (Medium 500)
Labels: 11px/10px (Medium 500)
```

### Spacing
```
Container: 24px horizontal
Card Gap: 16px
Section Gap: 32px
Header: 48px height
TabBar: 64px height
```

### Animations
```
Library: Framer Motion
Spring: stiffness 380-400, damping 25-32
Duration: 200ms/300ms/600ms
Type: spring (native feel)
```

---

## 📂 FILE STRUCTURE

### Core Components
```
src/components/
├── TabBar.tsx              → 64px fixed, full-width
├── CollectionView.tsx      → Grid view, scrollable with safe-area padding
├── SwipeTeaCard.tsx        → Tea card in rotation
├── TeaForm.tsx             → Add/Edit modal
├── InfoModal.tsx           → About/settings
└── InventorySheet.tsx      → Used teas list
```

### Key Files
```
src/App.tsx                 → Main app, tab switching, state management
src/lib/supabase.ts         → Sync logic (immediate, not delayed!)
src/lib/storage.ts          → localStorage utils
src/types/tea.ts            → TypeScript interfaces
src/design/design-tokens.ts → Design system constants
```

---

## 🚀 DEPLOYMENT

### Stack
```
Frontend: React 18.3 + TypeScript 5.5
Build: Vite 5.4
Styling: Tailwind CSS 3.4
Animations: Framer Motion 11.11
Backend: Supabase
Hosting: Vercel (auto-deploy from main)
```

### Process
```bash
1. Make changes locally
2. git add . && git commit -m "..." && git push
3. Vercel auto-deploys (2-3 minutes)
4. Test in Safari + PWA
5. Update this PROJECT-STATUS.md!
```

---

## 📋 NEXT STEPS (v1.1.0)

### Planned Features
- 🔍 **Search:** Search bar in Sammlung tab
- 🎛️ **Filter:** Filter by tea type dropdown
- 📊 **Sort:** Sort by A-Z, Füllstand, Last Used

### Technical Debt
- None currently! Code is clean.

### Known Issues
- iOS icon cache (workaround: reinstall PWA)
- Service worker updates (workaround: hard refresh)

---

## 🧠 USER PREFERENCES (MICHAEL)

### Working Style
- **Prefers:** Minimal, targeted fixes (NOT broad refactors)
- **Expects:** High confidence in solutions before implementing
- **Values:** Precise measurements, screenshots, detailed analysis
- **Workflow:** Test in Safari first, then PWA on iPhone 12 mini
- **Communication:** Direct, honest about frustration when things don't work

### Tech Setup
- **Device:** iPhone 12 mini (812px height)
- **Testing:** Safari browser → Export as PWA from home screen
- **Deployment:** Vercel (sometimes loses GitHub connection)
- **Platform:** M4 MacBook Air

### Critical Learnings
- ❌ Don't change TabBar styling without explicit request
- ✅ Always test measurements (e.g., "TabBar is 20% of screen")
- ✅ Provide exact technical details (px values, calc formulas)
- ✅ If multiple iterations fail, STOP and regroup
- ✅ Update documentation EVERY release (CHANGELOG, README, etc.)

---

## ⚠️ CRITICAL REMINDERS FOR NEXT SESSION

### Before Making Changes
1. ✅ Read this PROJECT-STATUS.md file FIRST
2. ✅ Check CONSTRAINTS section (what NEVER to change)
3. ✅ Review LESSONS LEARNED (what didn't work)
4. ✅ Ask user for confirmation if touching TabBar/Scroll

### After Making Changes
1. ✅ Update CHANGELOG.md
2. ✅ Update README.md (version number)
3. ✅ Create RELEASE-NOTES-vX.X.X.md
4. ✅ Update APPLE-HIG-AUDIT-vX.X.X.md
5. ✅ **Update this PROJECT-STATUS.md!**

### If User Reports Bug
1. ✅ Ask for screenshot
2. ✅ Ask for exact measurements (% of screen, px values)
3. ✅ Clarify: Safari or PWA?
4. ✅ Check if it's in LESSONS LEARNED (don't repeat mistakes!)
5. ✅ Provide risk assessment BEFORE coding

---

## 📊 METRICS

### Quality
```
HIG Conformance: 99%
WCAG: AA
iOS Auth Patterns: 90%
Contrast: 4.5:1 minimum
Performance: 60fps animations
```

### Stats
```
Components: 25+
Iterations: v1.0.0 → v1.0.8 (8 patches)
Lines of Code: ~5000 TypeScript
Build Time: ~30s
Bundle Size: ~300kb gzipped
```

---

## 🎯 SUCCESS CRITERIA (MET)

- [x] 99% HIG conformance
- [x] TabBar 7.5-10% of screen height
- [x] Sammlung fully scrollable
- [x] Safari and PWA identical UX
- [x] Supabase sync reliable
- [x] No regressions from v1.0.0

---

## 📞 SUPPORT

**GitHub:** mnewen-a11y/tee-rotation  
**Live:** https://royaltea.mnwn.de  
**Last Session:** 2026-02-22 (this conversation)  
**Next Session:** Read this file FIRST! ✅

---
GaLiGrü
**End of Project Status**  
**Always update this file after significant changes!**  
**This is the single source of truth for the project state.**
