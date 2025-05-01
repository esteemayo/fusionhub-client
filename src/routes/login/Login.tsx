import { useState } from 'react';
import { z } from 'zod';
import { Link } from 'react-router-dom';

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

import './Login.scss';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = z
    .object({
      identifier: z.string(),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(32, { message: 'Password cannot exceed 32 characters' })
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

    setTimeout(() => {
      setIsLoading(false);

      console.log(data);
      toast.success('user login!');
    }, 1500);
  };

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
