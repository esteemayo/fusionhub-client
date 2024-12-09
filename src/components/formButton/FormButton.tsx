import Button from '../button/Button';
import GoogleButton from '../GoogleButton';

import './FormButton.scss';

const FormButton = ({ label }: { label: string }) => {
  return (
    <div className='formButton'>
      <Button type='submit' label={label} className='primary' />
      <GoogleButton />
    </div>
  );
};

export default FormButton;
