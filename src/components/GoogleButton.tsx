import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Button from './button/Button';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { auth, provider } from './../firebase/index';

import { GoogleButtonProps } from '../types';
import { googleLoginUser } from '../features/auth/authSlice';

const GoogleButton = ({
  icon,
  label,
  color = 'outline',
  isLoading,
  disabled,
}: GoogleButtonProps) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        const newUser = {
          name: user.displayName,
          username:
            (user.displayName
              ? user.displayName.split(' ').shift()?.toLowerCase()
              : 'user') + Math.floor(Math.random() * 1000),
          email: user.email,
          image: user.photoURL,
          phone: user.phoneNumber,
        };

        // dispatch(googleLoginUser(newUser))
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Button
      icon={icon}
      label={label}
      color={color}
      onClick={handleClick}
      isLoading={isLoading}
      disabled={disabled}
    />
  );
};

export default GoogleButton;
