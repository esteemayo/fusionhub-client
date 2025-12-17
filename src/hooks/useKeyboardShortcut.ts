import { useEffect } from 'react';
import { ShortCutOptions } from '../types';

export const useKeyboardShortcut = ({
  key,
  mod = false,
  shift = false,
  alt = false,
  enabled = true,
  callback,
}: ShortCutOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (isTyping) return;

      const pressedKey = e.key.toLowerCase();

      const matchesKey = pressedKey === key.toLowerCase();
      const matchesMod = mod ? e.ctrlKey || e.metaKey : true;
      const matchesShift = shift ? e.shiftKey : true;
      const matchesAlt = alt ? e.altKey : true;

      if (matchesKey && matchesMod && matchesShift && matchesAlt) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [alt, callback, key, mod, shift]);
};
