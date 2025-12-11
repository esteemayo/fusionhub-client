import { useEffect, useRef, useState } from 'react';

import './ScrollProgressBar.scss';

const ScrollProgressBar = () => {
  const lastScrollTop = useRef(0);
  const lastTime = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const parseColor = (
    color: string | undefined | null
  ): [number, number, number] => {
    if (!color || typeof color !== 'string') return [0, 0, 0];

    if (color.startsWith('#')) {
      const hex = color.slice(1).padEnd(6, '0');

      return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
      ];
    }

    if (color.startsWith('rgb')) {
      const nums = color.match(/\d+/g);
      if (!nums) return [0, 0, 0];

      return [Number(nums[0]), Number(nums[1]), Number(nums[2])];
    }

    return [0, 0, 0];
  };

  const interpolateColor = (
    color1: string | undefined,
    color2: string | undefined,
    factor: number
  ) => {
    const c1 = parseColor(color1);
    const c2 = parseColor(color2);

    const result = c1.map((v, i) => Math.round(v + factor * (c2[i] - v)));
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
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

      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
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
      className={`scroll-progress-bar ${isVisible ? 'show' : 'hide'}`}
      aria-hidden={!isVisible}
    >
      <div
        className='scroll-progress-bar__indicator'
        style={{ width: `${scrollPercent}%`, backgroundColor: progressColor }}
      />
    </div>
  );
};

export default ScrollProgressBar;
