import Button from '../button/Button';
import Input from '../input/Input';
import AccountHeading from '../accountHeading/AccountHeading';

import './UpdatePassword.scss';

const UpdatePassword = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='updatePassword'>
      <div className='updatePassword__container'>
        <AccountHeading
          title='Change password'
          subtitle='Your new password must be different from the previous used passwords'
        />
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
