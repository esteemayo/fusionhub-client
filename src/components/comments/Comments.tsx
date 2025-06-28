import { useEffect, useRef, useState } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useComment } from '../../hooks/useComment';

import { CommentsProps } from '../../types';
import { onOpen } from '../../features/commentModal/commentModalSlice';

import './Comments.scss';

const Comments = ({ postId, postAuthorId }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const {
    isPending,
    isPendingUser,
    error,
    errorUser,
    data,
    commentUsers,
    commentMutation,
    updateCommentMutation,
  } = useComment(postId);

  const ref = useRef<HTMLTextAreaElement>(null);

  const [comments, setComments] = useState(data);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [commentToShow, setCommentToShow] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsLoading(true);

    setTimeout(() => {
      setCommentToShow((value) => {
        return value + 5;
      });

      setIsLoading(false);
    }, 1000);
  };

  const handleUpdate = (commentId: string) => {
    const current = ref.current;

    current?.focus();

    setIsEditing(true);
    setCommentId(commentId);
  };

  const handleOpen = () => {
    dispatch(onOpen());
  };

  const handleClear = () => {
    setCommentId('');
    setValue('');
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClear();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const form = new FormData(target);

    const content = form.get('content') as string;

    if (!currentUser) return;

    if (isEditing && commentId) {
      if (value) {
        updateCommentMutation.mutate(
          { content, commentId },
          {
            onSuccess: () => {
              target.reset();
              handleClear();
            },
          }
        );

        return;
      }
    }

    if (content) {
      commentMutation.mutate(content, {
        onSuccess: () => {
          target.reset();
          if (value) setValue('');
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

  return (
    <section className='comments' id='comments'>
      <div className='comments__container'>
        <Comment
          postAuthorId={postAuthorId}
          commentId={commentId}
          isPending={isPending}
          isPendingUser={isPendingUser}
          isLoading={isLoading}
          isEditing={isEditing}
          error={error}
          errorUser={errorUser}
          comments={comments}
          commentUsers={commentUsers}
          commentToShow={commentToShow}
          mutation={commentMutation}
          onChange={setValue}
          onClick={handleClick}
          onUpdate={handleUpdate}
          onOpen={handleOpen}
        />
        <CommentForm
          value={value}
          commentId={commentId}
          isLoading={commentMutation.isPending}
          isPending={isPending}
          isEditing={isEditing}
          comments={comments!}
          onChange={setValue}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          ref={ref}
        />
      </div>
    </section>
  );
};

export default Comments;
