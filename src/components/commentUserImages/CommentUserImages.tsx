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
  const defaultImgClasses = useMemo(() => {
    return totalUsers && totalUsers.length > 3
      ? 'comment-user-images__default show'
      : 'comment-user-images__default hide';
  }, [totalUsers]);

  return (
    <div className='comment-user-images'>
      {(users ?? [])?.length < 1 && !isLoading ? (
        <EmptyMessage title='No users found.' type='comment' />
      ) : (
        <figure className='comment-user-images__container'>
          {isLoading ? (
            Array.from(new Array(3)).map((_, index) => {
              return <CommentUserSkeleton key={index} />;
            })
          ) : error ? (
            <EmptyMessage title='Failed to load comment users.' />
          ) : (
            <>
              {totalUsers?.slice(0, 3).map((user) => {
                const { _id: userId, image } = user;
                return (
                  <CommentUserImage id={userId} url={url(user)} src={image} />
                );
              })}
              <div className={defaultImgClasses}>
                <span>{totalUsers && totalUsers.length - 3}+</span>
              </div>
            </>
          )}
        </figure>
      )}
    </div>
  );
};

export default CommentUserImages;
