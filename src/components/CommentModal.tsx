import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import DeleteComment from './deleteComment/DeleteComment';

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
  };

  const bodyContent: JSX.Element | undefined = <DeleteComment />;

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
