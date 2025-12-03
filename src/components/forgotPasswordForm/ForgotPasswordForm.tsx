import Input from '../input/Input';
import Button from '../button/Button';

import { ForgotPasswordFormProps } from '../../types';

import './ForgotPasswordForm.scss';

const ForgotPasswordForm = ({
  isLoading,
  register,
  errors,
  onSubmit,
  ...ariaProps
}: ForgotPasswordFormProps) => {
  const emailError = errors?.email?.message as string | undefined;

  return (
    <form
      onSubmit={onSubmit}
      className='forgot-password-form'
      role='form'
      aria-busy={isLoading ? 'true' : 'false'}
      noValidate
      {...ariaProps}
    >
      <p id='forgot-password-form-description' className='sr-only'>
        Forgot password form with email field
      </p>

      <Input
        type='email'
        name='email'
        label='Email Address'
        placeholder='Email address'
        register={register}
        errors={errors}
        disabled={isLoading}
        autoFocus
        aria-invalid={emailError ? 'true' : 'false'}
        aria-describedby={emailError ? 'email-error' : undefined}
      />

      {emailError && (
        <span id='email-error' className='sr-only'>
          emailError
        </span>
      )}

      <div className='forgot-password-form__button'>
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

export default ForgotPasswordForm;
