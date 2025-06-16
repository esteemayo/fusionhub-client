import { useRef, useState } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useAppDispatch } from '../../hooks/hooks';
import { useComment } from '../../hooks/useComment';

import { CommentsProps } from '../../types';
import { onOpen } from '../../features/commentModal/commentModalSlice';

import './Comments.scss';

const Comments = ({ postId, postAuthorId }: CommentsProps) => {
  const dispatch = useAppDispatch();

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

  const [commentId, setCommentId] = useState('');
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const form = new FormData(target);

    const content = form.get('content') as string;

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

  return (
    <section className='comments' id='comments'>
      <div className='comments__container'>
        <Comment
          postAuthorId={postAuthorId}
          isLoading={isPending}
          isLoadingUser={isPendingUser}
          error={error}
          errorUser={errorUser}
          comments={data!}
          commentUsers={commentUsers!}
          mutation={commentMutation}
          onChange={setValue}
          onUpdate={handleUpdate}
          onOpen={handleOpen}
        />
        <CommentForm
          value={value}
          isLoading={commentMutation.isPending}
          isPending={isPending}
          comments={data!}
          onChange={setValue}
          onSubmit={handleSubmit}
          ref={ref}
        />
      </div>
    </section>
  );
};

export default Comments;
