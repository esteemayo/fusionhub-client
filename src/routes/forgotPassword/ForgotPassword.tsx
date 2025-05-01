import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { useEffect, useRef, useState } from 'react';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import './ForgotPassword.scss';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

const ForgotPassword = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const schema = z
    .object({
      email: z
        .string({
          required_error: 'Please provide your email address',
          invalid_type_error: 'Email address must be a string',
        })
        .email({ message: 'Invalid email address' })
        .regex(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/,
          { message: 'Please enter a valid email address' }
        )
        .trim()
        .toLowerCase(),
    })
    .required();

  type FormData = z.infer<typeof schema>;

  // const schema = yup
  //   .object({
  //     email: yup.string().email().required(),
  //   })
  //   .required();

  // type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);

    setIsLoading(true);

    console.log('token sent to email');

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
              ref={inputRef}
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
