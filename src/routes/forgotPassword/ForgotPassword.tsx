import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import './ForgotPassword.scss';

const ForgotPassword = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              name='email'
              type='email'
              label='Email address'
              placeholder='Email address'
            />
            <div className='forgotPassword__form--button'>
              <Button
                type='submit'
                label='Reset your password'
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
