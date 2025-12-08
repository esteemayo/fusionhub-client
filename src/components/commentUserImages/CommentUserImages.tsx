import { useMemo } from 'react';

import CommentUserImage from '../commentUserImage/CommentUserImage';
import EmptyMessage from '../emptyMessage/EmptyMessage';
import CommentUserSkeleton from '../commentUserSkeleton/CommentUserSkeleton';

import { CommentUserImagesProps } from '../../types';

import './CommentUserImages.scss';

const CommentUserImages = ({
  url,
  users,
  totalUsers,
  isLoading,
  error,
}: CommentUserImagesProps) => {
  const defaultImgClasses = useMemo(
    () =>
      totalUsers && totalUsers.length > 3
        ? 'comment-user-images__default show'
        : 'comment-user-images__default hide',
    [totalUsers]
  );

  const hasUsers = Array.isArray(users) || (users ?? []).length > 0;

  return (
    <div
      className='comment-user-images'
      aria-live='polite'
      aria-busy={isLoading}
    >
      <figure
        className={
          isLoading
            ? 'comment-user-images__container loader'
            : 'comment-user-images__container'
        }
        role='list'
        aria-label='Users who commented on this post'
      >
        {isLoading ? (
          Array.from(new Array(3)).map((_, index) => {
            return (
              <div
                key={index}
                className='comment-user-images__wrapper'
                role='listitem'
                aria-label='Loading user'
              >
                <CommentUserSkeleton />
              </div>
            );
          })
        ) : error ? (
          <EmptyMessage title='Failed to load comment users.' />
        ) : !hasUsers ? (
          <EmptyMessage title='No users found.' type='comment' />
        ) : (
          <>
            {hasUsers &&
              totalUsers?.slice(0, 3).map((user) => {
                const { _id: userId, username, image } = user;
                return (
                  <div
                    key={userId}
                    className='comment-user-images__wrapper'
                    role='listitem'
                    aria-label={`Comment user: ${username || 'Unknown user'}`}
                  >
                    <CommentUserImage
                      url={url(user)}
                      src={image}
                      username={username}
                    />
                  </div>
                );
              })}

            <figcaption
              className={defaultImgClasses}
              aria-label={
                totalUsers && totalUsers.length > 3
                  ? `${totalUsers.length - 3} more users commented`
                  : undefined
              }
            >
              <span>{totalUsers && totalUsers.length - 3}+</span>
            </figcaption>
          </>
        )}
      </figure>
    </div>
  );
};

export default CommentUserImages;
