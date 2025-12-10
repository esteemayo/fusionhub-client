import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import ChevronUp from '../icons/ChevronUp';

import './BackToTop.scss';

const BackToTop = () => {
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const liveRegion = document.getElementById('back-to-top-live');
    if (liveRegion) {
      liveRegion.textContent = 'Scrolled back to top';
      setTimeout(() => (liveRegion.textContent = ''), 1000);
    }
  }, []);

  const scrollClasses = useMemo(
    () => (isVisible ? 'scroll show' : 'scroll hide'),
    [isVisible]
  );

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsVisible(window.scrollY > 700);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (isTyping) return;

      if (e.key.toLowerCase() === 't') {
        handleScrollToTop();
        tooltipRef.current?.classList.add('show-tooltip');

        setTimeout(() => {
          tooltipRef.current?.classList.remove('show-tooltip');
        }, 1200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleScrollToTop]);

  return (
    <>
      <div
        id='back-to-top-live'
        className='sr-only'
        aria-live='polite'
        aria-atomic='true'
      />

      <div
        className={scrollClasses}
        role='complementary'
        aria-label='Back to top button container'
      >
        <button
          type='button'
          className='scroll__btn'
          onClick={handleScrollToTop}
          aria-label='Scroll back to top'
          aria-describedby='scroll-tool-tip'
          title='Scroll back to top'
        >
          <ChevronUp />
        </button>

        <span
          id='show-tooltip'
          ref={tooltipRef}
          className='scroll__tooltip'
          role='tooltip'
        >
          Press <kbd>T</kbd> to scroll up
        </span>
      </div>
    </>
  );
};

export default BackToTop;
