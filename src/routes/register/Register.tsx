import { Value } from 'react-phone-number-input';
import { string, z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import TextQuill from '../../components/textQuill/TextQuill';
import Input from '../../components/input/Input';
import FileInput from '../../components/fileInput/FileInput';
import Textarea from '../../components/textarea/Textarea';
import PhoneNumber from '../../components/phoneNumber/PhoneNumber';

import DateInput from '../../components/dateInput/DateInput';
import AuthLink from '../../components/authLink/AuthLink';
import FormButton from '../../components/formButton/FormButton';

import { registerInputs } from '../../data/formData';

import './Register.scss';

const Register = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<Value | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [about, setAbout] = useState<ReactQuill.Value | undefined>('');

  const schema = z.object({
    name: z
      .string({
        required_error: 'Please provide your name',
        invalid_type_error: 'Name must be a string',
      })
      .min(6, {
        message: 'Your name cannot be less than 6 characters long',
      })
      .max(50, { message: 'Your name cannot be more than 50 characters long' })
      .trim(),
    username: z
      .string({
        required_error: 'Please provide your username',
        invalid_type_error: 'Username must be a string',
      })
      .trim()
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username cannot contain special characters',
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
      .string({
        required_error: 'Please provide your password',
        invalid_type_error: 'Password must be a string',
      })
      .min(8, { message: 'Passwords cannot be less than 8 characters long' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and at least 8 characters long',
        }
      ),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password',
      invalid_type_error: 'Confirm password must be a string',
    }),
    phone: z.string({
      required_error: 'Please provide your mobile number',
      invalid_type_error: 'Mobile number must be a string',
    }),
    country: z.string(),
    bio: string({
      required_error: 'Please provide your biography',
      invalid_type_error: 'Biography must be a string',
    }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
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
                    register={register}
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
              <Textarea
                name='bio'
                label='Biography'
                placeholder='Write a short biography'
                register={register}
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
