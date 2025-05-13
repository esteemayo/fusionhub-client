import ReactQuill from 'react-quill-new';
import { z } from 'zod';
import { Value } from 'react-phone-number-input';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Textarea from '../textarea/Textarea';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';

import TextQuill from '../textQuill/TextQuill';
import Button from '../button/Button';
import DateInput from '../dateInput/DateInput';

import AccountHeader from '../accountHeader/AccountHeader';
import CountrySelect from '../countrySelect/CountrySelect';

import { ProfileDataProps } from '../../types';
import { profileSchema } from '../../validations/profileSchema';

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
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [telephone, setTelephone] = useState<Value | undefined>();
  const [aboutMe, setAboutMe] = useState<ReactQuill.Value | undefined>('');

  type FormData = z.infer<typeof profileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
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
      country: data.country.label,
      phone: telephone,
      about: aboutMe,
      dateOfBirth: startDate,
    };

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      console.log(userData);
      toast.success('Profile updated!');

      reset();
    }, 1500);
  };

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
            value={name ?? ''}
            placeholder='Enter your full name'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            autoFocus
            validate
          />
          <Input
            name='username'
            label='Username'
            value={username ?? ''}
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
            value={email ?? ''}
            placeholder='Enter your email address'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            validate
          />
          <PhoneNumber
            label='Mobile Number'
            value={phone ?? telephone}
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
            value={country ?? ''}
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
            value={bio ?? ''}
            placeholder='Tell us a little about yourself'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            validate
          />
          <TextQuill
            id='about'
            label='About Me'
            value={about ?? aboutMe}
            placeholder='Write something about yourself'
            onChange={setAboutMe}
          />
        </div>
        <Button
          type='submit'
          label='Save Changes'
          color='primary'
          loading={!!isLoading}
          disabled={!!isLoading}
        />
      </form>
    </div>
  );
};

export default ProfileData;
