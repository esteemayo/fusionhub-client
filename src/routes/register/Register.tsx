import { Value } from 'react-phone-number-input';
import { useEffect, useRef, useState } from 'react';

import Textarea from '../../components/textarea/Textarea';
import Input from '../../components/input/Input';
import PhoneNumber from '../../components/phoneNumber/PhoneNumber';

import AuthLink from '../../components/authLink/AuthLink';
import FormButton from '../../components/formButton/FormButton';

import { registerInputs } from '../../data/formData';

import './Register.scss';

const Register = () => {
  const inputRef = useRef<HTMLInputElement>(null);

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
          <h1 className='register__heading'>Welcome</h1>
          <p className='register__text'>Welcome! Please enter your details.</p>
          <form className='register__form' onSubmit={handleSubmit}>
            <div className='register__form--box'>
              {registerInputs.map((input) => {
                const { id, name, type, label, placeholder } = input;
                return (
                  <Input
                    key={id}
                    name={name}
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    ref={name === 'name' ? inputRef : null}
                  />
                );
              })}
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
