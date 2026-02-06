# 🍵 Tee Rotation App v2.0 - Erweiterte Version

## ✨ Neue Features in v2.0

### 🎯 Zwei Auswahlmodi
- **Grid-Modus** (Standard): Kachelansicht wie bei Bring! - Alle Tees auf einen Blick
- **Swipe-Modus**: Tinder-style Swipe-Funktion
  - ← Links-Swipe: Tee auswählen und trinken
  - → Rechts-Swipe: Tee ablehnen, nächsten anzeigen

### 🌙 Dark Mode
- Vollständiger Dark Mode Support
- Toggle-Button im Header
- Automatisches Speichern der Präferenz

### 📊 Erweitertes Datenmodell
- **Gramm-Anzahl**: Wie viel Gramm hat die Dose?
- **Prozentualer Füllstand**: 0-100% Slider statt fixer Stati
- Farbcodierte Anzeige (Grün > 70%, Orange > 30%, Rot ≤ 30%)

---

## 🚀 Schnellstart

### Installation
```bash
cd tee-rotation
npm install
npm run dev
```

Die App läuft auf `http://localhost:5173`

---

## 📱 Hauptfunktionen

### 🏠 Tab "Heute" - Auswahl-Modus

#### Grid-Modus (Standard)
- **Kachelansicht** aller verfügbaren Tees
- Bring!-inspiriertes Design
- Tee antippen → wird ausgewählt und wandert ins Backlog
- Farbkreis zeigt Tee-Art
- Füllstandsbalken an der Seite
- Temperatur und Gramm-Anzeige

#### Swipe-Modus
- **Tinder-style Karten** zum Durchwischen
- Zeigt bis zu 3 Tees gleichzeitig (gestapelt)
- **Links wischen**: Tee akzeptieren und trinken
- **Rechts wischen**: Tee überspringen, nächsten sehen
- Große, schöne Kartenansicht mit allen Details
- Visuelle Hinweise ("Trinken!" / "Später")

**Modus wechseln**: Button im Header (Grid-Icon / Layers-Icon)

### 📋 Tab "Meine Tees" - Verwaltung
- Liste aller Tees in Rotationsreihenfolge
- Bearbeiten-Button: Alle Eigenschaften ändern
- Löschen-Button: Tee aus Rotation entfernen
- Anzeige: Name, Hersteller, Temperatur, Gramm, Füllstand%

### ➕ Tab "Neu" - Tee hinzufügen
Formular mit folgenden Feldern:

1. **Name** (Pflichtfeld)
   - z.B. "Darjeeling FTGFOP1"

2. **Hersteller** (optional)
   - z.B. "Teekampagne"

3. **Tee-Art** (4 Buttons)
   - Schwarztee, Grüntee, Oolong, Chai
   - Setzt automatisch Standardtemperatur

4. **Brühtemperatur** (70-100°C)
   - Plus/Minus Buttons
   - Slider zum Feinjustieren
   - 5°-Schritte

5. **Gramm-Anzahl** (25-500g)
   - Plus/Minus Buttons
   - Slider
   - 25g-Schritte
   - Standard: 100g

6. **Füllstand** (0-100%)
   - Großer Slider
   - Farbcodierte Anzeige
   - 5%-Schritte
   - Standard: 100%

---

## 🎨 Design-Features

### Light Mode (Standard)
- Helle, freundliche Farben
- iOS-typische Transparenzen
- Glassmorphism-Effekte

### Dark Mode
- Dunkle, kontrastreiche Farben
- Grau-Töne statt reinem Schwarz
- Alle Akzentfarben angepasst
- Komfortable Nachtnutzung

### Animationen
- Sanfte Fade-Ins beim Laden
- Smooth Page-Transitions
- Swipe-Animationen mit Rotation
- Scale-Effekte bei Buttons
- Spring-Animationen

---

## 🔄 Wie die Rotation funktioniert

### Grid-Modus
1. Alle Tees werden als Kacheln angezeigt
2. Tee antippen → wird ausgewählt
3. Ausgewählter Tee wandert ans Ende der Queue
4. Queue läuft endlos durch

### Swipe-Modus
1. Oberste 3 Tees werden als Stapel gezeigt
2. **Links-Swipe**: Tee trinken → ans Ende der Queue
3. **Rechts-Swipe**: Tee überspringen → ans Ende des Stapels
4. Nächster Tee rückt automatisch nach

### Beispiel-Ablauf
```
Start: [Darjeeling, Sencha, Oolong, Chai]

Grid: Darjeeling antippen
→ [Sencha, Oolong, Chai, Darjeeling]

Swipe: Sencha links-swipen
→ [Oolong, Chai, Darjeeling, Sencha]

Swipe: Oolong rechts-swipen
→ Stack zeigt [Chai, Darjeeling, Sencha, Oolong]
```

---

## 💾 Datenspeicherung

### LocalStorage Keys
- `tea-rotation-data`: Tees + Queue
- `tea-rotation-settings`: Modus + Dark Mode

### Datenstruktur
```json
{
  "teas": [
    {
      "id": "unique-id",
      "name": "Darjeeling FTGFOP1",
      "hersteller": "Teekampagne",
      "teeArt": "schwarz",
      "bruehgrad": 100,
      "grammAnzahl": 100,
      "fuellstand": 75,
      "zuletztGetrunken": "2026-02-05T16:30:00.000Z"
    }
  ],
  "queue": ["id1", "id2", "id3"],
  "settings": {
    "selectionMode": "grid",
    "darkMode": false
  }
}
```

---

## 🎯 Workflow-Empfehlungen

### Morgen-Routine (Grid-Modus)
1. App öffnen
2. Tee aus Kacheln auswählen (z.B. erster in der Reihe)
3. Frau Bescheid geben ☕
4. App kann geschlossen bleiben

### Spontan-Auswahl (Swipe-Modus)
1. Swipe-Modus aktivieren
2. Durch Tees swipen bis passender dabei ist
3. Links-Swipe für "Den nehme ich!"
4. Oder mehrmals rechts bis perfekter Tee kommt

### Vorrats-Update
1. Tab "Meine Tees"
2. Tee mit niedrigem Füllstand finden
3. Bearbeiten-Icon antippen
4. Füllstand-Slider auf aktuellen Wert setzen
5. Optional: Bei 0% → Tee löschen oder auf 100% setzen nach Nachbestellung

---

## 🎨 Farben & Tee-Arten

| Tee-Art | Farbe | Standard-Temp | Hex-Code |
|---------|-------|---------------|----------|
| Schwarztee | Braun | 100°C | #8B4513 |
| Grüntee | Grün | 80°C | #4CAF50 |
| Oolong | Gold | 90°C | #DAA520 |
| Chai | Sienna | 90°C | #A0522D |

---

## 🛠️ Technische Details

### Stack
- **React 18** + TypeScript
- **Vite 5** (Ultra-schnell)
- **Tailwind CSS** (mit Dark Mode)
- **Framer Motion** (Animationen & Swipe)
- **Lucide React** (Icons)

### Neue Komponenten
- `TeaGridCard.tsx` - Kachel für Grid-Ansicht
- `SwipeCard.tsx` - Swipe-Karte mit Drag-Support
- `TeaForm.tsx` - Erweitertes Formular
- `App.tsx` - Erweitert mit Modi & Settings

### Dark Mode Implementation
- Tailwind's `dark:` Klassen
- `class` Strategy (per `<html class="dark">`)
- Gespeichert in LocalStorage
- Persistiert über Sessions

---

## 📱 Mobile Features

### Touch-Optimiert
- Große Tap-Targets (min. 44x44px)
- Swipe-Gesten nativ supported
- Smooth Touch-Feedback
- Keine Zoom-Interferenz

### iOS-Spezifisch
- Safe-Area Support
- PWA-fähig (Add to Homescreen)
- Viewport-Optimierung
- Status-Bar Integration

---

## 🐛 Bekannte Besonderheiten

### Swipe-Modus
- Stack zeigt max. 3 Tees gleichzeitig
- Bei wenigen Tees: Stapel wird neu gefüllt
- Rechts-Swipe verschiebt nur im Stapel, nicht in Queue

### Dark Mode
- Wird sofort aktiv ohne Reload
- Gilt für alle Tabs
- Wird beim nächsten App-Start restauriert

---

## 🔮 Mögliche Erweiterungen

Ideen für die Zukunft:
- [ ] **Statistiken**: Welcher Tee wie oft getrunken
- [ ] **Favoriten-System**: Manche Tees häufiger zeigen
- [ ] **Filterfunktion**: Nach Tee-Art oder Füllstand filtern
- [ ] **Export/Import**: Tee-Liste als JSON teilen
- [ ] **Bilder**: Fotos der Tees hinzufügen
- [ ] **Notizen**: Persönliche Notizen pro Tee
- [ ] **Timer**: Ziehzeit-Timer integrieren
- [ ] **Shopping-Liste**: Nachbestellung tracken

---

## 💡 Tastatur-Shortcuts (Desktop)

| Aktion | Shortcut |
|--------|----------|
| Dark Mode Toggle | `D` |
| Modus wechseln | `M` |
| Tab "Heute" | `1` |
| Tab "Meine Tees" | `2` |
| Tab "Neu" | `3` |

*(Noch nicht implementiert, aber einfach hinzuzufügen)*

---

## 🎉 Das war's!

**Neue Features:**
✅ Grid-Modus (Bring!-Style)
✅ Swipe-Modus (Tinder-Style)
✅ Dark Mode
✅ Gramm-Anzahl
✅ Prozentualer Füllstand

Viel Spaß mit der erweiterten Version! ☕✨

**Pro-Tipp**: Swipe-Modus ist super für spontane Entscheidungen, Grid-Modus für systematisches Durchgehen! 🎯
