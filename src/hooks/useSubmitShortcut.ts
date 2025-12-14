import { useCallback } from 'react';
import { ISubmitShortcut } from '../types';

export const useSubmitShortcut: ISubmitShortcut = (
  onSubmit,
  enabled = true
) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (!enabled) return;

      const isSubmitCombo = (e.ctrlKey || e.metaKey) && e.key === 'Enter';

      if (!isSubmitCombo) return;

      e.preventDefault();
      onSubmit();
    },
    [enabled, onSubmit]
  );

  return {
    handleKeyDown,
  };
};
