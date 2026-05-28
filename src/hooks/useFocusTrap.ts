import { RefObject, useLayoutEffect } from 'react';

export const useFocusTrap = <T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  isActive: boolean,
) => {
  useLayoutEffect(() => {
    if (!isActive) return;

    const container = containerRef.current as HTMLElement;
    if (!container) return;

    const getFocusable = (): HTMLElement[] => {
      return Array.from(
        container.querySelectorAll<HTMLElement>(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute);
    };

    const focusedElements = getFocusable();
    if (focusedElements.length === 0) return;

    const firstElement = focusedElements[0];
    const lastElement = focusedElements[focusedElements.length - 1];

    if (!firstElement || !lastElement) return;

    firstElement.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const activeElement = document.activeElement as HTMLElement;

      if (e.shiftKey) {
        if (
          activeElement === firstElement ||
          !container.contains(activeElement)
        ) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (
          activeElement === lastElement ||
          !container.contains(activeElement)
        ) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [containerRef, isActive]);
};
