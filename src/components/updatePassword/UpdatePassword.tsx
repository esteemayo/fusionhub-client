import { useEffect } from 'react';
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

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetState, updateUserPassword } from '../../features/auth/authSlice';

import { passwordInputs } from '../../data/formData';
import { passwordSchema } from '../../validations/passwordSchema';

import './UpdatePassword.scss';

const UpdatePassword = () => {
  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user } = useAppSelector(
    (state) => ({ ...state.auth })
  );

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
    dispatch(updateUserPassword(data));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      reset();
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, isError, isSuccess, message, reset, user]);

  const [input, ...inputs] = passwordInputs ? passwordInputs : [];

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
              {inputs.map((input) => {
                const { id, name, type, label, placeholder } = input;
                return (
                  <Input
                    key={id}
                    type={type}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    register={
                      register as unknown as UseFormRegister<FieldValues>
                    }
                    errors={errors}
                    disabled={isLoading}
                    autoFocus={name === 'passwordCurrent'}
                    validate
                  />
                );
              })}
            </div>
            <div className='update-password__form--confirm'>
              <Input
                type={input.type}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                register={register as unknown as UseFormRegister<FieldValues>}
                errors={errors}
                disabled={isLoading}
                validate
              />
            </div>
            <Button
              type='submit'
              label='Update Changes'
              color='primary'
              isLoading={isLoading}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
