import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import Label from '../label/Label';

import { DateInputProps } from '../../types';

import 'react-datepicker/dist/react-datepicker.css';
import './DateInput.scss';

const DateInput = ({ startDate, placeholder, onChange }: DateInputProps) => {
  const ref = useRef<DatePicker | null>(null);

  const handleClick = () => {
    ref?.current?.onInputClick();
  };

  return (
    <div className='date-input'>
      <Label label='Date of Birth' onClick={handleClick} />
      <DatePicker
        selected={startDate}
        placeholderText={placeholder}
        onChange={(date) => onChange(date)}
        ref={ref}
      />
    </div>
  );
};

export default DateInput;
