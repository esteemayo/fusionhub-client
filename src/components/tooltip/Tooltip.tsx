import { useMemo, useRef, useState } from 'react';

import { PositionType, TooltipProps } from '../../types';

import './Tooltip.scss';

const Tooltip = ({
  title,
  className,
  maxWidth,
  delay = 200,
  hideDelay = 150,
  alwaysShow = false,
  children,
}: TooltipProps) => {
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [tooltipWidth, setTooltipWidth] = useState('auto');
  const [xOffset, setXOffset] = useState(0);
  const [position, setPosition] = useState<PositionType>('top');
  const [isShow, setIsShow] = useState(false);

  let hoverTimer: ReturnType<typeof setTimeout> | null = null;
  let hideTimer: ReturnType<typeof setTimeout> | null = null;
  let pressTimer: ReturnType<typeof setTimeout> | null = null;

  const showIfTruncated = () => {
    const el = textRef.current;
    if (!el) return;

    if (alwaysShow || el.scrollWidth > el.clientWidth) {
      const rect = el.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      setPosition(
        spaceAbove < 40 && spaceBelow > spaceAbove ? 'bottom' : 'top'
      );

      const width = el.scrollWidth + 20;
      setTooltipWidth(width + 'px');

      const centeredX = rect.left + rect.width / 2 - width / 2;
      let offset = centeredX - rect.left;

      if (centeredX < 8) {
        offset = -rect.left + 8;
      } else if (centeredX + width > window.innerWidth - 8) {
        offset = window.innerWidth - rect.right - width - 8;
      }

      setXOffset(offset);
      setIsShow(true);
    }
  };

  const handleMouseEnter = () => {
    if (hideTimer) clearTimeout(hideTimer);
    hoverTimer = setTimeout(showIfTruncated, delay);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => setIsShow(false), hideDelay);
  };

  const handleTouchStart = () => {
    pressTimer = setTimeout(showIfTruncated, 500);
  };

  const handleTouchEnd = () => {
    if (pressTimer) clearTimeout(pressTimer);
    hideTimer = setTimeout(() => setIsShow(false), hideDelay);
  };

  const tooltipClasses = useMemo(() => {
    return isShow || alwaysShow
      ? `tooltip__bubble show ${position}`
      : 'tooltip__bubble hide';
  }, [alwaysShow, isShow, position]);

  return (
    <div
      className='tooltip'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <span ref={textRef} className={className} style={{ maxWidth }}>
        {children}
      </span>
      <div
        className={tooltipClasses}
        style={{ transform: `translateX(${xOffset}px)`, width: tooltipWidth }}
      >
        {title}
      </div>
    </div>
  );
};

export default Tooltip;
