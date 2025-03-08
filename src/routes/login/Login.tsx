import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import AuthLink from '../../components/authLink/AuthLink';
import Input from '../../components/input/Input';
import FormButton from '../../components/formButton/FormButton';

import { loginInputs } from '../../data/formData';

import './Login.scss';

const Login = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    console.log('user logged in');

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <section className='login'>
      <div className='login__container'>
        <div className='login__wrapper'>
          <h1 className='login__wrapper--heading'>Welcome back</h1>
          <p className='login__wrapper--text'>
            Welcome back! Please enter your details.
          </p>
          <form className='login__form' onSubmit={handleSubmit}>
            {loginInputs.map((input) => {
              const { id, name, type, label, placeholder } = input;
              return (
                <Input
                  key={id}
                  name={name}
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  ref={!type ? inputRef : null}
                />
              );
            })}
            <div className='login__form--forgot'>
              <Link to='/forgot-password'>Forgot password</Link>
            </div>
            <FormButton
              label='Login'
              loading={!!isLoading}
              disabled={!!isLoading}
            />
          </form>
          <AuthLink
            url='register'
            label={`Don't have an account?`}
            urlLabel='Sign up for free'
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
