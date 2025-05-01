import { Value } from 'react-phone-number-input';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import { zodResolver } from '@hookform/resolvers/zod';
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

import { CountrySelectType } from '../../types';
import { registerInputs } from '../../data/formData';

import './Register.scss';

const Register = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<Value | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [country, setCountry] = useState<CountrySelectType>();
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');

  const schema = z
    .object({
      name: z
        .string({
          required_error: 'Please provide your name',
          invalid_type_error: 'Name must be a string',
        })
        .min(6, {
          message: 'Your name cannot be less than 6 characters long',
        })
        .max(50, {
          message: 'Your name cannot be more than 50 characters long',
        })
        .trim(),
      username: z
        .string()
        .trim()
        .regex(/^[a-zA-Z0-9_]+$/, {
          message: 'Username cannot contain special characters',
        })
        .refine((username) => username.endsWith('admin'), {
          message: `Username cannot contain 'admin'`,
        }),
      email: z
        .string({
          required_error: 'Please provide your email address',
          invalid_type_error: 'Email address must be a string',
        })
        .email({ message: 'Invalid email address' })
        .regex(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/,
          { message: 'Please enter a valid email address' }
        )
        .trim()
        .toLowerCase(),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(32, { message: 'Password cannot exceed 32 characters' })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          {
            message:
              'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and at least 8 characters long',
          }
        ),
      passwordConfirm: z.string(),
      bio: z.string({
        required_error: 'Please provide your biography',
        invalid_type_error: 'Biography must be a string',
      }),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
      if (password !== passwordConfirm) {
        ctx.addIssue({
          code: 'custom',
          message: 'Passwords do not match',
          path: ['passwordConfirm'],
        });
      }
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    console.log(data);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const current = inputRef.current;

    if (current) {
      current.focus();
    }
  }, []);

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
                    ref={name === 'name' ? inputRef : null}
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
                value={value}
                placeholder='Mobile number'
                onChange={setValue}
              />
              <CountrySelect value={country} onChange={setCountry} validate />
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
