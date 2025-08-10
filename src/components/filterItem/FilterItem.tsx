import { useSearchParams } from 'react-router-dom';

import { FilterItemProps } from '../../types';

import './FilterItem.scss';

const FilterItem = ({ id, name, value, label, onClose }: FilterItemProps) => {
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

    onClose?.();
  };

  return (
    <article className='filter-item'>
      <div className='filter-item__container'>
        <div className='filter-item__group'>
          <input
            id={id}
            name={name}
            type='radio'
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
