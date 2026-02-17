import { Tea, AppSettings } from '@/types/tea';

const STORAGE_KEY = 'tea-rotation-data';
const SETTINGS_KEY = 'tea-rotation-settings';

export interface StorageData {
  teas: Tea[];
  queue: string[]; // array of tea IDs in order
}

export const loadData = (): StorageData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return { teas: [], queue: [] };
};

export const saveData = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const loadSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
  return { selectionMode: 'grid' };
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
