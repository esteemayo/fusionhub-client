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

  const { commentMutation, updateMutation } = useComment(postId);
  const { replyMutation, updateReplyMutation } = useReply(postId, commentId);

  const [comment, setComment] = useState('');

  const handleClose = () => {
    dispatch(replyCommentModal.onClose());
  };

  const handleSubmit = () => {
    if (!postId) return;

    if (isEditing) {
      if (replyId) {
        return updateReplyMutation.mutate(
          { content: comment, replyId },
          {
            onSuccess: () => {
              setComment('');
              handleClose();
            },
          }
        );
      }

      if (commentId) {
        return updateMutation.mutate(
          { content: comment, commentId },
          {
            onSuccess: () => {
              setComment('');
              handleClose();
            },
          }
        );
      }

      return;
    }

    const mutation = commentId ? replyMutation : commentMutation;

    mutation.mutate(comment, {
      onSuccess: () => {
        setComment('');
        handleClose();
      },
    });
  };

  const titleLabel = useMemo(() => {
    return postId ? (commentId ? 'Reply comment' : 'Comment on post') : '';
  }, [commentId, postId]);

  const actionLabel = useMemo(() => {
    return postId ? (commentId ? 'Submit Reply' : 'Submit Comment') : '';
  }, [commentId, postId]);

  const placeholder = useMemo(() => {
    return commentId
      ? 'Write your reply here...'
      : 'Write your thoughts here... Share your opinion or feedback about the post.';
  }, [commentId]);

  const isLoading = useMemo(() => {
    return (
      commentMutation.isPending ||
      replyMutation.isPending ||
      updateMutation.isPending ||
      updateReplyMutation.isPending
    );
  }, [commentMutation, replyMutation, updateMutation, updateReplyMutation]);

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
