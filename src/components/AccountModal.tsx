import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { onClose } from '../features/accountModal/accountModalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteAccount, resetState } from '../features/auth/authSlice';

const AccountModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.accountModal }));
  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => ({ ...state.auth })
  );

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(deleteAccount());
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      handleClose();
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, handleClose, isError, isSuccess, message]);

  const bodyContent: React.JSX.Element | undefined = (
    <DeleteContent text='De-activating your account will permanently remove all your personal information, posts, and associated data from our database. This action is irreversible, and you will no longer be able to access your account or retrieve any of your data. Please confirm if you wish to proceed.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='De-Activate Account?'
      type='cancel'
      isLoading={isLoading}
      disabled={isLoading}
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
