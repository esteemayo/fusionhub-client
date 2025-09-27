import Input from '../input/Input';
import Button from '../button/Button';

import { UpdatePasswordFormProps } from '../../types';

import './UpdatePasswordForm.scss';

const UpdatePasswordForm = ({
  input,
  inputs,
  showPassword,
  showPasswordConfirm,
  showPasswordCurrent,
  isLoading,
  register,
  errors,
  onTogglePassword,
  onTogglePasswordConfirm,
  onTogglePasswordCurrent,
  onSubmit,
}: UpdatePasswordFormProps) => {
  return (
    <form className='update-password-form' onSubmit={onSubmit}>
      <div className='update-password-form__inputs'>
        {inputs.map((input) => {
          const { id, name, type, label, placeholder } = input;
          return (
            <Input
              key={id}
              type={
                name === 'passwordCurrent'
                  ? showPasswordCurrent
                    ? 'text'
                    : type
                  : name === 'password'
                  ? showPassword
                    ? 'text'
                    : type
                  : type
              }
              name={name}
              label={label}
              placeholder={placeholder}
              register={register}
              errors={errors}
              onAction={
                name === 'passwordCurrent'
                  ? onTogglePasswordCurrent
                  : onTogglePassword
              }
              disabled={isLoading}
              autoFocus={name === 'passwordCurrent'}
              isShow={
                name === 'passwordCurrent' ? showPasswordCurrent : showPassword
              }
              isPassword
              validate
            />
          );
        })}
      </div>
      <div className='update-password-form__confirm'>
        <Input
          type={showPasswordConfirm ? 'text' : input.type}
          name={input.name}
          label={input.label}
          placeholder={input.placeholder}
          register={register}
          errors={errors}
          onAction={onTogglePasswordConfirm}
          disabled={isLoading}
          isShow={showPasswordConfirm}
          isPassword
          validate
        />
      </div>
      <Button
        type='submit'
        label='Update Changes'
        isLoading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
};

export default UpdatePasswordForm;
