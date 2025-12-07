import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

import UserAvatar from '../UserAvatar';
import Badge from '../badge/Badge';
import ReplyForm from '../replyForm/ReplyForm';

import ProfileAction from '../profileAction/ProfileAction';
import ShareIcon from '../icons/ShareIcon';
import CommentReplyAction from '../commentReplyAction/CommentReplyAction';

import { useLikeReply } from '../../hooks/useLikeReply';
import { useDate } from '../../hooks/useDate';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';
import { useReply } from '../../hooks/useReply';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { getPostById } from '../../services/postService';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import { excerpts } from '../../utils';
import { ProfileReplyProps } from '../../types';

import './ProfileReply.scss';

const fetchPostById = async (postId: string) => {
  const { data } = await getPostById(postId);
  return data;
};

const ProfileReply = ({
  _id: replyId,
  author,
  content,
  comment,
  post,
  likes,
  dislikes,
  likeCount,
  dislikeCount,
  createdAt,
  updatedAt,
  activeCardId,
  onChangeCardId,
}: ProfileReplyProps) => {
  const dispatch = useAppDispatch();

  const { formattedDate } = useDate(createdAt);
  const { blockedUsers } = useBlockedUsers();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const queryKey = ['replies'];

  const { replyTreeMutation, updateReplyMutation } = useReply(
    post._id,
    comment._id
  );

  const {
    isLiked,
    isDisliked,
    likeReplyMutation,
    dislikeReplyMutation,
    handleLike,
    handleDislike,
  } = useLikeReply(replyId, likes, dislikes, queryKey);

  const { data } = useQuery({
    queryKey: ['post', post._id],
    queryFn: () => fetchPostById(post._id),
    enabled: !!post._id,
  });

  const [isMore, setIsMore] = useState(false);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isShow, setIsShow] = useState(false);

  const replyUrl = `${window.location.origin}/post/${data?.slug}#reply-${replyId}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMore(true);
  };

  const handleCollapse = () => {
    setIsMore(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCollapse();
    }
  };

  const onToggleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    if (isEditing && editId) {
      setEditId(null);
      setIsEditing(false);
    }

    setIsOpen((value) => {
      if (value) {
        setValue('');
        return false;
      } else {
        return true;
      }
    });
  };

  const handleToggle = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();

    setIsShow((value) => {
      if (value) {
        onChangeCardId(null);
        return false;
      } else {
        onChangeCardId(replyId);
        return true;
      }
    });
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    setIsOpen(true);
    setIsEditing(true);
    setEditId(replyId);
    setValue(content);

    handleClose();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(commentModal.setReplyId(replyId));
    dispatch(commentModal.onOpen());
    dispatch(commentModal.setCommentId(comment._id));
    dispatch(commentModal.setPostId(post._id));

    handleClose();
  };

  const handleCancel = useCallback(() => {
    setIsOpen(false);

    if (isEditing && editId) {
      setEditId(null);
      setIsEditing(false);
    }

    if (value.trim() !== '') setValue('');
  }, [editId, isEditing, value]);

  const onCancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    handleCancel();
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (isEditing && editId) {
      updateReplyMutation.mutate(
        { content: value, replyId },
        { onSuccess: handleCancel }
      );
    } else {
      const replyObj = {
        content: value,
        comment: comment._id,
        post: post._id,
        parentReplyId: replyId,
      };

      replyTreeMutation.mutate(replyObj, { onSuccess: handleCancel });
    }
  };

  const hasUpdated = useMemo(
    () => new Date(createdAt).getTime() < new Date(updatedAt).getTime(),
    [createdAt, updatedAt]
  );

  const replyBtnClasses = useMemo(
    () =>
      currentUser
        ? 'profile-reply__box--reply-btn show'
        : 'profile-reply__box--reply-btn hide',
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
    () => (isMore && content.length > 150 ? content : excerpts(content, 150)),
    [content, isMore]
  );

  const btnClasses = useMemo(
    () =>
      content.length > 150
        ? 'profile-reply__info--btn show'
        : 'profile-reply__info--btn hide',
    [content]
  );

  const btnLabel = useMemo(() => (isMore ? undefined : 'more'), [isMore]);

  const userId = useMemo(
    () => currentUser?.details._id,
    [currentUser?.details._id]
  );

  const authorId = useMemo(() => author._id, [author._id]);

  const isAdmin = useMemo(
    () => currentUser?.role === 'admin',
    [currentUser?.role]
  );

  const isReplyAuthor = useMemo(
    () => author?._id === userId,
    [author?._id, userId]
  );

  const isCommentAuthor = useMemo(
    () => comment?.author._id === userId,
    [comment?.author._id, userId]
  );

  const isPostAuthor = useMemo(
    () => post?.author._id === userId,
    [post?.author._id, userId]
  );

  const url = useMemo(
    () =>
      authorId === userId
        ? '#'
        : `/accounts/profile?username=${author.username}`,
    [author.username, authorId, userId]
  );

  const isBlocked = useMemo(
    () => (blockedUsers ?? []).some((user) => user.id === authorId) || false,
    [authorId, blockedUsers]
  );

  const coverClasses = useMemo(
    () =>
      isBlocked
        ? 'profile-reply__cover--img blurred'
        : 'profile-reply__cover--img',
    [isBlocked]
  );

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();

        if (isShow) {
          handleClose();
        } else if (isOpen) {
          handleCancel();
        }
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [handleCancel, isOpen, isShow]);

  useEffect(() => {
    setIsShow(activeCardId === replyId);
  }, [activeCardId, replyId]);

  const isGoogleImage = author.fromGoogle && author.image?.startsWith('https');

  return (
    <article
      className='profile-reply'
      role='article'
      aria-labelledby={`reply-title-${replyId}`}
      aria-describedby={`reply-desc-${replyId}`}
    >
      <h2 id={`reply-title-${replyId}`} className='sr-only'>
        Reply by {author.name}
      </h2>
      <div className='profile-reply__container'>
        <div className='profile-reply__cover'>
          <Link
            to={url}
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
        <div className='profile-reply__wrapper'>
          <div className='profile-reply__box'>
            <div className='profile-reply__date'>
              <time
                dateTime={createdAt}
                className='profile-reply__date--time'
                aria-label={`Published on ${formattedDate}`}
              >
                {formattedDate}
              </time>
              {currentUser && hasUpdated && authorId !== (userId as string) && (
                <span
                  aria-label='This reply was edited'
                  className='profile-reply__date--status'
                >
                  (Edited)
                </span>
              )}
            </div>
            <button
              type='button'
              onClick={onToggleReply}
              aria-expanded={isOpen}
              aria-controls={`reply-form-${replyId}`}
              aria-label={`${isOpen ? 'Close' : 'Open'} reply form`}
              title={`${isOpen ? 'Close' : 'Open'} reply form`}
              className={replyBtnClasses}
            >
              <ShareIcon label='Reply icon' />
              <span>{replyBtnLabel}</span>
            </button>
          </div>
          <div className='profile-reply__info'>
            <h5
              id={`comment-author-${replyId}`}
              className='profile-reply__info--name'
            >
              <Link
                to={url}
                aria-label={`Go to ${author.username}’s profile`}
                title={`Go to ${author.username}’s profile`}
              >
                {author.name}
              </Link>
            </h5>
            <Badge role={author.role} />
          </div>
          <p
            id={`reply-desc-${replyId}`}
            onClick={handleCollapse}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role='textbox'
            aria-readonly='true'
            aria-label='Reply text'
            className='profile-reply__info--content'
          >
            {contentLabel}
            <button
              type='button'
              onClick={handleClick}
              aria-expanded={isMore}
              aria-label={`${isMore ? 'Collapse' : 'Expand'} comment text`}
              className={btnClasses}
            >
              {btnLabel}
            </button>
          </p>
          <div
            className='profile-reply__wrap'
            role='group'
            aria-label='Reply actions'
          >
            <CommentReplyAction
              size='sm'
              url={replyUrl}
              title='Check out this reply'
              text={excerpts(content, 80)}
              type='reply'
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              isLiked={isLiked}
              isDisliked={isDisliked}
              likeMutation={likeReplyMutation}
              dislikeMutation={dislikeReplyMutation}
              onLike={handleLike}
              onDislike={handleDislike}
            />
            <ProfileAction
              type='reply'
              authorRole={author?.role}
              currentUser={currentUser}
              isAdmin={isAdmin}
              isOpen={isShow}
              isCommentAuthor={isCommentAuthor}
              isPostAuthor={isPostAuthor}
              isReplyAuthor={isReplyAuthor}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
            />
          </div>
          <div
            id={`reply-form-${replyId}`}
            role='region'
            aria-label={`Reply to ${author.username}’s reply`}
            aria-live='polite'
          >
            <ReplyForm
              size='lg'
              isOpen={isOpen}
              isEditing={isEditing}
              content={value}
              username={author.username}
              editId={editId}
              isLoading={false}
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

export default ProfileReply;
