# Royal-Tea Design System

Ein minimales, HIG-konformes Design System für die Royal-Tea PWA.

## 📁 Struktur

```
src/design/
├── design-tokens.ts      # Farben, Spacing, Typography, etc.
├── component-utils.ts    # Wiederverwendbare Component Styles
└── README.md            # Diese Datei
```

---

## 🎯 Philosophie

**Minimalistisch, nicht atomic.**
- Nur die Tokens die wir WIRKLICH nutzen
- Keine Abstraktionen für Abstraktionen
- Single source of truth für Design-Entscheidungen
- 100% TypeScript (type-safe)

---

## 🎨 Design Tokens

### Verwendung:

```typescript
import { designSystem as ds } from '@/design/design-tokens';

// Farben
const primaryColor = ds.colors.brand.gold;
const textColor = ds.colors.text.primary;

// Spacing (8pt Grid)
const padding = ds.spacing[6]; // 24px

// Typography
const fontSize = ds.typography.fontSize.largeTitle; // 36px
const fontWeight = ds.typography.fontWeight.bold;

// Radius
const borderRadius = ds.radius['2xl']; // 32px

// Shadows
const shadow = ds.shadows.xl;

// Liquid Glass Effects (iOS 26)
const glassCard = ds.glass.card;
```

---

## 🧩 Component Utils

### Card Styles:

```typescript
import { cardStyles } from '@/design/component-utils';

// Normale Card
<div style={cardStyles.base}>...</div>

// Liquid Glass Card (iOS 26)
<div style={{
  ...cardStyles.glass,
  ...cardStyles.padding.comfortable
}}>...</div>
```

### Button Variants:

```typescript
import { buttonVariants } from '@/design/component-utils';

// Primary Button
<button style={buttonVariants.primary}>Ok</button>

// Secondary Button
<button style={buttonVariants.secondary}>Skip</button>
```

### Typography Presets:

```typescript
import { textStyles } from '@/design/component-utils';

// Large Title
<h1 style={textStyles.largeTitle}>Russian Breakfast</h1>

// Body Text
<p style={textStyles.body}>Description...</p>

// Caption
<span style={textStyles.caption}>SCHWARZTEE</span>
```

### Progress Bar:

```typescript
import { progressBarStyles } from '@/design/component-utils';

<div style={progressBarStyles.container}>
  <div style={{
    ...progressBarStyles.fill,
    width: `${tea.fuellstand}%`
  }} />
</div>
```

---

## 📐 HIG Compliance

### Touch Targets:

```typescript
// ALLE Buttons müssen mindestens 44×44pt sein
import { touchTarget } from '@/design/design-tokens';

<button style={{ minHeight: touchTarget.medium }}>
  Ok
</button>
```

### Color Contrast:

```typescript
// Text Colors garantieren 4.5:1 Kontrast (HIG Requirement)
ds.colors.text.primary    // 7:1+ (sehr hoch)
ds.colors.text.secondary  // ~4.5:1 (minimum)
ds.colors.text.tertiary   // <4.5:1 (nur für disabled)
```

### Typography Scale:

```typescript
// SF Pro Display/Text sizes (HIG Standard)
ds.typography.fontSize.body      // 16px (minimum per HIG)
ds.typography.fontSize.headline  // 17px (HIG standard)
```

---

## 🚀 Migration Guide

### Vorher (Hardcoded):

```typescript
<div 
  className="bg-white rounded-3xl shadow-2xl p-8"
  style={{ 
    boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
    borderRadius: '32px'
  }}
>
  <h2 style={{ 
    fontSize: '36px',
    fontWeight: 700,
    color: '#0F172A'
  }}>
    {tea.name}
  </h2>
</div>
```

### Nachher (Design System):

```typescript
import { designSystem as ds, cardStyles, textStyles } from '@/design';

<div style={{
  ...cardStyles.base,
  ...cardStyles.padding.comfortable
}}>
  <h2 style={textStyles.largeTitle}>
    {tea.name}
  </h2>
</div>
```

**Benefits:**
- ✅ Änderung an EINER Stelle propagiert überall
- ✅ Type-safe (TypeScript autocomplete)
- ✅ HIG-konform garantiert
- ✅ Weniger Code, mehr Konsistenz

---

## 🎯 Best Practices

### ✅ DO:

```typescript
// Tokens verwenden
<div style={{ padding: ds.spacing[6] }}>

// Component Utils verwenden
<button style={buttonVariants.primary}>Ok</button>

// Helper Functions verwenden
const color = getCategoryColor(tea.teeArt);
```

### ❌ DON'T:

```typescript
// Hardcoded values
<div style={{ padding: '24px' }}>

// Inline styles ohne Tokens
<button style={{ background: '#C9AE4D', borderRadius: '14px' }}>

// Magic numbers
<div style={{ fontSize: 36, fontWeight: 700 }}>
```

---

## 📦 Tailwind Integration

Tokens können auch in Tailwind Config importiert werden:

```javascript
// tailwind.config.js
import { designSystem as ds } from './src/design/design-tokens';

export default {
  theme: {
    extend: {
      colors: {
        brand: ds.colors.brand.gold,
        midnight: ds.colors.neutral.midnight,
      },
      spacing: ds.spacing,
      borderRadius: ds.radius,
      boxShadow: ds.shadows,
    }
  }
}
```

Dann: `className="bg-brand rounded-2xl shadow-xl"`

---

## 🔄 Updates

### Farbe global ändern:

```typescript
// In design-tokens.ts:
brand: {
  gold: '#D4AF37', // Neue Gold-Farbe
}

// → Ändert sich ÜBERALL automatisch! ✨
```

### Neue Component hinzufügen:

```typescript
// In component-utils.ts:
export const newComponentStyles = {
  base: {
    background: ds.colors.background.secondary,
    // ...
  }
}
```

---

## 📚 Resources

- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [iOS Color Guidelines](https://developer.apple.com/design/human-interface-guidelines/color)
- [Typography Guidelines](https://developer.apple.com/design/human-interface-guidelines/typography)

---

## ✅ Checklist für neue Components

Beim Erstellen neuer Components:

- [ ] Tokens aus `design-tokens.ts` verwenden
- [ ] Touch Targets ≥44pt (touchTarget.medium)
- [ ] Text Kontrast ≥4.5:1 (colors.text.*)
- [ ] Typography aus fontSize/fontWeight
- [ ] Spacing aus 8pt Grid (spacing.*)
- [ ] Border Radius aus radius.*
- [ ] Shadows aus shadows.*
- [ ] Liquid Glass für Cards (glass.*)
- [ ] Spring Animations (animation.spring.*)

---

**Das ist dein Single Source of Truth! 🎯**
