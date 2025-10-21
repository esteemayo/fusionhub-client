import { useEffect, useMemo, useRef, useState } from 'react';

import Reply from '../reply/Reply';

import { RepliesProps } from '../../types';
import { useMute } from '../../hooks/useMute';

import './Replies.scss';

const Replies = ({
  slug,
  activeCardId,
  replyLists,
  replyToShow,
  isLoading,
  onChangeActiveCardId,
  onClick,
}: RepliesProps) => {
  const { mutedList } = useMute();

  const ref = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(true);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShow((value) => {
      return !value;
    });
  };

  const btnLabel = useMemo(() => {
    const replies = replyLists ?? [];

    return isShow
      ? 'Collapse thread'
      : `View ${replies?.length} ${replies?.length > 1 ? 'replies' : 'reply'}`;
  }, [isShow, replyLists]);

  const wrapperClasses = useMemo(() => {
    return isShow ? 'replies__wrapper show' : 'replies__wrapper hide';
  }, [isShow]);

  const boxClasses = useMemo(() => {
    return !isLoading && replyToShow < (replyLists ?? [])?.length
      ? 'replies__box show'
      : 'replies__box hide';
  }, [isLoading, replyLists, replyToShow]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let minHeight = '';
    const replyCount = replyLists?.length ?? 0;

    if (replyCount === 2) minHeight = '160px';
    else if (replyCount === 3) minHeight = '280px';
    else if (replyCount === 4) minHeight = '420px';
    else if (replyCount > 4 && replyToShow > 4) minHeight = '580px';

    element.style.minHeight = minHeight;
  }, [replyLists?.length, replyToShow]);

  if ((replyLists ?? [])?.length < 1) {
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
          {btnLabel}
          {isShow ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
            >
              <path
                fillRule='evenodd'
                d='M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z'
                clipRule='evenodd'
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
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
              />
            </svg>
          )}
        </button>
        <div className={wrapperClasses} ref={ref}>
          {replyLists
            ?.filter(
              (reply) =>
                !(mutedList?.mutedReplies ?? []).some(
                  (replyId) => replyId === reply._id
                )
            )
            .slice(0, replyToShow)
            .map((reply) => {
              return (
                <Reply
                  key={reply._id}
                  reply={reply}
                  slug={slug}
                  level={0}
                  activeCardId={activeCardId}
                  onChangeActiveCardId={onChangeActiveCardId}
                />
              );
            })}
          <div className={boxClasses}>
            <button
              type='button'
              onClick={onClick}
              disabled={isLoading}
              aria-label={isLoading ? 'Loading...' : 'Show more replies'}
              aria-disabled={isLoading}
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
