import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { SelectProps, SelectType } from '../../types';

import './Select.scss';

const Select = ({
  name,
  label,
  validate,
  errors,
  options,
  ref,
  ...rest
}: SelectProps & SelectType) => {
  return (
    <div className='select'>
      <Label id={name} label={label} validate={validate} />
      <select
        {...rest}
        id={name}
        name={name}
        className='select__control'
        ref={ref}
      >
        <option value=''>Category</option>
        {options?.map((option) => {
          const { id, name } = option;
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
