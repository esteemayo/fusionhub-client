import ErrorMessage from '../errorMessage/ErrorMessage';

import { SelectProps } from '../../types';

import './Select.scss';

const Select = ({ name, label, error, ...rest }: SelectProps) => {
  return (
    <div className='select'>
      <label htmlFor={name} className='select__label'>
        {label}
      </label>
      <select {...rest} id={name} name={name} className='select__control'>
        <option value=''>Category</option>
        <option value='lifestyle'>Lifestyle</option>
        <option value='photo'>Photo</option>
        <option value='adventures'>Adventures</option>
        <option value='creativity'>Creativity</option>
        <option value='culture'>Culture</option>
      </select>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Select;
