import { ILogout } from '../types';
import { useAppDispatch } from './hooks';

export const useLogout: ILogout = (isOpen, onClose) => {
  const dispatch = useAppDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // TODO: api call

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
