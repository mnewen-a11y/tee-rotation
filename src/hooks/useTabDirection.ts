/**
 * useTabDirection — ermittelt Slide-Richtung beim Tab-Wechsel
 * Links → Rechts wenn Tab-Index sinkt, sonst umgekehrt
 */
import { useRef } from 'react';
import type { TabId } from '@/components/TabBar';

const TAB_ORDER: TabId[] = ['heute', 'list'];

export const useTabDirection = () => {
  const prevTab = useRef<TabId>('heute');

  const getDirection = (nextTab: TabId): number => {
    const prev = TAB_ORDER.indexOf(prevTab.current);
    const next = TAB_ORDER.indexOf(nextTab);
    prevTab.current = nextTab;
    return next > prev ? 1 : -1;
  };

  return { getDirection };
};
