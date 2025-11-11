import { useEffect, useState } from 'react';

import { IReplyCollapseState } from '../types';
import { getStorage, LS_KEY, setStorage } from '../utils';

const loadState = () => {
  try {
    return getStorage(LS_KEY);
  } catch {
    return {};
  }
};

export const useReplyCollapseState: IReplyCollapseState = (replyId) => {
  const savedState = loadState() || {};
  const initial = (savedState[replyId] as boolean) ?? true;

  const [isOpen, setIsOpen] = useState(initial);

  useEffect(() => {
    const state = loadState() || {};
    state[replyId] = isOpen;
    setStorage(LS_KEY, state);
  }, [isOpen, replyId]);

  return {
    isOpen,
    setIsOpen,
  };
};
