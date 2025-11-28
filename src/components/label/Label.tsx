import { useMemo } from 'react';

import { LabelProps } from '../../types';
import PasswordToggle from '../passwordToggle/PasswordToggle';

import './Label.scss';

const Label = ({
  id,
  label,
  disabled,
  validate,
  isShow,
  isPassword,
  onClick,
  onAction,
}: LabelProps) => {
  const labelClasses = useMemo(
    () => (!validate ? 'label__text' : 'label__text star'),
    [validate]
  );

  return (
    <div className='label'>
      <label
        htmlFor={id}
        onClick={onClick}
        aria-label={label}
        aria-disabled={disabled}
        className={labelClasses}
      >
        {label}
      </label>
      <PasswordToggle
        label={label}
        inputId={id}
        isShow={isShow}
        isPassword={isPassword}
        disabled={disabled}
        onClick={onAction}
      />
    </div>
  );
};

export default Label;
