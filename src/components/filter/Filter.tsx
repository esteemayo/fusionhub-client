import FilterItem from '../filterItem/FilterItem';

import { FilterProps } from '../../types';
import { filters } from '../../data/formData';

import './Filter.scss';

const Filter = ({ onClose }: FilterProps) => {
  return (
    <section className='filter'>
      <div className='filter__container'>
        <h2 className='filter__container--heading'>Filter</h2>
        {filters.map((filter) => {
          return <FilterItem key={filter.id} {...filter} onClose={onClose} />;
        })}
      </div>
    </section>
  );
};

export default Filter;
