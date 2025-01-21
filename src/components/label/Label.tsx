import { LabelProps } from '../../types';

import './Label.scss';

const Label = ({ id, label, onClick }: LabelProps) => {
  return (
    <label htmlFor={id} className='label' onClick={onClick}>
      {label}
    </label>
  );
};

export default Label;
