import { useEffect } from 'react';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import AuthLink from '../../components/authLink/AuthLink';
import Input from '../../components/input/Input';
import FormButton from '../../components/formButton/FormButton';

import { loginInputs } from '../../data/formData';
import { loginSchema } from '../../validations/loginSchema';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginUser, resetState } from '../../features/auth/authSlice';

import './Login.scss';

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user } = useAppSelector(
    (state) => ({
      ...state.auth,
    })
  );

  type FormData = z.infer<typeof loginSchema>;

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
    reset();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      navigate('/');
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, isError, isSuccess, message, navigate, user]);

  return (
    <section className='login'>
      <div className='login__container'>
        <div className='login__wrapper'>
          <h1 className='login__wrapper--heading'>Welcome back</h1>
          <p className='login__wrapper--text'>
            Welcome back! Please enter your details.
          </p>
          <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
            {loginInputs.map((input) => {
              const { id, name, type, label, placeholder } = input;
              return (
                <Input
                  key={id}
                  name={name}
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  register={register as unknown as UseFormRegister<FieldValues>}
                  errors={errors}
                  autoFocus={name === 'identifier'}
                  validate
                />
              );
            })}
            <div className='login__form--forgot'>
              <Link to='/forgot-password'>Forgot password</Link>
            </div>
            <FormButton
              label='Login'
              loading={!!isLoading}
              disabled={!!isLoading}
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
