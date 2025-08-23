import { useEffect, useMemo, useRef, useState } from 'react';

import Reply from '../reply/Reply';

import { RepliesProps } from '../../types';

import './Replies.scss';

const Replies = ({
  replyId,
  replies,
  replyToShow,
  isLoading,
  isEditing,
  onUpdate,
  onClick,
}: RepliesProps) => {
  const ref = useRef<HTMLDivElement>(null);
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

  const isDisabled = useMemo(() => {
    const shouldDisable = isEditing && replyId;
    return !!shouldDisable;
  }, [isEditing, replyId]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let minHeight = '';
    const replyCount = replies?.length ?? 0;

    if (replyCount === 2) minHeight = '160px';
    else if (replyCount === 3) minHeight = '280px';
    else if (replyCount === 4) minHeight = '420px';
    else if (replyCount > 4 && replyToShow > 4) minHeight = '580px';

    element.style.minHeight = minHeight;
  }, [replies?.length, replyToShow]);

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
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
              />
            </svg>
          )}
        </button>
        <div className={wrapperClasses} ref={ref}>
          {replies?.slice(0, replyToShow).map((reply) => {
            return (
              <Reply
                key={reply._id}
                reply={reply}
                isDisabled={isDisabled}
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
