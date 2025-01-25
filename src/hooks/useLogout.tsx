import { ILogout } from '../types';
import { useAppDispatch } from './hooks';

const useLogout = ({ isOpen, onClose }: ILogout) => {
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

export default useLogout;
