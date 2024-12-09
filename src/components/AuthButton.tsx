import Button from './button/Button';
import GoogleButton from './GoogleButton';

const AuthButton = () => {
  return (
    <div className='auth__button'>
      <Button type='submit' label='Register' className='primary' />
      <GoogleButton />
    </div>
  );
};

export default AuthButton;
