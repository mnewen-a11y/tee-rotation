# Dev Specification: Dynamic Pot Selection

**Version:** v1.1.0  
**Last Updated:** 2026-02-22  
**Owner:** Development Team  
**Status:** ✅ Final - Ready for Implementation

---

## Technical Stack

### Frontend
- **Framework:** React 18.2+ with TypeScript
- **Styling:** Tailwind CSS 3.3+
- **State:** React Hooks (useState, useEffect)
- **Animations:** CSS Transforms + Transitions
- **Build:** Vite
- **Deployment:** Vercel

### Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (if applicable)
- **Real-time:** Supabase Real-time (optional)

### Testing
- **Unit:** Vitest (if set up)
- **E2E:** Manual testing (Safari + PWA)
- **Device:** iPhone 12 mini (primary test device)

---

## Data Model

### Tea Interface (Updated)

```typescript
interface Tea {
  // Existing fields (unchanged)
  id: string;
  name: string;
  brand: string;
  type: TeaType;
  temp: number;
  fuellstand: number;
  zuletztGetrunken?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // NEW: Pot-specific dosages
  dosierungGross: number;   // Renamed from 'dosierung'
  dosierungMittel?: number; // Optional, defaults to preset
  dosierungKlein?: number;  // Optional, defaults to preset
}
```

### TeaType Enum

```typescript
type TeaType = 
  | 'Grüntee'
  | 'Schwarztee'
  | 'Oolong'
  | 'Weißtee'
  | 'Kräutertee'
  | 'Früchtetee';
```

### PotSize Enum

```typescript
enum PotSize {
  KLEIN = 'klein',
  MITTEL = 'mittel',
  GROSS = 'gross'
}
```

### Dosage Presets

```typescript
const DOSAGE_PRESETS: Record<TeaType, {
  klein: number;
  mittel: number;
  gross: number;
}> = {
  'Grüntee':    { klein: 2.5, mittel: 5, gross: 8 },
  'Schwarztee': { klein: 3,   mittel: 5, gross: 8 },
  'Oolong':     { klein: 2.5, mittel: 5, gross: 8 },
  'Weißtee':    { klein: 2.5, mittel: 5, gross: 8 },
  'Kräutertee': { klein: 3,   mittel: 5.5, gross: 9 },
  'Früchtetee': { klein: 3,   mittel: 5.5, gross: 9 }
};
```

---

## Supabase Architecture

### Current Setup (IST-Stand)

**Infrastructure:**
- ✅ Supabase Client: `src/lib/supabase.ts` (configured, working)
- ❌ **NO Supabase CLI installed**
- ❌ **NO `supabase/` directory exists**

**Migration Strategy:**
```
1. Create migration file: supabase/migrations/XXX.sql
2. Commit to Git (documentation/versioning)
3. Execute SQL MANUALLY in Supabase Dashboard:
   - Open Supabase Dashboard
   - Go to SQL Editor
   - Copy SQL content
   - Execute
4. Done ✓
```

**Why create file anyway?**
- Governance: Track DB changes over time
- Git versioning
- Rollback reference
- "Make it right" = Clean documentation

**IMPORTANT:** Migrations are NOT automatically executed! No `supabase db push` available!

---

## Database Schema

### Supabase Migration

**File:** `supabase/migrations/007_add_pot_dosages.sql`

**Create directory first:**
```bash
mkdir -p supabase/migrations
```

```sql
-- Add new columns for pot-specific dosages
ALTER TABLE teas
  ADD COLUMN dosierung_klein DECIMAL(4,1),
  ADD COLUMN dosierung_mittel DECIMAL(4,1);

-- Rename existing dosierung to dosierung_gross
ALTER TABLE teas
  RENAME COLUMN dosierung TO dosierung_gross;

-- Backfill existing teas with presets based on type
UPDATE teas
SET 
  dosierung_klein = CASE type
    WHEN 'Grüntee' THEN 2.5
    WHEN 'Schwarztee' THEN 3.0
    WHEN 'Oolong' THEN 2.5
    WHEN 'Weißtee' THEN 2.5
    WHEN 'Kräutertee' THEN 3.0
    WHEN 'Früchtetee' THEN 3.0
    ELSE 2.5
  END,
  dosierung_mittel = CASE type
    WHEN 'Kräutertee' THEN 5.5
    WHEN 'Früchtetee' THEN 5.5
    ELSE 5.0
  END
WHERE dosierung_klein IS NULL;
```

**Rollback:**
```sql
ALTER TABLE teas
  RENAME COLUMN dosierung_gross TO dosierung;

ALTER TABLE teas
  DROP COLUMN dosierung_klein,
  DROP COLUMN dosierung_mittel;
```

**Execution Workflow:**
1. Create file `supabase/migrations/007_add_pot_dosages.sql`
2. Commit to Git
3. **THEN:** Open Supabase Dashboard → SQL Editor
4. Copy SQL content from file
5. Execute manually
6. Verify: `SELECT dosierung_klein, dosierung_mittel FROM teas LIMIT 5;`

---

## Component Architecture

### New Components

#### 1. PotSelectionCard

**File:** `src/components/PotSelectionCard.tsx`

```typescript
interface PotSelectionCardProps {
  tea: Tea;
  selectedPot: PotSize;
  onPotSelect: (pot: PotSize) => void;
  onEditDosage: (pot: PotSize, newDosage: number) => void;
  onBack: () => void;
  onConfirm: () => void;
}

export const PotSelectionCard: React.FC<PotSelectionCardProps> = ({
  tea,
  selectedPot,
  onPotSelect,
  onEditDosage,
  onBack,
  onConfirm
}) => {
  return (
    <div className="card config-card">
      <div className="config-header">
        <h3 className="config-title">{tea.name}</h3>
        <p className="config-subtitle">Kanne wählen</p>
      </div>
      
      <div className="pot-list">
        <PotRow
          size={PotSize.KLEIN}
          volume={400}
          dosage={tea.dosierungKlein ?? DOSAGE_PRESETS[tea.type].klein}
          isSelected={selectedPot === PotSize.KLEIN}
          onSelect={() => onPotSelect(PotSize.KLEIN)}
          onEdit={(newDosage) => onEditDosage(PotSize.KLEIN, newDosage)}
        />
        <PotRow
          size={PotSize.MITTEL}
          volume={700}
          dosage={tea.dosierungMittel ?? DOSAGE_PRESETS[tea.type].mittel}
          isSelected={selectedPot === PotSize.MITTEL}
          onSelect={() => onPotSelect(PotSize.MITTEL)}
          onEdit={(newDosage) => onEditDosage(PotSize.MITTEL, newDosage)}
        />
        <PotRow
          size={PotSize.GROSS}
          volume={1000}
          dosage={tea.dosierungGross}
          isSelected={selectedPot === PotSize.GROSS}
          onSelect={() => onPotSelect(PotSize.GROSS)}
          onEdit={(newDosage) => onEditDosage(PotSize.GROSS, newDosage)}
        />
      </div>
      
      <div className="card-actions">
        <button className="card-btn card-btn-back" onClick={onBack}>
          ← Zurück
        </button>
        <button className="card-btn card-btn-confirm" onClick={onConfirm}>
          Bestätigen
        </button>
      </div>
    </div>
  );
};
```

---

#### 2. PotRow

**File:** `src/components/PotRow.tsx`

```typescript
interface PotRowProps {
  size: PotSize;
  volume: number; // ml
  dosage: number; // g
  isSelected: boolean;
  onSelect: () => void;
  onEdit: (newDosage: number) => void;
}

export const PotRow: React.FC<PotRowProps> = ({
  size,
  volume,
  dosage,
  isSelected,
  onSelect,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(dosage);
  
  const handleAdjust = (delta: number) => {
    const newValue = Math.max(0, Math.min(20, editValue + delta));
    setEditValue(newValue);
    onEdit(newValue); // Auto-save!
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
  };
  
  // FIXED: Wrap in useCallback to prevent re-creation
  const exitEdit = useCallback(() => {
    setIsEditing(false);
  }, []);
  
  // FIXED: Add exitEdit to dependency array
  useEffect(() => {
    // Exit edit mode when clicked outside
    const handleClickOutside = (e: MouseEvent) => {
      if (isEditing && !(e.target as HTMLElement).closest('.pot-row')) {
        exitEdit();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isEditing, exitEdit]); // ✓ All dependencies included
  
  return (
    <div
      className={cn(
        'pot-row',
        isSelected && 'selected',
        isEditing && 'editing'
      )}
      onClick={() => {
        if (!isEditing) {
          onSelect();
          if (navigator.vibrate) navigator.vibrate(10);
        }
      }}
    >
      <div className="pot-row-left">
        <div className="pot-row-name">{getPotName(size)}</div>
        <div className="pot-row-size">{volume}ml</div>
      </div>
      
      <div className="pot-row-right">
        {!isEditing && (
          <>
            <div className="dosage-normal">{dosage}g</div>
            <button
              className="edit-icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
                if (navigator.vibrate) navigator.vibrate(10);
              }}
            >
              <EditIcon />
            </button>
          </>
        )}
        
        {isEditing && (
          <div className="edit-controls">
            <button
              className="adjust-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAdjust(-0.5);
              }}
            >
              −
            </button>
            <span className="dosage-edit">{editValue}g</span>
            <button
              className="adjust-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAdjust(0.5);
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function getPotName(size: PotSize): string {
  const names = {
    [PotSize.KLEIN]: 'Klein',
    [PotSize.MITTEL]: 'Mittel',
    [PotSize.GROSS]: 'Groß'
  };
  return names[size];
}
```

---

#### 3. CardFlipper

**File:** `src/components/CardFlipper.tsx`

```typescript
interface CardFlipperProps {
  isFlipped: boolean;
  frontCard: React.ReactNode;
  backCard: React.ReactNode;
}

export const CardFlipper: React.FC<CardFlipperProps> = ({
  isFlipped,
  frontCard,
  backCard
}) => {
  return (
    <div className="card-container">
      <div className={cn('card-flipper', isFlipped && 'flipped')}>
        <div className="card-face card-front">
          {frontCard}
        </div>
        <div className="card-face card-back">
          {backCard}
        </div>
      </div>
    </div>
  );
};
```

**CSS:**
```css
/* Use Tailwind classes exclusively - NO separate CSS files */
/* All styling via className with Tailwind utilities */

/* Card Flip uses Tailwind arbitrary values: */
<div className="[perspective:1000px] w-full h-[520px]">
  <div className={cn(
    'relative w-full h-full',
    'transition-transform duration-[600ms]',
    '[transform-style:preserve-3d]',
    isFlipped && 'rotate-y-180'
  )}>
    <div className="absolute w-full h-full [backface-visibility:hidden]">
      {/* Front card */}
    </div>
    <div className="absolute w-full h-full [backface-visibility:hidden] rotate-y-180">
      {/* Back card */}
    </div>
  </div>
</div>

/* For complex animations, use tailwind.config.js: */
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'card-flip': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
    },
  },
}
```

**Strategy:** 
- ✅ Pure Tailwind (no separate CSS files)
- ✅ Use `cn()` utility for conditional classes
- ✅ Extend Tailwind config for custom values
- ❌ No mixing of CSS modules + Tailwind

---

### Modified Components

#### App.tsx Updates

```typescript
export default function App() {
  // Existing state...
  const [selectedTea, setSelectedTea] = useState<Tea | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [selectedPot, setSelectedPot] = useState<PotSize>(PotSize.KLEIN);
  const [customDosages, setCustomDosages] = useState<Record<PotSize, number>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleTeaSelect = (tea: Tea) => {
    setSelectedTea(tea);
    setSelectedPot(PotSize.KLEIN); // Auto-select Klein
    setCustomDosages({}); // Reset custom dosages
    setIsCardFlipped(true); // Flip to pot selection
  };
  
  const handlePotSelect = (pot: PotSize) => {
    setSelectedPot(pot);
  };
  
  const handleDosageEdit = (pot: PotSize, newDosage: number) => {
    setCustomDosages(prev => ({ ...prev, [pot]: newDosage }));
  };
  
  const handleConfirm = async () => {
    if (!selectedTea) return;
    
    // Get dosage for selected pot
    const dosage = customDosages[selectedPot] ?? getDosageForPot(selectedTea, selectedPot);
    
    // Update füllstand
    const newFuellstand = Math.max(0, selectedTea.fuellstand - dosage);
    
    // Update in database
    await updateTea(selectedTea.id, {
      fuellstand: newFuellstand,
      zuletztGetrunken: new Date(),
      // Save custom dosages if changed
      ...(customDosages[PotSize.KLEIN] && { dosierungKlein: customDosages[PotSize.KLEIN] }),
      ...(customDosages[PotSize.MITTEL] && { dosierungMittel: customDosages[PotSize.MITTEL] }),
      ...(customDosages[PotSize.GROSS] && { dosierungGross: customDosages[PotSize.GROSS] })
    });
    
    // Flip back
    setIsCardFlipped(false);
    
    // Show success
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    
    // Reset
    setSelectedTea(null);
  };
  
  const handleBack = () => {
    setIsCardFlipped(false);
    setSelectedTea(null);
  };
  
  function getDosageForPot(tea: Tea, pot: PotSize): number {
    const presets = DOSAGE_PRESETS[tea.type];
    switch (pot) {
      case PotSize.KLEIN:
        return tea.dosierungKlein ?? presets.klein;
      case PotSize.MITTEL:
        return tea.dosierungMittel ?? presets.mittel;
      case PotSize.GROSS:
        return tea.dosierungGross;
    }
  }
  
  return (
    <div className="app">
      {selectedTab === 'rotation' && (
        <CardFlipper
          isFlipped={isCardFlipped}
          frontCard={
            <SwipeTeaCard
              tea={recommendedTea}
              onSelect={() => handleTeaSelect(recommendedTea)}
            />
          }
          backCard={
            selectedTea && (
              <PotSelectionCard
                tea={selectedTea}
                selectedPot={selectedPot}
                onPotSelect={handlePotSelect}
                onEditDosage={handleDosageEdit}
                onBack={handleBack}
                onConfirm={handleConfirm}
              />
            )
          }
        />
      )}
      
      {showSuccess && (
        <SuccessScreen
          tea={selectedTea!}
          pot={selectedPot}
          dosage={getDosageForPot(selectedTea!, selectedPot)}
        />
      )}
    </div>
  );
}
```

---

#### SwipeTeaCard Updates

**Changes:**
- `onSelect` prop now triggers card flip (not direct füllstand update)
- Button text remains "Auswählen"
- No other changes to UI

```typescript
interface SwipeTeaCardProps {
  tea: Tea;
  onSelect: () => void; // Changed behavior - now triggers flip
}

export const SwipeTeaCard: React.FC<SwipeTeaCardProps> = ({ tea, onSelect }) => {
  return (
    <div className="tea-card">
      {/* Existing UI... */}
      
      <button
        className="select-btn"
        onClick={onSelect}
        disabled={tea.fuellstand === 0}
      >
        {tea.fuellstand === 0 ? 'Aufgebraucht' : 'Auswählen'}
      </button>
    </div>
  );
};
```

---

#### SuccessScreen Updates

**File:** `src/components/SuccessScreen.tsx`

```typescript
interface SuccessScreenProps {
  tea: Tea;
  pot: PotSize;
  dosage: number;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ tea, pot, dosage }) => {
  const potName = {
    [PotSize.KLEIN]: 'Klein',
    [PotSize.MITTEL]: 'Mittel',
    [PotSize.GROSS]: 'Groß'
  }[pot];
  
  return (
    <div className="success-overlay active">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <div className="success-text">{tea.name} ausgewählt!</div>
        <div className="success-subtext">{potName} • {dosage}g</div>
      </div>
    </div>
  );
};
```

---

## State Management

### State Flow Diagram

```
App.tsx (Root State)
├─ selectedTea: Tea | null
├─ isCardFlipped: boolean
├─ selectedPot: PotSize
├─ customDosages: Record<PotSize, number>
└─ showSuccess: boolean

Event Flow:
1. User taps [Auswählen]
   └─> handleTeaSelect(tea)
       ├─ setSelectedTea(tea)
       ├─ setSelectedPot(KLEIN)
       ├─ setCustomDosages({})
       └─ setIsCardFlipped(true)

2. User taps different pot
   └─> handlePotSelect(pot)
       └─ setSelectedPot(pot)

3. User edits dosage
   └─> handleDosageEdit(pot, newDosage)
       └─ setCustomDosages({ ...prev, [pot]: newDosage })

4. User taps [Bestätigen]
   └─> handleConfirm()
       ├─ Calculate füllstand
       ├─ Update database
       ├─ setIsCardFlipped(false)
       ├─ setShowSuccess(true)
       └─ setTimeout(() => setShowSuccess(false), 2000)

5. User taps [← Zurück]
   └─> handleBack()
       ├─ setIsCardFlipped(false)
       └─ setSelectedTea(null)
```

---

## Database Operations

### Supabase Functions

#### updateTea

```typescript
async function updateTea(id: string, updates: Partial<Tea>): Promise<void> {
  const { error } = await supabase
    .from('teas')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);
    
  if (error) {
    console.error('Error updating tea:', error);
    throw error;
  }
}
```

#### getTeas

```typescript
async function getTeas(): Promise<Tea[]> {
  const { data, error } = await supabase
    .from('teas')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching teas:', error);
    throw error;
  }
  
  // CRITICAL: Map snake_case DB columns to camelCase TypeScript
  return data.map(row => ({
    id: row.id,
    name: row.name,
    brand: row.brand,
    type: row.type as TeaType,
    temp: row.temp,
    fuellstand: row.fuellstand,
    
    // NEW: Pot-specific dosages (snake_case → camelCase)
    dosierungGross: row.dosierung_gross,    // DB: dosierung_gross
    dosierungMittel: row.dosierung_mittel,  // DB: dosierung_mittel
    dosierungKlein: row.dosierung_klein,    // DB: dosierung_klein
    
    zuletztGetrunken: row.zuletzt_getrunken ? new Date(row.zuletzt_getrunken) : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at)
  }));
}
```

**Note:** Also update `updateTea()` to map camelCase → snake_case when writing:

```typescript
async function updateTea(id: string, updates: Partial<Tea>): Promise<void> {
  // Map camelCase to snake_case for DB
  const dbUpdates: any = { updated_at: new Date().toISOString() };
  
  if (updates.fuellstand !== undefined) dbUpdates.fuellstand = updates.fuellstand;
  if (updates.dosierungGross !== undefined) dbUpdates.dosierung_gross = updates.dosierungGross;
  if (updates.dosierungMittel !== undefined) dbUpdates.dosierung_mittel = updates.dosierungMittel;
  if (updates.dosierungKlein !== undefined) dbUpdates.dosierung_klein = updates.dosierungKlein;
  if (updates.zuletztGetrunken !== undefined) dbUpdates.zuletzt_getrunken = updates.zuletztGetrunken.toISOString();
  
  const { error } = await supabase
    .from('teas')
    .update(dbUpdates)
    .eq('id', id);
    
  if (error) {
    console.error('Error updating tea:', error);
    throw error;
  }
}
```

---

## Error Handling

### Network Errors

```typescript
async function handleConfirm() {
  try {
    await updateTea(selectedTea.id, updates);
    // Success flow...
  } catch (error) {
    // Optimistic UI already shown
    // Queue for retry
    console.error('Failed to sync:', error);
    
    // Optional: Show toast
    // "Änderung wird beim nächsten Sync gespeichert"
    
    // Retry logic (exponential backoff)
    retryQueue.push({ teaId: selectedTea.id, updates });
  }
}
```

### Edge Cases

```typescript
function getDosageForPot(tea: Tea, pot: PotSize): number {
  const presets = DOSAGE_PRESETS[tea.type];
  
  // Fallback to presets if custom dosage not set
  switch (pot) {
    case PotSize.KLEIN:
      return tea.dosierungKlein ?? presets.klein ?? 2.5;
    case PotSize.MITTEL:
      return tea.dosierungMittel ?? presets.mittel ?? 5;
    case PotSize.GROSS:
      return tea.dosierungGross ?? 8;
  }
}

function calculateNewFuellstand(current: number, dosage: number): number {
  // Prevent negative füllstand
  return Math.max(0, current - dosage);
}

function shouldShowWarning(fuellstand: number, dosage: number): boolean {
  return fuellstand < dosage && fuellstand > 0;
}
```

---

## Performance Optimization

### Animation Performance

```typescript
// Use CSS transforms (GPU accelerated)
// NOT: left/top changes
transform: rotateY(180deg);  // ✅
left: -100%;                 // ❌

// Use will-change sparingly
.card-flipper {
  will-change: transform;
}

// Remove after animation
.card-flipper:not(.flipped) {
  will-change: auto;
}
```

### Re-render Optimization

```typescript
// Memoize expensive calculations
const dosage = useMemo(
  () => getDosageForPot(selectedTea, selectedPot),
  [selectedTea, selectedPot]
);

// Prevent unnecessary re-renders
const PotRow = React.memo(PotRowComponent);
```

---

## Testing Strategy

### Unit Tests (if Vitest set up)

```typescript
describe('getDosageForPot', () => {
  it('returns custom dosage if set', () => {
    const tea = { type: 'Grüntee', dosierungKlein: 3.5 };
    expect(getDosageForPot(tea, PotSize.KLEIN)).toBe(3.5);
  });
  
  it('falls back to preset if not set', () => {
    const tea = { type: 'Grüntee', dosierungKlein: null };
    expect(getDosageForPot(tea, PotSize.KLEIN)).toBe(2.5);
  });
});

describe('calculateNewFuellstand', () => {
  it('prevents negative füllstand', () => {
    expect(calculateNewFuellstand(3, 8)).toBe(0);
  });
});
```

### Manual Testing Checklist

- [ ] Card flip smooth at 60 FPS
- [ ] Klein auto-selected on flip
- [ ] Pot selection changes immediately
- [ ] Edit mode enters/exits correctly
- [ ] +/− buttons adjust value
- [ ] Auto-save persists changes
- [ ] Füllstand calculates correctly
- [ ] Success screen shows pot + dosage
- [ ] Works in Safari browser
- [ ] Works in PWA mode
- [ ] Low füllstand warning appears
- [ ] Füllstand = 0 disables button
- [ ] Network error handles gracefully

---

## Deployment

### Pre-Deployment

```bash
# Run migration
supabase db push migrations/007_add_pot_dosages.sql

# Build production
npm run build

# Preview build
npm run preview
```

### Deploy to Vercel

```bash
# Push to main branch
git push origin main

# Vercel auto-deploys
# Monitor build logs
```

### Post-Deployment

```bash
# Verify migration
supabase db remote status

# Check all existing teas have presets
SELECT id, name, dosierung_klein, dosierung_mittel
FROM teas
WHERE dosierung_klein IS NULL;
```

---

## Rollback Plan

### If Critical Bug Found

```sql
-- Rollback migration
ALTER TABLE teas
  RENAME COLUMN dosierung_gross TO dosierung;

ALTER TABLE teas
  DROP COLUMN dosierung_klein,
  DROP COLUMN dosierung_mittel;
```

### Revert Code

```bash
# Revert to v1.0.8
git revert <commit-hash>
git push origin main

# Vercel redeploys automatically
```

---

## Acceptance Criteria (Dev)

✅ All TypeScript types defined correctly  
✅ Database migration runs without errors  
✅ Existing teas have presets backfilled  
✅ Card flip animation runs at 60 FPS  
✅ Auto-save immediately persists changes  
✅ Füllstand calculation is accurate  
✅ No TypeScript errors  
✅ No console errors in production  
✅ Works on iPhone 12 mini (Safari + PWA)  
✅ Supabase sync works correctly  
✅ Edge cases handled gracefully  

---

**Approved by:** Michael (Lead Developer)  
**Date:** 2026-02-22  
**Status:** ✅ Ready for Implementation
