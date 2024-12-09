import Button from '../button/Button';
import GoogleButton from '../GoogleButton';

import './AuthButton.scss';

const AuthButton = ({ label }: { label: string }) => {
  return (
    <div className='authButton'>
      <Button type='submit' label={label} className='primary' />
      <GoogleButton />
    </div>
  );
};

export default AuthButton;
