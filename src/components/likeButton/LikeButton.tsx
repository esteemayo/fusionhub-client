import millify from 'millify';
import { useMemo } from 'react';

import LikeIcon from '../icons/LikeIcon';

import { LikeButtonProps } from '../../types';

import './LikeButton.scss';

const LikeButton = ({
  count,
  hasLiked,
  isLoading,
  onAction,
}: LikeButtonProps) => {
  const btnClasses = useMemo(
    () => (hasLiked ? 'like-button__btn active' : 'like-button__btn'),
    [hasLiked]
  );

  return (
    <div
      onClick={onAction}
      className='like-button'
      role='group'
      aria-label='Like post button'
    >
      <button
        type='button'
        title='Like Post'
        disabled={isLoading}
        aria-label='Like button'
        aria-disabled={isLoading}
        aria-pressed={hasLiked ?? false}
        aria-busy={isLoading}
        className={btnClasses}
      >
        <LikeIcon liked={hasLiked} />
        {hasLiked && (
          <span className='like-button__btn--float-icon' aria-hidden='true'>
            ❤
          </span>
        )}
      </button>
      {count > 0 && (
        <span
          className='like-button__count'
          aria-label={`${millify(count)} likes`}
        >
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default LikeButton;
