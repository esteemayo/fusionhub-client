import Input from '../input/Input';
import Button from '../button/Button';

import './UpdatePassword.scss';

const UpdatePassword = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='updatePassword'>
      <div className='updatePassword__container'>
        <div className='updatePassword__header'>
          <h1 className='updatePassword__header--heading'>Change password</h1>
          <span className='updatePassword__header--text'>
            Your new password must be different from the previous used passwords
          </span>
        </div>
        <div className='updatePassword__wrapper'>
          <form className='updatePassword__form' onSubmit={handleSubmit}>
            <div className='updatePassword__form--inputs'>
              <Input
                type='password'
                name='passwordCurrent'
                label='Current Password'
                placeholder='Current password'
              />
              <Input
                type='password'
                name='password'
                label='New Password'
                placeholder='New password'
              />
              <Input
                type='password'
                name='passwordConfirm'
                label='Confirm New Password'
                placeholder='Confirm new password'
              />
            </div>
            <Button type='submit' label='Update Changes' className='primary' />
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
