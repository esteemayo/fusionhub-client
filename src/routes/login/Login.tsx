import { Link } from 'react-router-dom';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

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
              <Button
                img='/google.png'
                label='Sign in with Google'
                className='outline'
              />
            </div>
          </form>

          <div className='auth'>
            <span className='auth__text'>
              Don't have an account?{' '}
              <Link to='/register' className='auth__text--link'>
                Sign up for free
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
