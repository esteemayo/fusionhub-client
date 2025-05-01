import ReactQuill from 'react-quill-new';
import { useState } from 'react';
import { Value } from 'react-phone-number-input';

import Textarea from '../textarea/Textarea';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';

import TextQuill from '../textQuill/TextQuill';
import Button from '../button/Button';
import DateInput from '../dateInput/DateInput';

import AccountHeader from '../accountHeader/AccountHeader';
import CountrySelect from '../countrySelect/CountrySelect';

import { CountrySelectType } from '../../types';

import './ProfileData.scss';

const ProfileData = ({
  onSubmit,
}: {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [value, setValue] = useState<Value | undefined>();
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');
  const [country, setCountry] = useState<CountrySelectType>();

  return (
    <div className='profile-data'>
      <AccountHeader
        title='Personal information'
        subtitle='Update your personal information'
      />
      <form onSubmit={onSubmit} className='profile-data__form'>
        <div className='profile-data__form--data'>
          <Input name='name' label='Name' placeholder='Name' />
          <Input name='username' label='Username' placeholder='Username' />
        </div>
        <div className='profile-data__form--data'>
          <Input
            type='email'
            name='email'
            label='Email Address'
            placeholder='Email address'
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
          />
          <TextQuill
            id='about'
            label='About Me'
            value={about}
            placeholder='Write something about who you are...'
            onChange={setAbout}
          />
        </div>
        <Button type='submit' label='Save Changes' color='primary' />
      </form>
    </div>
  );
};

export default ProfileData;
