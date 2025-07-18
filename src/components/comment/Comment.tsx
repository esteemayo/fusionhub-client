import { useMemo } from 'react';

import CommentSkeleton from '../commentSkeleton/CommentSkeleton';
import CommentCard from '../commentCard/CommentCard';
import CommentUserSkeleton from '../commentUserSkeleton/CommentUserSkeleton';
import EmptyMessage from '../emptyMessage/EmptyMessage';

import Image from '../Image';

import { useAppSelector } from '../../hooks/hooks';
import { CommentProps, PostTypeWithAuthor, RoleType } from '../../types';

import './Comment.scss';

const Comment = ({
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
  const { user } = useAppSelector((state) => ({ ...state.auth }));

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
              uniqueCommentUsers?.slice(0, 5).map((user) => {
                const { _id: userId, image } = user;

                return (
                  <Image
                    key={userId}
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
              editId={commentId}
              editing={isEditing}
              comment={{
                _id: new Date().getTime().toString(),
                content: `${
                  (mutation.variables as unknown as { content: string }).content
                } (Sending...)`,
                post: mutation.variables as unknown as PostTypeWithAuthor,
                author: {
                  _id: user?.details._id as string,
                  name: user?.details.name as string,
                  username: user?.details.username as string,
                  image: user?.details.image as string,
                  role: user?.role as RoleType,
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
