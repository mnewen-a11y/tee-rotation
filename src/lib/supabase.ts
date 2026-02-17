import { createClient } from '@supabase/supabase-js';
import type { Tea } from '@/types/tea';

// Werte aus Vercel Environment Variables (siehe SUPABASE-SETUP.md)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── TYPES ────────────────────────────────────────────────────────────────────

export interface SyncData {
  teas: Tea[];
  queue: string[];
  updated_at: string;
}

// ── LOAD ─────────────────────────────────────────────────────────────────────

export const loadFromSupabase = async (): Promise<SyncData | null> => {
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
  return () => supabase.removeChannel(channel);
};
