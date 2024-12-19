import './FilterItem.scss';

const FilterItem = () => {
  return (
    <div className='filterItem'>
      <div className='filterItem__container'>
        <div className='filterItem__group'>
          <input
            type='radio'
            name='sort'
            id='newest'
            value='newest'
            className='filterItem__group--control'
          />
          <label htmlFor='newest' className='filterItem__group--label'>
            Newest
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
