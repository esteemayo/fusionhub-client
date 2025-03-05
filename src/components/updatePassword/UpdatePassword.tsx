import Button from '../button/Button';
import Input from '../input/Input';
import AccountHeader from '../accountHeader/AccountHeader';

import './UpdatePassword.scss';

const UpdatePassword = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='update-password'>
      <div className='update-password__container'>
        <AccountHeader
          title='Change password'
          subtitle='Your new password must be different from the previous used passwords'
        />
        <div className='update-password__wrapper'>
          <form className='update-password__form' onSubmit={handleSubmit}>
            <div className='update-password__form--inputs'>
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
            </div>
            <div className='update-password__form--confirm'>
              <Input
                type='password'
                name='passwordConfirm'
                label='Confirm New Password'
                placeholder='Confirm new password'
              />
            </div>
            <Button type='submit' label='Update Changes' color='primary' />
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
