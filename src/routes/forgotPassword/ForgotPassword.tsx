import { useState } from 'react';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import './ForgotPassword.scss';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    console.log('token sent to email');

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className='forgotPassword'>
      <div className='forgotPassword__container'>
        <div className='forgotPassword__wrapper'>
          <h1 className='forgotPassword__heading'>Forgot password</h1>
          <p className='forgotPassword__text'>
            Please enter your email address.
          </p>
          <form onSubmit={handleSubmit} className='forgotPassword__form'>
            <Input
              type='email'
              name='email'
              label='Email Address'
              placeholder='Email address'
            />
            <div className='forgotPassword__form--button'>
              <Button
                type='submit'
                label='Reset your password'
                loading={!!isLoading}
                disabled={!!isLoading}
                className='primary'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
