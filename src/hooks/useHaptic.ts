/**
 * useHaptic — Web Vibration API
 * Funktioniert auf iPhone (Safari) + Android Chrome
 * Auf Desktop: kein Fehler, einfach keine Vibration
 */

type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'error';

const PATTERNS: Record<HapticStyle, number | number[]> = {
  light:   10,
  medium:  20,
  heavy:   35,
  success: [10, 50, 10],
  error:   [20, 80, 20, 80, 20],
};

export const useHaptic = () => {
  const trigger = (style: HapticStyle = 'light') => {
    if (!navigator.vibrate) return;
    navigator.vibrate(PATTERNS[style]);
  };

  return { trigger };
};
