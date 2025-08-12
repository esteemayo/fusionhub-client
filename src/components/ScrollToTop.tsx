import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_DURATION = 400;
const ANIMATION_DURATION = 400;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lastScrollY = useRef<number>(
    typeof window !== 'undefined' ? window.scrollY : 0
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const content = document.getElementById(
      'page-content'
    ) as HTMLElement | null;

    if (!content) return;

    const prevScrollY = lastScrollY.current;
    const currentScrollY = window.scrollY;
    lastScrollY.current = currentScrollY;

    const goingUp = currentScrollY <= prevScrollY;

    content.style.opacity = '0';
    content.style.transform = goingUp
      ? 'translateY(20px)'
      : 'translateY(-20px)';
    content.style.transition = 'none';

    const duration = SCROLL_DURATION;
    const start = window.scrollY;
    const startTime = performance.now();

    const smoothScroll = (currentTime: DOMHighResTimeStamp) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = 1 - Math.pow(1 - progress, 3);
      const newY = Math.round(start * (1 - ease));

      window.scrollTo(0, newY);

      if (progress < 1) {
        requestAnimationFrame(smoothScroll);
      } else {
        content.style.transition = `opacity ${ANIMATION_DURATION}ms ease, transform ${ANIMATION_DURATION}ms ease`;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        content.offsetHeight;
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }
    };

    requestAnimationFrame(smoothScroll);

    return () => {
      if (content) {
        content.style.transition = '';
      }
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
