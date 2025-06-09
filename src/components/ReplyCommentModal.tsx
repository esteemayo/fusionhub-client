import { useEffect, useMemo, useState } from 'react';

import Modal from './modal/Modal';
import ReplyCommentTextarea from './replyCommentTextarea/ReplyCommentTextarea';

import { useComment } from '../hooks/useComment';
import { useReply } from '../hooks/useReply';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import {
  onClose,
  reset,
} from '../features/replyCommentModal/replyCommentModalSlice';

const ReplyCommentModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, commentId, postId } = useAppSelector((state) => ({
    ...state.replyCommentModal,
  }));

  const { commentMutation } = useComment(postId);
  const { replyMutation } = useReply(postId, commentId);

  const [content, setContent] = useState('');

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleSubmit = () => {
    if (!postId) return;

    const mutation = commentId ? replyMutation : commentMutation;

    mutation.mutate(content, {
      onSuccess: () => {
        setContent('');
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

  useEffect(() => {
    if (isOpen) {
      return () => {
        dispatch(reset());
      };
    }
  }, [dispatch, isOpen]);

  const bodyContent: JSX.Element | undefined = (
    <ReplyCommentTextarea
      value={content}
      placeholder={placeholder}
      onChange={setContent}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      title={titleLabel}
      type='cancel'
      isLoading={commentMutation.isPending || replyMutation.isPending}
      disabled={commentMutation.isPending || replyMutation.isPending}
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
