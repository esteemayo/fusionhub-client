import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { SelectProps } from '../../types';

import './Select.scss';

const Select = ({ name, label, error, options, ...rest }: SelectProps) => {
  return (
    <div className='select'>
      <Label id={name} label={label} />
      <select {...rest} id={name} name={name} className='select__control'>
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
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Select;
