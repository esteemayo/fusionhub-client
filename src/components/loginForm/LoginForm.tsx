import { Link } from 'react-router-dom';

import Input from '../input/Input';
import FormButton from '../formButton/FormButton';

import { LoginFormProps } from '../../types';
import { loginInputs } from '../../data/formData';

import './LoginForm.scss';

const LoginForm = ({
  isLoading,
  showPassword,
  register,
  errors,
  onToggle,
  handleSubmit,
  onSubmit,
}: LoginFormProps) => {
  return (
    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
      {loginInputs.map((input) => {
        const { id, name, type, label, placeholder } = input;
        return (
          <Input
            key={id}
            name={name}
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            label={label}
            placeholder={placeholder}
            register={register}
            errors={errors}
            onAction={onToggle}
            disabled={isLoading}
            isShow={showPassword}
            isPassword={type === 'password'}
            autoFocus={name === 'identifier'}
            validate
          />
        );
      })}
      <div className='login-form__forgot'>
        <Link to='/forgot-password'>Forgot password?</Link>
      </div>
      <FormButton label='Login' loading={isLoading} disabled={isLoading} />
    </form>
  );
};

export default LoginForm;
