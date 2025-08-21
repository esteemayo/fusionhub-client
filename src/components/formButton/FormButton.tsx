import Button from '../button/Button';
import GoogleButton from '../GoogleButton';

import { FormButtonProps } from '../../types';

import './FormButton.scss';

const FormButton = ({ label, loading, disabled }: FormButtonProps) => {
  return (
    <div className='form-button'>
      <Button
        type='submit'
        label={label}
        isLoading={loading}
        disabled={disabled}
      />
      <GoogleButton
        icon='/google.png'
        label='Sign in with Google'
        disabled={disabled}
      />
    </div>
  );
};

export default FormButton;
