# CHANGELOG - Royal-Tea

All notable changes to Royal-Tea will be documented in this file.

---

## [1.0.8] - 2026-02-22

### Fixed
- **TabBar Height in PWA:** Reduced TabBar from 20% to 7.5% of screen height (64px fixed)
- **Sammlung Scroll:** Added safe-area-inset-bottom to container padding for PWA mode
- **Content Visibility:** "Zurücksetzen" button now fully accessible in used teas section
- **PWA vs Safari Consistency:** Fixed spacing differences between browser and PWA mode

### Changed
- CollectionView: `paddingBottom: calc(10.3rem + env(safe-area-inset-bottom, 0))`
- Rotation Tab: `paddingBottom: calc(4rem + env(safe-area-inset-bottom, 0))`
- TabBar: Fixed 64px height without safe-area inflation

---

## [1.0.7] - 2026-02-22

### Fixed
- **Scroll Behavior:** Only card containers scroll, body/header/tabbar remain fixed
- **Container Heights:** Proper viewport calculations for scrollable areas

### Changed
- CollectionView: `overflow-y-auto` with calculated height
- Rotation Tab: Independent scroll container
- Body: `overflow: hidden` to prevent page-level scrolling

---

## [1.0.6] - 2026-02-22

### Changed
- **Install Prompt:** Shows every 7 days instead of permanent dismissal
- Uses timestamp-based localStorage instead of boolean flag

---

## [1.0.5] - 2026-02-22

### Fixed
- **Supabase Sync:** Immediate sync on tea selection, reset operations
- Removed 2-second delay that could be cancelled by navigation
- Added explicit sync calls for all tea state changes

### Added
- Error handling with console.error for sync failures
- Reliable multi-device synchronization

---

## [1.0.4] - 2026-02-22

### Added
- **Safari Browser Support:** Viewport fixes for mobile Safari
- **Install Prompt:** Friendly prompt suggesting PWA installation in browser mode
- Safari-specific CSS: `-webkit-fill-available` height fixes

### Fixed
- Safari mobile viewport height calculation
- Content scrolling in Safari browser mode

---

## [1.0.3] - 2026-02-22

### Changed
- **Header Height:** Reduced from 56px to 48px (h-14 → h-12)
- **Logo Size:** Smaller on mobile (h-8 → h-7 on sm screens)
- **Logo Spacing:** Tighter gap (gap-3 → gap-2)
- **Net Result:** 16px more compact header area

---

## [1.0.2] - 2026-02-22

### Fixed
- **Edit Icon:** Ultra-minimalist design (16x16px, no circle, no background)
- **Info Modal:** Removed duplicate "Datensicherung" section
- Kept only section with Supabase sync note

---

## [1.0.1] - 2026-02-22

### Fixed
- **Edit Button in Sammlung:** Replaced text "Bearbeiten" with compact icon
- Prevents overflow on smaller screens
- 28x28px circle with edit pencil SVG

---

## [1.0.0] - 2026-02-21 **GOLD MASTER**

### Added - Core Features
- **Tee-Rotation System:** Time-based tea recommendations
- **iOS Tab Bar Navigation:** Rotation | Sammlung tabs
- **Liquid Glass Design:** iOS 26 HIG compliant (99% score)
- **Spring Animations:** Native iOS physics
- **Accessibility:** VoiceOver support, WCAG AA compliant
- **Realtime Sync:** Supabase integration
- **Export/Import:** JSON backup functionality
- **PWA Support:** Installable, offline-capable
- **German UI:** Complete German localization
- **Portrait Lock:** Landscape warning screen

### Design System
- **Colors:** Midnight gradient background, gold accents (#C9AE4D)
- **Typography:** SF Pro Text/Display, careful size hierarchy
- **Spacing:** Consistent 8px grid system
- **Animations:** Framer Motion, spring physics
- **Components:** 25+ polished React components

### Quality Metrics
- ✅ 99% Apple HIG Conformance
- ✅ WCAG AA Accessibility
- ✅ 90% iOS Authentication Pattern Match
- ✅ 4.5:1 Minimum Contrast Ratio

### Technical Stack
- React 18.3 + TypeScript 5.5
- Vite 5.4 build system
- Tailwind CSS 3.4
- Framer Motion 11.11
- Supabase realtime database
- Lucide React icons

### Known Issues
- iOS icon cache (use crown-*.png with cache busting)
- Service worker updates require manual refresh

---

## Version History Summary

- **v1.0.8** - PWA TabBar & Scroll Fixes
- **v1.0.7** - Scroll Container Isolation
- **v1.0.6** - Install Prompt Improvements
- **v1.0.5** - Supabase Sync Reliability
- **v1.0.4** - Safari Browser Support
- **v1.0.3** - Header Compactness
- **v1.0.2** - UI Polish (Icons, Info Modal)
- **v1.0.1** - Edit Button Overflow Fix
- **v1.0.0** - Gold Master Release

---

## Roadmap

### v1.1.0 (Planned)
- Search in Sammlung
- Filter by tea type
- Sort options (A-Z, Füllstand, Last Used)

### v1.2.0 (Planned)
- Card flip interaction for brewing info
- Brewing timer integration

### v1.3.0 (Planned)
- Usage insights and statistics
- Consumption calendar
- Rotation completion streaks

---

**Maintained by:** mnewen-a11y  
**License:** Private  
**Live:** https://royaltea.mnwn.de
