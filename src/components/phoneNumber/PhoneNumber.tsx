import { useId, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';

import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { PhoneNumberProps } from '../../types';

import 'react-phone-number-input/style.css';
import './PhoneNumber.scss';

const PhoneNumber = ({
  name = 'phone-number',
  label,
  value,
  placeholder,
  validate,
  error,
  onChange,
}: PhoneNumberProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const inputId = useId();
  const errorId = `${inputId}-error`;

  const handleClick = () => {
    ref.current?.focus();
  };

  return (
    <div className='phone-number'>
      <Label label={label} validate={validate} onClick={handleClick} />
      <PhoneInput
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputRef={ref}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />

      {error && <ErrorMessage id={errorId} role='alert' message={error} />}
    </div>
  );
};

export default PhoneNumber;
