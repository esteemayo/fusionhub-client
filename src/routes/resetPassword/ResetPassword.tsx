import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import './ResetPassword.scss';

const ResetPassword = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              label='Confirm password'
              placeholder='Confirm password'
            />
            <div className='resetPassword__form--button'>
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

export default ResetPassword;
