import { useEffect } from 'react';

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const originalPaddingRight = document.body.style.paddingRight;
    const supportScrollbarGutter = CSS.supports('scrollbar-gutter', 'stable');

    if (!supportScrollbarGutter) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    document.body.classList.add('no-interact');

    return () => {
      document.body.classList.remove('no-interact');
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
};
