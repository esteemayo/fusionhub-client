import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { useEffect, useState } from 'react';

import AuthLink from '../../components/authLink/AuthLink';
import LoginForm from '../../components/loginForm/LoginForm';

import { LoginFormData, loginSchema } from '../../validations/loginSchema';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginUser, resetState } from '../../features/auth/authSlice';

import { useQueryParams } from '../../utils';

import './Login.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user } = useAppSelector(
    (state) => state.auth
  );

  const query = useQueryParams();
  const name = query.get('name');

  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword((value) => {
      return !value;
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(loginUser({ ...data }));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        role: 'alert',
      });
    }

    if (isSuccess && user) {
      reset();
      window.location.reload();
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, isError, isSuccess, message, reset, user]);

  return (
    <section
      className='login'
      role='region'
      aria-labelledby='login-title'
      aria-describedby='login-description'
    >
      <div className='login__container'>
        <div className='login__wrapper'>
          <h1 id='login-title' className='login__wrapper--heading'>
            Welcome {!name && 'back'}
            {name && <span>{name}</span>}
          </h1>

          <p id='login-description' className='login__wrapper--text'>
            Welcome {!name && 'back'}! Please enter your details.
          </p>

          <LoginForm
            isLoading={isLoading}
            showPassword={showPassword}
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            onToggle={handleToggle}
            onSubmit={handleSubmit(onSubmit)}
            aria-labelledby='login-title'
            aria-describedby='login-description'
          />

          <AuthLink
            url='register'
            label="Don't have an account?"
            urlLabel='Sign up for free'
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
