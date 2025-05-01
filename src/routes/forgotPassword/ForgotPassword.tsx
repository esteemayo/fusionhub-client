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

import './ForgotPassword.scss';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = z
    .object({
      email: z
        .string()
        .min(5, 'Email address must be at least 5 characters long')
        .regex(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/,
          { message: 'Please enter a valid email address' }
        )
        .email({ message: 'Invalid email address' })
        .trim()
        .toLowerCase()
        .refine((email) => email.endsWith('gmail.com'), {
          message: `Email must be from 'gmail.com' domain`,
        }),
    })
    .required();

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      console.log(data);
      toast.success('Token sent to email');
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
                loading={!!isLoading}
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
