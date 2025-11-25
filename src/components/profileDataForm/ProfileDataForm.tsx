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
        <div className='profile-data-form__data--input'>
          <Input
            name='name'
            label='Name'
            placeholder='Enter your full name'
            register={register}
            errors={errors}
            disabled={isLoading}
            autoFocus
            validate
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'error-name' : undefined}
          />
          <div id='error-name' className='sr-only'>
            {errors.root?.message}
          </div>
        </div>
        <div className='profile-data-form__data--input'>
          <Input
            name='username'
            label='Username'
            placeholder='Enter your username'
            register={register}
            errors={errors}
            disabled={isLoading}
            validate
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'error-username' : undefined}
          />
          <div id='error-username' className='sr-only'>
            {errors.root?.message}
          </div>
        </div>
      </div>
      <div className='profile-data-form__data'>
        <div className='profile-data-form__data--input'>
          <Input
            type='email'
            name='email'
            label='Email Address'
            placeholder='Enter your email address'
            register={register}
            errors={errors}
            disabled={isLoading}
            validate
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'error-email' : undefined}
          />
          <div id='error-email' className='sr-only'>
            {errors.root?.message}
          </div>
        </div>
        <div className='profile-data-form__data--input'>
          <PhoneNumber
            label='Mobile Number'
            value={phone}
            placeholder='e.g. +1 234 567 8900'
            onChange={onChangePhone}
            aria-describedby='phone-help'
          />
          <div id='phone-help' className='sr-only'>
            {errors.root?.message}
          </div>
        </div>
      </div>
      <div className='profile-data-form__data'>
        <div className='profile-data-form__data--input'>
          <DateInput
            label='Date of Birth'
            startDate={dateOfBirth ?? startDate}
            placeholder='Select your date of birth'
            onChange={onChangeDate}
            aria-describedby='dob-help'
          />
          <div id='dob-help' className='sr-only'>
            {errors.root?.message}
          </div>
        </div>
        <div className='profile-data-form__data--input'>
          <CountrySelect
            name='country'
            label='Country'
            placeholder='Choose your country'
            onChange={onChangeCustom}
            register={register}
            errors={errors}
            validate
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? 'error-country' : undefined}
          />
          <div id='error-country' className='sr-only'>
            {errors.root?.message}
          </div>
        </div>
      </div>
      <div className='profile-data-form__info'>
        <div className='profile-data-form__data--input'>
          <Textarea
            name='bio'
            label='Biography'
            placeholder='Tell us a little about yourself'
            register={register}
            errors={errors}
            disabled={isLoading}
            validate
            aria-invalid={!!errors.bio}
            aria-describedby={errors.bio ? 'error-bio' : undefined}
          />
          <div id='error-bio' className='sr-only'>
            {errors.root?.message}
          </div>
        </div>
        <div className='profile-data-form__data--input'>
          <TextQuill
            id='about'
            label='About Me'
            value={about}
            placeholder='Write something about yourself'
            onChange={onChangeAbout}
            readOnly={isLoading}
            aria-invalid={!!errors.about}
            aria-describedby={errors.about ? 'error-about' : undefined}
          />
          {errors.root?.message ? (
            <div id='error-about' className='sr-only'>
              {errors.root?.message}
            </div>
          ) : (
            <span id='about-help' className='sr-only'>
              Describe yourself in a few sentences.
            </span>
          )}
        </div>
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
