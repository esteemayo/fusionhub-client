import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { InputProps, InputType } from '../../types';

import './Input.scss';

const Input = ({
  name,
  type = 'text',
  label,
  errors,
  register,
  ref,
  ...rest
}: InputProps & InputType) => {
  return (
    <div className='input'>
      <Label id={name} label={label} />
      <input
        {...rest}
        {...register!(name as string)}
        id={name}
        name={name}
        type={type}
        className='input__control'
        ref={ref}
      />
      {errors[name] && (
        <ErrorMessage message={errors[name].message as string | undefined} />
      )}
    </div>
  );
};

export default Input;
