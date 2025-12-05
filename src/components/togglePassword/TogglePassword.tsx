import { useMemo } from 'react';

import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

import { TogglePasswordProps } from '../../types';

import './TogglePassword.scss';

const TogglePassword = ({
  label,
  inputId,
  isShow,
  isPassword,
  disabled,
  onClick,
}: TogglePasswordProps) => {
  const containerClasses = useMemo(
    () => (isPassword ? 'toggle-password active' : 'toggle-password hide'),
    [isPassword]
  );

  const labelText = `${isShow ? 'Hide' : 'Show'} ${label?.toLowerCase()}`;

  return (
    <div className={containerClasses} role='presentation'>
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className='toggle-password__btn'
        aria-label={labelText}
        aria-pressed={isShow}
        aria-controls={inputId}
        aria-disabled={disabled}
        title={labelText}
      >
        {isShow ? (
          <EyeSlashIcon className='password-toggle__btn--icon' />
        ) : (
          <EyeIcon className='password-toggle__btn--icon' />
        )}

        <span className='toggle-password__btn--text'>
          {isShow ? 'Hide' : 'Show'}
        </span>
      </button>
    </div>
  );
};

export default TogglePassword;
