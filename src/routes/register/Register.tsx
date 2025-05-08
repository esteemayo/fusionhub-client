import { toast } from 'react-toastify';
import { z } from 'zod';
import ReactQuill from 'react-quill-new';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Value } from 'react-phone-number-input';
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
import { CountrySelectType, RegisterErrors } from '../../types';
import {
  registerSchema,
  validateRegister,
} from '../../validations/registerSchema';

import './Register.scss';

const Register = () => {
  const [phone, setPhone] = useState<Value | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [error, setError] = useState<RegisterErrors>({});
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');
  const [country, setCountry] = useState<CountrySelectType>();

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleClear = () => {
    setAbout('');
    setCountry(undefined);
    setPhone(undefined);
    setStartDate(new Date());
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const inputData = {
      about,
      country,
      phone,
    };

    const error = validateRegister(inputData);

    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    }

    setError({});

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      console.log({
        ...data,
        about,
        phone,
        country: country?.label,
        dateOfBirth: startDate,
      });

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
                placeholder='Date of Birth'
                onChange={setStartDate}
              />
              <PhoneNumber
                label='Mobile Number'
                value={phone}
                placeholder='Mobile number'
                onChange={setPhone}
                error={error.phone}
                validate
              />
              <CountrySelect
                value={country}
                onChange={setCountry}
                error={error.country}
                validate
              />
              <Textarea
                name='bio'
                label='Biography'
                placeholder='Write a short biography'
                register={register as unknown as UseFormRegister<FieldValues>}
                errors={errors}
                validate
              />
              <TextQuill
                id='about'
                label='About Me'
                value={about}
                onChange={setAbout}
                error={error.about}
                validate
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
