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
  const btnClasses = useMemo(() => {
    return hasLiked ? 'like-button__btn active' : 'like-button__btn';
  }, [hasLiked]);

  return (
    <div onClick={onAction} className='like-button'>
      <button
        type='button'
        disabled={isLoading}
        aria-label='Like button'
        aria-disabled={isLoading}
        className={btnClasses}
      >
        <LikeIcon liked={hasLiked} />
        {hasLiked && (
          <span
            aria-label='Like float icon'
            className='like-button__btn--float-icon'
          >
            ❤
          </span>
        )}
      </button>
      {count > 0 && (
        <span aria-label={millify(count)} className='like-button__count'>
          {millify(count)}
        </span>
      )}
    </div>
  );
};

export default LikeButton;
