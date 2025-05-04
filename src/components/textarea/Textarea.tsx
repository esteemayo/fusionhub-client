import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { TextareaProps } from '../../types';

import './Textarea.scss';

const Textarea = ({
  name,
  label,
  validate,
  register,
  errors,
  ...rest
}: TextareaProps) => {
  return (
    <div className='textarea'>
      <Label id={name} label={label} validate={validate} />
      <textarea
        {...rest}
        {...register(name)}
        id={name}
        name={name}
        className='textarea__control'
      />
      {errors[name] && (
        <ErrorMessage message={errors[name].message as string | undefined} />
      )}
    </div>
  );
};
export default Textarea;
