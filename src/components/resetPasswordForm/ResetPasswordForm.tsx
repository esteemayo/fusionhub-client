import { useState } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';

import { resetInputs } from '../../data/formData';
import { ResetPasswordFormProps } from '../../types';

import './ResetPasswordForm.scss';

const ResetPasswordForm = ({
  isLoading,
  register,
  errors,
  handleSubmit,
  onSubmit,
}: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((value) => !value);
  };

  const handlePasswordConfirmToggle = () => {
    setShowPasswordConfirm((value) => !value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='reset-password-form'>
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
              name === 'password'
                ? handlePasswordToggle
                : handlePasswordConfirmToggle
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
