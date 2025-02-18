import { useState } from 'react';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import './ResetPassword.scss';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    console.log('password reset successfully!');

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className='resetPassword'>
      <div className='resetPassword__container'>
        <div className='resetPassword__wrapper'>
          <h1 className='resetPassword__heading'>Reset password</h1>
          <p className='resetPassword__text'>Please enter your new password.</p>
          <form onSubmit={handleSubmit} className='resetPassword__form'>
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
            <div className='resetPassword__form--button'>
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

export default ResetPassword;
