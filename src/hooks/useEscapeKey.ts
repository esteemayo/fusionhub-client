import { useEffect, useRef } from 'react';

interface EscapeKeyOptions {
  isEnabled: boolean;
  onEscape(): void;
}

export const useEscapeKey = ({ isEnabled, onEscape }: EscapeKeyOptions) => {
  const handlerRef = useRef(onEscape);

  useEffect(() => {
    handlerRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (!isEnabled) return;

      if (e.key === 'Escape' || e.code === 'Escape') {
        handlerRef.current();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isEnabled, onEscape]);
};
