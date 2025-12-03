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
  ...ariaProps
}: ResetPasswordFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className='reset-password-form'
      role='form'
      aria-busy={isLoading ? 'true' : 'false'}
      noValidate
      {...ariaProps}
    >
      {resetInputs.map((input) => {
        const { id, name, type, label, placeholder } = input;

        const isPassword = name === 'password';
        const isConfirm = name === 'passwordConfirm';

        const isVisible = isPassword
          ? showPassword
          : isConfirm
          ? showPasswordConfirm
          : false;

        const handleToggle = isPassword
          ? onTogglePassword
          : onTogglePasswordConfirm;

        const actionAriaLabel = (label: string) => {
          return isPassword
            ? `${showPassword ? 'Hide' : 'Show'} ${label.toLowerCase()}`
            : `${showPasswordConfirm ? 'Hide' : 'Show'} ${label.toLowerCase()}`;
        };

        return (
          <Input
            key={id}
            type={isVisible ? 'text' : type}
            name={name}
            label={label}
            placeholder={placeholder}
            register={register}
            errors={errors}
            onAction={handleToggle}
            disabled={isLoading}
            isShow={isPassword ? showPassword : showPasswordConfirm}
            autoFocus={name === 'password'}
            isPassword
            validate
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
            aria-label={actionAriaLabel(label)}
            aria-pressed={isPassword ? showPassword : showPasswordConfirm}
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
