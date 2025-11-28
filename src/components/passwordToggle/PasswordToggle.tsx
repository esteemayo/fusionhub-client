import { useMemo } from 'react';

import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

import { PasswordToggleProps } from '../../types';

import './PasswordToggle.scss';

const PasswordToggle = ({
  label,
  inputId,
  isShow,
  isPassword,
  disabled,
  onClick,
}: PasswordToggleProps) => {
  const containerClasses = useMemo(
    () => (isPassword ? 'password-toggle active' : 'password-toggle hide'),
    [isPassword]
  );

  const labelText = `${isShow ? 'Hide' : 'Show'} ${label?.toLowerCase()}`;

  return (
    <div className={containerClasses} role='presentation'>
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className='password-toggle__btn'
        aria-label={labelText}
        aria-pressed={isShow}
        aria-controls={inputId}
        aria-disabled={disabled}
        title={labelText}
      >
        {isShow ? <EyeSlashIcon /> : <EyeIcon />}
        <span className='password-toggle__btn--text'>
          {isShow ? 'Hide' : 'Show'}
        </span>
      </button>
    </div>
  );
};

export default PasswordToggle;
