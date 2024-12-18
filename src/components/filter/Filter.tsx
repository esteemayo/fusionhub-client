import FilterItem from '../filterItem/FilterItem';

import './Filter.scss';

const Filter = () => {
  return (
    <aside className='filter'>
      <div className='filter__container'>
        <h2 className='filter__container--heading'>Filter</h2>
        <FilterItem />
      </div>
    </aside>
  );
};

export default Filter;
