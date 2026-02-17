# Tee Rotation App ☕

Eine wunderschöne, iOS-inspirierte Single-Page-App zur Verwaltung deiner persönlichen Tee-Rotation.

## Features

- 🎨 Modernes iOS-Design (2025/2026 Apple-Ästhetik)
- ☕ Intelligente Tee-Rotation (täglich einen neuen Tee)
- 💾 Lokale Speicherung (localStorage)
- 📱 Voll responsiv & mobile-first
- ✨ Flüssige Animationen mit Framer Motion
- 🎯 Intuitive Bottom-Tab-Navigation

## Tech Stack

- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **Tailwind CSS** für Styling
- **Framer Motion** für Animationen
- **Lucide React** für Icons

## Installation & Start

```bash
# Abhängigkeiten installieren
npm install

# Development-Server starten
npm run dev

# Production-Build erstellen
npm run build

# Preview des Production-Builds
npm run preview
```

Die App läuft dann auf `http://localhost:5173`

## Verwendung

### Tab 1: Heute
- Zeigt den aktuell empfohlenen Tee
- Großer "Getrunken"-Button zum Markieren
- Verschiebt den Tee automatisch ans Ende der Warteschlange

### Tab 2: Meine Tees
- Liste aller Tees in Rotationsreihenfolge
- Bearbeiten & Löschen über Icons
- Swipe-Gesten (coming soon)

### Tab 3: Neuer Tee
- Formular zum Hinzufügen neuer Tees
- Automatische Brühtemperatur-Vorschläge je nach Tee-Art
- Vorratsstatus-Tracking

## Datenmodell

Jeder Tee hat folgende Eigenschaften:
- **Name**: z.B. "Darjeeling FTGFOP1"
- **Hersteller**: optional
- **Tee-Art**: schwarz, grün, oolong oder chai
- **Brühgrad**: 70-100°C
- **Vorrat-Status**: voll, fast leer oder leer
- **Zuletzt getrunken**: ISO-Datum

## Design-Prinzipien

- **Liquid Glass**: Transluzente Elemente mit Backdrop-Blur
- **SF Pro Font**: System-Schriftart für iOS-Look
- **Großzügiger Weißraum**: Luftiges, modernes Layout
- **Sanfte Kantenradien**: 16-24px für iOS-Feeling
- **Farbcodierung**: Jede Tee-Art hat ihre eigene Farbe
- **Touch-optimiert**: Große, fingerfreundliche Buttons

## Browser-Kompatibilität

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile Browser (iOS Safari, Chrome Mobile)

## Lizenz

Private Nutzung

## Entwickelt mit ❤️ und viel ☕
