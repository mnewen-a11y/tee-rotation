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
