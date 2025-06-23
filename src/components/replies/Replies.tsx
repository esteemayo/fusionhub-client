import { useMemo, useState } from 'react';

import Reply from '../reply/Reply';

import { RepliesProps } from '../../types';

import './Replies.scss';

const Replies = ({
  replies,
  postAuthorId,
  replyToShow,
  isLoading,
  onUpdate,
  onClick,
}: RepliesProps) => {
  const [isShow, setIsShow] = useState(true);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShow((value) => {
      return !value;
    });
  };

  const wrapperClasses = useMemo(() => {
    return isShow ? 'replies__wrapper show' : 'replies__wrapper hide';
  }, [isShow]);

  const boxClasses = useMemo(() => {
    return !isLoading && replyToShow < (replies ?? [])?.length
      ? 'replies__box show'
      : 'replies__box hide';
  }, [isLoading, replies, replyToShow]);

  if ((replies ?? [])?.length < 1) {
    return null;
  }

  return (
    <div className='replies'>
      <div className='replies__container'>
        <button
          type='button'
          className='replies__container--btn'
          onClick={handleToggle}
        >
          Replies ({replies?.length})
          {isShow ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
              />
            </svg>
          )}
        </button>
        <div className={wrapperClasses}>
          {replies?.slice(0, replyToShow).map((reply) => {
            return (
              <Reply
                key={reply._id}
                {...reply}
                postAuthorId={postAuthorId}
                onUpdate={onUpdate}
              />
            );
          })}
          <div className={boxClasses}>
            <button
              type='button'
              onClick={onClick}
              className='replies__box--btn'
            >
              {isLoading ? 'Loading...' : 'Show more replies'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replies;
