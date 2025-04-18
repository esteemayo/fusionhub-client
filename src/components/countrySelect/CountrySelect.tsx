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
              {option.label}
            </span>
          </div>
        )}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: '#d1d5db',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#9ca3af',
            },
          }),
          input: (base) => ({
            ...base,
            color: '#ffffff',
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#5b6d85' : '#f3f4f6', // Changed background color for options
            color: state.isFocused ? '#ffffff' : '#dddcdc',
            '&:active': {
              backgroundColor: '#5b6d85',
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: '#ffffff',
          }),
          placeholder: (base) => ({
            ...base,
            color: '#ffffff',
          }),
        }}
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
            primary: '#ffffff',
            primary25: '#5b6d85',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
