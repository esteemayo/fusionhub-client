import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { InputProps } from '../../types';

import './Input.scss';

const Input = ({
  name,
  type = 'text',
  label,
  validate,
  errors,
  register,
  ...rest
}: InputProps) => {
  return (
    <div className='input'>
      <Label id={name} label={label} validate={validate} />
      <input
        {...rest}
        {...register(name)}
        id={name}
        name={name}
        type={type}
        className='input__control'
      />
      {errors[name] && (
        <ErrorMessage message={errors[name].message as string | undefined} />
      )}
    </div>
  );
};

export default Input;
