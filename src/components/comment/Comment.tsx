import { useId, useMemo } from 'react';

import CommentSkeleton from '../commentSkeleton/CommentSkeleton';
import CommentCard from '../commentCard/CommentCard';
import CommentUserSkeleton from '../commentUserSkeleton/CommentUserSkeleton';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import Image from '../Image';

import { CommentProps } from '../../types';
import { useAppSelector } from '../../hooks/hooks';

import './Comment.scss';

const Comment = ({
  postAuthorId,
  commentId,
  isPending,
  isPendingUser,
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
}: CommentProps) => {
  const id = useId();
  const { user } = useAppSelector((state) => ({ ...state.auth }));

  const commentHeading = useMemo(() => {
    return (comments ?? [])?.length > 1 ? 'Comments' : 'Comment';
  }, [comments]);

  const wrapperClasses = useMemo(() => {
    return !isPending && commentToShow < (comments ?? [])?.length
      ? 'comment__wrapper show'
      : 'comment__wrapper hide';
  }, [commentToShow, comments, isPending]);

  return (
    <div className='comment'>
      <div className='comment__container'>
        <h4 className='comment__heading'>{commentHeading}</h4>
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
              commentUsers?.slice(0, 5).map((user, index) => {
                const { _id: userId, image } = user;
                const uniqueUserId = `${id}-${userId}-${index}`;

                return (
                  <Image
                    key={uniqueUserId}
                    src={image}
                    width={50}
                    height={50}
                    alt='avatar'
                    className='comment__user--img'
                  />
                );
              })
            )}
          </figure>
        )}
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
              postAuthorId={postAuthorId}
              editId={commentId}
              editing={isEditing}
              comment={{
                _id: new Date().getTime().toString(),
                content: `${
                  (mutation.variables as unknown as { content: string }).content
                } (Sending...)`,
                post: (mutation.variables as unknown as { postId: string })
                  .postId,
                author: {
                  _id: user?.details._id as string,
                  name: user?.details.name as string,
                  username: user?.details.username as string,
                  image: user?.details.image as string,
                },
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
                postAuthorId={postAuthorId}
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
