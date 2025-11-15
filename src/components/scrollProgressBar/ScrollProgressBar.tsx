import { useEffect, useRef, useState } from 'react';

import './ScrollProgressBar.scss';

const ScrollProgressBar = () => {
  const lastScrollTop = useRef(0);
  const lastTime = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const interpolateColor = (color1: string, color2: string, factor: number) => {
    const c1 = color1.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) ?? [
      0, 0, 0,
    ];
    const c2 = color2.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) ?? [
      0, 0, 0,
    ];

    const result = c1.map((v, i) => Math.round(v + factor * (c2[i] - v)));
    return `rgb(${result.join(',')})`;
  };

  const getScrollColor = (percent: number) => {
    const colors = [
      '#ff7730',
      'rgb(249, 24, 128)',
      '#e9004f',
      '#ea004d',
      '#eb004f',
    ];

    const p = (percent % 100) / 100;
    const totalSegments = colors.length;
    const segment = p * totalSegments;

    const index1 = Math.floor(segment) % totalSegments;
    const index2 = (index1 + 1) % totalSegments;
    const factor = segment - Math.floor(segment);

    return interpolateColor(colors[index1], colors[index2], factor);
  };

  useEffect(() => {
    const checkScrollable = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollable = docHeight > 0;

      setIsScrollable(scrollable);
      if (!scrollable) setIsVisible(false);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const now = performance.now();

      const distance = Math.abs(scrollTop - lastScrollTop.current);
      const timeDiff = now - lastTime.current || 1;
      const velocity = distance / timeDiff;

      lastScrollTop.current = scrollTop;
      lastTime.current = now;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);

      if (isScrollable) {
        setIsVisible(true);

        const delay = Math.min(Math.max(velocity * 3000, 1000), 4000);

        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setIsVisible(false), delay);
      }
    };

    checkScrollable();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollable);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollable);

      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isScrollable]);

  if (!isScrollable) return null;

  const progressColor = getScrollColor(scrollPercent);

  return (
    <div
      aria-hidden={!isVisible}
      className={`scroll-progress-bar ${isVisible ? 'show' : 'hide'}`}
    >
      <div
        className='scroll-progress-bar__indicator'
        style={{ width: `${scrollPercent}%`, backgroundColor: progressColor }}
      />
    </div>
  );
};

export default ScrollProgressBar;
