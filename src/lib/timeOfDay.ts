/**
 * Time-of-Day Utilities
 * Apple-style contextual recommendations
 */

import type { TeaType } from '@/types/tea';

export type TimeOfDay = 'morning' | 'midday' | 'afternoon' | 'evening';

/**
 * Ermittelt die aktuelle Tageszeit
 */
export const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 11)  return 'morning';    // 6-11 Uhr
  if (hour >= 11 && hour < 15) return 'midday';     // 11-15 Uhr
  if (hour >= 15 && hour < 18) return 'afternoon';  // 15-18 Uhr
  return 'evening';                                  // 18-6 Uhr
};

/**
 * Gibt eine kontextuelle Begrüßung zurück
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 11)  return '☀️ Guten Morgen';
  if (hour >= 11 && hour < 14) return '🌤️ Guten Tag';
  if (hour >= 14 && hour < 18) return '☕ Guten Nachmittag';
  if (hour >= 18 && hour < 22) return '🌙 Guten Abend';
  return '🌙 Gute Nacht';
};

/**
 * Gibt empfohlene Tee-Typen für die aktuelle Tageszeit zurück
 */
export const getRecommendedTeaTypes = (timeOfDay?: TimeOfDay): TeaType[] => {
  const time = timeOfDay || getTimeOfDay();
  
  const recommendations: Record<TimeOfDay, TeaType[]> = {
    morning:   ['schwarz', 'chai'],              // Stark, wach machend
    midday:    ['oolong', 'grün', 'schwarz'],    // Mittleres Koffein
    afternoon: ['grün', 'jasmin', 'oolong'],     // Leichter
    evening:   ['kräuter', 'jasmin'],            // Koffeinfrei/wenig Koffein
  };
  
  return recommendations[time];
};

/**
 * Sortiert Tee-Typen nach Relevanz zur aktuellen Tageszeit
 * Empfohlene Typen kommen zuerst
 */
export const sortTeaTypesByTime = (types: TeaType[]): TeaType[] => {
  const recommended = getRecommendedTeaTypes();
  
  return types.sort((a, b) => {
    const aRecommended = recommended.includes(a);
    const bRecommended = recommended.includes(b);
    
    if (aRecommended && !bRecommended) return -1;
    if (!aRecommended && bRecommended) return 1;
    return 0; // Behalte ursprüngliche Reihenfolge bei
  });
};

/**
 * Prüft ob ein Tee-Typ zur aktuellen Tageszeit empfohlen wird
 */
export const isRecommendedNow = (teaType: TeaType): boolean => {
  return getRecommendedTeaTypes().includes(teaType);
};
