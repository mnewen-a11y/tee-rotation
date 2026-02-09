# ☕ Tee Rotation App

**Version:** 0.9.0  
**Release:** R001  
**Design:** Royal-Tea  
**Status:** Beta

Dein persönlicher Tee-Begleiter mit intelligentem Rotations-System.

---

## 📚 Dokumentation

- 🚀 **[Feature Roadmap](./ROYAL-TEA-ROADMAP.md)** - Komplette Feature-Planung (v0.9 - v1.2)
- 🎨 **[Style Guide](./ROYAL-TEA-STYLE-GUIDE.md)** - Design System & Komponenten
- 📦 **[Releases](./RELEASES.md)** - Release History & Changelogs
- 🔄 **[Native App Guide](./NATIVE-APP-TRANSFORMATION.md)** - Native Feel Improvements

---

## 🎨 Corporate Design "Royal-Tea"

### Farbschema
- **Midnight:** `#1d2646` - Königliches Dunkelblau
- **Gold:** `#c6b975` - Edles Gold
- **Text auf Gold:** `#242b46` - Dunkelblau
- **Text auf Midnight:** `#ffffff` - Reines Weiß

### Design-Philosophie
Inspiriert von königlicher Eleganz und iOS Sequoia:
- Große, weiche Border Radius (16-28px)
- Tiefe, sanfte Shadows
- Spring-Animationen
- Premium-Ästhetik

---

## ✨ Features (v0.9)

### ✅ Aktuell implementiert

#### Tab "Heute"
- **Grid-Modus:** Kachel-Ansicht aller verfügbaren Tees
- **Swipe-Modus:** Tinder-Style Swipe-Karten
- **Zwei-Bereiche-System:**
  - Oben: Verfügbare Tees
  - Unten: Zuletzt verwendete Tees (mit grünem Häkchen)
- **Reversible Auswahl:** Klick auf "zuletzt verwendet" → zurück zu "verfügbar"

#### Tab "Meine Tees"
- Liste aller Tees in der Rotation
- Bearbeiten & Löschen
- Füllstand-Anzeige
- Farbcodierte Tee-Arten

#### Tab "Neu"
- Formular zum Hinzufügen
- Smart Defaults pro Tee-Art:
  - Grün: 80°C, 3g
  - Schwarz: 100°C, 8g
  - Oolong: 90°C, 8g
  - Chai: 90°C, 8g
- Gramm-Range: 2-20g (pro Kanne)

#### Datenspeicherung
- localStorage (persistent, lokal)
- Automatisches Speichern
- Offline-fähig

---

## 🚀 Roadmap

**Siehe:** [📋 ROYAL-TEA-ROADMAP.md](./ROYAL-TEA-ROADMAP.md) für die komplette Feature-Planung.

### Nächste Releases

#### v0.9.5 - Native Feel (März 2026)
- Native App Feeling (Scrollbars weg, iOS Scrolling, Bottom Sheets)
- UX Improvements (Suche, Filter, Sortierung)

#### v1.0.0 - Apple Integration (April 2026)  
- Apple Shortcuts & Siri
- iCloud Multi-Device Sync
- Rating-System (1-5⭐)
- Merkliste

#### v1.1.0 - Insights (Mai 2026)
- Notizen & Fotos
- Bestellhistorie
- Statistiken

#### v1.2.0 - PWA (Juli 2026)
- Installierbare App
- Push Notifications
- Offline-Modus

---

## 📊 Feature-Matrix

| Feature | v0.9 | v1.0 |
|---------|------|------|
| Grid/Swipe Modes | ✅ | ✅ |
| localStorage | ✅ | ✅ |
| Apple Shortcuts | ❌ | ✅ |
| iCloud Sync | ❌ | ✅ |
| Rating-System | ❌ | ✅ |
| Merkliste | ❌ | ✅ |

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS  
- **Animations:** Framer Motion
- **Build:** Vite
- **Hosting:** Vercel

---

**Genießen Sie Ihren Tee! ☕✨**
