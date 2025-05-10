import { toast } from 'react-toastify';
import { z } from 'zod';
import { Value } from 'react-phone-number-input';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill-new';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FileInput from '../../components/fileInput/FileInput';
import Input from '../../components/input/Input';
import PhoneNumber from '../../components/phoneNumber/PhoneNumber';

import TextQuill from '../../components/textQuill/TextQuill';
import Textarea from '../../components/textarea/Textarea';
import CountrySelect from '../../components/countrySelect/CountrySelect';

import DateInput from '../../components/dateInput/DateInput';
import AuthLink from '../../components/authLink/AuthLink';
import FormButton from '../../components/formButton/FormButton';

import { registerInputs } from '../../data/formData';
import { CountrySelectType } from '../../types';
import { registerSchema } from '../../validations/registerSchema';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { registerUser, resetState } from '../../features/auth/authSlice';

import './Register.scss';

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user } = useAppSelector(
    (state) => ({ ...state.auth })
  );

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');
  const [phone, setPhone] = useState<Value | undefined>();

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const setCustomValue = (
    name: keyof FormData,
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const userData = {
      ...data,
      country: data.country?.label,
      about,
      phone,
      dateOfBirth: startDate,
    };

    dispatch(registerUser(userData));

    reset();
    handleClear();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      navigate('/login');
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, isError, isSuccess, message, navigate, user]);

  return (
    <section className='register'>
      <div className='register__container'>
        <div className='register__wrapper'>
          <h1 className='register__wrapper--heading'>Welcome</h1>
          <p className='register__wrapper--text'>
            Welcome! Please enter your details.
          </p>
          <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
            <div className='register__form--box'>
              {registerInputs.map((input) => {
                const { id, name, type, label, placeholder } = input;
                return (
                  <Input
                    key={id}
                    name={name}
                    type={type}
                    label={label}
                    register={
                      register as unknown as UseFormRegister<FieldValues>
                    }
                    placeholder={placeholder}
                    errors={errors}
                    autoFocus={name === 'name'}
                    validate
                  />
                );
              })}
              <DateInput
                label='Date of Birth'
                startDate={startDate}
                placeholder='Select your date of birth'
                onChange={setStartDate}
              />
              <PhoneNumber
                label='Mobile Number'
                value={phone}
                placeholder='e.g. +1 234 567 8900'
                onChange={setPhone}
              />
              <CountrySelect
                name='country'
                label='Country'
                placeholder='Choose your country'
                onChange={setCustomValue}
                register={register as unknown as UseFormRegister<FieldValues>}
                errors={errors}
                validate
              />
              <Textarea
                name='bio'
                label='Biography'
                placeholder='Tell us a little about yourself'
                register={register as unknown as UseFormRegister<FieldValues>}
                errors={errors}
                validate
              />
              <TextQuill
                id='about'
                label='About Me'
                value={about}
                placeholder='Write something about yourself'
                onChange={setAbout}
              />
              <FileInput name='file' label='Image' accept='image/*' />
            </div>
            <FormButton
              label='Register'
              loading={!!isLoading}
              disabled={!!isLoading}
            />
          </form>
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
