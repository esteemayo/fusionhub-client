import { toast } from 'react-toastify';
import { z } from 'zod';
import { Value } from 'react-phone-number-input';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill-new';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import FileInput from '../../components/fileInput/FileInput';
import Input from '../../components/input/Input';
import PhoneNumber from '../../components/phoneNumber/PhoneNumber';

import TextQuill from '../../components/textQuill/TextQuill';
import Textarea from '../../components/textarea/Textarea';
import CountrySelect from '../../components/countrySelect/CountrySelect';

import DateInput from '../../components/dateInput/DateInput';
import AuthLink from '../../components/authLink/AuthLink';
import FormButton from '../../components/formButton/FormButton';

import { registerInputs } from '../../data/formData';
import { registerSchema } from '../../validations/registerSchema';

import './Register.scss';

const Register = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');
  const [phone, setPhone] = useState<Value | undefined>();

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const setCustomValue = (name: keyof FormData, value: string) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleClear = () => {
    setAbout('');
    setPhone(undefined);
    setStartDate(new Date());
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const userData = {
        ...data,
        country: data.country?.label,
        about,
        phone,
        dateOfBirth: startDate,
      };

      console.log(userData);

      toast.success('user registered!');

      reset();
      handleClear();
    }, 1500);
  };

  return (
    <section className='register'>
      <div className='register__container'>
        <div className='register__wrapper'>
          <h1 className='register__wrapper--heading'>Welcome</h1>
          <p className='register__wrapper--text'>
            Welcome! Please enter your details.
          </p>
          <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
            <div className='register__form--box'>
              {registerInputs.map((input) => {
                const { id, name, type, label, placeholder } = input;
                return (
                  <Input
                    key={id}
                    name={name}
                    type={type}
                    label={label}
                    register={
                      register as unknown as UseFormRegister<FieldValues>
                    }
                    placeholder={placeholder}
                    errors={errors}
                    autoFocus={name === 'name'}
                    validate
                  />
                );
              })}
              <DateInput
                label='Date of Birth'
                startDate={startDate}
                placeholder='Select your date of birth'
                onChange={setStartDate}
              />
              <PhoneNumber
                label='Mobile Number'
                value={phone}
                placeholder='e.g. +1 234 567 8900'
                onChange={setPhone}
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
              <FileInput name='file' label='Image' accept='image/*' />
            </div>
            <FormButton
              label='Register'
              loading={!!isLoading}
              disabled={!!isLoading}
            />
          </form>
          <AuthLink
            url='login'
            label='Already have an account?'
            urlLabel='Sign in here'
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
