import { useMemo } from 'react';

import { ToggleButtonProps } from '../../types';

import './ToggleButton.scss';

const ToggleButton = ({ type, label, isOpen, onClick }: ToggleButtonProps) => {
  const toggleBtnClasses = useMemo(() => {
    return type === 'nav' ? 'toggle-button nav' : 'toggle-button';
  }, [type]);

  const btnLabel = useMemo(() => {
    return type === 'nav' ? label : isOpen ? 'Close' : label;
  }, [isOpen, label, type]);

  return (
    <button type='button' className={toggleBtnClasses} onClick={onClick}>
      <span>{btnLabel}</span>
      {isOpen ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18 18 6M6 6l12 12'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5'
          />
        </svg>
      )}
    </button>
  );
};

export default ToggleButton;
