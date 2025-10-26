import millify from 'millify';
import { useMemo } from 'react';

import DislikeIcon from '../icons/DislikeIcon';

import { CommentDislikeButtonProps } from '../../types';

import './CommentDislikeButton.scss';

const CommentDislikeButton = ({
  size,
  title,
  count,
  hasDisliked,
  isLoading,
  onDislike,
}: CommentDislikeButtonProps) => {
  const dislikeBtnClasses = useMemo(() => {
    return size === 'sm'
      ? `comment-dislike-button__wrapper--btn small ${
          hasDisliked ? 'active' : ''
        }`
      : `comment-dislike-button__wrapper--btn ${hasDisliked ? 'active' : ''}`;
  }, [hasDisliked, size]);

  return (
    <div className='comment-dislike-button'>
      <div className='comment-dislike-button__wrapper'>
        <button
          type='button'
          title={title ?? 'Dislike'}
          onClick={onDislike}
          className={dislikeBtnClasses}
          disabled={isLoading}
          aria-label='Dislike button'
          aria-disabled={isLoading}
        >
          <DislikeIcon disliked={hasDisliked} />
          {hasDisliked && (
            <span
              aria-label='Dislike float icon'
              className='comment-dislike-button__wrapper--float-icon'
            >
              💔
            </span>
          )}
        </button>
      </div>
      {count > 0 && (
        <span
          aria-label={millify(count)}
          className='comment-dislike-button__count'
        >
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default CommentDislikeButton;
