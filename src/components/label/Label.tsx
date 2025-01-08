import { LabelProps } from '../../types';

import './Label.scss';

const Label = ({ id, label }: LabelProps) => {
  return (
    <label htmlFor={id} className='label'>
      {label}
    </label>
  );
};

export default Label;
