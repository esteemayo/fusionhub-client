import { useMemo } from 'react';

import CommentSkeleton from '../commentSkeleton/CommentSkeleton';
import CommentCard from '../commentCard/CommentCard';
import CommentUserSkeleton from '../commentUserSkeleton/CommentUserSkeleton';

import Image from '../Image';

import { CommentProps } from '../../types';
import { useAppSelector } from '../../hooks/hooks';

import './Comment.scss';

const Comment = ({
  isLoading,
  isLoadingUser,
  error,
  errorUser,
  comments,
  commentUsers,
  mutation,
  onAction,
  onChange,
  onUpdate,
  onOpen,
}: CommentProps) => {
  const { user } = useAppSelector((state) => ({ ...state.auth }));

  const commentHeading = useMemo(() => {
    return (comments ?? [])?.length > 1 ? 'Comments' : 'Comment';
  }, [comments]);

  return (
    <div className='comment'>
      <div className='comment__container'>
        <h4 className='comment__heading'>{commentHeading}</h4>
        {(commentUsers ?? [])?.length > 0 && (
          <figure className='comment__user'>
            {isLoadingUser ? (
              Array.from(new Array(3)).map((_, index) => {
                return <CommentUserSkeleton key={index} />;
              })
            ) : errorUser ? (
              <div className='comment__user--error'>
                <span>
                  An error occurred while loading the comment users. Please try
                  again later or contact support if the issue persists.
                </span>
                <span>{errorUser?.message}</span>
              </div>
            ) : (
              commentUsers.map((user) => {
                const { _id: id, image } = user;
                return (
                  <Image
                    key={id}
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
      {(comments ?? [])?.length < 1 ? (
        <div className='comment__no-comments'>
          <span>No comments yet.</span>
          <span>Be the first to share your thoughts!</span>
        </div>
      ) : isLoading ? (
        Array.from(new Array(3)).map((_, index) => {
          return <CommentSkeleton key={index} />;
        })
      ) : error ? (
        <div className='comment__error'>
          <span>
            An error occurred while loading the comments. Please try again later
            or contact support if the issue persists.
          </span>
          <span>{error.message}</span>
        </div>
      ) : (
        <>
          {mutation.isPending && (
            <CommentCard
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
              onReply={onAction}
              onUpdate={onUpdate}
              onOpen={onOpen}
            />
          )}
          {comments?.map((comment) => {
            return (
              <CommentCard
                key={comment._id}
                comment={comment}
                onChange={onChange}
                onReply={onAction}
                onUpdate={onUpdate}
                onOpen={onOpen}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Comment;
