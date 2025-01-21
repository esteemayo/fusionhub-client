import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';

import Label from '../label/Label';

import 'react-phone-number-input/style.css';

import './PhoneNumber.scss';

const PhoneNumber = () => {
  const [value, setValue] = useState();

  return (
    <div className='phoneNumber'>
      <Label label='Phone number' />
      <PhoneInput
        labels='Phone'
        placeholder='Phone number'
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default PhoneNumber;
