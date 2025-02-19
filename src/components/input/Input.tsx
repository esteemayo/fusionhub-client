import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { InputProps } from '../../types';

import './Input.scss';

const Input = ({
  name,
  type = 'text',
  label,
  error,
  ref,
  ...rest
}: InputProps) => {
  return (
    <div className='input'>
      <Label id={name} label={label} />
      <input
        {...rest}
        id={name}
        name={name}
        type={type}
        className='input__control'
        ref={ref}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Input;
