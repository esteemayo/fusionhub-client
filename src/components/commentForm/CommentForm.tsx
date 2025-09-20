import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { CommentFormProps } from '../../types';
import { useAppSelector } from '../../hooks/hooks';

import './CommentForm.scss';

const CommentForm = ({
  isLoading,
  isPending,
  comments,
  onKeyDown,
  onSubmit,
  ref,
}: CommentFormProps) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const hasCommented = useMemo(() => {
    return (comments ?? [])?.some(
      (comment) => comment.author._id === currentUser?.details._id
    );
  }, [comments, currentUser]);

  const formClasses = useMemo(() => {
    return !hasCommented
      ? 'comment-form__form show'
      : 'comment-form__form hide';
  }, [hasCommented]);

  if (isPending) {
    return null;
  }

  return (
    <div className='comment-form'>
      <h4 className='comment-form__heading'>Post comment</h4>
      {!currentUser ? (
        <span className='comment-form__subtitle'>
          Please{' '}
          <Link to='/login' className='comment-form__link'>
            login
          </Link>{' '}
          to post a comment.
        </span>
      ) : currentUser.details.isActive === false ? (
        <span className='comment-form__subtitle'>
          You are blocked from commenting.
        </span>
      ) : (
        <>
          {!hasCommented && (
            <span className='comment-form__subtitle'>
              {currentUser.details.username}, share your thoughts about the
              post.
            </span>
          )}
          <form onSubmit={onSubmit} className={formClasses}>
            <textarea
              ref={ref}
              id='content'
              name='content'
              placeholder='Write your thoughts here... Share your opinion or feedback about the post.'
              rows={5}
              className='comment-form__textarea'
              onKeyDown={onKeyDown}
              aria-label='Write your thoughts here... Share your opinion or feedback about the post.'
            />
            <div className='comment-form__actions'>
              <Button
                type='submit'
                label='Post Comment'
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CommentForm;
