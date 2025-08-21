import { useMemo, useState } from 'react';

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
  register,
  errors,
  onChangeAbout,
  onChangePhone,
  onChangeStartDate,
  onChangeImage,
  onChangeProgress,
  onChangeValue,
  handleSubmit,
  onSubmit,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((value) => {
      return !value;
    });
  };

  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm((value) => {
      return !value;
    });
  };

  const isDisabled = useMemo(() => {
    return isLoading || (0 < progress && progress < 100);
  }, [isLoading, progress]);

  const inputs = registerInputs.slice(0, -2);
  const passwordInputs = registerInputs.slice(-2);

  return (
    <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='register-form__container'>
        {inputs.map((input) => {
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
              autoFocus={name === 'name'}
              validate
            />
          );
        })}
        {passwordInputs.map((input) => {
          const { id, name, type, label, placeholder } = input;
          return (
            <Input
              key={id}
              name={name}
              type={
                name === 'password'
                  ? showPassword
                    ? 'text'
                    : type
                  : name === 'passwordConfirm'
                  ? showPasswordConfirm
                    ? 'text'
                    : type
                  : type
              }
              label={label}
              register={register}
              placeholder={placeholder}
              errors={errors}
              onAction={
                name === 'password'
                  ? handleTogglePassword
                  : handleTogglePasswordConfirm
              }
              disabled={isLoading}
              isShow={name === 'password' ? showPassword : showPasswordConfirm}
              isPassword
              validate
            />
          );
        })}
        <DateInput
          label='Date of Birth'
          startDate={startDate}
          placeholder='Select your date of birth'
          onChange={onChangeStartDate}
        />
        <PhoneNumber
          label='Mobile Number'
          value={phone}
          placeholder='e.g. +1 234 567 8900'
          onChange={onChangePhone}
        />
        <CountrySelect
          name='country'
          label='Country'
          placeholder='Choose your country'
          onChange={onChangeValue}
          register={register}
          errors={errors}
          validate
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
        />
        <Upload
          id='image'
          label='Image'
          disabled={isDisabled}
          setData={onChangeImage}
          setProgress={onChangeProgress}
        />
        {0 < progress && progress < 100 && <ProgressBar progress={progress} />}
      </div>
      <FormButton label='Register' loading={isLoading} disabled={isDisabled} />
    </form>
  );
};

export default RegisterForm;
