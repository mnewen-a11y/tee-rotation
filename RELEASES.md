# 📦 Royal-Tea Releases

Alle Releases der Royal-Tea App mit Versionsnummern und Änderungen.

---

## 🔢 **Release Numbering System**

- **Version:** Semantic Versioning (0.9.0, 1.0.0, 1.1.0)
- **Release:** Fortlaufende Nummer (R001, R002, R003...)

```
Version 0.9.0 | Release R001
```

---

## 📋 **Release History**

### **R008.3** - v0.9.7.3 (2026-02-18)
**Status:** 🚨 CRITICAL HOTFIX  
**Codename:** Supabase Data Protection

#### 🐛 Critical Bug Fix
- ✅ **KRITISCH:** Verhindert versehentliches Löschen von Supabase-Daten
- ✅ Sync-Button deaktiviert wenn keine lokalen Daten vorhanden
- ✅ Auto-Sync zu Supabase implementiert (2s debounced)
- ✅ Warnung beim Versuch leere Daten zu syncen

#### ⚠️ Problem gelöst
**Vorher:** 
- Cache löschen → localStorage leer
- Sync-Button klicken → Supabase mit `[]` überschrieben
- **ALLE DATEN VERLOREN!** 💥

**Nachher:**
- Sync nur möglich wenn `teas.length > 0`
- Auto-Sync nach jeder Änderung
- Supabase-Daten bleiben sicher

#### 🔧 Technical
- handleSync: Prüft `teas.length === 0` vor Sync
- Sync-Button: `disabled={teas.length === 0}`
- Auto-Save: Debounced 2s, nur wenn Daten vorhanden
- Alert wenn leerer Sync versucht wird

---

### **R008.2** - v0.9.7.2 (2026-02-18)
**Status:** Critical Hotfix  
**Codename:** Font & DB Fix

#### 🐛 Critical Fixes
- ✅ Logo nutzt jetzt Sans-Serif (war noch Playfair/Times)
- ✅ Supabase-Loading implementiert (App liest jetzt zuerst aus DB)
- ✅ Fallback zu localStorage wenn Supabase nicht verfügbar

#### 🔧 Technical
- RoyalTeaLogo.tsx: System Font Stack im SVG
- App.tsx: loadFromSupabase() beim Init
- Supabase-first, localStorage-fallback Strategie

---

### **R008.1** - v0.9.7.1 (2026-02-18)
**Status:** Beta  
**Codename:** All Sans-Serif

#### 🎨 Design
- ✅ Alle Texte auf Sans-Serif umgestellt
- ✅ Kein Serif mehr (kein Times New Roman Look)
- ✅ Voller iOS Native Look mit SF Pro überall

#### 🔧 Technical
- Alle `font-serif` → `font-sans` ersetzt (26 Stellen)
- Konsistente Sans-Serif Typografie

---

### **R008** - v0.9.7 (2026-02-18)
**Status:** Beta  
**Codename:** Native Fonts

#### ✨ Features
- ✅ System Font Stack implementiert (SF Pro auf iOS/macOS)
- ✅ Google Fonts entfernt (bessere Performance)
- ✅ Native Look & Feel auf allen Plattformen

#### 🎨 Design
- iOS/macOS: Nutzt SF Pro (Apple's System Font)
- Android: Nutzt Roboto
- Windows: Nutzt Segoe UI
- Serif: New York (iOS/macOS) / Georgia (andere)

#### 🚀 Performance
- Keine externen Font-Downloads mehr
- Schnellere Ladezeit
- Bessere Accessibility (respektiert System-Einstellungen)

#### 🔧 Technical
- tailwind.config.js: System Font Stack
- index.html: Google Fonts Links entfernt
- Nutzt -apple-system, BlinkMacSystemFont

---

### **R007.1** - v0.9.6.1 (2026-02-18)
**Status:** Hotfix  
**Codename:** zuletztGetrunken Fix

#### 🐛 Bug Fix
- ✅ CRITICAL: Bearbeiten eines Tees setzt `zuletztGetrunken` nicht mehr zurück
- Problem: Tee in "Zuletzt verwendet" sprang nach Rating-Änderung zurück zu "Verfügbar"
- Lösung: `zuletztGetrunken` wird beim Speichern beibehalten

#### 🔧 Technical
- TeaForm.tsx: `zuletztGetrunken` wird von `editTea` übernommen

---

### **R007** - v0.9.6 (2026-02-18)
**Status:** Beta  
**Codename:** Header Plus Button

#### ✨ Features
- ✅ + Button in den Header verschoben (zwischen Refresh und Info)
- ✅ Nur noch 2 Tabs: Heute & Meine Tees (Rating & Neu entfernt)
- ✅ Rating im Edit-Dialog integriert (beim Bearbeiten)
- ✅ StarRating als wiederverwendbare Komponente

#### 🎨 Design
- + Button prominent im Header mit Gold-Gradient
- Saubere Navigation mit nur 2 Tabs
- Rating-UI im Edit-Dialog

#### 🔧 Technical
- TabBar: reduziert auf 2 Tabs (heute, list)
- useTabDirection: angepasst für 2 Tabs
- Header: + Button zwischen Sync und Info
- StarRating.tsx: neue wiederverwendbare Komponente
- RatingPage.tsx: entfernt

#### ⚠️ Hinweis
Rating ist NOCH NICHT auf Kacheln sichtbar - kommt in R008

#### 🐛 Fixes
- Konsistente Navigation
- Rating immer sichtbar wo es relevant ist

---

### **R001** - v0.9.0 (2026-02-08)
**Status:** Beta  
**Codename:** Royal Foundation

#### ✨ Features
- ✅ Grid-Modus für Tee-Auswahl
- ✅ Swipe-Modus (Tinder-Style)
- ✅ Zwei-Bereiche-System (Verfügbar / Zuletzt verwendet)
- ✅ Smart Defaults pro Tee-Art
- ✅ localStorage Persistenz
- ✅ Royal-Tea Logo mit Teeblatt
- ✅ Corporate Design "Royal-Tea"

#### 🎨 Design
- Midnight Background (#1d2646)
- Gold Kacheln (#c6b975)
- iOS Sequoia Formsprache
- Spring-Animationen
- Responsive Design

#### 🔧 Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Vite
- Vercel Hosting

#### 🐛 Fixes
- Doppelter Import in App.tsx gefixt
- SwipeCard Gold-Farben korrigiert
- TeaCard "Meine Tees" Gold-Farben korrigiert
- Konsistente Gold-Farbe (#c6b975) überall

#### 📝 Dokumentation
- README mit Roadmap erstellt
- 4 Epics dokumentiert
- Corporate Design Guidelines

---

## 🔮 **Geplante Releases**

### **R002** - v1.0.0 (Q1 2026)
**Codename:** Apple Integration

#### Geplante Features
- [ ] Apple Shortcuts Integration
- [ ] iCloud Sync
- [ ] Multi-User Support
- [ ] Rating-System (1-5 Sterne)
- [ ] Merkliste-Tab

---

### **R003** - v1.1.0 (Q2 2026)
**Codename:** Enhanced Experience

#### Geplante Features
- [ ] Bestellhistorie
- [ ] Statistiken & Analytics
- [ ] Export/Import Funktion
- [ ] PWA Support
- [ ] Push Notifications

---

## 📊 **Release Metrics**

| Release | Version | Features | Bug Fixes | Date |
|---------|---------|----------|-----------|------|
| R001 | 0.9.0 | 7 | 4 | 2026-02-08 |
| R002 | 1.0.0 | TBD | TBD | TBD |
| R003 | 1.1.0 | TBD | TBD | TBD |

---

## 🏷️ **Release Tags**

Jedes Release bekommt Git Tags:
```bash
git tag -a R001 -m "Release R001 - v0.9.0"
git tag -a v0.9.0 -m "Version 0.9.0"
```

---

## 📝 **Release Checklist**

Bei jedem Release:
- [ ] Version in package.json aktualisieren
- [ ] Release Number erhöhen
- [ ] RELEASES.md aktualisieren
- [ ] README aktualisieren
- [ ] Git Tag erstellen
- [ ] GitHub Release Notes
- [ ] Vercel Deployment testen
- [ ] Changelog erstellen

---

## 🚀 **Deployment**

Jedes Release wird auf Vercel deployed:
- **Production:** https://tee-rotation.vercel.app
- **Preview:** Auto-deployed bei Pull Requests

---

**Aktuelle Version:** v0.9.0 | R001  
**Letzte Aktualisierung:** 2026-02-08
