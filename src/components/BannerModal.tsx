import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { onClose } from '../features/bannerModal/bannerModalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { removeBanner, resetState } from '../features/auth/authSlice';

const BannerModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.bannerModal }));
  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => ({ ...state.auth })
  );

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(removeBanner());
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
    <DeleteContent text='Are you sure you want to delete your profile banner? This action cannot be undone.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Remove banner?'
      type='cancel'
      loading={!!isLoading}
      disabled={!!isLoading}
      actionLabel='Remove'
      secondaryActionLabel='Quit'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleClick}
      secondaryAction={handleClose}
    />
  );
};

export default BannerModal;
