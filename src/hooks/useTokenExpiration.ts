import { useEffect } from 'react';

import { useAppDispatch } from './hooks';
import { resetUser } from '../features/auth/authSlice';

import { CurrentUserType } from '../types';
import { authKey, getStorage, removeStorage } from '../utils';

export const useTokenExpiration = (checkInterval = 60000) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const user: CurrentUserType = getStorage(authKey);
      const tokenExpiration = user?.details.tokenExpiration;

      const expiryTime = new Date().getTime();

      if (tokenExpiration && tokenExpiration * 1000 < expiryTime) {
        removeStorage(authKey);
        dispatch(resetUser());

        window.location.assign('/login');
      }
    }, checkInterval);

    return () => clearInterval(interval);
  }, [checkInterval, dispatch]);
};
