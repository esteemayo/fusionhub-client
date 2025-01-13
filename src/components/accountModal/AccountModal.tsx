import Modal from '../modal/Modal';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onClose } from '../../features/accountModal/accountModalSlice';

import './AccountModal.scss';

const AccountModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.accountModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleClick = () => {
    console.log('clicked!');
  };

  return (
    <Modal
      isOpen={isOpen}
      title=''
      onClose={handleClose}
      onSubmit={handleClick}
    />
  );
};

export default AccountModal;
