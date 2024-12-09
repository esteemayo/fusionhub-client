import ErrorMessage from '../errorMessage/ErrorMessage';

import { TextareaProps } from '../../types';

import './Textarea.scss';

const Textarea = ({ name, label, error, ...rest }: TextareaProps) => {
  return (
    <div className='textarea'>
      <label htmlFor={name} className='textarea__label'>
        {label}
      </label>
      <textarea {...rest} id={name} name={name} className='textarea__control' />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Textarea;
