import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/accountModal/accountModalSlice';

const AccountModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.accountModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleClick = () => {
    toast.success('Account deactivated!');
    handleClose();
  };

  const bodyContent: React.JSX.Element | undefined = (
    <DeleteContent text='De-activating your account will permanently remove all your personal information, posts, and associated data from our database. This action is irreversible, and you will no longer be able to access your account or retrieve any of your data. Please confirm if you wish to proceed.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='De-Activate Account?'
      type='cancel'
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
