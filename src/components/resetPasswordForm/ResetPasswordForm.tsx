import Input from '../input/Input';
import Button from '../button/Button';

import { resetInputs } from '../../data/formData';
import { ResetPasswordFormProps } from '../../types';

import './ResetPasswordForm.scss';

const ResetPasswordForm = ({
  isLoading,
  showPassword,
  showPasswordConfirm,
  register,
  errors,
  onTogglePassword,
  onTogglePasswordConfirm,
  onSubmit,
}: ResetPasswordFormProps) => {
  return (
    <form onSubmit={onSubmit} className='reset-password-form'>
      {resetInputs.map((input) => {
        const { id, name, type, label, placeholder } = input;
        return (
          <Input
            key={id}
            type={
              name === 'password'
                ? showPassword
                  ? 'text'
                  : type
                : name === 'passwordConfirm'
                ? showPasswordConfirm
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
              name === 'password' ? onTogglePassword : onTogglePasswordConfirm
            }
            disabled={isLoading}
            isShow={name === 'password' ? showPassword : showPasswordConfirm}
            autoFocus={name === 'password'}
            isPassword
            validate
          />
        );
      })}
      <div className='reset-password-form__button'>
        <Button
          type='submit'
          label='Reset your password'
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
