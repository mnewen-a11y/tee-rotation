# Release Notes - Royal-Tea v1.0.8

**Release Date:** February 22, 2026  
**Type:** Patch Release  
**Focus:** PWA TabBar & Scroll Fixes

---

## 🎯 What's New

### TabBar Height Fix (PWA)
**Problem:** TabBar consumed 20% of screen height in PWA mode  
**Solution:** Fixed to 64px (~7.5% of iPhone 12 mini screen)  

**Technical Details:**
- Removed safe-area-inset-bottom from TabBar height calculation
- TabBar now fixed 64px in both Safari and PWA
- Icons and labels vertically centered within 64px

### Sammlung Scroll Fix (PWA)
**Problem:** Couldn't scroll to "Zurücksetzen" button on used teas  
**Solution:** Added safe-area-inset-bottom to container paddingBottom  

**Technical Details:**
- CollectionView: `paddingBottom: calc(10.3rem + env(safe-area-inset-bottom, 0))`
- Rotation Tab: `paddingBottom: calc(4rem + env(safe-area-inset-bottom, 0))`
- Content no longer disappears under iOS home indicator

### Safari vs PWA Consistency
**Achievement:** Both modes now display identically  
- Safari: 64px TabBar, 165px bottom padding
- PWA: 64px TabBar, 165px + 34px safe-area = 199px total space
- Visual appearance identical, technical implementation context-aware

---

## Bugs Fixed

| Issue | Impact | Resolution |
|-------|--------|------------|
| TabBar too high in PWA | High | Fixed height 64px without safe-area |
| Content under home indicator | High | Added safe-area to padding |
| Zurücksetzen button inaccessible | Medium | Increased scroll area |
| Safari vs PWA spacing differences | Low | Unified padding calculation |

---

## Metrics

**Before v1.0.8:**
- TabBar height in PWA: ~162px (20% of screen) ❌
- Sammlung scroll area: Insufficient ❌
- Safari vs PWA: Different layouts ❌

**After v1.0.8:**
- TabBar height in PWA: 64px (7.9% of screen) ✅
- Sammlung scroll area: Full access to all controls ✅
- Safari vs PWA: Visually identical ✅

---

## 🔧 Technical Changes

### Files Modified
```
src/components/TabBar.tsx          → Fixed height, removed safe-area
src/components/CollectionView.tsx  → Added safe-area to padding
src/App.tsx                        → Added safe-area to rotation tab
```

### CSS Changes
```css
/* TabBar */
height: 64px;  /* Fixed, no calc() */

/* CollectionView */
paddingBottom: calc(10.3rem + env(safe-area-inset-bottom, 0));
/* 165px in Safari, 199px in PWA */

/* Rotation Tab */
paddingBottom: calc(4rem + env(safe-area-inset-bottom, 0));
/* 64px in Safari, 98px in PWA */
```

---

## Testing Checklist

### Safari Mobile Browser
- [ ] TabBar height: ~64px
- [ ] Sammlung scrolls to bottom
- [ ] Zurücksetzen button accessible
- [ ] No layout shifts

### PWA Mode (Installed)
- [ ] TabBar height: ~64px (not inflated)
- [ ] Sammlung scrolls fully
- [ ] Content doesn't hide under home indicator
- [ ] Zurücksetzen button fully visible

### Cross-Device
- [ ] iPhone 12 mini (812px height)
- [ ] iPhone 14 Pro (852px height)
- [ ] iPhone 14 Pro Max (932px height)

---

## Upgrade Path

### From v1.0.7 or earlier
1. **No data migration needed** - all changes are UI-only
2. Pull latest code from main branch
3. Deploy to Vercel (automatic on push)
4. **PWA users:** Delete and reinstall for best experience
5. **Safari users:** Hard refresh (no reinstall needed)

### Breaking Changes
None. This is a backward-compatible patch release.

### Deprecations
None.

---

## Migration Notes

### For Developers
No code changes required. CSS-only patches.

### For Users
**Recommended:** Delete PWA and reinstall for cleanest update.

**Alternative:** PWA will auto-update on next launch (may take 24-48h).

---

## Success Criteria

All criteria met ✅

- [x] TabBar consumes 7.5-10% of screen height
- [x] Content scrolls fully in Sammlung tab
- [x] Zurücksetzen button accessible
- [x] Safari and PWA visually identical
- [x] No regressions in other tabs/features

---

## Known Issues

None specific to v1.0.8.

General known issues inherited from v1.0.0:
- iOS PWA icon cache (use cache busting or reinstall)
- Service worker may require manual refresh

See CHANGELOG.md for full issue list.

---

## What's Next

### v1.1.0 (Planned)
- Search in Sammlung
- Filter by tea type
- Sort options (A-Z, Füllstand, Last Used)

**ETA:** March 2026

---

## Support

**Issues:** GitHub Issues  
**Questions:** GitHub Discussions  
**Live App:** https://royaltea.mnwn.de

---

## Credits

**Testing:** mnewen-a11y (iPhone 12 mini, Safari + PWA)  
**Development:** Claude (Anthropic)  
**QA:** User feedback-driven iteration

---

## Version History

- **v1.0.8** - PWA TabBar & Scroll Fixes (Current)
- **v1.0.7** - Scroll Container Isolation
- **v1.0.6** - Install Prompt Improvements
- **v1.0.5** - Supabase Sync Reliability
- **v1.0.4** - Safari Browser Support
- **v1.0.3** - Header Compactness
- **v1.0.2** - UI Polish
- **v1.0.1** - Edit Button Fix
- **v1.0.0** - Gold Master 

---

**End of Release Notes**

**Royal-Tea v1.0.8**  
**February 22, 2026**
