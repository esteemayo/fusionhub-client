import Textarea from '../textarea/Textarea';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';

import TextQuill from '../textQuill/TextQuill';
import Button from '../button/Button';
import DateInput from '../dateInput/DateInput';

import CountrySelect from '../countrySelect/CountrySelect';

import { ProfileDataFormProps } from '../../types';

import './ProfileDataForm.scss';

const ProfileDataForm = ({
  about,
  dateOfBirth,
  startDate,
  phone,
  isLoading,
  register,
  errors,
  onChangeAbout,
  onChangeDate,
  onChangePhone,
  onChangeCustom,
  onSubmit,
}: ProfileDataFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className='profile-data-form'
      aria-describedby='profile-form-errors'
    >
      <div id='profile-form-errors' className='sr-only' aria-live='polite'>
        {Object.keys(errors).length > 0 && 'There are errors in the form.'}
      </div>

      <div className='profile-data-form__data'>
        <Input
          name='name'
          label='Name'
          placeholder='Enter your full name'
          register={register}
          errors={errors}
          disabled={isLoading}
          autoFocus
          validate
        />
        <Input
          name='username'
          label='Username'
          placeholder='Enter your username'
          register={register}
          errors={errors}
          disabled={isLoading}
          validate
        />
      </div>
      <div className='profile-data-form__data'>
        <Input
          type='email'
          name='email'
          label='Email Address'
          placeholder='Enter your email address'
          register={register}
          errors={errors}
          disabled={isLoading}
          validate
        />
        <PhoneNumber
          label='Mobile Number'
          value={phone}
          placeholder='e.g. +1 234 567 8900'
          onChange={onChangePhone}
        />
      </div>
      <div className='profile-data-form__data'>
        <DateInput
          label='Date of Birth'
          startDate={dateOfBirth ?? startDate}
          placeholder='Select your date of birth'
          onChange={onChangeDate}
        />
        <CountrySelect
          name='country'
          label='Country'
          placeholder='Choose your country'
          onChange={onChangeCustom}
          register={register}
          errors={errors}
          validate
        />
      </div>
      <div className='profile-data-form__info'>
        <Textarea
          name='bio'
          label='Biography'
          placeholder='Tell us a little about yourself'
          register={register}
          errors={errors}
          disabled={isLoading}
          validate
        />
        <TextQuill
          id='about'
          label='About Me'
          value={about}
          placeholder='Write something about yourself'
          onChange={onChangeAbout}
          readOnly={isLoading}
        />
      </div>
      <Button
        type='submit'
        label='Save Changes'
        isLoading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
};

export default ProfileDataForm;
