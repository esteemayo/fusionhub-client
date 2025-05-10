import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/commentModal/commentModalSlice';

const CommentModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.commentModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleClick = () => {
    toast.success('comment deleted!!!');
    handleClose();
  };

  const bodyContent: React.JSX.Element | undefined = (
    <DeleteContent text='Are you sure you want to permanently delete this comment? This action cannot be undone.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Delete Comment?'
      type='cancel'
      actionLabel='Delete'
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleClick}
      secondaryAction={handleClose}
    />
  );
};

export default CommentModal;
