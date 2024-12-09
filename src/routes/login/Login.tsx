import { Link } from 'react-router-dom';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import AuthLink from '../../components/authLink/AuthLink';

import GoogleButton from '../../components/GoogleButton';

import './Login.scss';

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__wrapper'>
          <h1 className='login__heading'>Welcome back</h1>
          <p className='login__text'>
            Welcome back! Please enter your details.
          </p>

          <form className='form' onSubmit={handleSubmit}>
            <Input
              name='identifier'
              label='Email/username'
              placeholder='Email or Username'
            />
            <Input name='password' label='Password' placeholder='Password' />

            <div className='form__forgot'>
              <Link to='/forgot-password'>Forgot password</Link>
            </div>

            <div className='form__buttons'>
              <Button type='submit' label='Login' className='primary' />
              <GoogleButton />
            </div>
          </form>

          <AuthLink
            url='register'
            label={`Don't have an account?`}
            urlLabel='Sign up for free'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
