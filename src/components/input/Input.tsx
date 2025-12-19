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
  const errorMessage = errors?.[name]?.message as string | undefined;
  const hasError = Boolean(errorMessage);
  const errorId = hasError ? `${name}-error` : undefined;

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
        aria-disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={errorId}
        className={`input__control ${hasError ? 'error' : ''}`}
      />

      {hasError && (
        <ErrorMessage id={errorId} role='alert' message={errorMessage} />
      )}
    </div>
  );
};

export default Input;
