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
        <div className='filterItem__group'>
          <input
            type='radio'
            name='sort'
            id='popular'
            value='popular'
            className='filterItem__group--control'
          />
          <label htmlFor='popular' className='filterItem__group--label'>
            Most popular
          </label>
        </div>
        <div className='filterItem__group'>
          <input
            type='radio'
            name='sort'
            id='trending'
            value='trending'
            className='filterItem__group--control'
          />
          <label htmlFor='trending' className='filterItem__group--label'>
            Trending
          </label>
        </div>
        <div className='filterItem__group'>
          <input
            type='radio'
            name='sort'
            id='oldest'
            value='oldest'
            className='filterItem__group--control'
          />
          <label htmlFor='oldest' className='filterItem__group--label'>
            Oldest
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
