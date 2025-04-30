import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { TextareaProps, TextAreaType } from '../../types';

import './Textarea.scss';

const Textarea = ({
  name,
  label,
  errors,
  ref,
  ...rest
}: TextareaProps & TextAreaType) => {
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
      {errors[name] && (
        <ErrorMessage message={errors[name].message as string | undefined} />
      )}
    </div>
  );
};
export default Textarea;
