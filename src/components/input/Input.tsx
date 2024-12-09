import ErrorMessage from '../errorMessage/ErrorMessage';

import './Input.scss';

const Input = ({ error }: { error: boolean }) => {
  return (
    <div className='input'>
      <label htmlFor='identifier' className='input__label'>
        Email/username
      </label>
      <input
        id='identifier'
        type='text'
        name='identifier'
        placeholder='Email or Username'
        className='input__control'
      />
      {error && <ErrorMessage message='Email/Username is required' />}
    </div>
  );
};

export default Input;
