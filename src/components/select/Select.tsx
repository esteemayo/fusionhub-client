import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { SelectProps } from '../../types';

import './Select.scss';

const Select = ({
  name,
  label,
  validate,
  register,
  errors,
  options,
  ...rest
}: SelectProps) => {
  return (
    <div className='select'>
      <Label id={name} label={label} validate={validate} />
      <select
        {...rest}
        {...register(name)}
        id={name}
        name={name}
        className='select__control'
      >
        <option value=''>Category</option>
        {options?.map(({ _id: id, name }) => {
          return (
            <option key={id} value={name}>
              {name}
            </option>
          );
        })}
      </select>
      {errors[name] && (
        <ErrorMessage message={errors[name].message as string | undefined} />
      )}
    </div>
  );
};

export default Select;
