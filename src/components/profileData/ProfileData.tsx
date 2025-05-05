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

import { CountrySelectType } from '../../types';
import { profileSchema } from '../../validations/profileSchema';

import './ProfileData.scss';

const ProfileData = () => {
  const [country, setCountry] = useState<CountrySelectType>();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [value, setValue] = useState<Value | undefined>();
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');

  type FormData = z.infer<typeof profileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
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
            placeholder='Name'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            autoFocus
            validate
          />
          <Input
            name='username'
            label='Username'
            placeholder='Username'
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
            placeholder='Email address'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            validate
          />
          <PhoneNumber
            label='Mobile Number'
            value={value}
            placeholder='Mobile number'
            onChange={setValue}
          />
        </div>
        <div className='profile-data__form--data'>
          <DateInput
            label='Date of Birth'
            startDate={startDate}
            placeholder='Date of Birth'
            onChange={setStartDate}
          />
          <CountrySelect value={country} onChange={setCountry} />
        </div>
        <div className='profile-data__form--info'>
          <Textarea
            name='bio'
            label='Biography'
            placeholder='Write a short biography...'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            validate
          />
          <TextQuill
            id='about'
            label='About Me'
            value={about}
            placeholder='Write something about who you are...'
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
