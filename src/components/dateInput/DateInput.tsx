import DatePicker from 'react-datepicker';

import Label from '../label/Label';

import 'react-datepicker/dist/react-datepicker.css';
import './DateInput.scss';

const DateInput = ({ startDate, placeholder, onChange }) => {
  return (
    <div className='date-input'>
      <Label label='Date of Birth' />
      <DatePicker
        selected={startDate}
        placeholderText={placeholder}
        onChange={(date) => onChange(date)}
      />
    </div>
  );
};

export default DateInput;
