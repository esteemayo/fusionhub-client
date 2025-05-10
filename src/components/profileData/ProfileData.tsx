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

import { profileSchema } from '../../validations/profileSchema';

import './ProfileData.scss';

const ProfileData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [phone, setPhone] = useState<Value | undefined>();
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');

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
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      console.log(data);
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
            value={phone}
            placeholder='e.g. +1 234 567 8900'
            onChange={setPhone}
          />
        </div>
        <div className='profile-data__form--data'>
          <DateInput
            label='Date of Birth'
            startDate={startDate}
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
            value={about}
            placeholder='Write something about yourself'
            onChange={setAbout}
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
