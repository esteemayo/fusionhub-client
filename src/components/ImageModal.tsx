import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { onClose } from '../features/imageModal/imageModalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { removeAvatar, resetState } from '../features/auth/authSlice';

import { useProfile } from '../hooks/useProfile';

const ImageModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.imageModal }));
  const { refetch } = useProfile();
  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(removeAvatar());
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      handleClose();
      refetch();
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, handleClose, isError, isSuccess, message, refetch]);

  const bodyContent: JSX.Element | undefined = (
    <DeleteContent text='Are you sure you want to permanently delete your profile image? This action cannot be undone.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Remove avatar?'
      type='cancel'
      isLoading={isLoading}
      disabled={isLoading}
      actionLabel='Remove'
      secondaryActionLabel='Quit'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleClick}
      secondaryAction={handleClose}
    />
  );
};

export default ImageModal;
