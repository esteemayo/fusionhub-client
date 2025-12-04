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
  onSubmit,
  ...ariaProps
}: LoginFormProps) => {
  return (
    <form
      className='login-form'
      onSubmit={onSubmit}
      role='form'
      aria-busy={isLoading ? 'true' : 'false'}
      noValidate
      {...ariaProps}
    >
      <p
        id={ariaProps['aria-labelledby'] ?? 'login-form-description'}
        className='sr-only'
      >
        Login form with fields for email or username and password
      </p>

      {loginInputs.map((input, index) => {
        const { id, name, type, label, placeholder } = input;

        const isPassword = type === 'password';
        const inputType = isPassword
          ? showPassword
            ? 'text'
            : 'password'
          : type;

        return (
          <Input
            key={id}
            name={name}
            type={inputType}
            label={label}
            placeholder={placeholder}
            register={register}
            errors={errors}
            onAction={onToggle}
            disabled={isLoading}
            isShow={showPassword}
            isPassword={isPassword}
            autoFocus={index === 0}
            validate
            aria-invalid={Boolean(errors?.[name])}
            aria-describedby={errors?.[name] ? `${id}-error` : undefined}
            aria-label={`${showPassword ? 'Hide' : 'Show'} password`}
            aria-pressed={isPassword ? showPassword : 'false'}
          />
        );
      })}

      <div className='login-form__forgot'>
        <Link
          to='/forgot-password'
          aria-label='Forgot password - navigate to password recovery page'
        >
          Forgot password?
        </Link>
      </div>

      <FormButton label='Login' loading={isLoading} disabled={isLoading} />
    </form>
  );
};

export default LoginForm;
