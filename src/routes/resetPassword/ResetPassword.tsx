import { useEffect, useRef, useState } from 'react';
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

import { resetInputs } from '../../data/formData';
import { resetSchema } from '../../validations/resetSchema';

import './ResetPassword.scss';

type FormData = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      console.log(data);
      toast.success('password reset successfully!');

      reset();
    }, 1500);
  };

  useEffect(() => {
    const current = inputRef.current;

    if (current) {
      current.focus();
    }
  }, []);

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
                  type={type}
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  register={register as unknown as UseFormRegister<FieldValues>}
                  errors={errors}
                  autoFocus={name === 'password'}
                  validate
                />
              );
            })}
            <div className='reset-password__form--button'>
              <Button
                type='submit'
                label='Reset your password'
                isLoading={isLoading}
                disabled={isLoading}
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
