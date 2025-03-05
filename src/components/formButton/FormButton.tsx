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
        loading={!!loading}
        disabled={!!disabled}
        color='primary'
      />
      <GoogleButton />
    </div>
  );
};

export default FormButton;
