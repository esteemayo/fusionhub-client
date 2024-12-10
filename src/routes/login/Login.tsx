import { Link } from 'react-router-dom';

import AuthLink from '../../components/authLink/AuthLink';
import Input from '../../components/input/Input';
import FormButton from '../../components/formButton/FormButton';

import './Login.scss';

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='login'>
      <div className='login__container'>
        <div className='login__wrapper'>
          <h1 className='login__heading'>Welcome back</h1>
          <p className='login__text'>
            Welcome back! Please enter your details.
          </p>
          <form className='login__form' onSubmit={handleSubmit}>
            <Input
              name='identifier'
              label='Email/username'
              placeholder='Email or Username'
            />
            <Input
              type='password'
              name='password'
              label='Password'
              placeholder='Password'
            />
            <div className='login__form--forgot'>
              <Link to='/forgot-password'>Forgot password</Link>
            </div>
            <FormButton label='Login' />
          </form>
          <AuthLink
            url='register'
            label={`Don't have an account?`}
            urlLabel='Sign up for free'
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
