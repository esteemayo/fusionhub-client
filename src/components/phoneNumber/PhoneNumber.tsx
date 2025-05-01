import { useRef } from 'react';
import PhoneInput from 'react-phone-number-input';

import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { PhoneNumberProps } from '../../types';

import 'react-phone-number-input/style.css';
import './PhoneNumber.scss';

const PhoneNumber = ({
  label,
  value,
  placeholder,
  validate,
  error,
  onChange,
}: PhoneNumberProps) => {
  const ref = useRef<HTMLInputElement | undefined>(null);

  const handleClick = () => {
    ref?.current?.focus();
  };

  return (
    <div className='phone-number'>
      <Label label={label} validate={validate} onClick={handleClick} />
      <PhoneInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default PhoneNumber;
