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
  ...props
}: CommentDislikeButtonProps) => {
  const dislikeBtnClasses = useMemo(
    () =>
      size === 'sm'
        ? `comment-dislike-button__wrapper--btn small ${
            hasDisliked ? 'active' : ''
          }`
        : `comment-dislike-button__wrapper--btn ${hasDisliked ? 'active' : ''}`,
    [hasDisliked, size]
  );

  return (
    <div
      className='comment-dislike-button'
      role='group'
      aria-label='Dislike button'
    >
      <div className='comment-dislike-button__wrapper'>
        <button
          {...props}
          type='button'
          title={title ?? 'Dislike'}
          onClick={onDislike}
          className={dislikeBtnClasses}
          disabled={isLoading}
          aria-disabled={isLoading}
          aria-pressed={hasDisliked ?? false}
          aria-busy={isLoading}
        >
          <DislikeIcon disliked={hasDisliked} />
          {hasDisliked && (
            <span
              className='comment-dislike-button__wrapper--float-icon'
              aria-hidden='true'
            >
              💔
            </span>
          )}
        </button>
      </div>
      {count > 0 && (
        <span
          className='comment-dislike-button__count'
          aria-label={`${millify(count)} dislikes`}
        >
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default CommentDislikeButton;
