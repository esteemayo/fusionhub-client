import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/imageModal/imageModalSlice';

const ImageModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.imageModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleClick = () => {
    handleClose();
    toast.success('Image removed!');
  };

  const bodyContent: React.JSX.Element | undefined = (
    <DeleteContent text='Are you sure you want to permanently delete your profile image? This action cannot be undone.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Remove avatar?'
      type='cancel'
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
