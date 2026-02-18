import { useState } from 'react';
import { TabId } from '@/components/TabBar';

export const useTabDirection = () => {
  const [prevTab, setPrevTab] = useState<TabId>('heute');

  const tabOrder: TabId[] = ['heute', 'list', 'new'];

  const getDirection = (nextTab: TabId): number => {
    const prevIndex = tabOrder.indexOf(prevTab);
    const nextIndex = tabOrder.indexOf(nextTab);
    setPrevTab(nextTab);
    return nextIndex > prevIndex ? 1 : -1;
  };

  return { getDirection };
};
