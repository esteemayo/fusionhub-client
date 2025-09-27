import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import AccountHeader from '../accountHeader/AccountHeader';
import UpdatePasswordForm from '../updatePasswordForm/UpdatePasswordForm';

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

  const updatePasswordClasses = useMemo(() => {
    return user?.details.fromGoogle && user.details.providerId
      ? 'update-password hide'
      : 'update-password show';
  }, [user]);

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
    <section className={updatePasswordClasses}>
      <div className='update-password__container'>
        <AccountHeader
          title='Change password'
          subtitle='Your new password must be different from the previous used passwords'
        />
        <div className='update-password__wrapper'>
          <UpdatePasswordForm
            input={input}
            inputs={inputs}
            showPassword={showPassword}
            showPasswordConfirm={showPasswordConfirm}
            showPasswordCurrent={showPasswordCurrent}
            isLoading={isLoading}
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            onTogglePassword={handleTogglePassword}
            onTogglePasswordConfirm={handleTogglePasswordConfirm}
            onTogglePasswordCurrent={handleTogglePasswordCurrent}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
