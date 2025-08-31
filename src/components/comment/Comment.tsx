import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import CommentSkeleton from '../commentSkeleton/CommentSkeleton';
import CommentCard from '../commentCard/CommentCard';
import CommentUserSkeleton from '../commentUserSkeleton/CommentUserSkeleton';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import Image from '../Image';

import { useAppSelector } from '../../hooks/hooks';
import {
  CommentImageType,
  CommentProps,
  PostTypeWithAuthor,
  RoleType,
} from '../../types';

import './Comment.scss';

const Comment = ({
  commentId,
  isPending,
  isPendingUser,
  isOpen,
  isLoading,
  isEditing,
  error,
  errorUser,
  comments,
  commentUsers,
  commentToShow,
  mutation,
  onChange,
  onClick,
  onUpdate,
  onOpen,
  onClose,
  onToggle,
}: CommentProps) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const url = (user: CommentImageType) => {
    return currentUser
      ? currentUser.details._id === user._id
        ? '/accounts/profile'
        : `/accounts/profile?username=${user.username}`
      : `/posts?author=${user.username}`;
  };

  const commentHeading = useMemo(() => {
    return (comments ?? [])?.length > 1 ? 'Comments' : 'Comment';
  }, [comments]);

  const uniqueCommentUsers = useMemo(() => {
    const seenIds = new Set();

    return commentUsers?.filter((user) => {
      if (seenIds.has(user._id)) {
        return false;
      }

      seenIds.add(user._id);
      return true;
    });
  }, [commentUsers]);

  const defaultImgClasses = useMemo(() => {
    return uniqueCommentUsers && uniqueCommentUsers.length > 3
      ? 'comment__user--default show'
      : 'comment__user--default hide';
  }, [uniqueCommentUsers]);

  const listClasses = useMemo(() => {
    return isOpen ? 'comment__list show' : 'comment__list hide';
  }, [isOpen]);

  const wrapperClasses = useMemo(() => {
    return !isPending && commentToShow < (comments ?? [])?.length
      ? 'comment__wrapper show'
      : 'comment__wrapper hide';
  }, [commentToShow, comments, isPending]);

  return (
    <div className='comment'>
      <div className='comment__container'>
        <h4 className='comment__heading'>{commentHeading}</h4>
        <div className='comment__users'>
          <div className='comment__total'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
            >
              <path
                fillRule='evenodd'
                d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                clipRule='evenodd'
              />
            </svg>
            <span>{uniqueCommentUsers?.length}</span>
          </div>
          {(commentUsers ?? [])?.length < 1 && !isPendingUser ? (
            <EmptyMessage title='No users found.' type='comment' />
          ) : (
            <figure className='comment__user'>
              {isPendingUser ? (
                Array.from(new Array(3)).map((_, index) => {
                  return <CommentUserSkeleton key={index} />;
                })
              ) : errorUser ? (
                <EmptyMessage title='Failed to load comment users.' />
              ) : (
                <>
                  {uniqueCommentUsers?.slice(0, 3).map((user) => {
                    const { _id: userId, image } = user;
                    return (
                      <Link key={userId} to={url(user)}>
                        <Image
                          src={image}
                          width={50}
                          height={50}
                          alt='avatar'
                          className='comment__user--img'
                        />
                      </Link>
                    );
                  })}
                  <div className={defaultImgClasses}>
                    <span>
                      {uniqueCommentUsers && uniqueCommentUsers.length - 3}+
                    </span>
                  </div>
                </>
              )}
            </figure>
          )}
        </div>
      </div>
      <div className='comment__wrap'>
        <div className='comment__box'>
          <span className='comment__box--count'>
            {comments?.length} comments
          </span>
          <div className='comment__box--total'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
              width={15}
            >
              <path
                fillRule='evenodd'
                d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                clipRule='evenodd'
              />
            </svg>
            <span>{uniqueCommentUsers?.length}</span>
          </div>
        </div>
        <div className='comment__filter'>
          <span className='comment__filter--label'>Sort by</span>
          <div className='comment__filter--input'>
            <span onClick={onToggle}>Best</span>
            <ul className={listClasses}>
              <li className='comment__list--item' onClick={onClose}>
                <span>Best</span>
              </li>
              <li className='comment__list--item' onClick={onClose}>
                <span>Newest</span>
              </li>
              <li className='comment__list--item' onClick={onClose}>
                <span>Oldest</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {(comments ?? [])?.length < 1 && !isPending ? (
        <EmptyMessage
          title='No comments yet.'
          subtitle='Be the first to share your thoughts!'
        />
      ) : isPending ? (
        Array.from(new Array(3)).map((_, index) => {
          return <CommentSkeleton key={index} />;
        })
      ) : error ? (
        <EmptyMessage
          title='An error occurred while loading the comments. Please try again later or contact support if the issue persists.'
          subtitle={error.message}
        />
      ) : (
        <>
          {mutation.isPending && (
            <CommentCard
              editId={commentId}
              editing={isEditing}
              comment={{
                _id: new Date().getTime().toString(),
                content: `${
                  (mutation.variables as unknown as { content: string }).content
                } (Sending...)`,
                post: mutation.variables as unknown as PostTypeWithAuthor,
                author: {
                  _id: currentUser?.details._id as string,
                  name: currentUser?.details.name as string,
                  username: currentUser?.details.username as string,
                  image: currentUser?.details.image as string,
                  role: currentUser?.role as RoleType,
                },
                likes: [],
                likeCount: 0,
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
              }}
              onChange={onChange}
              onUpdate={onUpdate}
              onOpen={onOpen}
            />
          )}
          {comments?.slice(0, commentToShow).map((comment) => {
            return (
              <CommentCard
                key={comment._id}
                editId={commentId}
                editing={isEditing}
                comment={comment}
                onChange={onChange}
                onUpdate={onUpdate}
                onOpen={onOpen}
              />
            );
          })}
        </>
      )}
      <div className={wrapperClasses}>
        <button
          type='button'
          onClick={onClick}
          className='comment__wrapper--btn'
        >
          {isLoading ? 'Loading...' : 'Show more comments'}
        </button>
      </div>
    </div>
  );
};

export default Comment;
