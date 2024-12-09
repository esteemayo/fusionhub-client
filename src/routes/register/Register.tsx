import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Textarea from '../../components/textarea/Textarea';

import GoogleButton from '../../components/GoogleButton';
import AuthLink from '../../components/authLink/AuthLink';

import './Register.scss';

const Register = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='register'>
      <div className='register__container'>
        <div className='register__wrapper'>
          <h1 className='register__heading'>Welcome</h1>
          <p className='register__text'>Welcome! Please enter your details.</p>

          <form className='form' onSubmit={handleSubmit}>
            <Input name='name' label='Name' placeholder='Name' />
            <Input name='username' label='Username' placeholder='Username' />
            <Input
              type='email'
              name='email'
              label='Email address'
              placeholder='Email address'
            />
            <Input
              type='password'
              name='password'
              label='Password'
              placeholder='Password'
            />
            <Input
              type='password'
              name='passwordConfirm'
              label='Confirm password'
              placeholder='Confirm password'
            />
            <Input type='tel' name='phone' label='Phone' placeholder='Phone' />
            <Textarea name='bio' label='Biography' placeholder='Biography' />
            <Input type='file' label='Image' />

            <div className='form__buttons'>
              <Button type='submit' label='Register' className='primary' />
              <GoogleButton />
            </div>
          </form>

          <AuthLink
            url='login'
            label={`Already have an account?`}
            urlLabel='Sign in here'
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
