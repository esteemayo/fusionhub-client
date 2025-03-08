import { useEffect, useRef, useState } from 'react';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import { resetInputs } from '../../data/formData';

import './ResetPassword.scss';

const ResetPassword = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    console.log('password reset successfully!');

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
    <div className='reset-password'>
      <div className='reset-password__container'>
        <div className='reset-password__wrapper'>
          <h1 className='reset-password__wrapper--heading'>Reset password</h1>
          <p className='reset-password__wrapper--text'>
            Please enter your new password.
          </p>
          <form onSubmit={handleSubmit} className='reset-password__form'>
            {resetInputs.map((input) => {
              const { id, name, type, label, placeholder } = input;
              return (
                <Input
                  key={id}
                  type={type}
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  ref={name === 'password' ? inputRef : null}
                />
              );
            })}
            <div className='reset-password__form--button'>
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

export default ResetPassword;
