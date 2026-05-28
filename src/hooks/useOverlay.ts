import { RefObject, useEffect, useRef } from 'react';

import { useEscapeKey } from './useEscapeKey';
import { useFocusTrap } from './useFocusTrap';
import { useScrollLock } from './useScrollLock';

interface UseOverlayOptions {
  isOpen: boolean;
  restoreFocus?: boolean;
  onClose(): void;
}

export const useOverlay = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  { isOpen, onClose, restoreFocus = true }: UseOverlayOptions,
) => {
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  useEscapeKey({ isEnabled: isOpen, onEscape: onClose });
  useScrollLock(isOpen);
  useFocusTrap(ref, isOpen);

  useEffect(() => {
    if (!isOpen && restoreFocus && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, restoreFocus]);
};
