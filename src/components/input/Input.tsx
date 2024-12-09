import ErrorMessage from '../errorMessage/ErrorMessage';

import { InputProps } from '../../types';

import './Input.scss';

const Input = ({
  id,
  name,
  type = 'text',
  label,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className='input'>
      <label htmlFor={id} className='input__label'>
        {label}
      </label>
      <input
        {...rest}
        id={id}
        type={type}
        name={name}
        className='input__control'
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Input;
