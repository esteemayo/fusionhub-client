import Button from '../button/Button';
import GoogleButton from '../GoogleButton';

const AuthButton = ({ label }: { label: string }) => {
  return (
    <div className='auth__button'>
      <Button type='submit' label={label} className='primary' />
      <GoogleButton />
    </div>
  );
};

export default AuthButton;
