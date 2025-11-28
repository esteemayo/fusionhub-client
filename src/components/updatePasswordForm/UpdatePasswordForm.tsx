import Input from '../input/Input';
import Button from '../button/Button';

import { UpdatePasswordFormProps } from '../../types';

import './UpdatePasswordForm.scss';

const UpdatePasswordForm = ({
  input,
  inputs,
  showPassword,
  showPasswordConfirm,
  showPasswordCurrent,
  isLoading,
  register,
  errors,
  onTogglePassword,
  onTogglePasswordConfirm,
  onTogglePasswordCurrent,
  onSubmit,
}: UpdatePasswordFormProps) => {
  return (
    <form
      className='update-password-form'
      onSubmit={onSubmit}
      role='form'
      aria-labelledby='updatePasswordFormTitle'
    >
      <h2 id='updatePasswordFormTitle' className='sr-only'>
        Update your account password
      </h2>

      <div className='update-password-form__inputs'>
        <span className='sr-only'>Current and new password fields</span>

        {inputs.map((input) => {
          const { id, name, type, label, placeholder } = input;

          const isCurrent = name === 'passwordCurrent';
          const isNew = name === 'password';

          const isVisible = isCurrent
            ? showPasswordCurrent
            : isNew
            ? showPassword
            : false;

          const handleToggle = isCurrent
            ? onTogglePasswordCurrent
            : onTogglePassword;

          return (
            <Input
              key={id}
              type={isVisible ? 'text' : type}
              name={name}
              label={label}
              placeholder={placeholder}
              register={register}
              errors={errors}
              onAction={handleToggle}
              disabled={isLoading}
              autoFocus={name === 'passwordCurrent'}
              isShow={isVisible}
              isPassword
              validate
            />
          );
        })}
      </div>
      <div className='update-password-form__confirm'>
        <span className='sr-only'>Confirm password field</span>

        <Input
          type={showPasswordConfirm ? 'text' : input.type}
          name={input.name}
          label={input.label}
          placeholder={input.placeholder}
          register={register}
          errors={errors}
          onAction={onTogglePasswordConfirm}
          disabled={isLoading}
          isShow={showPasswordConfirm}
          isPassword
          validate
        />
      </div>
      <Button
        type='submit'
        label='Update Changes'
        isLoading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
};

export default UpdatePasswordForm;
