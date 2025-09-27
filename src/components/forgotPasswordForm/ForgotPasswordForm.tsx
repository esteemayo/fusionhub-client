import Input from '../input/Input';
import Button from '../button/Button';

import { ForgotPasswordFormProps } from '../../types';

import './ForgotPasswordForm.scss';

const ForgotPasswordForm = ({
  isLoading,
  register,
  errors,
  onSubmit,
}: ForgotPasswordFormProps) => {
  return (
    <form onSubmit={onSubmit} className='forgot-password-form'>
      <Input
        type='email'
        name='email'
        label='Email Address'
        placeholder='Email address'
        register={register}
        errors={errors}
        disabled={isLoading}
        autoFocus
      />
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
