import { useEffect, useMemo, useState } from 'react';

import Modal from './modal/Modal';
import ReplyCommentTextarea from './replyCommentTextarea/ReplyCommentTextarea';

import { useComment } from '../hooks/useComment';
import { useReply } from '../hooks/useReply';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import * as replyCommentModal from '../features/replyCommentModal/replyCommentModalSlice';

const ReplyCommentModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, isEditing, content, commentId, postId, replyId } =
    useAppSelector((state) => ({
      ...state.replyCommentModal,
    }));

  const { commentMutation, updateCommentMutation } = useComment(postId);
  const { replyMutation, updateReplyMutation } = useReply(postId, commentId);

  const [comment, setComment] = useState('');

  const handleClose = () => {
    dispatch(replyCommentModal.onClose());
  };

  const handleSubmit = () => {
    if (!postId) return;

    const onSuccess = () => {
      setComment('');
      handleClose();
    };

    if (isEditing) {
      if (replyId) {
        updateReplyMutation.mutate(
          { content: comment, replyId },
          { onSuccess }
        );

        return;
      }

      if (commentId) {
        updateCommentMutation.mutate(
          { content: comment, commentId },
          { onSuccess }
        );
        return;
      }

      return;
    }

    const mutation = commentId ? replyMutation : commentMutation;
    mutation.mutate(comment, { onSuccess });
  };

  const titleLabel = useMemo(() => {
    if (!postId) return '';

    if (isEditing) {
      return replyId ? 'Update reply' : 'Update comment';
    }

    return commentId ? 'Reply comment' : 'Comment on post';
  }, [commentId, postId, isEditing, replyId]);

  const actionLabel = useMemo(() => {
    if (!postId) return '';

    if (isEditing) {
      return replyId ? 'Update Reply' : 'Update Comment';
    }

    return commentId ? 'Submit Reply' : 'Submit Comment';
  }, [commentId, postId, isEditing, replyId]);

  const placeholder = useMemo(() => {
    if (isEditing) {
      return replyId ? 'Update your reply...' : 'Update your comment...';
    }

    return commentId
      ? 'Add a reply...'
      : 'Share your thoughts about this post...';
  }, [commentId, isEditing, replyId]);

  const isLoading = useMemo(() => {
    return (
      commentMutation.isPending ||
      replyMutation.isPending ||
      updateCommentMutation.isPending ||
      updateReplyMutation.isPending
    );
  }, [
    commentMutation.isPending,
    replyMutation.isPending,
    updateCommentMutation.isPending,
    updateReplyMutation.isPending,
  ]);

  useEffect(() => {
    if (content) setComment(content);
  }, [content]);

  useEffect(() => {
    if (isOpen) {
      return () => {
        dispatch(replyCommentModal.reset());
      };
    }
  }, [dispatch, isOpen]);

  const bodyContent: JSX.Element | undefined = (
    <ReplyCommentTextarea
      value={comment}
      placeholder={placeholder}
      onChange={setComment}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      title={titleLabel}
      type='cancel'
      isLoading={isLoading}
      disabled={isLoading}
      actionLabel={actionLabel}
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryAction={handleClose}
    />
  );
};

export default ReplyCommentModal;
