import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Button from '../button/Button';
import Input from '../input/Input';
import AccountHeader from '../accountHeader/AccountHeader';

import { passwordSchema } from '../../validations/passwordSchema';

import './UpdatePassword.scss';

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  type FormData = z.infer<typeof passwordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      console.log(data);
      toast.success('Profile updated!');

      reset();
    }, 1500);
  };

  return (
    <section className='update-password'>
      <div className='update-password__container'>
        <AccountHeader
          title='Change password'
          subtitle='Your new password must be different from the previous used passwords'
        />
        <div className='update-password__wrapper'>
          <form
            className='update-password__form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='update-password__form--inputs'>
              <Input
                type='password'
                name='passwordCurrent'
                label='Current Password'
                placeholder='Current password'
                register={register as unknown as UseFormRegister<FieldValues>}
                errors={errors}
                autoFocus
                validate
              />
              <Input
                type='password'
                name='password'
                label='New Password'
                placeholder='New password'
                register={register as unknown as UseFormRegister<FieldValues>}
                errors={errors}
                validate
              />
            </div>
            <div className='update-password__form--confirm'>
              <Input
                type='password'
                name='passwordConfirm'
                label='Confirm New Password'
                placeholder='Confirm new password'
                register={register as unknown as UseFormRegister<FieldValues>}
                errors={errors}
                validate
              />
            </div>
            <Button
              type='submit'
              label='Update Changes'
              color='primary'
              loading={!!isLoading}
              disabled={!!isLoading}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
