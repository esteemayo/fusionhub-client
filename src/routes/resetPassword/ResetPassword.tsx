import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import ResetPasswordForm from '../../components/resetPasswordForm/ResetPasswordForm';

import { resetPassword } from '../../services/authService';
import { resetSchema } from '../../validations/resetSchema';

import { ResetPasswordType } from '../../types';

import './ResetPassword.scss';

const passwordReset = async <T extends ResetPasswordType, U extends string>(
  credentials: T,
  token: U
) => {
  const { data } = await resetPassword(credentials, token);
  return data;
};

type FormData = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = pathname.split('/').pop() as string;

  const mutation = useMutation({
    mutationFn: (credentials: ResetPasswordType) =>
      passwordReset(credentials, token),
    onSuccess: () => {
      toast.success(
        'Your password has been reset successfully. You can now log in with your new password.'
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
    resolver: zodResolver(resetSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        navigate('/login');
      },
    });
  };

  return (
    <div className='reset-password'>
      <div className='reset-password__container'>
        <div className='reset-password__wrapper'>
          <h1 className='reset-password__wrapper--heading'>Reset password</h1>
          <p className='reset-password__wrapper--text'>
            Please enter your new password.
          </p>
          <ResetPasswordForm
            isLoading={mutation.isPending}
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
