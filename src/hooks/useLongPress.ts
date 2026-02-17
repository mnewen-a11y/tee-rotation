/**
 * useLongPress — erkennt Long Press (500ms) auf Touch + Mouse
 * Gibt Position zurück für Context Menu Positionierung
 */
import { useCallback, useRef } from 'react';

interface LongPressOptions {
  onLongPress: (x: number, y: number) => void;
  delay?: number;
}

export const useLongPress = ({ onLongPress, delay = 500 }: LongPressOptions) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const posRef   = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);

  const start = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    movedRef.current = false;
    const pos = 'touches' in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    posRef.current = pos;

    timerRef.current = setTimeout(() => {
      if (!movedRef.current) {
        onLongPress(posRef.current.x, posRef.current.y);
      }
    }, delay);
  }, [onLongPress, delay]);

  const cancel = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const move = useCallback(() => {
    movedRef.current = true;
    cancel();
  }, [cancel]);

  return {
    onMouseDown:   start,
    onMouseUp:     cancel,
    onMouseLeave:  cancel,
    onTouchStart:  start,
    onTouchEnd:    cancel,
    onTouchMove:   move,
  };
};
