import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { SelectProps } from '../../types';

import './Select.scss';

const Select = ({
  name,
  label,
  defaultValue,
  disabled,
  validate,
  register,
  error,
  errors,
  options,
  ...rest
}: SelectProps) => {
  const fieldError = error || errors?.[name]?.message;
  const errorId = fieldError ? `${name}-error` : undefined;

  return (
    <div className='select'>
      <Label id={name} label={label} disabled={disabled} validate={validate} />
      <select
        {...rest}
        {...register(name)}
        id={name}
        name={name}
        disabled={disabled}
        aria-disabled={disabled}
        aria-invalid={!!fieldError}
        aria-describedby={errorId}
        className={`select__control ${fieldError ? 'error' : ''}`}
      >
        <option value=''>{defaultValue ?? 'Select'}</option>
        {options?.map(({ _id: id, name }) => {
          const optionName = name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <option key={id} value={name}>
              {optionName}
            </option>
          );
        })}
      </select>

      {error && <ErrorMessage id={errorId} role='alert' message={error} />}

      {errors?.[name] && (
        <ErrorMessage
          id={errorId}
          role='alert'
          message={errors[name].message as string | undefined}
        />
      )}
    </div>
  );
};

export default Select;
