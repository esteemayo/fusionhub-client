import { useMemo } from 'react';
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const radios = document.querySelectorAll<HTMLInputElement>(
      `input[name="${name}"]`
    );

    const index = Array.from(radios).findIndex(
      (radio) => radio.value === value
    );

    if (index < 0) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();

      const next = radios[index + 1] || radios[0];
      next.focus();
      next.click();
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();

      const prev = radios[index - 1] || radios[radios.length - 1];
      prev.focus();
      prev.click();
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      const target = e.target as HTMLInputElement;
      target.click();
    }
  };

  const checked = useMemo(
    () => searchParams.get(name) === value,
    [searchParams, name, value]
  );

  return (
    <article className='filter-item' role='none'>
      <div className='filter-item__container'>
        <div
          className='filter-item__group'
          role='radio'
          aria-checked={checked}
          tabIndex={checked ? 0 : -1}
        >
          <input
            id={id}
            name={name}
            type='radio'
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='filter-item__group--control'
            aria-labelledby={`${id}-label`}
          />
          <label
            id={`${id}-label`}
            htmlFor={id}
            className='filter-item__group--label'
          >
            {label}
          </label>
        </div>
      </div>
    </article>
  );
};

export default FilterItem;
