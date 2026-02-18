/**
 * useHaptic — Web Vibration API + iOS-native Patterns
 * Funktioniert auf iPhone (Safari) + Android Chrome
 * Auf Desktop: kein Fehler, einfach keine Vibration
 */

type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection' | 'impact';

const PATTERNS: Record<HapticStyle, number | number[]> = {
  // Basis
  light:     10,   // Tab-Wechsel, Hover
  medium:    20,   // Button-Klick, Toggle
  heavy:     35,   // Delete, Wichtige Action
  
  // Feedback
  success:   [10, 50, 10],           // Gespeichert, Fertig
  error:     [20, 80, 20, 80, 20],   // Fehler, Validation
  warning:   [15, 60, 15],           // Warnung
  
  // iOS-spezifisch
  selection: 5,    // List-Item Select, Picker
  impact:    15,   // Card-Tap, Swipe
};

export const useHaptic = () => {
  const trigger = (style: HapticStyle = 'light') => {
    if (!navigator.vibrate) return;
    navigator.vibrate(PATTERNS[style]);
  };

  return { trigger };
};
