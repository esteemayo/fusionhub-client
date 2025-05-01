import { useRef } from 'react';
import ReactQuill from 'react-quill-new';

import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { TextQuillProps } from '../../types';

import 'react-quill-new/dist/quill.snow.css';
import './TextQuill.scss';

const TextQuill = ({
  id,
  label,
  value,
  placeholder,
  validate,
  error,
  onChange,
}: TextQuillProps) => {
  const ref = useRef<ReactQuill | null>(null);

  const handleClick = () => {
    ref?.current?.focus();
  };

  return (
    <div className='text-quill'>
      <Label id={id} label={label} validate={validate} onClick={handleClick} />
      <ReactQuill
        theme='snow'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default TextQuill;
