import { useMemo, useState } from 'react';

import Image from '../Image';
import Badge from '../badge/Badge';

import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as commentModal from '../../features/commentModal/commentModalSlice';
import * as replyCommentModal from '../../features/replyCommentModal/replyCommentModalSlice';

import { excerpts } from '../../utils';
import { ProfileCommentProps } from '../../types';

import './ProfileComment.scss';

const ProfileComment = ({
  _id: commentId,
  author,
  content,
  post: postId,
  createdAt,
}: ProfileCommentProps) => {
  const dispatch = useAppDispatch();

  const { formattedDate } = useDate(createdAt);
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const [isMore, setIsMore] = useState(false);

  const handleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(replyCommentModal.setPostId(postId));
    dispatch(replyCommentModal.onOpen());
    dispatch(replyCommentModal.setCommentId(commentId));
  };

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

    dispatch(commentModal.setPostId(postId));
    dispatch(commentModal.onOpen());
    dispatch(commentModal.setCommentId(commentId));
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(replyCommentModal.setContent(content));
    dispatch(replyCommentModal.onOpen());
    dispatch(replyCommentModal.setPostId(postId));
    dispatch(replyCommentModal.setIsEditing());
    dispatch(replyCommentModal.setCommentId(commentId));
  };

  const replyBtnClasses = useMemo(() => {
    return currentUser?.role !== 'admin'
      ? 'profile-comment__box--reply-btn show'
      : 'profile-comment__box--reply-btn hide';
  }, [currentUser]);

  const contentLabel = useMemo(() => {
    return isMore && content.length > 200 ? content : excerpts(content, 200);
  }, [content, isMore]);

  const btnClasses = useMemo(() => {
    return content.length > 200
      ? 'profile-comment__info--btn show'
      : 'profile-comment__info--btn hide';
  }, [content]);

  const btnLabel = useMemo(() => {
    return isMore ? undefined : 'more';
  }, [isMore]);

  const actionClasses = useMemo(() => {
    return currentUser?.role === 'admin'
      ? 'profile-comment__actions show'
      : 'profile-comment__actions hide';
  }, [currentUser]);

  return (
    <article className='profile-comment'>
      <div className='profile-comment__container'>
        <div className='profile-comment__cover'>
          <Image
            src={author.image ?? '/user-default.jpg'}
            width={60}
            height={60}
            alt='avatar'
            className='profile-comment__cover--img'
          />
        </div>
        <div className='profile-comment__wrapper'>
          <div className='profile-comment__box'>
            <time dateTime={createdAt} className='profile-comment__box--time'>
              {formattedDate}
            </time>
            <button
              type='button'
              onClick={handleReply}
              className={replyBtnClasses}
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
                  d='M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5'
                />
              </svg>
              <span>Reply</span>
            </button>
          </div>
          <div className='profile-comment__info'>
            <div className='profile-comment__info--author'>
              <span className='profile-comment__info--name'>{author.name}</span>
              <Badge role={author.role} />
            </div>
            <p
              className='profile-comment__info--content'
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
              className='profile-comment__actions--update'
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
              className='profile-comment__actions--remove'
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

export default ProfileComment;
