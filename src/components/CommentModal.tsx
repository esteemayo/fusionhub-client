import { useEffect, useMemo } from 'react';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useComment } from '../hooks/useComment';
import { useReply } from '../hooks/useReply';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { onClose, reset } from '../features/commentModal/commentModalSlice';

const CommentModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, commentId, postId, replyId } = useAppSelector((state) => ({
    ...state.commentModal,
  }));

  const { deleteMutation } = useComment(postId);
  const { deleteReplyMutation } = useReply(postId, commentId);

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleClick = () => {
    if (!postId) return;

    const mutation = replyId ? deleteReplyMutation : deleteMutation;
    const id = replyId || commentId;

    mutation.mutate(id, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const titleLabel = useMemo(() => {
    return postId
      ? replyId
        ? 'Confirm Reply Deletion'
        : 'Confirm Comment Deletion'
      : '';
  }, [postId, replyId]);

  const textLabel = useMemo(() => {
    return postId
      ? replyId
        ? 'Are you sure you want to permanently delete this reply? This action cannot be undone and will remove the reply from the conversation.'
        : 'Are you sure you want to permanently delete this comment? This action cannot be undone.'
      : '';
  }, [postId, replyId]);

  useEffect(() => {
    if (isOpen) {
      return () => {
        dispatch(reset());
      };
    }
  }, [dispatch, isOpen]);

  const bodyContent: React.JSX.Element | undefined = (
    <DeleteContent text={textLabel} />
  );

  return (
    <Modal
      isOpen={isOpen}
      title={titleLabel}
      type='cancel'
      isLoading={deleteMutation.isPending || deleteReplyMutation.isPending}
      disabled={deleteMutation.isPending || deleteReplyMutation.isPending}
      actionLabel='Confirm Delete'
      secondaryActionLabel='Cancel Deletion'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleClick}
      secondaryAction={handleClose}
    />
  );
};

export default CommentModal;
