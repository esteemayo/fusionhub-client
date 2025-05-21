import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { onClose } from '../features/bannerModal/bannerModalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { removeBanner, resetState } from '../features/auth/authSlice';

import { getCurrentUser } from '../services/userService';

const fetchUser = async () => {
  const { data } = await getCurrentUser();
  return data;
};

const BannerModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => ({ ...state.bannerModal }));
  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => ({ ...state.auth })
  );

  const { refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });

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
      refetch();
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, handleClose, isError, isSuccess, message, refetch]);

  const bodyContent: React.JSX.Element | undefined = (
    <DeleteContent text='Are you sure you want to delete your profile banner? This action cannot be undone.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Remove banner?'
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

export default BannerModal;
