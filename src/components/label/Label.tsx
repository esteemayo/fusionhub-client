import { useMemo } from 'react';
import { LabelProps } from '../../types';

import './Label.scss';

const Label = ({ id, label, validate, onClick }: LabelProps) => {
  const labelClasses = useMemo(() => {
    return !validate ? 'label' : 'label star';
  }, [validate]);

  return (
    <label htmlFor={id} className={labelClasses} onClick={onClick}>
      {label}
    </label>
  );
};

export default Label;
