# Supabase Setup — Royal-Tea Realtime Sync

## 1. Supabase Projekt anlegen

1. https://supabase.com → "New Project"
2. Name: `royal-tea`
3. Passwort merken (für DB-Zugang)
4. Region: `eu-central-1` (Frankfurt)

## 2. Tabelle anlegen

Im Supabase Dashboard → **SQL Editor** → folgenden SQL ausführen:

```sql
-- Tabelle für geteilte Tea-Daten
CREATE TABLE royal_tea_sync (
  id        TEXT PRIMARY KEY DEFAULT 'shared',
  teas      JSONB NOT NULL DEFAULT '[]',
  queue     JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Erste Zeile anlegen
INSERT INTO royal_tea_sync (id, teas, queue)
VALUES ('shared', '[]', '[]');

-- Realtime aktivieren
ALTER TABLE royal_tea_sync REPLICA IDENTITY FULL;
```

## 3. Realtime aktivieren

Dashboard → **Database → Replication → Supabase Realtime**
→ Tabelle `royal_tea_sync` aktivieren ✅

## 4. Row Level Security (RLS)

Dashboard → **Authentication → Policies** → für `royal_tea_sync`:

```sql
-- Alle dürfen lesen und schreiben (nur ihr zwei nutzen die App)
CREATE POLICY "allow_all" ON royal_tea_sync
  FOR ALL USING (true) WITH CHECK (true);
```

Oder RLS komplett deaktivieren für die Tabelle (einfacher für Private Use).

## 5. API Keys holen

Dashboard → **Settings → API**:
- `Project URL` → `VITE_SUPABASE_URL`
- `anon public` Key → `VITE_SUPABASE_ANON_KEY`

## 6. Vercel Environment Variables

Vercel Dashboard → Projekt → **Settings → Environment Variables**:

```
VITE_SUPABASE_URL      = https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJ...
```

→ **Redeploy** auslösen

## 7. Lokale Entwicklung

`.env.local` anlegen (nicht ins Git!):
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## Wie der Sync funktioniert

```
Person A: Tee auswählen / hinzufügen
          → App speichert lokal
          → ☁️ Sync-Button tippen → schreibt auf Supabase

Person B: Supabase sendet Realtime-Event
          → App aktualisiert sich automatisch (kein Tap nötig)
```

Der ☁️ Button im Header wird:
- ⟳ (drehend/gold)  = Sync läuft
- ✓ (grün)          = Erfolgreich
- ✗ (rot)           = Fehler (kein Internet / Supabase down)
