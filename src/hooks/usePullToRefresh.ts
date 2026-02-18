import { useEffect, useRef, useState } from 'react';

interface PullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
  resistance?: number;
}

export const usePullToRefresh = ({
  onRefresh,
  threshold = 80,
  resistance = 2.5,
}: PullToRefreshOptions) => {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canPull = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Nur aktivieren wenn GENAU am Top (scrollTop === 0)
      if (container.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
        canPull.current = true;
      } else {
        canPull.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canPull.current || startY.current === 0) return;
      
      currentY.current = e.touches[0].clientY;
      const distance = currentY.current - startY.current;

      // Nur nach unten ziehen UND nur wenn am Top
      if (distance > 0 && container.scrollTop === 0) {
        // WICHTIG: preventDefault nur wenn wirklich pullen
        if (distance > 10) {  // Kleine Toleranz für normale Scrolls
          e.preventDefault();
          const resistedDistance = distance / resistance;
          setPullDistance(resistedDistance);
          setIsPulling(resistedDistance > threshold);
        }
      } else {
        // Wenn nach oben gescrollt wird oder nicht am Top, normal scrollen lassen
        canPull.current = false;
        startY.current = 0;
        setPullDistance(0);
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > threshold && !isRefreshing && canPull.current) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      
      startY.current = 0;
      currentY.current = 0;
      setPullDistance(0);
      setIsPulling(false);
      canPull.current = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, threshold, resistance, isRefreshing, onRefresh]);

  return {
    containerRef,
    isPulling,
    isRefreshing,
    pullDistance,
  };
};
