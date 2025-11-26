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
  const fieldError = error || (errors?.[name]?.message as string | undefined);
  const errorId = fieldError ? `${name}-error` : undefined;

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
        aria-invalid={!!fieldError}
        aria-describedby={errorId}
        className={`textarea__control ${fieldError ? 'error' : ''}`}
      />

      {error && <ErrorMessage id={errorId} role='alert' message={error} />}

      {errors?.[name] && (
        <ErrorMessage
          id={errorId}
          role='alert'
          message={errors[name].message as string | undefined}
        />
      )}
    </div>
  );
};
export default Textarea;
