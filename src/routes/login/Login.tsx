import { Link } from 'react-router-dom';

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
            <div className='form__group'>
              <label htmlFor='identifier' className='form__label'>
                Email/username
              </label>
              <input
                id='identifier'
                type='text'
                name='identifier'
                placeholder='Email/username'
                className='form__input'
              />
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
            </div>

            <div className='form__forgot'>
              <Link to='/forgot-password'>Forgot password</Link>
            </div>

            <div className='form__buttons'>
              <button type='submit'>Login</button>
              <button type='button'>Sign in with Google</button>
            </div>
          </form>

          <div className=''>
            <span>
              Don't have an account?{' '}
              <Link to='/register'>Sign up for free</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
