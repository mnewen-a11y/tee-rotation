# 🍎 Royal-Tea R009 - Apple UX Experiment

## 🌿 Feature Branch: `feature/apple-ux`

**Status:** Experimental  
**Version:** 0.10.0 | R009  
**Basis:** main (R008.4)

---

## 🎯 Was ist neu?

### **Zeit-basierte Intelligenz:**

Die App passt sich jetzt der Tageszeit an!

```
☀️ Morgens (6-11 Uhr):
   → Schwarztee & Chai werden empfohlen
   → Automatisch aufgeklappt
   → Gold-Ring Hervorhebung

🌤️ Mittags (11-15 Uhr):
   → Oolong, Grüntee, Schwarztee

☕ Nachmittags (15-18 Uhr):
   → Grüntee, Jasmin, Oolong

🌙 Abends (18-6 Uhr):
   → Kräutertee, Jasmin (koffeinfrei)
```

---

## 📱 Wie es aussieht:

### **Vorher (main):**
```
┌─────────────────────────────┐
│ ✨ Wähle deinen Tee         │
│                             │
│ 🟤 Schwarztee (7)       ▼   │
│ 🟢 Grüntee (3)          ▼   │
│ 🟡 Oolong (2)           ▼   │
└─────────────────────────────┘
```

### **Nachher (feature/apple-ux):**
```
┌─────────────────────────────┐
│ ✨ ☀️ Guten Morgen          │ ← Dynamisches Greeting
│                             │
│ 🟤 Schwarztee (7)  [Jetzt   │ ← Badge + Gold Ring
│    empfohlen]           ▼   │ ← Auto aufgeklappt
│ ┌─────────────────────────┐ │
│ │ Russian Breakfast       │ │
│ │ Pleine Lune             │ │
│ └─────────────────────────┘ │
│                             │
│ 🟢 Grüntee (3)          ›   │ ← Zugeklappt
│ 🟡 Oolong (2)           ›   │
└─────────────────────────────┘
```

---

## 🔧 Technische Details:

### **Neue Datei:**
```
src/lib/timeOfDay.ts
├── getTimeOfDay()           → 'morning' | 'midday' | ...
├── getGreeting()            → '☀️ Guten Morgen'
├── getRecommendedTeaTypes() → ['schwarz', 'chai']
└── sortTeaTypesByTime()     → Sortiert Kategorien
```

### **System-Zeit basiert:**
```javascript
const hour = new Date().getHours(); // Direkt vom OS
// Keine API-Calls
// Funktioniert offline
// Auto-Timezone
```

---

## 🎨 Apple UX Principles umgesetzt:

1. **Progressive Disclosure** ✅
   - Empfohlenes zuerst
   - Rest darunter (zugeklappt)

2. **Contextual Awareness** ✅
   - Zeit-sensitiv
   - Passt sich automatisch an

3. **Joy-of-Use** ✅
   - Greeting ändert sich
   - Kleine Überraschung

4. **Zero-Interaction** ✅
   - Keine Einstellung nötig
   - Funktioniert einfach

---

## 🚀 Deployment:

### **Production (main):**
```
https://royaltea.mnwn.de
→ Stabile Version (R008.4)
```

### **Preview (feature/apple-ux):**
```
https://royaltea-git-feature-apple-ux-[username].vercel.app
→ Apple UX Experiment (R009)
```

---

## 🔄 Zwischen Versionen wechseln:

### **Lokal testen:**
```bash
# Zu main wechseln (alte Version)
git checkout main

# Zu feature/apple-ux wechseln (neue Version)
git checkout feature/apple-ux
```

### **Online testen:**
- **Production:** Alte Version
- **Preview URL:** Neue Version

---

## 📊 Vergleich:

| Feature | main (R008.4) | feature/apple-ux (R009) |
|---------|---------------|------------------------|
| Greeting | ✨ Wähle deinen Tee | ☀️ Guten Morgen (dynamisch) |
| Sortierung | Fix (alphabetisch) | Smart (zeitbasiert) |
| Empfehlung | Keine | "Jetzt empfohlen" Badge |
| Auto-Expand | Alle oder keine | Nur empfohlene |
| Hervorhebung | Keine | Gold-Ring |

---

## 🤔 Entscheidung später:

### **Option A: Merge zu main**
```bash
git checkout main
git merge feature/apple-ux
git push
# → Wird Production
```

### **Option B: Verwerfen**
```bash
git branch -D feature/apple-ux
# → Bleibt bei alter Version
```

### **Option C: Beide behalten**
```bash
# Nichts tun
# → 2 Versionen parallel
```

---

## 📝 Feedback sammeln:

**Fragen zum Testen:**
1. Ist das Greeting hilfreich oder nervig?
2. Macht Smart Sorting Sinn?
3. Ist "Jetzt empfohlen" Badge zu aufdringlich?
4. Fühlt es sich "Apple" an?

---

**Build:** feature/apple-ux  
**Datum:** 2026-02-18  
**Basis:** R008.4 (System Fonts, Supabase Protection)
