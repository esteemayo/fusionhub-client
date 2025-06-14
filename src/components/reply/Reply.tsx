import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

import Image from '../Image';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useDate } from '../../hooks/useDate';
import {
  onOpen,
  setPostId,
  setReplyId,
} from '../../features/commentModal/commentModalSlice';

import { excerpts } from '../../utils';
import { ReplyProps } from '../../types';

import './Reply.scss';

const Reply = ({
  _id: replyId,
  author,
  post: postId,
  content,
  createdAt,
  updatedAt,
  postAuthorId,
  onUpdate,
}: ReplyProps) => {
  const dispatch = useAppDispatch();

  const { formattedDate } = useDate(createdAt);
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

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onUpdate(content, replyId);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(onOpen());
    dispatch(setPostId(postId));
    dispatch(setReplyId(replyId));
  };

  const hasUpdated = useMemo(() => {
    return new Date(createdAt).getTime() < new Date(updatedAt).getTime();
  }, [createdAt, updatedAt]);

  const contentLabel = useMemo(() => {
    return isMore && content.length > 150 ? content : excerpts(content, 150);
  }, [content, isMore]);

  const btnClasses = useMemo(() => {
    return content.length > 150
      ? 'reply__content--btn show'
      : 'reply__content--btn hide';
  }, [content]);

  const btnLabel = useMemo(() => {
    return isMore ? undefined : 'more';
  }, [isMore]);

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser]);

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser]);

  const url = useMemo(() => {
    return userId === author._id
      ? '/accounts/profile'
      : `/accounts/profile?username=${author.username}`;
  }, [author, userId]);

  const actionBtnClasses = useMemo(() => {
    return author._id === userId || postAuthorId === userId || isAdmin
      ? 'reply__btn show'
      : 'reply__btn hide';
  }, [author, isAdmin, postAuthorId, userId]);

  return (
    <div className='reply'>
      <div className='reply__container'>
        <div className='reply__author'>
          <Link to={url}>
            <Image
              src={author.image ?? '/user-default.jpg'}
              width={40}
              height={40}
              alt='avatar'
              className='reply__author--img'
            />
          </Link>
        </div>
        <div className='reply__content'>
          <div className='reply__content--time'>
            <time dateTime={createdAt}>{formattedDate}</time>
            {currentUser && hasUpdated && author._id !== userId && (
              <span className='reply__content--time'>updated</span>
            )}
          </div>
          <h6 className='reply__content--username'>
            <Link to={url}>{author.name}</Link>
          </h6>
          <p onClick={handleCollapse} className='reply__content--text'>
            {contentLabel}
            <button type='button' className={btnClasses} onClick={handleClick}>
              {btnLabel}
            </button>
          </p>
        </div>
      </div>
      <div className={actionBtnClasses}>
        <button
          type='button'
          className='reply__btn--update'
          onClick={handleUpdate}
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
          className='reply__btn--remove'
          onClick={handleDelete}
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
  );
};

export default Reply;
