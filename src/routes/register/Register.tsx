import { Value } from 'react-phone-number-input';
import ReactQuill from 'react-quill-new';
import { useEffect, useRef, useState } from 'react';

import Textarea from '../../components/textarea/Textarea';
import Input from '../../components/input/Input';
import PhoneNumber from '../../components/phoneNumber/PhoneNumber';
import TextQuill from '../../components/textQuill/TextQuill';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    console.log('user registered');

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
              <Textarea name='bio' label='Biography' placeholder='Biography' />
              <TextQuill
                id='about'
                label='About Me'
                value={about}
                onChange={setAbout}
              />
              <Input type='file' name='file' label='Image' accept='image/*' />
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
