import './FilterItem.scss';

const FilterItem = () => {
  return (
    <div className='filterItem'>
      <div className='filterItem__container'>
        <div className='filterItem__group'>
          <label className='filterItem__group--label'>Newest</label>
          <input
            type='radio'
            name='name'
            value='newest'
            className='filterItem__group--control'
          />
        </div>
        <div className='filterItem__group'>
          <label className='filterItem__group--label'>Most popular</label>
          <input
            type='radio'
            name='name'
            value='popular'
            className='filterItem__group--control'
          />
        </div>
        <div className='filterItem__group'>
          <label className='filterItem__group--label'>Trending</label>
          <input
            type='radio'
            name='name'
            value='trending'
            className='filterItem__group--control'
          />
        </div>
        <div className='filterItem__group'>
          <label className='filterItem__group--label'>Oldest</label>
          <input
            type='radio'
            name='name'
            value='oldest'
            className='filterItem__group--control'
          />
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
