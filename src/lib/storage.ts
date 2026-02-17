import { Tea, AppSettings } from '@/types/tea';

const STORAGE_KEY  = 'tea-rotation-data';
const SETTINGS_KEY = 'tea-rotation-settings';

export interface StorageData {
  teas: Tea[];
  queue: string[];
}

export const loadData = (): StorageData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error('loadData:', e); }
  return { teas: [], queue: [] };
};

export const saveData = (data: StorageData): void => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch (e) { console.error('saveData:', e); }
};

export const loadSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error('loadSettings:', e); }
  // Default — darkMode required by AppSettings
  return { selectionMode: 'grid', darkMode: false };
};

export const saveSettings = (settings: AppSettings): void => {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
  catch (e) { console.error('saveSettings:', e); }
};

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
