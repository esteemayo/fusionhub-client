import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import { forgotPassword } from '../../services/authService';
import { forgotSchema } from '../../validations/forgotSchema';

import './ForgotPassword.scss';

const forgot = async (email: string) => {
  const { data } = await forgotPassword(email);
  return data;
};

type FormData = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: (email: string) => forgot(email),
    onSuccess: () => {
      toast.success(
        'A password reset link has been sent to your email address.'
      );
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data.email, {
      onSuccess: () => {
        reset();
      },
    });
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
              disabled={mutation.isPending}
              autoFocus
            />
            <div className='forgot-password__form--button'>
              <Button
                type='submit'
                label='Reset your password'
                isLoading={mutation.isPending}
                disabled={mutation.isPending}
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
