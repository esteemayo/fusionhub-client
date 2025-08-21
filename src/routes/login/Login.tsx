import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { Link } from 'react-router-dom';

import AuthLink from '../../components/authLink/AuthLink';
import Input from '../../components/input/Input';
import FormButton from '../../components/formButton/FormButton';

import { loginInputs } from '../../data/formData';
import { loginSchema } from '../../validations/loginSchema';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginUser, resetState } from '../../features/auth/authSlice';

import { useQueryParams } from '../../utils';

import './Login.scss';

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user } = useAppSelector(
    (state) => ({
      ...state.auth,
    })
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
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const credentials = { ...data };

    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
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
    <section className='login'>
      <div className='login__container'>
        <div className='login__wrapper'>
          <h1 className='login__wrapper--heading'>
            Welcome {!name && 'back'}
            {name && <span>{name}</span>}
          </h1>
          <p className='login__wrapper--text'>
            Welcome {!name && 'back'}! Please enter your details.
          </p>
          <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
            {loginInputs.map((input) => {
              const { id, name, type, label, placeholder } = input;
              return (
                <Input
                  key={id}
                  name={name}
                  type={
                    type === 'password'
                      ? showPassword
                        ? 'text'
                        : 'password'
                      : type
                  }
                  label={label}
                  placeholder={placeholder}
                  register={register as unknown as UseFormRegister<FieldValues>}
                  errors={errors}
                  onAction={handleToggle}
                  disabled={isLoading}
                  isShow={showPassword}
                  isPassword={type === 'password'}
                  autoFocus={name === 'identifier'}
                  validate
                />
              );
            })}
            <div className='login__form--forgot'>
              <Link to='/forgot-password'>Forgot password?</Link>
            </div>
            <FormButton
              label='Login'
              loading={isLoading}
              disabled={isLoading}
            />
          </form>
          <AuthLink
            url='register'
            label={`Don't have an account?`}
            urlLabel='Sign up for free'
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
