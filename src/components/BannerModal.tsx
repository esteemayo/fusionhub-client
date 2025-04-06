import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/bannerModal/bannerModalSlice';

const BannerModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.bannerModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleClick = () => {
    toast.success('banner removed!');
    handleClose();
  };

  const bodyContent: JSX.Element | undefined = (
    <DeleteContent text='Are you sure you wanted to delete this banner?' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Remove banner'
      type='cancel'
      actionLabel='Remove'
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleClick}
      secondaryAction={handleClose}
    />
  );
};

export default BannerModal;
