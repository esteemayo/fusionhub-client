import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLink from '../../components/authLink/AuthLink';
import Input from '../../components/input/Input';
import FormButton from '../../components/formButton/FormButton';

import { loginInputs } from '../../data/formData';

import './Login.scss';

const Login = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const schema = z
    .object({
      identifier: z.string({
        required_error: 'Please provide your username/email address',
        invalid_type_error: 'Username/Email address must be a string',
      }),
      password: z
        .string({
          required_error: 'Please provide your password',
          invalid_type_error: 'Password must be a string',
        })
        .min(8, { message: 'Passwords cannot be less than 8 characters long' })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          {
            message:
              'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and at least 8 characters long',
          }
        ),
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
      identifier: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    console.log(data);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
                  ref={!type ? inputRef : null}
                  register={register as unknown as UseFormRegister<FieldValues>}
                  errors={errors}
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
