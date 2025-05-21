import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Value } from 'react-phone-number-input';
import parse from 'html-react-parser';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import ReactQuill from 'react-quill-new';

import Textarea from '../textarea/Textarea';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';

import TextQuill from '../textQuill/TextQuill';
import Button from '../button/Button';
import DateInput from '../dateInput/DateInput';

import AccountHeader from '../accountHeader/AccountHeader';
import CountrySelect from '../countrySelect/CountrySelect';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetState, updateUserData } from '../../features/auth/authSlice';

import { profileSchema } from '../../validations/profileSchema';
import { CountrySelectType, ProfileDataProps } from '../../types';

import './ProfileData.scss';

const ProfileData = ({
  name,
  email,
  username,
  phone,
  dateOfBirth,
  country,
  bio,
  about,
}: ProfileDataProps) => {
  const dispatch = useAppDispatch();
  const { isError, isLoading, message } = useAppSelector((state) => ({
    ...state.auth,
  }));

  const [telephone, setTelephone] = useState<Value | undefined>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [aboutMe, setAboutMe] = useState<ReactQuill.Value | undefined>('');

  type FormData = z.infer<typeof profileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || '',
      username: username || '',
      email: email || '',
      bio: bio || '',
      country: country || '',
    },
  });

  const setCustomValue = (name: keyof FormData, value: string) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const userData = {
      ...data,
      country: (data.country as CountrySelectType).label,
      phone: telephone,
      about: aboutMe,
      dateOfBirth: startDate,
    };

    dispatch(updateUserData(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, isError, message]);

  useEffect(() => {
    if (about) {
      const parsedText = parse(String(about)) as ReactQuill.Value;
      setAboutMe(parsedText || '');
    }

    if (dateOfBirth) {
      setStartDate(dateOfBirth || null);
    }

    if (phone) {
      setTelephone(phone || undefined);
    }
  }, [about, dateOfBirth, phone]);

  return (
    <div className='profile-data'>
      <AccountHeader
        title='Personal information'
        subtitle='Update your personal information'
      />
      <form onSubmit={handleSubmit(onSubmit)} className='profile-data__form'>
        <div className='profile-data__form--data'>
          <Input
            name='name'
            label='Name'
            placeholder='Enter your full name'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            autoFocus
            validate
          />
          <Input
            name='username'
            label='Username'
            placeholder='Enter your username'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            validate
          />
        </div>
        <div className='profile-data__form--data'>
          <Input
            type='email'
            name='email'
            label='Email Address'
            placeholder='Enter your email address'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            validate
          />
          <PhoneNumber
            label='Mobile Number'
            value={telephone}
            placeholder='e.g. +1 234 567 8900'
            onChange={setTelephone}
          />
        </div>
        <div className='profile-data__form--data'>
          <DateInput
            label='Date of Birth'
            startDate={dateOfBirth ?? startDate}
            placeholder='Select your date of birth'
            onChange={setStartDate}
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
        </div>
        <div className='profile-data__form--info'>
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
            value={aboutMe}
            placeholder='Write something about yourself'
            onChange={setAboutMe}
          />
        </div>
        <Button
          type='submit'
          label='Save Changes'
          color='primary'
          isLoading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default ProfileData;
