# 🎨 ROYAL-TEA DESIGN SYSTEM - STYLE GUIDE

**Version:** R001 - v0.9.0  
**Design:** Royal-Tea  
**Letzte Aktualisierung:** 2026-02-08

---

## 📊 FARBEN

### Primärfarben

| Element | Background | Text | Border | Verwendung |
|---------|-----------|------|--------|------------|
| **Body** | `#1d2646` (Midnight) | `#ffffff` (Weiß) | - | Gesamter Hintergrund |
| **Header** | `rgba(29,38,70,0.8)` (Midnight/80) | `#ffffff` | `rgba(255,255,255,0.1)` | Sticky Header mit Blur |
| **Logo Text** | - | `#ffffff` | - | Royal-Tea Schriftzug |
| **Logo Leaf** | `#c6b975` (Gold) | - | - | Teeblatt im Logo |
| **Tee-Kacheln (Grid)** | `#c6b975` (Gold) | `#242b46` (Midnight-Text) | `rgba(198,185,117,0.2)` | Grid-Ansicht "Heute" |
| **Tee-Kacheln (Selected)** | `#c6b975` (Gold) | `#242b46` | `#34C759` (Grün) | Verwendet/Ausgewählt |
| **Swipe-Cards** | `#c6b975` (Gold) | `#242b46` | `rgba(198,185,117,0.2)` | Swipe-Modus |
| **Liste "Meine Tees"** | `#c6b975` (Gold) | `#242b46` | `rgba(198,185,117,0.2)` | List View Cards |
| **Tab Bar** | `rgba(29,38,70,0.95)` (Midnight/95) | `rgba(255,255,255,0.6)` | `rgba(255,255,255,0.1)` | Bottom Navigation |
| **Tab Bar (Aktiv)** | - | `#c6b975` (Gold) | - | Aktiver Tab |
| **Tab Indicator** | `#c6b975` (Gold) | - | - | Unterstrich aktiver Tab |
| **Buttons (Primary)** | `#c6b975` (Gold) | `#242b46` | - | Hauptaktionen |
| **Buttons (Secondary)** | `rgba(255,255,255,0.1)` | `#ffffff` | - | Sekundäre Aktionen |
| **Input Felder** | `rgba(255,255,255,0.1)` | `#ffffff` | `rgba(255,255,255,0.2)` | Formulare |
| **Stats Boxen (auf Gold)** | `rgba(29,38,70,0.1)` | `#242b46` | - | Temp/Gramm Anzeigen |
| **Empty States** | `rgba(255,255,255,0.1)` | `rgba(255,255,255,0.6)` | `rgba(255,255,255,0.1)` | Keine Daten Screens |
| **Häkchen (Selected)** | `#34C759` (iOS Green) | `#ffffff` | - | Auswahlindikator |
| **Edit Button** | Transparent | `#242b46` | - | Auf Gold-Kacheln |
| **Delete Button** | Transparent | `#FF3B30` (iOS Red) | - | Auf Gold-Kacheln |

### Tee-Art Farben

| Tee-Art | Badge Color | Hex | Verwendung |
|---------|------------|-----|------------|
| **Schwarz** | Braun | `#8B4513` | Badge Hintergrund |
| **Grün** | Grün | `#4CAF50` | Badge Hintergrund |
| **Oolong** | Gold | `#DAA520` | Badge Hintergrund |
| **Chai** | Dunkelbraun | `#A0522D` | Badge Hintergrund |

### Füllstand-Farben

| Bereich | Farbe | Hex | Verwendung |
|---------|-------|-----|------------|
| **> 70%** | Grün | `#34C759` | Voll |
| **30-70%** | Orange | `#FF9500` | Mittel |
| **< 30%** | Rot | `#FF3B30` | Niedrig |

---

## 🔤 TYPOGRAFIE

### Font Families

```css
/* Headlines / Kategorien / Sublines */
font-serif: 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'Times New Roman', serif;

/* UI-Text / Buttons / Lesbarer Inhalt */
font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;

/* Logo / Display */
font-display: 'Playfair Display', 'Cormorant Garamond', serif;
```

### Typografie-Tabelle

| Element | Font Family | Weight | Size | Color | Verwendung |
|---------|------------|--------|------|-------|------------|
| **Logo Wordmark** | Playfair Display | 700 | 140px | `#ffffff` | Royal-Tea Logo |
| **Headlines (H1)** | Cormorant Garamond | 700 | 2xl-4xl | Context | Seitentitel |
| **Headlines (H2)** | Cormorant Garamond | 600 | xl-2xl | Context | Sektionen |
| **Headlines (H3)** | Cormorant Garamond | 600 | lg-xl | Context | Untertitel |
| **Tee-Namen (Grid)** | Cormorant Garamond | 700 | base | `#242b46` | Kachel-Titel |
| **Tee-Namen (Swipe)** | Cormorant Garamond | 700 | 4xl | `#242b46` | Große Cards |
| **Tee-Namen (Liste)** | Cormorant Garamond | 600 | lg | `#242b46` | Listeneinträge |
| **Hersteller** | SF Pro | 400 | xs-sm | Context/60% | Subtitles |
| **Body Text** | SF Pro | 400 | sm-base | Context | Fließtext |
| **Buttons** | SF Pro | 500-600 | sm-base | Context | Interaktiv |
| **Labels** | SF Pro | 500 | xs-sm | Context/60% | Form Labels |
| **Tab Labels** | SF Pro | 500 | xs | `#ffffff/60` (aktiv: `#c6b975`) | Navigation |
| **Badges** | SF Pro | 600 | xs | `#ffffff` | Tee-Art Badges |
| **Stats (Temp/Gramm)** | SF Pro | 700 | 3xl | `#242b46` | Große Zahlen |
| **Stats Labels** | SF Pro | 400 | xs | Context/60% | "Celsius", "Gramm" |

### Tailwind Size Reference

```
xs:   0.75rem (12px)
sm:   0.875rem (14px)
base: 1rem (16px)
lg:   1.125rem (18px)
xl:   1.25rem (20px)
2xl:  1.5rem (24px)
3xl:  1.875rem (30px)
4xl:  2.25rem (36px)
```

---

## 📐 SPACING & LAYOUT

### Spacing-Tabelle

| Element | Padding | Margin | Border Radius | Shadow |
|---------|---------|--------|--------------|--------|
| **Container** | `px-6 py-6` | - | - | - |
| **Header** | `px-6 py-4` | - | - | Blur + Border |
| **Tee-Kachel (Grid)** | `p-4` | - | `24px` (xl) | `0 4px 20px rgba(0,0,0,0.4)` |
| **Swipe-Card** | `p-8` | - | `24px` (3xl) | `0 8px 32px rgba(0,0,0,0.5)` |
| **Liste Card** | `p-4` | `mb-3` | `16px` (lg) | `0 2px 12px rgba(0,0,0,0.3)` |
| **Buttons** | `px-6 py-3` | - | `20px` (lg) | Context |
| **Tab Bar** | `px-4 py-2` | - | - | Blur + Border |
| **Input** | `px-4 py-3` | - | `16px` | - |
| **Stats Box** | `p-6` | - | `16px` (lg) | - |
| **Badge** | `px-6 py-2` | - | `9999px` (full) | `0 4px 8px` |

### Border Radius-System (iOS Sequoia)

| Name | Value | Tailwind Class | Verwendung |
|------|-------|---------------|------------|
| **ios-sm** | 12px | `.rounded-ios-sm` | Kleine Elemente |
| **ios / ios-md** | 16px | `.rounded-ios` | Standard Cards |
| **ios-lg** | 20px | `.rounded-ios-lg` | Buttons, Medium Cards |
| **ios-xl** | 24px | `.rounded-ios-xl` | Große Cards |
| **3xl** | 24px | `.rounded-3xl` | Swipe Cards |
| **full** | 9999px | `.rounded-full` | Badges, Pills |

### Shadow-System

| Name | Value | Tailwind Class | Verwendung |
|------|-------|---------------|------------|
| **shadow-ios** | `0 2px 12px rgba(0,0,0,0.3)` | `.shadow-ios` | Klein |
| **shadow-ios-md** | `0 4px 20px rgba(0,0,0,0.4)` | `.shadow-ios-md` | Medium |
| **shadow-ios-lg** | `0 8px 40px rgba(0,0,0,0.5)` | `.shadow-ios-lg` | Groß |

---

## 🎬 ANIMATIONEN

### Animation-Tabelle

| Animation | Duration | Easing | Transform | Verwendung |
|-----------|----------|--------|-----------|------------|
| **Page Transition** | 200ms | ease | - | Tab-Wechsel |
| **Card Appear** | 400ms | spring (cubic-bezier) | scale(0.96 → 1.0) | Kachel Fade-In |
| **Button Tap** | 100ms | ease | scale(0.95-0.97) | Tap Feedback |
| **Hover Lift** | 200ms | ease | translateY(-2px) | Card Hover |
| **Selection** | 200ms | spring | scale(1.02) | Selektion Feedback |
| **Checkmark** | 300ms | spring | scale(0 → 1) | Häkchen Animation |
| **Auto-Clear** | 2000ms | - | - | Selektion zurücksetzen |
| **Swipe Exit** | 200ms | ease | translateX(±500px) | Card Swipe |

### Easing Functions

```css
/* Spring (iOS Sequoia) */
cubic-bezier(0.175, 0.885, 0.32, 1.275)

/* Ease Standard */
ease

/* Smooth */
cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 📱 RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Grid Columns | Tailwind Prefix | Verwendung |
|------------|-------|--------------|----------------|------------|
| **Mobile** | < 768px | 2 | - | Standard |
| **Tablet** | 768px+ | 3 | `md:` | Medium Screens |
| **Desktop** | 1024px+ | 3 | `lg:` | Large Screens |
| **Max Width** | 768px | - | `max-w-3xl` | Container |

---

## 🎨 OPACITY-WERTE

| Opacity | Hex/Alpha | Tailwind | Verwendung |
|---------|-----------|----------|------------|
| **100%** | `1.0` / `#ffffff` | `opacity-100` | Haupttexte |
| **95%** | `0.95` | `opacity-95` | Tab Bar Background |
| **90%** | `0.9` | `opacity-90` | Logo |
| **80%** | `0.8` | `opacity-80` | Header Background |
| **60%** | `0.6` | `opacity-60` / `/60` | Sekundärtexte, inaktive Tabs |
| **20%** | `0.2` | `opacity-20` / `/20` | Borders |
| **10%** | `0.1` | `opacity-10` / `/10` | Stats Boxen, Secondary Buttons |
| **5%** | `0.05` | `opacity-5` / `/5` | Gradient Overlays |

### Alpha in Colors

```css
/* Midnight Varianten */
rgba(29, 38, 70, 0.95)    /* Midnight/95 */
rgba(29, 38, 70, 0.8)     /* Midnight/80 */
rgba(29, 38, 70, 0.1)     /* Midnight/10 */

/* White Varianten */
rgba(255, 255, 255, 0.6)  /* White/60 */
rgba(255, 255, 255, 0.2)  /* White/20 */
rgba(255, 255, 255, 0.1)  /* White/10 */

/* Gold Varianten */
rgba(198, 185, 117, 0.2)  /* Gold/20 */
```

---

## 📚 Z-INDEX HIERARCHIE

| Element | Z-Index | Layer |
|---------|---------|-------|
| **Modal/Form** | 40 | Oberste Ebene |
| **Tab Bar** | 30 | Navigation |
| **Header** | 20 | Header |
| **Selected Indicator** | 10 | Card Overlays |
| **Card Content** | 10 | Normal Content |
| **Background Overlay** | 1 | Hintergrund-Effekte |

---

## 🛠️ TAILWIND UTILITY CLASSES

### Farben

```css
/* Backgrounds */
.bg-midnight       /* #1d2646 */
.bg-gold           /* #c6b975 */
.bg-midnight/80    /* rgba(29,38,70,0.8) */
.bg-white/10       /* rgba(255,255,255,0.1) */

/* Text Colors */
.text-white        /* #ffffff */
.text-gold-text    /* #242b46 */
.text-white/60     /* rgba(255,255,255,0.6) */
.text-gold-text/60 /* rgba(36,43,70,0.6) */

/* Border Colors */
.border-white/10   /* rgba(255,255,255,0.1) */
.border-gold/20    /* rgba(198,185,117,0.2) */
.border-ios-green  /* #34C759 */
```

### Fonts

```css
.font-sans         /* SF Pro (UI-Text, Buttons) */
.font-serif        /* Cormorant Garamond (Headlines) */
.font-display      /* Playfair Display (Logo) */
```

### Radius

```css
.rounded-ios       /* 16px */
.rounded-ios-sm    /* 12px */
.rounded-ios-lg    /* 20px */
.rounded-ios-xl    /* 24px */
.rounded-full      /* 9999px */
```

### Shadows

```css
.shadow-ios        /* 0 2px 12px rgba(0,0,0,0.3) */
.shadow-ios-md     /* 0 4px 20px rgba(0,0,0,0.4) */
.shadow-ios-lg     /* 0 8px 40px rgba(0,0,0,0.5) */
```

### Backdrop Blur

```css
.backdrop-blur-ios /* blur(24px) */
```

---

## 📝 CODE BEISPIELE

### Tee-Kachel (Grid)

```tsx
<div className="bg-gold rounded-ios-xl p-4 shadow-ios-md border-2 border-gold/20">
  <h3 className="font-serif font-bold text-base text-gold-text">
    Darjeeling
  </h3>
  <p className="font-sans text-xs text-gold-text/60">
    Mariage Freres
  </p>
</div>
```

### Button (Primary)

```tsx
<button className="bg-gold text-gold-text px-6 py-3 rounded-ios-lg font-sans font-medium shadow-ios hover:bg-gold/90 transition-colors">
  Tee hinzufügen
</button>
```

### Button (Secondary)

```tsx
<button className="bg-white/10 text-white px-4 py-2 rounded-ios font-sans hover:bg-white/20 transition-colors">
  Abbrechen
</button>
```

### Headline

```tsx
<h2 className="text-2xl font-serif font-bold text-white mb-4">
  Meine Tees
</h2>
```

### Stats Box

```tsx
<div className="bg-midnight/10 rounded-ios-lg p-6 flex flex-col items-center">
  <Thermometer className="w-8 h-8 mb-2" />
  <span className="text-3xl font-sans font-bold text-gold-text">80°</span>
  <span className="text-xs font-sans text-gold-text/60">Celsius</span>
</div>
```

---

## 🎯 COMPONENT PATTERNS

### Card Pattern (Gold auf Midnight)

```tsx
<div className="bg-gold rounded-ios-xl p-4 shadow-ios-md border border-gold/20">
  {/* Icon */}
  <div className="w-12 h-12 rounded-full bg-[tee-color] flex items-center justify-center">
    <Icon className="w-6 h-6 text-white" />
  </div>
  
  {/* Title */}
  <h3 className="font-serif font-bold text-base text-gold-text">
    Title
  </h3>
  
  {/* Subtitle */}
  <p className="font-sans text-xs text-gold-text/60">
    Subtitle
  </p>
  
  {/* Badge */}
  <div className="bg-midnight/10 rounded-lg px-2 py-1 font-sans text-xs font-medium text-gold-text">
    Badge
  </div>
</div>
```

### Section Header Pattern

```tsx
<div className="mb-6">
  <h2 className="text-xl font-serif font-bold text-white mb-1">
    Section Title
  </h2>
  <p className="text-sm font-sans text-white/60">
    Description text
  </p>
</div>
```

---

## ✅ ACCESSIBILITY

### Contrast Ratios

| Kombination | Ratio | WCAG Level |
|-------------|-------|------------|
| `#242b46` auf `#c6b975` | 7.2:1 | AAA ✅ |
| `#ffffff` auf `#1d2646` | 12.8:1 | AAA ✅ |
| `#c6b975` auf `#1d2646` | 1.8:1 | AA (Large Text) ⚠️ |

### Touch Targets

```
Minimum: 44x44px
Empfohlen: 48x48px
```

### Focus States

```css
/* Input Focus */
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(198, 185, 117, 0.3);
}
```

---

## 📦 EXPORT

### CSS Variables

```css
:root {
  /* Colors */
  --color-midnight: #1d2646;
  --color-gold: #c6b975;
  --color-gold-text: #242b46;
  
  /* Radius */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  
  /* Shadows */
  --shadow-sm: 0 2px 12px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.5);
}
```

---

## 📱 MOBILE-SPECIFIC

### Safe Areas

```css
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Viewport Meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
<meta name="theme-color" content="#1d2646" />
```

---

**Ende des Style Guides**  
**Version:** R001 - v0.9.0  
**Letzte Aktualisierung:** 2026-02-08  
**Design System:** Royal-Tea
