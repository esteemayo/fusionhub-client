import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import { resetInputs } from '../../data/formData';
import { resetSchema } from '../../validations/resetSchema';

import { ResetPasswordType } from '../../types';
import { resetPassword } from '../../services/authService';

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

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((value) => !value);
  };

  const handlePasswordConfirmToggle = () => {
    setShowPasswordConfirm((value) => !value);
  };

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='reset-password__form'
          >
            {resetInputs.map((input) => {
              const { id, name, type, label, placeholder } = input;
              return (
                <Input
                  key={id}
                  type={
                    name === 'password'
                      ? showPassword
                        ? 'text'
                        : type
                      : name === 'passwordConfirm'
                      ? showPasswordConfirm
                        ? 'text'
                        : type
                      : type
                  }
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  register={register as unknown as UseFormRegister<FieldValues>}
                  errors={errors}
                  onAction={
                    name === 'password'
                      ? handlePasswordToggle
                      : handlePasswordConfirmToggle
                  }
                  disabled={mutation.isPending}
                  isShow={
                    name === 'password' ? showPassword : showPasswordConfirm
                  }
                  autoFocus={name === 'password'}
                  isPassword
                  validate
                />
              );
            })}
            <div className='reset-password__form--button'>
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

export default ResetPassword;
