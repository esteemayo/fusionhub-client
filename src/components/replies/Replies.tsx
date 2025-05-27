import { useMemo, useState } from 'react';

import Reply from '../reply/Reply';

import { RepliesProps } from '../../types';

import './Replies.scss';

const Replies = ({ replies }: RepliesProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsShow((value) => {
      return !value;
    });
  };

  const wrapperClasses = useMemo(() => {
    return isShow ? 'replies__wrapper show' : 'replies__wrapper hide';
  }, [isShow]);

  return (
    <div className='replies'>
      <div className='replies__container'>
        <button
          type='button'
          className='replies__container--btn'
          onClick={handleToggle}
        >
          Replies
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
          {replies.map((reply) => {
            return <Reply key={reply._id} {...reply} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Replies;
