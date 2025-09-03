import React, { useEffect, useRef, useState } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useComment } from '../../hooks/useComment';

import { CommentsProps } from '../../types';
import { onOpen } from '../../features/commentModal/commentModalSlice';

import './Comments.scss';

const Comments = ({ postId }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const {
    isPending,
    isPendingUser,
    error,
    errorUser,
    data,
    commentUsers,
    refetch,
    refetchCommentUsers,
    commentMutation,
    updateCommentMutation,
  } = useComment(postId);

  const ref = useRef<HTMLTextAreaElement>(null);

  const [comments, setComments] = useState(data);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [commentToShow, setCommentToShow] = useState(5);
  const [commentId, setCommentId] = useState('');
  const [sort, setSort] = useState<'best' | 'newest' | 'oldest'>('best');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    setIsOpen((value) => {
      return !value;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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

  useEffect(() => {
    if (postId) {
      refetch();
      refetchCommentUsers();
    }
  }, [postId, refetch, refetchCommentUsers]);

  useEffect(() => {
    if (sort === 'best') {
      setComments((value) => {
        return (
          [...(value ?? [])].sort((a, b) => b.likeCount - a.likeCount) && [
            ...(value ?? []),
          ]
        );
      });
    }

    if (sort === 'newest') {
      setComments((value) => {
        return [...(value ?? [])].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    if (sort === 'oldest') {
      setComments((value) => {
        return [...(value ?? [])].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    }
  }, [sort]);

  return (
    <section className='comments' id='comments'>
      <div className='comments__container'>
        <Comment
          sort={sort}
          commentId={commentId}
          isPending={isPending}
          isPendingUser={isPendingUser}
          isOpen={isOpen}
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
          onClose={handleClose}
          onToggle={handleToggle}
          onSort={setSort}
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
