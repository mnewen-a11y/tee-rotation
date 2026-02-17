import { createClient } from '@supabase/supabase-js';
import type { Tea } from '@/types/tea';

// Werte aus Vercel Environment Variables (siehe SUPABASE-SETUP.md)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Supabase nur initialisieren wenn Env-Variablen vorhanden
export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const isConfigured = !!supabase;

// ── TYPES ────────────────────────────────────────────────────────────────────

export interface SyncData {
  teas: Tea[];
  queue: string[];
  updated_at: string;
}

// ── LOAD ─────────────────────────────────────────────────────────────────────

export const loadFromSupabase = async (): Promise<SyncData | null> => {
  if (!isConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('royal_tea_sync')
    .select('*')
    .eq('id', 'shared')
    .single();

  if (error || !data) return null;
  return {
    teas: data.teas,
    queue: data.queue,
    updated_at: data.updated_at,
  };
};

// ── SAVE ──────────────────────────────────────────────────────────────────────

export const saveToSupabase = async (teas: Tea[], queue: string[]): Promise<boolean> => {
  if (!isConfigured || !supabase) return false;
  const { error } = await supabase
    .from('royal_tea_sync')
    .upsert({
      id: 'shared',
      teas,
      queue,
      updated_at: new Date().toISOString(),
    });

  return !error;
};

// ── REALTIME SUBSCRIPTION ────────────────────────────────────────────────────

export const subscribeToSync = (
  onUpdate: (data: SyncData) => void
) => {
  if (!isConfigured || !supabase) return () => {};
  const channel = supabase
    .channel('royal_tea_sync_changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'royal_tea_sync',
        filter: 'id=eq.shared',
      },
      (payload) => {
        const row = payload.new as { teas: Tea[]; queue: string[]; updated_at: string };
        onUpdate({
          teas: row.teas,
          queue: row.queue,
          updated_at: row.updated_at,
        });
      }
    )
    .subscribe();

  // Cleanup-Funktion zurückgeben
  return () => supabase!.removeChannel(channel);
};
