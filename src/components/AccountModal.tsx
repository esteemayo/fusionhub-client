import Modal from './modal/Modal';
import DeleteAccount from './deleteAccount/DeleteAccount';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/accountModal/accountModalSlice';

const AccountModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.accountModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleClick = () => {
    console.log('clicked!');
  };

  const bodyContent: JSX.Element | undefined = <DeleteAccount />;

  return (
    <Modal
      isOpen={isOpen}
      title='De-Activate Account?'
      actionLabel='Deactivate'
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleClick}
      secondaryAction={handleClose}
    />
  );
};

export default AccountModal;
