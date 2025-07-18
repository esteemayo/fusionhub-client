import millify from 'millify';
import { useMemo } from 'react';

import { HeartButtonProps } from '../../types';

import './HeartButton.scss';

const HeartButton = ({
  size,
  count,
  hasLiked,
  isLoading,
  onLike,
}: HeartButtonProps) => {
  const heartBtnClasses = useMemo(() => {
    return size === 'sm' ? 'heart-button small' : 'heart-button';
  }, [size]);

  return (
    <button
      type='button'
      onClick={onLike}
      className={heartBtnClasses}
      disabled={isLoading}
    >
      {hasLiked ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 15 15'
          aria-label='Liked'
          aria-hidden='true'
          width='150px'
          height='150px'
          strokeWidth={1.5}
          className='size-6'
        >
          <path
            d='M4.03553 1C1.80677 1 0 2.80677 0 5.03553C0 6.10582 0.42517 7.13228 1.18198 7.88909L7.14645 13.8536C7.34171 14.0488 7.65829 14.0488 7.85355 13.8536L13.818 7.88909C14.5748 7.13228 15 6.10582 15 5.03553C15 2.80677 13.1932 1 10.9645 1C9.89418 1 8.86772 1.42517 8.11091 2.18198L7.5 2.79289L6.88909 2.18198C6.13228 1.42517 5.10582 1 4.03553 1Z'
            fill='rgb(249, 24, 128)'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 15 15'
          aria-label='Like'
          aria-hidden='true'
          strokeWidth={1.5}
          className='size-6'
          width='150px'
          height='150px'
        >
          <path
            d='M7.5 13.5L7.14645 13.8536C7.34171 14.0488 7.65829 14.0488 7.85355 13.8536L7.5 13.5ZM1.53553 7.53553L1.18198 7.88909H1.18198L1.53553 7.53553ZM6.53553 2.53553L6.18198 2.88909L6.53553 2.53553ZM7.5 3.5L7.14645 3.85355C7.34171 4.04882 7.65829 4.04882 7.85355 3.85355L7.5 3.5ZM8.46447 2.53553L8.11091 2.18198V2.18198L8.46447 2.53553ZM7.85355 13.1464L1.88909 7.18198L1.18198 7.88909L7.14645 13.8536L7.85355 13.1464ZM13.1109 7.18198L7.14645 13.1464L7.85355 13.8536L13.818 7.88909L13.1109 7.18198ZM6.18198 2.88909L7.14645 3.85355L7.85355 3.14645L6.88909 2.18198L6.18198 2.88909ZM7.85355 3.85355L8.81802 2.88909L8.11091 2.18198L7.14645 3.14645L7.85355 3.85355ZM10.9645 1C9.89418 1 8.86772 1.42517 8.11091 2.18198L8.81802 2.88909C9.38729 2.31981 10.1594 2 10.9645 2V1ZM14 5.03553C14 5.84061 13.6802 6.61271 13.1109 7.18198L13.818 7.88909C14.5748 7.13228 15 6.10582 15 5.03553H14ZM15 5.03553C15 2.80677 13.1932 1 10.9645 1V2C12.6409 2 14 3.35905 14 5.03553H15ZM4.03553 2C4.84061 2 5.61271 2.31981 6.18198 2.88909L6.88909 2.18198C6.13228 1.42517 5.10582 1 4.03553 1V2ZM1 5.03553C1 3.35905 2.35905 2 4.03553 2V1C1.80677 1 0 2.80677 0 5.03553H1ZM1.88909 7.18198C1.31981 6.61271 1 5.84061 1 5.03553H0C0 6.10582 0.42517 7.13228 1.18198 7.88909L1.88909 7.18198Z'
            fill='currentColor'
          />
        </svg>
      )}
      {count > 0 && <span>{millify(count)}</span>}
    </button>
  );
};

export default HeartButton;
