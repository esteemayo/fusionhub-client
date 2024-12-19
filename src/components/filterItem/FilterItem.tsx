import { FilterItemProps } from '../../types';

import './FilterItem.scss';

const FilterItem = ({ id, name, value, label }: FilterItemProps) => {
  return (
    <div className='filterItem'>
      <div className='filterItem__container'>
        <div className='filterItem__group'>
          <input
            type='radio'
            name={name}
            id={id}
            value={value}
            className='filterItem__group--control'
          />
          <label htmlFor={id} className='filterItem__group--label'>
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
