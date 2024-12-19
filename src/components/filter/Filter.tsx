import FilterItem from '../filterItem/FilterItem';

import { filters } from '../../data/formData';

import './Filter.scss';

const Filter = () => {
  return (
    <aside className='filter'>
      <div className='filter__container'>
        <h2 className='filter__container--heading'>Filter</h2>
        {filters.map((filter) => {
          return <FilterItem key={filter.id} {...filter} />;
        })}
      </div>
    </aside>
  );
};

export default Filter;
