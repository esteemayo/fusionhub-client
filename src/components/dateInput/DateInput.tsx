import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { DateInputProps } from '../../types';

import 'react-datepicker/dist/react-datepicker.css';
import './DateInput.scss';

const DateInput = ({
  label,
  startDate,
  placeholder,
  validate,
  error,
  onChange,
}: DateInputProps) => {
  const ref = useRef<DatePicker | null>(null);

  const inputId = `${label?.replace(/\s+/g, '-').toLowerCase()}-date-input`;
  const errorId = `${inputId}-error`;

  const handleClick = () => {
    ref?.current?.onInputClick();
  };

  return (
    <div className='date-input' role='group' aria-labelledby={inputId}>
      <Label label={label} validate={validate} onClick={handleClick} />

      <div className='date-input__wrapper'>
        <DatePicker
          id={inputId}
          ref={ref}
          selected={startDate}
          placeholderText={placeholder}
          onChange={(date) => onChange(date)}
          ariaInvalid={error}
          ariaDescribedBy={error ? errorId : undefined}
          className={`date-input__wrapper--input ${error ? 'error' : ''}`}
        />
      </div>

      {error && <ErrorMessage id={errorId} role='alert' message={error} />}
    </div>
  );
};

export default DateInput;
