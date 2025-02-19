import ReactQuill from 'react-quill-new';
import { useState } from 'react';
import { Value } from 'react-phone-number-input';

import Textarea from '../textarea/Textarea';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';

import TextQuill from '../textQuill/TextQuill';
import Button from '../button/Button';
import AccountHeader from '../accountHeader/AccountHeader';
import DateInput from '../dateInput/DateInput';

import './ProfileData.scss';

const ProfileData = ({
  onSubmit,
}: {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [value, setValue] = useState<Value | undefined>();
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');

  return (
    <div className='profileData'>
      <AccountHeader
        title='Personal information'
        subtitle='Update your personal information'
      />
      <form onSubmit={onSubmit} className='profileData__form'>
        <div className='profileData__form--data'>
          <Input name='name' label='Name' placeholder='Name' />
          <Input name='username' label='Username' placeholder='Username' />
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
          <DateInput
            startDate={startDate}
            placeholder='Date of Birth'
            onChange={setStartDate}
          />
          <Input name='country' label='Country' placeholder='Country' />
        </div>
        <div className='profileData__form--info'>
          <Textarea
            name='bio'
            label='Biography'
            placeholder='Write something about who you are...'
          />
          <TextQuill
            id='about'
            label='About Me'
            value={about}
            onChange={setAbout}
          />
        </div>
        <Button type='submit' label='Save Changes' className='primary' />
      </form>
    </div>
  );
};

export default ProfileData;
