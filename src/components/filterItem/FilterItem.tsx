import { useSearchParams } from 'react-router-dom';

import { FilterItemProps } from '../../types';

import './FilterItem.scss';

const FilterItem = ({ id, name, value, label }: FilterItemProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = ({
    target: input,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = input;

    if (searchParams.get(name) !== value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        [name]: value,
      });
    }
  };

  return (
    <article className='filter-item'>
      <div className='filter-item__container'>
        <div className='filter-item__group'>
          <input
            type='radio'
            name={name}
            id={id}
            value={value}
            onChange={handleChange}
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
