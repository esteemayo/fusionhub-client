import Select from 'react-select';

import './CountrySelect.scss';

const CountrySelect = () => {
  return (
    <div className='country-select'>
      <Select placeholder='Country' />
    </div>
  );
};

export default CountrySelect;
