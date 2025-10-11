import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { InputProps } from '../../types';

import './Input.scss';

const Input = ({
  name,
  type = 'text',
  label,
  disabled,
  validate,
  isShow,
  isPassword,
  errors,
  register,
  onAction,
  ...rest
}: InputProps) => {
  return (
    <div className='input'>
      <Label
        id={name}
        label={label}
        disabled={disabled}
        validate={validate}
        isShow={isShow}
        isPassword={isPassword}
        onAction={onAction}
      />
      <input
        {...rest}
        {...register(name)}
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        className='input__control'
      />
      {errors[name] && (
        <ErrorMessage message={errors[name].message as string | undefined} />
      )}
    </div>
  );
};

export default Input;
