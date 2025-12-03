import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Button from './button/Button';

import { auth, provider } from './../firebase/index';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { GoogleButtonProps } from '../types';
import { googleLoginUser } from '../features/auth/authSlice';

const GoogleButton = ({
  icon,
  label,
  variant = 'outline',
  disabled,
}: GoogleButtonProps) => {
  const dispatch = useAppDispatch();
  const { isPending } = useAppSelector((state) => state.auth);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);

        const user = result.user;
        console.log(user);

        const newUser = {
          name: user.displayName,
          username:
            (user.displayName
              ? (user.displayName?.split(' ').shift()?.toLowerCase() as string)
              : 'user') + Math.floor(Math.random() * 1000),
          email: user.email,
          image: user.photoURL,
          phone: user.phoneNumber,
          providerId: user.providerId,
        };

        dispatch(googleLoginUser(newUser));
      })
      .catch((error: unknown) => {
        let errorCode: string | undefined;
        let errorMessage: string | undefined;
        let email: string | undefined;
        let credential;

        type FirebaseAuthError = {
          code?: string;
          message?: string;
          customData?: { email?: string };
        };

        if (typeof error === 'object' && error !== null) {
          const firebaseError = error as FirebaseAuthError;
          errorCode = firebaseError.code;
          errorMessage = firebaseError.message;
          credential = GoogleAuthProvider.credentialFromError(
            error as FirebaseError
          );
        }

        console.error('Google sign-in error:', {
          errorCode,
          errorMessage,
          email,
          credential,
        });

        toast.error(
          errorMessage || 'Google sign-in failed. Please try again.',
          { role: 'alert' }
        );
      });
  };

  return (
    <Button
      icon={icon}
      label={label}
      variant={variant}
      onClick={handleClick}
      isLoading={isPending}
      disabled={isPending || disabled}
      aria-label='Sign in with Google account'
    />
  );
};

export default GoogleButton;
