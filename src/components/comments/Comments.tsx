import { useCallback, useEffect, useRef, useState } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useSortedComments } from '../../hooks/useSortedComments';
import { useComment } from '../../hooks/useComment';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { onOpen } from '../../features/commentModal/commentModalSlice';

import { CommentsProps } from '../../types';

import './Comments.scss';

const Comments = ({ postId, slug }: CommentsProps) => {
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
  } = useComment(postId);

  const ref = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [commentToShow, setCommentToShow] = useState(5);
  const [comments, setComments] = useState(data);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

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

  const handleOpen = () => {
    dispatch(onOpen());
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const target = e?.target as HTMLFormElement;

    const form = new FormData(target);

    const content = form.get('content') as string;

    if (!currentUser) return;

    if (content) {
      commentMutation.mutate(content, {
        onSuccess: () => {
          target.reset();
        },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
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
          slug={slug}
          activeCardId={activeCardId}
          isPending={isPending}
          isPendingUser={isPendingUser}
          isOpen={isOpen}
          isLoading={isLoading}
          error={error}
          errorUser={errorUser}
          comments={sortedComments}
          commentUsers={commentUsers}
          commentToShow={commentToShow}
          mutation={commentMutation}
          onChangeActiveCardId={setActiveCardId}
          onClick={handleClick}
          onOpen={handleOpen}
          onClose={handleClose}
          onToggle={handleToggle}
          onSort={setSort}
        />
        <CommentForm
          isLoading={commentMutation.isPending}
          isPending={isPending}
          comments={comments!}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
          ref={ref}
        />
      </div>
    </section>
  );
};

export default Comments;
