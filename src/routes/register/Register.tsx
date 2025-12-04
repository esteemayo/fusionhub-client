import { Value } from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill-new';
import type { UploadResponse } from 'imagekit-javascript/dist/src/interfaces/UploadResponse';
import { useEffect, useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import AuthLink from '../../components/authLink/AuthLink';
import RegisterForm from '../../components/registerForm/RegisterForm';

import { CountrySelectType } from '../../types';
import {
  RegisterFormData,
  registerSchema,
} from '../../validations/registerSchema';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { registerUser, resetState } from '../../features/auth/authSlice';

import './Register.scss';

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, name, user } = useAppSelector(
    (state) => state.auth
  );

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<UploadResponse | undefined>();
  const [phone, setPhone] = useState<Value | undefined>();
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((value) => {
      return !value;
    });
  };

  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm((value) => {
      return !value;
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const setCustomValue = (
    name: keyof RegisterFormData,
    value: CountrySelectType | string
  ) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleClear = () => {
    setAbout('');
    setPhone(undefined);
    setStartDate(null);
  };

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      let imageUrl: string | undefined;

      if (image && progress === 100) {
        imageUrl = image.filePath || undefined;
      }

      const userData = {
        ...data,
        about,
        phone,
        dateOfBirth: startDate,
        country: data.country?.label,
        image: imageUrl,
      };

      await dispatch(registerUser(userData));
    } catch (err: unknown) {
      console.log(err);
      toast.error('Failed to register user. Please try again.', {
        role: 'alert',
      });
    }
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        role: 'alert',
      });
    }

    if (image && progress === 100) {
      toast.success('Image uploaded successfully!', { role: 'alert' });
      setProgress(0);
      setImage(undefined);
    }

    if (isSuccess && name) {
      reset();
      handleClear();
      navigate(`/login?name=${encodeURIComponent(name)}`);
    }

    if (isSuccess && user) {
      navigate('/');
    }

    return () => {
      dispatch(resetState());
    };
  }, [
    dispatch,
    isError,
    image,
    isSuccess,
    message,
    name,
    navigate,
    progress,
    reset,
    user,
  ]);

  const headingId = 'register-heading';
  const describeId = 'register-description';

  return (
    <section
      className='register'
      role='region'
      aria-labelledby={headingId}
      aria-describedby={describeId}
    >
      <div
        className='register__container'
        aria-busy={isLoading ? 'true' : 'false'}
      >
        <div className='register__wrapper'>
          <h1 id={headingId} className='register__wrapper--heading'>
            Welcome
          </h1>

          <p id={describeId} className='register__wrapper--text'>
            Welcome! Please enter your details.
          </p>

          <RegisterForm
            about={about}
            phone={phone}
            progress={progress}
            startDate={startDate}
            isLoading={isLoading}
            showPassword={showPassword}
            showPasswordConfirm={showPasswordConfirm}
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            onChangeAbout={setAbout}
            onChangePhone={setPhone}
            onChangeStartDate={setStartDate}
            onChangeImage={setImage}
            onChangeProgress={setProgress}
            onChangeValue={setCustomValue}
            onTogglePassword={handleTogglePassword}
            onTogglePasswordConfirm={handleTogglePasswordConfirm}
            onSubmit={handleSubmit(onSubmit)}
            aria-labelledby={headingId}
            aria-describedby={describeId}
          />

          <AuthLink
            url='login'
            label='Already have an account?'
            urlLabel='Sign in here'
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
