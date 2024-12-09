import { Link } from 'react-router-dom';

import ErrorMessage from '../../components/errorMessage/ErrorMessage';

import './Login.scss';

const Login = () => {
  const error = false;

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
            <div className='form__group'>
              <label htmlFor='identifier' className='form__label'>
                Email/username
              </label>
              <input
                id='identifier'
                type='text'
                name='identifier'
                placeholder='Email or Username'
                className='form__input'
              />
              {error && <ErrorMessage message='Email/Username is required' />}
            </div>

            <div className='form__group'>
              <label htmlFor='password' className='form__label'>
                Password
              </label>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='Password'
                className='form__input'
              />
              {error && <ErrorMessage message='Password is required' />}
            </div>

            <div className='form__forgot'>
              <Link to='/forgot-password'>Forgot password</Link>
            </div>

            <div className='form__buttons'>
              <button type='submit' className='btn login'>
                Login
              </button>
              <button type='button' className='btn google'>
                <img src='/google.png' width={25} height={25} alt='logo' />
                Sign in with Google
              </button>
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
