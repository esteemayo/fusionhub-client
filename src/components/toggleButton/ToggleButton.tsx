import { useMemo } from 'react';

import BarsIcon from '../icons/BarsIcon';
import XmarkIcon from '../icons/XmarkIcon';

import { ToggleButtonProps } from '../../types';

import './ToggleButton.scss';

const ToggleButton = ({
  type,
  label,
  isOpen,
  onClick,
  ...rest
}: ToggleButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const handleToggleKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const toggleBtnClasses = useMemo(
    () => (type === 'nav' ? 'toggle-button nav' : 'toggle-button'),
    [type]
  );

  const btnLabel = useMemo(
    () => (type === 'nav' ? label : isOpen ? 'Close' : label),
    [isOpen, label, type]
  );

  return (
    <button
      {...rest}
      type='button'
      onClick={onClick}
      onKeyDown={handleToggleKey}
      className={toggleBtnClasses}
      aria-label={rest['aria-label'] ?? btnLabel}
      aria-expanded={isOpen}
      aria-pressed={isOpen}
      aria-controls={
        rest['aria-controls'] ?? type === 'nav' ? 'main-navigation' : undefined
      }
      aria-haspopup='true'
      tabIndex={0}
    >
      <span className='toggle-button__text'>{btnLabel}</span>
      {isOpen ? <XmarkIcon /> : <BarsIcon />}
    </button>
  );
};

export default ToggleButton;
