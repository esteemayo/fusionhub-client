import { useEffect, useRef, useState } from 'react';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import './ForgotPassword.scss';

const ForgotPassword = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    console.log('token sent to email');

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
    <div className='forgot-password'>
      <div className='forgot-password__container'>
        <div className='forgot-password__wrapper'>
          <h1 className='forgot-password__heading'>Forgot password</h1>
          <p className='forgot-password__text'>
            Please enter your email address.
          </p>
          <form onSubmit={handleSubmit} className='forgot-password__form'>
            <Input
              type='email'
              name='email'
              label='Email Address'
              placeholder='Email address'
              ref={inputRef}
            />
            <div className='forgot-password__form--button'>
              <Button
                type='submit'
                label='Reset your password'
                loading={!!isLoading}
                disabled={!!isLoading}
                color='primary'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
