import { useRef } from 'react';
import Select, { SelectInstance } from 'react-select';

import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { useCountries } from '../../hooks/useCountries';
import { CountrySelectProps, CountrySelectType } from '../../types';

import './CountrySelect.scss';

const CountrySelect = ({
  name,
  label,
  placeholder,
  validate,
  register,
  errors,
  onChange,
}: CountrySelectProps) => {
  const { getAll } = useCountries();
  const ref = useRef<SelectInstance<CountrySelectType>>(null);

  const handleClick = () => {
    ref.current?.focus();
  };

  const inputId = `${name}-country-select`;
  const errorId = `${inputId}-error`;
  const hasError = !!errors?.[name];

  return (
    <div
      className='country-select'
      role='group'
      aria-labelledby={inputId}
      aria-describedby={hasError ? errorId : undefined}
    >
      <Label label={label} validate={validate} onClick={handleClick} />
      <Select
        {...(register ? register(name) : {})}
        inputId={inputId}
        aria-invalid={hasError}
        aria-describedBy={hasError ? errorId : undefined}
        name={name}
        placeholder={placeholder}
        isClearable
        options={getAll()}
        onChange={(value) => onChange(name, (value as CountrySelectType) || '')}
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
            backgroundColor: state.isFocused ? '#5b6d85' : '#f3f4f6',
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
          control: () => `country-select__control ${hasError ? 'error' : ''}`,
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
        ref={ref}
      />

      {hasError && (
        <ErrorMessage
          id={errorId}
          role='alert'
          message={errors[name]?.message as string | undefined}
        />
      )}
    </div>
  );
};

export default CountrySelect;
