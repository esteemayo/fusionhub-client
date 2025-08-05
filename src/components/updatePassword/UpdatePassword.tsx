import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
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

type FormData = z.infer<typeof passwordSchema>;

const UpdatePassword = () => {
  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user } = useAppSelector(
    (state) => ({ ...state.auth })
  );

  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePasswordCurrent = () => {
    setShowPasswordCurrent((value) => !value);
  };

  const handleTogglePassword = () => {
    setShowPassword((value) => !value);
  };

  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm((value) => !value);
  };

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

  const inputs = passwordInputs.slice(0, -1);
  const input = passwordInputs[passwordInputs.length - 1];

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
                    type={
                      name === 'passwordCurrent'
                        ? showPasswordCurrent
                          ? 'text'
                          : type
                        : name === 'password'
                        ? showPassword
                          ? 'text'
                          : type
                        : type
                    }
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    register={
                      register as unknown as UseFormRegister<FieldValues>
                    }
                    errors={errors}
                    onAction={
                      name === 'passwordCurrent'
                        ? handleTogglePasswordCurrent
                        : handleTogglePassword
                    }
                    disabled={isLoading}
                    autoFocus={name === 'passwordCurrent'}
                    isShow={
                      name === 'passwordCurrent'
                        ? showPasswordCurrent
                        : showPassword
                    }
                    isPassword
                    validate
                  />
                );
              })}
            </div>
            <div className='update-password__form--confirm'>
              <Input
                type={showPasswordConfirm ? 'text' : input.type}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                register={register as unknown as UseFormRegister<FieldValues>}
                errors={errors}
                onAction={handleTogglePasswordConfirm}
                disabled={isLoading}
                isShow={showPasswordConfirm}
                isPassword
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
