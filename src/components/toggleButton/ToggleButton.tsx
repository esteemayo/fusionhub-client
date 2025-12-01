import { useMemo } from 'react';

import BarsIcon from '../icons/BarsIcon';
import XmarkIcon from '../icons/XmarkIcon';

import { ToggleButtonProps } from '../../types';

import './ToggleButton.scss';

const ToggleButton = ({ type, label, isOpen, onClick }: ToggleButtonProps) => {
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
      type='button'
      onClick={onClick}
      onKeyDown={handleToggleKey}
      aria-label={btnLabel}
      aria-expanded={isOpen}
      aria-pressed={isOpen}
      aria-controls={type === 'nav' ? 'main-navigation' : undefined}
      aria-haspopup='true'
      tabIndex={0}
      className={toggleBtnClasses}
    >
      <span className='toggle-button__text'>{btnLabel}</span>
      {isOpen ? <XmarkIcon /> : <BarsIcon />}
    </button>
  );
};

export default ToggleButton;
