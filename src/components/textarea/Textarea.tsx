import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { TextareaProps } from '../../types';

import './Textarea.scss';

const Textarea = ({ name, label, error, ref, ...rest }: TextareaProps) => {
  return (
    <div className='textarea'>
      <Label id={name} label={label} />
      <textarea
        {...rest}
        id={name}
        name={name}
        className='textarea__control'
        ref={ref}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
export default Textarea;
