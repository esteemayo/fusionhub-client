import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { TextareaProps } from '../../types';

import './Textarea.scss';

const Textarea = ({
  name,
  label,
  disabled,
  validate,
  register,
  error,
  errors,
  ...rest
}: TextareaProps) => {
  return (
    <div className='textarea'>
      <Label id={name} label={label} disabled={disabled} validate={validate} />
      <textarea
        {...rest}
        {...register(name)}
        id={name}
        name={name}
        disabled={disabled}
        aria-disabled={disabled}
        className='textarea__control'
      />
      {error && <ErrorMessage message={error} />}
      {errors?.[name] && (
        <ErrorMessage message={errors[name].message as string | undefined} />
      )}
    </div>
  );
};
export default Textarea;
