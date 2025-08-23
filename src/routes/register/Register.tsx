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

import { CountrySelectType, RegisterFormData } from '../../types';
import { registerSchema } from '../../validations/registerSchema';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { registerUser, resetState } from '../../features/auth/authSlice';

import './Register.scss';

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, name } = useAppSelector(
    (state) => ({ ...state.auth })
  );

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<UploadResponse | undefined>();
  const [phone, setPhone] = useState<Value | undefined>();
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');

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
      toast.error('Failed to register user. Please try again.');
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (image && progress === 100) {
      toast.success('Image uploaded successfully!');
      setProgress(0);
      setImage(undefined);
    }

    if (isSuccess && name) {
      reset();
      handleClear();
      navigate(`/login?name=${encodeURIComponent(name)}`);
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
  ]);

  return (
    <section className='register'>
      <div className='register__container'>
        <div className='register__wrapper'>
          <h1 className='register__wrapper--heading'>Welcome</h1>
          <p className='register__wrapper--text'>
            Welcome! Please enter your details.
          </p>
          <RegisterForm
            about={about}
            phone={phone}
            progress={progress}
            startDate={startDate}
            isLoading={isLoading}
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            onChangeAbout={setAbout}
            onChangePhone={setPhone}
            onChangeStartDate={setStartDate}
            onChangeImage={setImage}
            onChangeProgress={setProgress}
            onChangeValue={setCustomValue}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
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
