import Select from 'react-select';
import Label from '../label/Label';

import { useCountries } from '../../hooks/useCountries';
import { CountrySelectProps, CountrySelectType } from '../../types';

import './CountrySelect.scss';

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <div className='country-select'>
      <Label label='Country' />
      <Select
        placeholder='Country'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectType)}
        formatOptionLabel={(option: CountrySelectType) => (
          <div className='country-select__wrapper'>
            <div className='country-select__wrapper--flag'>{option.flag}</div>
            <span className='country-select__wrapper--region'>
              {option.region}
            </span>
          </div>
        )}
        classNames={{
          control: () => 'country-select__control',
          input: () => 'country-select__input',
          option: () => 'country-select__option',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#273547',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
