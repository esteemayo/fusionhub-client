import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import { forgotSchema } from '../../validations/forgotSchema';

import './ForgotPassword.scss';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  type FormData = z.infer<typeof forgotSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      console.log(data);
      toast.success('Token sent to email');

      reset();
    }, 1500);
  };

  return (
    <div className='forgot-password'>
      <div className='forgot-password__container'>
        <div className='forgot-password__wrapper'>
          <h1 className='forgot-password__wrapper--heading'>Forgot password</h1>
          <p className='forgot-password__wrapper--text'>
            Please enter your email address.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='forgot-password__form'
          >
            <Input
              type='email'
              name='email'
              label='Email Address'
              placeholder='Email address'
              register={register as unknown as UseFormRegister<FieldValues>}
              errors={errors}
              autoFocus
            />
            <div className='forgot-password__form--button'>
              <Button
                type='submit'
                label='Reset your password'
                isLoading={!!isLoading}
                disabled={!!isLoading}
                color='primary'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
