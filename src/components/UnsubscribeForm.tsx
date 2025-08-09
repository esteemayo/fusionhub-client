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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      />
      <div>
        <Button
          type='submit'
          label='Unsubscribe'
          color='dark'
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default UnsubscribeForm;
