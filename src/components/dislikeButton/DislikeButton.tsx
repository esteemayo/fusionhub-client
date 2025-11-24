import millify from 'millify';
import { useMemo } from 'react';

import DislikeIcon from '../icons/DislikeIcon';

import { DislikeButtonProps } from '../../types';

import './DislikeButton.scss';

const DislikeButton = ({
  count,
  hasDisliked,
  isLoading,
  onAction,
}: DislikeButtonProps) => {
  const btnClasses = useMemo(
    () => (hasDisliked ? 'dislike-button__btn active' : 'dislike-button__btn'),
    [hasDisliked]
  );

  return (
    <div
      onClick={onAction}
      className='dislike-button'
      role='group'
      aria-label='Dislike post button'
    >
      <button
        type='button'
        title='Dislike Post'
        disabled={isLoading}
        aria-label='Dislike button'
        aria-disabled={isLoading}
        aria-pressed={hasDisliked ?? false}
        aria-busy={isLoading}
        className={btnClasses}
      >
        <DislikeIcon disliked={hasDisliked} />
        {hasDisliked && (
          <span className='dislike-button__btn--float-icon' aria-hidden='true'>
            💔
          </span>
        )}
      </button>
      {count > 0 && (
        <span
          className='dislike-button__count'
          aria-label={`${millify(count)} dislikes`}
        >
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default DislikeButton;
