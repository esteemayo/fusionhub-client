import { FilterItemProps } from '../../types';

import './FilterItem.scss';

const FilterItem = ({ id, name, value, label }: FilterItemProps) => {
  return (
    <article className='filter-item'>
      <div className='filter-item__container'>
        <div className='filter-item__group'>
          <input
            type='radio'
            name={name}
            id={id}
            value={value}
            className='filter-item__group--control'
          />
          <label htmlFor={id} className='filter-item__group--label'>
            {label}
          </label>
        </div>
      </div>
    </article>
  );
};

export default FilterItem;
