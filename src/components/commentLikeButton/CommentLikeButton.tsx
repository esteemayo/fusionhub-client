import millify from 'millify';
import { useMemo } from 'react';

import LikeIcon from '../LikeIcon';

import { CommentLikeButtonProps } from '../../types';

import './CommentLikeButton.scss';

const CommentLikeButton = ({
  size,
  title,
  count,
  hasLiked,
  isLoading,
  onLike,
}: CommentLikeButtonProps) => {
  const likeBtnClasses = useMemo(() => {
    return size === 'sm'
      ? `comment-like-button__wrapper--btn small ${hasLiked ? 'active' : ''}`
      : `comment-like-button__wrapper--btn ${hasLiked ? 'active' : ''}`;
  }, [hasLiked, size]);

  return (
    <div className='comment-like-button'>
      <div className='comment-like-button__wrapper'>
        <button
          type='button'
          title={title ?? 'Like'}
          onClick={onLike}
          className={likeBtnClasses}
          disabled={isLoading}
          aria-label='Like button'
          aria-disabled={isLoading}
        >
          <LikeIcon liked={hasLiked} />
          {hasLiked && (
            <span
              aria-label='Like float icon'
              className='comment-like-button__wrapper--float-icon'
            >
              ❤
            </span>
          )}
        </button>
      </div>
      {count > 0 && (
        <span
          aria-label={millify(count)}
          className='comment-like-button__count'
        >
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default CommentLikeButton;
