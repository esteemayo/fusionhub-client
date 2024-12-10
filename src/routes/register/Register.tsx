import Input from '../../components/input/Input';
import Textarea from '../../components/textarea/Textarea';

import AuthLink from '../../components/authLink/AuthLink';
import FormButton from '../../components/formButton/FormButton';

import './Register.scss';

const Register = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='register'>
      <div className='register__container'>
        <div className='register__wrapper'>
          <h1 className='register__heading'>Welcome</h1>
          <p className='register__text'>Welcome! Please enter your details.</p>
          <form className='register__form' onSubmit={handleSubmit}>
            <div className='register__form--box'>
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
              <Input
                type='tel'
                name='phone'
                label='Phone'
                placeholder='Phone'
              />
              <Textarea name='bio' label='Biography' placeholder='Biography' />
              <Input type='file' label='Image' />
            </div>
            <FormButton label='Register' />
          </form>
          <AuthLink
            url='login'
            label={`Already have an account?`}
            urlLabel='Sign in here'
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
