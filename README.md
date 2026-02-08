# ☕ Tee Rotation App

**Version:** 0.9.0  
**Design:** Royal  
**Status:** Beta

Dein persönlicher Tee-Begleiter mit intelligentem Rotations-System.

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

### 📋 Epic 1: Apple Ecosystem Integration
**Ziel:** Hey Siri für Tee-Einpflege nutzen

**Stories:**
- [ ] Apple Shortcuts erstellen
- [ ] iCloud Drive Integration  
- [ ] Siri-Abkürzungen

**Tech:** Apple Shortcuts, iCloud Drive API, JSON-Schema

---

### ☁️ Epic 2: Multi-User Datenspeicherung
**Ziel:** Textdatei im Apple Ökosystem, Zugriff von mehreren Personen

**Stories:**
- [ ] iCloud Shared Drive
- [ ] Simple Text Format
- [ ] Sync-Logic

**Tech:** iCloud Drive, Shared Notes, oder Google Sheets

---

### ⭐ Epic 3: Rating-System
**Ziel:** Bewertung der Tees (1-5 Sterne)

**Stories:**
- [ ] Rating hinzufügen
- [ ] Rating anzeigen
- [ ] Sortierung nach Rating
- [ ] Rating-Verlauf

---

### 📌 Epic 4: Merkliste & Bestellsystem
**Ziel:** Wissen welchen Tee nachbestellen

**Stories:**
- [ ] "Merken" Button
- [ ] Merkliste Tab
- [ ] Auto-Merken bei niedrigem Füllstand
- [ ] Export-Funktion

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
