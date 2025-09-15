import { useMemo } from 'react';

import CommentUsers from '../commentUsers/CommentUsers';
import CommentCard from '../commentCard/CommentCard';
import CommentFilters from '../commentFilters/CommentFilters';

import CommentSkeleton from '../commentSkeleton/CommentSkeleton';
import EmptyMessage from '../emptyMessage/EmptyMessage';
import CommentUserImages from '../commentUserImages/CommentUserImages';

import { useAppSelector } from '../../hooks/hooks';
import {
  CommentImageType,
  CommentProps,
  PostTypeWithAuthor,
  RoleType,
} from '../../types';

import './Comment.scss';

const Comment = ({
  sort,
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
  onSort,
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
            <CommentUsers total={uniqueCommentUsers?.length} />
          </div>
          <CommentUserImages
            url={url}
            users={commentUsers}
            totalUsers={uniqueCommentUsers}
            isLoading={isPendingUser}
            error={errorUser}
          />
        </div>
      </div>
      <CommentFilters
        sort={sort}
        isOpen={isOpen}
        totalComments={comments?.length}
        totalCommentUsers={uniqueCommentUsers?.length}
        onClose={onClose}
        onToggle={onToggle}
        onSort={onSort}
      />
      {comments?.length < 1 && !isPending ? (
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
