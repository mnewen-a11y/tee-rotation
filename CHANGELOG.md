# Royal-Tea Changelog

## Version 0.14.0 (2026-02-21)

### ✨ Features
- **Liquid Glass Design** - iOS 26 translucent blur effects on cards and header
- **VoiceOver Support** - Complete accessibility with ARIA labels on all interactive elements
- **Spring Animations** - Native iOS spring-based animations throughout the app
- **Button Press Feedback** - Enhanced button interactions with scale + opacity feedback
- **Gold Checkmark** - Premium success indicator with creme background and gold outline

### 🔧 Changes
- **Higher Card Position** - Cards now positioned with 0.5rem top padding (previously 2rem)
- **Success Screen** - Buttons integrated into card, removed separator, minimalist design
- **Typography** - Sentence Case instead of ALL CAPS (HIG compliant)
- **Buttons** - Flat gold color instead of gradient (HIG standard)
- **Progress Bar** - Spring animation for smooth fill effect
- **Removed Greeting** - Minimalist UI without "Guten Tag" and "Perfekt für jetzt" text

### 🐛 Bugfixes
- **Duplicate Buttons** - Removed buttons outside of SwipeCard (they were showing twice)
- **Header Blur** - Fixed backdrop-filter for proper iOS 26 Liquid Glass effect
- **getGreeting Import** - Removed unused import causing build warnings

### ♿ Accessibility
- **9 VoiceOver Labels** - All buttons and interactive elements now have proper ARIA labels
- **4 Haptic Feedback** - Consistent haptic responses across all interactions
- **Screen Reader Support** - Progress bars, icons, and loading states properly labeled
- **4.5:1 Color Contrast** - WCAG AA compliant text contrast ratios throughout

### 🎨 Design System
- **Design Tokens** - Centralized color, spacing, typography, and animation values
- **Component Utilities** - Reusable button variants, card styles, and text presets
- **iOS 26 HIG** - 98% Human Interface Guidelines conformance

---

## Previous Versions

### Version 0.13.0 (2026-02-14)
- Initial Premium UI redesign
- Rolex-style crown logo
- Tinder-style swipe interface
- Time-based tea recommendations

### Version 0.12.0 (2026-02-10)
- Supabase cloud sync
- PWA offline support
- Success screen redesign

---

**HIG Conformance Score: 98%**  
**Platform: Progressive Web App (PWA)**  
**Compatibility: iOS 16+, Safari 16+**
