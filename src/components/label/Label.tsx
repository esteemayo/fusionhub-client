import { useMemo } from 'react';

import { LabelProps } from '../../types';
import PasswordToggle from '../passwordToggle/PasswordToggle';

import './Label.scss';

const Label = ({
  id,
  label,
  validate,
  isShow,
  isPassword,
  onClick,
  onAction,
}: LabelProps) => {
  const labelClasses = useMemo(() => {
    return !validate ? 'label__text' : 'label__text star';
  }, [validate]);

  return (
    <div className='label'>
      <label htmlFor={id} className={labelClasses} onClick={onClick}>
        {label}
      </label>
      <PasswordToggle
        isShow={isShow}
        isPassword={isPassword}
        onClick={onAction}
      />
    </div>
  );
};

export default Label;
