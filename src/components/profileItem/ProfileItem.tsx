import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import UserAvatar from '../UserAvatar';
import Badge from '../badge/Badge';
import ReplyForm from '../replyForm/ReplyForm';

import ProfileAction from '../profileAction/ProfileAction';
import ShareIcon from '../icons/ShareIcon';
import CommentReplyAction from '../commentReplyAction/CommentReplyAction';

import { useComment } from '../../hooks/useComment';
import { useReply } from '../../hooks/useReply';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';

import { useLikeComment } from '../../hooks/useLikeComment';
import { useLikeReply } from '../../hooks/useLikeReply';
import { useEditableItem } from '../../hooks/useEditableItem';

import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { getPostById } from '../../services/postService';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import { excerpts } from '../../utils';
import { ProfileItemProps } from '../../types';

import './ProfileItem.scss';

const fetchPostById = async (postId: string) => {
  const { data } = await getPostById(postId);
  return data;
};

const ProfileItem = ({
  _id: id,
  author,
  content,
  createdAt,
  comment,
  dislikeCount,
  dislikes,
  likeCount,
  likes,
  post,
  type,
  updatedAt,
}: ProfileItemProps) => {
  const dispatch = useAppDispatch();

  const { formattedDate } = useDate(createdAt);
  const { blockedUsers } = useBlockedUsers();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const {
    isMore,
    isOpen,
    isEditing,
    editId,
    value,
    setValue,
    openReply,
    openEdit,
    closeAll,
    openMore,
    closeMore,
  } = useEditableItem();

  const isReply = type === 'reply';
  const limit = isReply ? 150 : 200;
  const queryKey = [isReply ? 'replies' : 'comments'];

  const commentApi = useComment(post._id);
  const replyApi = useReply(post._id, isReply ? comment!._id : id);

  const replyLikeApi = useLikeReply(id, likes, dislikes, queryKey);
  const commentLikeApi = useLikeComment(id, likes, dislikes, queryKey);

  const likeApi = isReply ? replyLikeApi : commentLikeApi;

  const { data } = useQuery({
    queryKey: ['post', post._id],
    queryFn: () => fetchPostById(post._id),
    enabled: !!post._id,
  });

  const [isShow, setIsShow] = useState(false);

  const userId = currentUser?.details._id;
  const authorId = author._id;
  const isAdmin = currentUser?.role === 'admin';
  const isCommentAuthor = authorId === userId;
  const isPostAuthor = post?.author._id === userId;

  const profileUrl =
    authorId === userId ? '#' : `/accounts/profile?username=${author.username}`;

  const shareUrl = `${window.location.origin}/post/${data?.slug}#${
    isReply ? `reply-${id}` : `comment-${id}`
  }`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeMore();
    }
  };

  const handleToggle = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();

    setIsShow((value) => {
      return !value;
    });
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!currentUser) return;

    openEdit(id, content);
    handleClose();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(commentModal.onOpen());
    dispatch(commentModal.setPostId(post._id));

    if (isReply) {
      dispatch(commentModal.setReplyId(id));
      dispatch(commentModal.setCommentId(comment?._id));
    } else {
      dispatch(commentModal.setCommentId(id));
    }

    handleClose();
  };

  const onCancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    closeAll();
  };

  const onToggleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!currentUser) return;

    return isOpen ? closeAll() : openReply();
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!currentUser) return;

    if (isEditing && editId) {
      if (isReply) {
        replyApi.updateReplyMutation.mutate(
          { content: value, replyId: id },
          { onSuccess: closeAll }
        );
      } else {
        commentApi.updateCommentMutation.mutate(
          { content: value, commentId: id },
          { onSuccess: closeAll }
        );
      }
    } else {
      if (isReply) {
        const replyObj = {
          content: value,
          comment: comment?._id,
          post: post._id,
          parentReplyId: id,
        };

        replyApi.replyTreeMutation.mutate(replyObj, {
          onSuccess: closeAll,
        });
      } else {
        replyApi.replyMutation.mutate(value, { onSuccess: closeAll });
      }
    }
  };

  const isBlocked = useMemo(
    () => !!(blockedUsers ?? []).some((user) => user.id === authorId) || false,
    [authorId, blockedUsers]
  );

  const coverClasses = useMemo(
    () =>
      isBlocked
        ? 'profile-item__cover--img blurred'
        : 'profile-item__cover--img',
    [isBlocked]
  );

  const isUpdated = useMemo(
    () => new Date(createdAt).getTime() < new Date(updatedAt).getTime(),
    [createdAt, updatedAt]
  );

  const replyBtnClasses = useMemo(
    () =>
      currentUser
        ? 'profile-item__box--reply-btn show'
        : 'profile-item__box--reply-btn hide',
    [currentUser]
  );

  const replyBtnLabel = useMemo(
    () =>
      isEditing && editId
        ? isOpen
          ? 'Cancel edit'
          : 'Reply'
        : isOpen
        ? 'Hide reply'
        : 'Reply',
    [editId, isEditing, isOpen]
  );

  const contentLabel = useMemo(
    () =>
      isMore && content.length > limit ? content : excerpts(content, limit),
    [content, isMore, limit]
  );

  const btnClasses = useMemo(
    () =>
      content.length > limit
        ? 'profile-item__info--btn show'
        : 'profile-item__info--btn hide',
    [content, limit]
  );

  const btnLabel = useMemo(() => (isMore ? undefined : 'more'), [isMore]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        return isShow ? handleClose() : closeAll();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [closeAll, isShow]);

  const capitalizedType = type.charAt(0).toUpperCase().concat(type.slice(1));
  const isGoogleImage = author.fromGoogle && author.image?.startsWith('https');

  return (
    <article
      className='profile-item'
      role='article'
      aria-labelledby={`${type}-title-${id}`}
      aria-describedby={`${type}-desc-${id}`}
    >
      <h2 id={`${type}-title-${id}`} className='sr-only'>
        {`${capitalizedType} by ${author.name}`}
      </h2>

      <div className='profile-item__container'>
        <div className='profile-item__cover'>
          <Link
            to={profileUrl}
            aria-label={`Visit profile of ${author.username}`}
            title={`Visit profile of ${author.username}`}
          >
            <UserAvatar
              imgSrc={author.image}
              size={80}
              isGoogleAvatar={isGoogleImage}
              alt={`${author.username}’s profile picture`}
              className={coverClasses}
            />
          </Link>
        </div>

        <div className='profile-item__wrapper'>
          <div className='profile-item__box'>
            <div className='profile-item__date'>
              <time
                dateTime={createdAt}
                className='profile-item__date--time'
                aria-label={`Published on ${formattedDate}`}
              >
                {formattedDate}
              </time>

              {currentUser && isUpdated && authorId !== (userId as string) && (
                <span
                  aria-label='This comment was edited'
                  className='profile-item__date--status'
                >
                  (Edited)
                </span>
              )}
            </div>

            <button
              type='button'
              onClick={onToggleReply}
              aria-expanded={isOpen}
              aria-controls={`reply-form-${id}`}
              aria-label={`${isOpen ? 'Close' : 'Open'} reply form`}
              title={`${isOpen ? 'Close' : 'Open'} reply form`}
              className={replyBtnClasses}
            >
              <ShareIcon label='Reply icon' />
              <span>{replyBtnLabel}</span>
            </button>
          </div>

          <div className='profile-item__info'>
            <h5
              id={`${type}-author-${id}`}
              className='profile-item__info--name'
            >
              <Link
                to={profileUrl}
                aria-label={`Go to ${author.username}’s profile`}
                title={`Go to ${author.username}’s profile`}
              >
                {author.name}
                <Badge role={author.role} />
              </Link>
            </h5>
          </div>

          <p
            id={`${type}-desc-${id}`}
            onClick={closeMore}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role='textbox'
            aria-readonly='true'
            aria-label={`${type} text`}
            className='profile-item__info--content'
          >
            {contentLabel}
            <button
              type='button'
              onClick={openMore}
              aria-expanded={isMore}
              aria-controls={`${type}-content-${id}`}
              aria-label={`${isMore ? 'Collapse' : 'Expand'} ${type} text`}
              className={btnClasses}
            >
              {btnLabel}
            </button>
          </p>

          <div
            className='profile-item__wrap'
            role='group'
            aria-label={`${capitalizedType} actions`}
          >
            <CommentReplyAction
              size='sm'
              url={shareUrl}
              title={`Check out this ${type}`}
              text={excerpts(content, 80)}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              isLiked={likeApi.isLiked}
              isDisliked={likeApi.isDisliked}
              likeMutation={likeApi.likeMutation}
              dislikeMutation={likeApi.dislikeMutation}
              onLike={likeApi.handleLike}
              onDislike={likeApi.handleDislike}
            />

            <ProfileAction
              type={type}
              authorRole={author?.role}
              currentUser={currentUser}
              isAdmin={isAdmin}
              isOpen={isShow}
              isCommentAuthor={isCommentAuthor}
              isPostAuthor={isPostAuthor}
              onClose={handleClose}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
            />
          </div>

          <div
            id={`reply-form-${id}`}
            role='region'
            aria-label={`Reply to ${author.username}’s ${type}`}
            aria-live='polite'
          >
            <ReplyForm
              size='lg'
              isOpen={isOpen}
              isEditing={isEditing}
              value={value}
              username={isReply ? author.username : undefined}
              editId={editId}
              maxRows={5}
              isLoading={false}
              submitLabel='Submit reply'
              updateLabel={`Update ${isReply ? 'reply' : 'comment'}`}
              onChange={setValue}
              onCancel={onCancelHandler}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileItem;
