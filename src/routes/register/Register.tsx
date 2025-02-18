import { useState } from 'react';
import { Value } from 'react-phone-number-input';

import Textarea from '../../components/textarea/Textarea';
import Input from '../../components/input/Input';
import PhoneNumber from '../../components/phoneNumber/PhoneNumber';

import AuthLink from '../../components/authLink/AuthLink';
import FormButton from '../../components/formButton/FormButton';

import './Register.scss';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<Value | undefined>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    console.log('user registered');

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <section className='register'>
      <div className='register__container'>
        <div className='register__wrapper'>
          <h1 className='register__heading'>Welcome</h1>
          <p className='register__text'>Welcome! Please enter your details.</p>
          <form className='register__form' onSubmit={handleSubmit}>
            <div className='register__form--box'>
              <Input name='name' label='Name' placeholder='Name' />
              <Input name='username' label='Username' placeholder='Username' />
              <Input
                type='email'
                name='email'
                label='Email Address'
                placeholder='Email address'
              />
              <Input
                type='password'
                name='password'
                label='Password'
                placeholder='Password'
              />
              <Input
                type='password'
                name='passwordConfirm'
                label='Confirm Password'
                placeholder='Confirm password'
              />
              <PhoneNumber
                label='Mobile Number'
                value={value}
                placeholder='Mobile number'
                onChange={setValue}
              />
              <Textarea name='bio' label='Biography' placeholder='Biography' />
              <Input type='file' label='Image' accept='image/*' />
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
