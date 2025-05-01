import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { InputProps, InputType } from '../../types';

import './Input.scss';

const Input = ({
  id,
  type = 'text',
  label,
  validate,
  errors,
  register,
  ...rest
}: InputProps & InputType) => {
  return (
    <div className='input'>
      <Label id={id} label={label} validate={validate} />
      <input
        {...rest}
        {...register(id)}
        id={id}
        type={type}
        className='input__control'
      />
      {errors[id] && (
        <ErrorMessage message={errors[id].message as string | undefined} />
      )}
    </div>
  );
};

export default Input;
