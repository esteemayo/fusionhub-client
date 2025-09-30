import { useMemo } from 'react';

import { TooltipProps } from '../../types';

import './Tooltip.scss';

const Tooltip = ({ isShow, title, position }: TooltipProps) => {
  const tooltipClasses = useMemo(() => {
    return isShow ? `tooltip show ${position}` : 'tooltip hide';
  }, [isShow, position]);

  return <div className={tooltipClasses}>{title}</div>;
};

export default Tooltip;
