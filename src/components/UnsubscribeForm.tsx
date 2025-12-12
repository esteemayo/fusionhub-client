import Input from './input/Input';
import Button from './button/Button';

import { UnsubscribeFormProps } from '../types';

const UnsubscribeForm = ({
  register,
  errors,
  isLoading,
  onSubmit,
  handleSubmit,
}: UnsubscribeFormProps) => {
  const errorMessage = errors?.email?.message as string | undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      role='form'
      aria-label='Unsubscribe from newsletter form'
      aria-busy={isLoading ? 'true' : 'false'}
      noValidate
    >
      <Input
        id='email'
        name='email'
        type='email'
        label='Email Address'
        placeholder='Enter your email address'
        register={register}
        errors={errors}
        disabled={isLoading}
        validate
        aria-required='true'
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />

      {errorMessage && (
        <p id='email-error' className='sr-only' role='alert'>
          {errorMessage}
        </p>
      )}

      <div>
        <Button
          type='submit'
          label='Unsubscribe'
          variant='dark'
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default UnsubscribeForm;
