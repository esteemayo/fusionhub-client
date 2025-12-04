import { useMemo } from 'react';

import Upload from '../upload/Upload';
import Input from '../input/Input';
import PhoneNumber from './../phoneNumber/PhoneNumber';

import FormButton from '../formButton/FormButton';
import DateInput from '../dateInput/DateInput';
import ProgressBar from '../progressBar/ProgressBar';

import TextQuill from '../textQuill/TextQuill';
import Textarea from '../textarea/Textarea';
import CountrySelect from '../countrySelect/CountrySelect';

import { RegisterFormProps } from '../../types';
import { registerInputs } from '../../data/formData';

import './RegisterForm.scss';

const RegisterForm = ({
  about,
  phone,
  progress,
  startDate,
  isLoading,
  showPassword,
  showPasswordConfirm,
  register,
  errors,
  onChangeAbout,
  onChangePhone,
  onChangeStartDate,
  onChangeImage,
  onChangeProgress,
  onChangeValue,
  onTogglePassword,
  onTogglePasswordConfirm,
  onSubmit,
  ...ariaProps
}: RegisterFormProps) => {
  const isDisabled = useMemo(
    () => isLoading || (progress > 0 && progress < 100),
    [isLoading, progress]
  );

  const inputs = registerInputs.slice(0, -2);
  const passwordInputs = registerInputs.slice(-2);

  return (
    <form
      className='register-form'
      onSubmit={onSubmit}
      role='form'
      aria-busy={isLoading ? 'true' : 'false'}
      noValidate
      {...ariaProps}
    >
      <p
        id={ariaProps['aria-labelledby'] ?? 'register-form-description'}
        className='sr-only'
      >
        Register form with fields for user's details
      </p>

      <div className='register-form__container'>
        {inputs.map((input, index) => {
          const { id, name, type, label, placeholder } = input;
          return (
            <Input
              key={id}
              name={name}
              type={type}
              label={label}
              register={register}
              placeholder={placeholder}
              errors={errors}
              disabled={isLoading}
              autoFocus={index === 0}
              validate
              aria-invalid={Boolean(errors?.[name])}
              aria-describedby={errors?.[name] ? `${name}-error` : undefined}
            />
          );
        })}

        {passwordInputs.map((input) => {
          const { id, name, type, label, placeholder } = input;

          const isPasswordField = name === 'password';
          const isPasswordConfirmField = name === 'passwordConfirm';

          const isShow = isPasswordField
            ? showPassword
            : isPasswordConfirmField
            ? showPasswordConfirm
            : false;

          const handleToggle = isPasswordField
            ? onTogglePassword
            : onTogglePasswordConfirm;

          const actionAriaLabel = (label: string) => {
            return isPasswordField
              ? `${showPassword ? 'Hide' : 'Show'} ${label.toLowerCase()}`
              : `${
                  showPasswordConfirm ? 'Hide' : 'Show'
                } ${label.toLowerCase()}`;
          };

          return (
            <Input
              key={id}
              name={name}
              type={isShow ? 'text' : type}
              label={label}
              register={register}
              placeholder={placeholder}
              errors={errors}
              onAction={handleToggle}
              disabled={isLoading}
              isShow={isShow}
              isPassword={isPasswordField || isPasswordConfirmField}
              validate
              aria-invalid={Boolean(errors?.[name])}
              aria-describedby={errors?.[name] ? `${name}-error` : undefined}
              aria-label={actionAriaLabel(label)}
              aria-pressed={
                isPasswordField ? showPassword : showPasswordConfirm
              }
            />
          );
        })}

        <DateInput
          label='Date of Birth'
          startDate={startDate}
          placeholder='Select your date of birth'
          onChange={onChangeStartDate}
          aria-label='Date of birth'
        />

        <PhoneNumber
          label='Mobile Number'
          value={phone}
          placeholder='e.g. +1 234 567 8900'
          onChange={onChangePhone}
          aria-label='mobile phone number'
          aria-invalid={Boolean(errors?.[phone!])}
        />

        <CountrySelect
          name='country'
          label='Country'
          placeholder='Choose your country'
          onChange={onChangeValue}
          register={register}
          errors={errors}
          validate
          aria-autocomplete='list'
          aria-expnded='false'
          aria-label='Select your country'
        />

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
          aria-label='About me rich text editor'
          aria-multiline='true'
        />

        <Upload
          id='image'
          label='Image'
          disabled={isDisabled}
          setData={onChangeImage}
          setProgress={onChangeProgress}
          aria-label='Upload your profile image'
        />
        {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
      </div>

      <FormButton label='Register' loading={isLoading} disabled={isDisabled} />
    </form>
  );
};

export default RegisterForm;
