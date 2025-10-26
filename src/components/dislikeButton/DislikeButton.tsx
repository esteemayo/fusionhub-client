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
  const btnClasses = useMemo(() => {
    return hasDisliked ? 'dislike-button__btn active' : 'dislike-button__btn';
  }, [hasDisliked]);

  return (
    <div onClick={onAction} className='dislike-button'>
      <button
        type='button'
        disabled={isLoading}
        aria-label='Dislike button'
        aria-disabled={isLoading}
        className={btnClasses}
      >
        <DislikeIcon disliked={hasDisliked} />
        {hasDisliked && (
          <span
            aria-label='Like float icon'
            className='dislike-button__btn--float-icon'
          >
            💔
          </span>
        )}
      </button>
      {count > 0 && (
        <span aria-label={millify(count)} className='dislike-button__count'>
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default DislikeButton;
