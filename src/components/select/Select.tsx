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
        className='select__control'
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
      {errors?.[name] && (
        <ErrorMessage message={errors[name].message as string | undefined} />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Select;
