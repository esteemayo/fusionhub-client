import ErrorMessage from '../errorMessage/ErrorMessage';

import './Select.scss';

const Select = () => {
  return (
    <div className='select'>
      <label htmlFor='category' className='select__label'>
        Category
      </label>
      <select name='category' id='category' className='select__control'>
        <option value=''>Category</option>
        <option value='lifestyle'>Lifestyle</option>
        <option value='photo'>Photo</option>
        <option value='adventures'>Adventures</option>
        <option value='creativity'>Creativity</option>
        <option value='culture'>Culture</option>
      </select>
      <ErrorMessage message={''} />
    </div>
  );
};

export default Select;
