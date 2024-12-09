import Input from '../../components/input/Input';

import './ForgotPassword.scss';

const ForgotPassword = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='forgotPassword'>
      <div className='forgotPassword__container'>
        <div className='forgotPassword__wrapper'>
          <h1 className='forgotPassword__heading'>Forgot password</h1>
          <form onSubmit={handleSubmit}>
            <Input
              name='email'
              type='email'
              label='Email address'
              placeholder='Email address'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
