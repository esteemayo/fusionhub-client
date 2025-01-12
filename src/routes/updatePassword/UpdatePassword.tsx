import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import './UpdatePassword.scss';

const UpdatePassword = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='updatePassword'>
      <div className='updatePassword__container'>
        <h1 className='updatePassword__container--heading'>
          Password settings
        </h1>
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
                label='Password'
                placeholder='Password'
              />
              <Input
                type='password'
                name='passwordConfirm'
                label='Confirm Password'
                placeholder='Confirm password'
              />
            </div>
            <Button type='submit' label='Save changes' className='primary' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
