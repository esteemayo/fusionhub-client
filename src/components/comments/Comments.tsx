import { useCallback, useEffect, useRef, useState } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useSortedComments } from '../../hooks/useSortedComments';
import { useComment } from '../../hooks/useComment';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { onOpen } from '../../features/commentModal/commentModalSlice';

import { CommentsProps } from '../../types';

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

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [commentToShow, setCommentToShow] = useState(5);
  const [comments, setComments] = useState(data);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [commentId, setCommentId] = useState('');

  const { sort, setSort, sortedComments } = useSortedComments(comments);

  const handleToggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    setIsOpen((value) => {
      return !value;
    });
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  const closeFilterHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as Element;

    if (!target.classList.contains('comment-filter')) {
      handleClose();
    }
  };

  const handleActiveCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setActiveCardId(null);
  };

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    closeFilterHandler(e);
    handleActiveCard(e);
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
    if (data || postId) {
      setComments(data);
    }
  }, [data, postId]);

  useEffect(() => {
    if (postId) {
      refetch();
      refetchCommentUsers();
    }
  }, [postId, refetch, refetchCommentUsers]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return (
    <section onClick={onClickHandler} className='comments' id='comments'>
      <div className='comments__container'>
        <Comment
          sort={sort}
          commentId={commentId}
          activeCardId={activeCardId}
          isPending={isPending}
          isPendingUser={isPendingUser}
          isOpen={isOpen}
          isLoading={isLoading}
          isEditing={isEditing}
          error={error}
          errorUser={errorUser}
          comments={sortedComments}
          commentUsers={commentUsers}
          commentToShow={commentToShow}
          mutation={commentMutation}
          onChange={setValue}
          onChangeActiveCardId={setActiveCardId}
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
