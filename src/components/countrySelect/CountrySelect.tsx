import Select from 'react-select';
import Label from '../label/Label';

import './CountrySelect.scss';

const CountrySelect = () => {
  return (
    <div className='country-select'>
      <Label label='Country' />
      <Select
        placeholder='Country'
        isClearable
        formatOptionLabel={(option: {
          option: { label: string; region: string };
        }) => (
          <div className='country-select__wrapper'>
            <div className='country-select__wrapper--flag'>label</div>
            <span className='country-select__wrapper--region'>region</span>
          </div>
        )}
        classNames={{
          control: () => 'country-select__control',
          input: () => 'country-select__input',
          option: () => 'country-select__option',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
