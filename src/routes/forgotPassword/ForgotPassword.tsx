import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import ForgotPasswordForm from '../../components/forgotPasswordForm/ForgotPasswordForm';

import { forgotPassword } from '../../services/authService';
import { ForgotFormData, forgotSchema } from '../../validations/forgotSchema';

import './ForgotPassword.scss';

const forgot = async (email: string) => {
  const { data } = await forgotPassword(email);
  return data;
};

const ForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: (email: string) => forgot(email),
    onSuccess: () => {
      toast.success(
        'A password reset link has been sent to your email address.',
        { role: 'alert' }
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
        toast.error(errorMessage, { role: 'alert' });
      } else {
        toast.error('An error occurred', { role: 'alert' });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit: SubmitHandler<ForgotFormData> = (data) => {
    mutation.mutate(data.email, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div
      className='forgot-password'
      role='main'
      aria-labelledby='forgot-password-heading'
      aria-describedby='forgot-password-description'
    >
      <div className='forgot-password__container'>
        <div className='forgot-password__wrapper'>
          <h1
            id='forgot-password-heading'
            className='forgot-password__wrapper--heading'
          >
            Forgot password
          </h1>

          <p
            id='forgot-password-description'
            className='forgot-password__wrapper--text'
          >
            Please enter your email address.
          </p>

          <ForgotPasswordForm
            isLoading={mutation.isPending}
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            aria-labelledby='forgot-password-heading'
            aria-describedby='forgot-password-description'
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
