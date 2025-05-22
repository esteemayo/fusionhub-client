import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './hooks';

import { ILogout } from '../types';

export const useLogout: ILogout = (isOpen, onClose) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => ({ ...state.auth }));

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(logoutUser());
    navigate('/');

    if (isOpen) {
      if (onClose) {
        dispatch(onClose());
      }
    }
  };

  const btnLabel = useMemo(() => {
    return isLoading ? 'Logging out...' : 'Logout';
  }, [isLoading]);

  return {
    btnLabel,
    isLoading,
    handleLogout,
  };
};
