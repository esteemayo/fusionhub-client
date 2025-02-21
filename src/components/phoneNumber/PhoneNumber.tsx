import { useRef } from 'react';
import PhoneInput from 'react-phone-number-input';

import Label from '../label/Label';
import { PhoneNumberProps } from '../../types';

import 'react-phone-number-input/style.css';
import './PhoneNumber.scss';

const PhoneNumber = ({
  label,
  value,
  placeholder,
  onChange,
}: PhoneNumberProps) => {
  const ref = useRef<HTMLInputElement | undefined>(null);

  const handleClick = () => {
    ref?.current?.focus();
  };

  return (
    <div className='phone-number'>
      <Label label={label} onClick={handleClick} />
      <PhoneInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
};

export default PhoneNumber;
