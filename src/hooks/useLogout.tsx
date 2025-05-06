import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from './hooks';
import { logoutUser } from '../features/auth/authSlice';

import { ILogout } from '../types';

export const useLogout: ILogout = (isOpen, onClose) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  return {
    handleLogout,
  };
};
