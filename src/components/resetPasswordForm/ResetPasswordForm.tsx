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
      <p
        id={ariaProps['aria-labelledby'] ?? 'forgot-password-form-description'}
        className='sr-only'
      >
        Reset password form with fields for password and confirm password
      </p>

      {resetInputs.map((input, index) => {
        const { id, name, type, label, placeholder } = input;

        const isPasswordField = name === 'password';
        const isPasswordConfirmField = name === 'passwordConfirm';

        const isVisible = isPasswordField
          ? showPassword
          : isPasswordConfirmField
          ? showPasswordConfirm
          : false;

        const handleToggle = isPasswordField
          ? onTogglePassword
          : onTogglePasswordConfirm;

        const actionAriaLabel = (label: string) => {
          return isPasswordField
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
            isShow={isVisible}
            autoFocus={index === 0}
            isPassword={isPasswordField || isPasswordConfirmField}
            validate
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
            aria-label={actionAriaLabel(label)}
            aria-pressed={isPasswordField ? showPassword : showPasswordConfirm}
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
