import millify from 'millify';
import { useMemo } from 'react';

import LikeIcon from '../icons/LikeIcon';

import { CommentLikeButtonProps } from '../../types';

import './CommentLikeButton.scss';

const CommentLikeButton = ({
  size,
  title,
  count,
  hasLiked,
  isLoading,
  onLike,
  ...props
}: CommentLikeButtonProps) => {
  const likeBtnClasses = useMemo(
    () =>
      size === 'sm'
        ? `comment-like-button__wrapper--btn small ${hasLiked ? 'active' : ''}`
        : `comment-like-button__wrapper--btn ${hasLiked ? 'active' : ''}`,
    [hasLiked, size]
  );

  return (
    <div className='comment-like-button' role='group' aria-label='Like button'>
      <div className='comment-like-button__wrapper'>
        <button
          {...props}
          type='button'
          title={title ?? 'Like'}
          onClick={onLike}
          className={likeBtnClasses}
          disabled={isLoading}
          aria-disabled={isLoading}
          aria-pressed={hasLiked ?? false}
          aria-busy={isLoading}
        >
          <LikeIcon liked={hasLiked} />
          {hasLiked && (
            <span
              className='comment-like-button__wrapper--float-icon'
              aria-hidden='true'
            >
              ❤
            </span>
          )}
        </button>
      </div>
      {count > 0 && (
        <span
          className='comment-like-button__count'
          aria-label={`${millify(count)} likes`}
        >
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default CommentLikeButton;
