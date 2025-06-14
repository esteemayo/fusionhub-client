import React, { useMemo, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Image from '../Image';

import * as commentModal from '../../features/commentModal/commentModalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import * as replyCommentModal from '../../features/replyCommentModal/replyCommentModalSlice';

import { excerpts } from '../../utils';
import { ProfileReplyProps } from '../../types';

import './ProfileReply.scss';

const ProfileReply = ({
  _id: replyId,
  author,
  content,
  comment: commentId,
  post: postId,
  createdAt,
}: ProfileReplyProps) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const [isMore, setIsMore] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMore((value) => {
      return !value;
    });
  };

  const handleCollapse = () => {
    if (isMore) {
      setIsMore(false);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(commentModal.setReplyId(replyId));
    dispatch(commentModal.onOpen());
    dispatch(commentModal.setCommentId(commentId));
    dispatch(commentModal.setPostId(postId));
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(replyCommentModal.setContent(content));
    dispatch(replyCommentModal.onOpen());
    dispatch(replyCommentModal.setReplyId(replyId));
    dispatch(replyCommentModal.setIsEditing());
    dispatch(replyCommentModal.setCommentId(commentId));
    dispatch(replyCommentModal.setPostId(postId));
  };

  const contentLabel = useMemo(() => {
    return isMore && content.length > 150 ? content : excerpts(content, 150);
  }, [content, isMore]);

  const btnClasses = useMemo(() => {
    return content.length > 150
      ? 'profile-reply__info--btn show'
      : 'profile-reply__info--btn hide';
  }, [content]);

  const btnLabel = useMemo(() => {
    return isMore ? undefined : 'more';
  }, [isMore]);

  const actionClasses = useMemo(() => {
    return currentUser?.role === 'admin'
      ? 'profile-reply__actions show'
      : 'profile-reply__actions hide';
  }, [currentUser]);

  return (
    <article className='profile-reply'>
      <div className='profile-reply__container'>
        <div className='profile-reply__cover'>
          <Image
            src={author.image ?? '/user-default.jpg'}
            width={60}
            height={60}
            alt='avatar'
            className='profile-reply__cover--img'
          />
        </div>
        <div className='profile-reply__wrapper'>
          <div className='profile-reply__box'>
            <time dateTime={createdAt} className='profile-reply__box--time'>
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: false,
                includeSeconds: false,
              })
                .replace('about ', '')
                .replace('less than a minute', '1m')
                .replace('minutes', 'min')
                .replace('hour', 'h')
                .replace('days', 'd')
                .replace('months', 'm')}
            </time>
          </div>
          <div className='profile-reply__info'>
            <span className='profile-reply__info--name'>{author.name}</span>
            <p
              className='profile-reply__info--content'
              onClick={handleCollapse}
            >
              {contentLabel}
              <button
                type='button'
                onClick={handleClick}
                className={btnClasses}
              >
                {btnLabel}
              </button>
            </p>
          </div>
          <div className={actionClasses}>
            <button
              type='button'
              onClick={handleUpdate}
              className='profile-reply__actions--update'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                />
              </svg>
            </button>
            <button
              type='button'
              onClick={handleDelete}
              className='profile-reply__actions--remove'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileReply;
