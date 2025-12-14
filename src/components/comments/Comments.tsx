import { useCallback, useEffect, useRef, useState } from 'react';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useSortedComments } from '../../hooks/useSortedComments';
import { useComment } from '../../hooks/useComment';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { CommentsProps } from '../../types';
import { onOpen } from '../../features/commentModal/commentModalSlice';

import './Comments.scss';

const Comments = ({ postId, slug, postAuthorId }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const ref = useRef<HTMLTextAreaElement>(null);

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

  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [commentToShow, setCommentToShow] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [comments, setComments] = useState(data);

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

  const onOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as Element;

    if (
      !target.closest('comment-filter') &&
      !target.closest('[data-filter-toggle]')
    ) {
      handleClose();
    }

    setActiveCardId(null);
  };

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLoading(true);

    setTimeout(() => {
      setCommentToShow((value) => value + 5);
      setIsLoading(false);
    }, 1000);
  };

  const handleOpen = () => {
    dispatch(onOpen());
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!currentUser) return;

    if (content) {
      commentMutation.mutate(content, {
        onSuccess: () => {
          setContent('');
          ref.current?.blur();
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
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [handleClose]);

  return (
    <section
      onClick={onOutsideClick}
      id='comments'
      className='comments'
      role='region'
      aria-label='Comments section'
      aria-live='polite'
    >
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
          onClick={handleLoadMore}
          onOpen={handleOpen}
          onClose={handleClose}
          onToggle={handleToggle}
          onSort={setSort}
        />

        <CommentForm
          content={content}
          postAuthorId={postAuthorId}
          isLoading={commentMutation.isPending}
          isPending={isPending}
          comments={comments!}
          ref={ref}
          onChange={setContent}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default Comments;
