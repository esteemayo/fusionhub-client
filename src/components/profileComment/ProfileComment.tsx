import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

import UserAvatar from '../UserAvatar';
import Badge from '../badge/Badge';
import ReplyCommentForm from '../replyCommentForm/ReplyCommentForm';

import ProfileAction from '../profileAction/ProfileAction';
import ShareIcon from '../icons/ShareIcon';
import CommentReplyAction from '../commentReplyAction/CommentReplyAction';

import { useComment } from '../../hooks/useComment';
import { useReply } from '../../hooks/useReply';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';

import { useLikeComment } from '../../hooks/useLikeComment';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { getPostById } from '../../services/postService';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import { excerpts } from '../../utils';
import { ProfileCommentProps } from '../../types';

import './ProfileComment.scss';

const fetchPostById = async (postId: string) => {
  const { data } = await getPostById(postId);
  return data;
};

const ProfileComment = ({
  _id: commentId,
  author,
  content,
  post,
  likes,
  dislikes,
  likeCount,
  dislikeCount,
  createdAt,
  updatedAt,
  activeCardId,
  onChangeCardId,
}: ProfileCommentProps) => {
  const dispatch = useAppDispatch();

  const { formattedDate } = useDate(createdAt);
  const { blockedUsers } = useBlockedUsers();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const queryKey = ['comments'];

  const postId = useMemo(() => {
    return post._id;
  }, [post._id]);

  const { updateCommentMutation } = useComment(postId);
  const { replyMutation } = useReply(postId, commentId);

  const {
    isLiked,
    isDisliked,
    likeCommentMutation,
    dislikeCommentMutation,
    handleLike,
    handleDislike,
  } = useLikeComment(commentId, likes, dislikes, queryKey);

  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
    enabled: !!postId,
  });

  const [isMore, setIsMore] = useState(false);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isShow, setIsShow] = useState(false);

  const commentUrl = `${window.location.origin}/post/${data?.slug}#comment-${commentId}`;

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

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsShow((value) => {
      if (value) {
        onChangeCardId(null);
        return false;
      } else {
        onChangeCardId(commentId);
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
    setEditId(commentId);
    setValue(content);

    handleClose();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(commentModal.setPostId(post._id));
    dispatch(commentModal.onOpen());
    dispatch(commentModal.setCommentId(commentId));

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

    if (!currentUser || !postId) return;

    if (isEditing && editId) {
      updateCommentMutation.mutate(
        { content: value, commentId },
        { onSuccess: handleCancel }
      );
    } else {
      replyMutation.mutate(value, { onSuccess: handleCancel });
    }
  };

  const isUpdated = useMemo(
    () => new Date(createdAt).getTime() < new Date(updatedAt).getTime(),
    [createdAt, updatedAt]
  );

  const replyBtnClasses = useMemo(
    () =>
      currentUser
        ? 'profile-comment__box--reply-btn show'
        : 'profile-comment__box--reply-btn hide',
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
    () => (isMore && content.length > 200 ? content : excerpts(content, 200)),
    [content, isMore]
  );

  const btnClasses = useMemo(
    () =>
      content.length > 200
        ? 'profile-comment__info--btn show'
        : 'profile-comment__info--btn hide',
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

  const isCommentAuthor = useMemo(
    () => author?._id === userId,
    [author?._id, userId]
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
        ? 'profile-comment__cover--img blurred'
        : 'profile-comment__cover--img',
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
    setIsShow(activeCardId === commentId);
  }, [activeCardId, commentId]);

  const isGoogleImage = author.fromGoogle && author.image?.startsWith('https');

  return (
    <article
      className='profile-comment'
      role='article'
      aria-labelledby={`comment-title-${commentId}`}
      aria-describedby={`comment-desc-${commentId}`}
    >
      <div className='profile-comment__container'>
        <div className='profile-comment__cover'>
          <Link to={url} aria-label={`Visit profile of ${author.username}`}>
            <UserAvatar
              imgSrc={author.image}
              size={80}
              isGoogleAvatar={isGoogleImage}
              alt={`${author.username}’s profile picture`}
              className={coverClasses}
            />
          </Link>
        </div>
        <div className='profile-comment__wrapper'>
          <div className='profile-comment__box'>
            <div className='profile-comment__date'>
              <time
                dateTime={createdAt}
                className='profile-comment__date--time'
                aria-label={`Published on ${formattedDate}`}
              >
                {formattedDate}
              </time>
              {currentUser && isUpdated && authorId !== (userId as string) && (
                <span
                  aria-label='Edited'
                  className='profile-comment__date--status'
                >
                  (Edited)
                </span>
              )}
            </div>
            <button
              type='button'
              onClick={onToggleReply}
              aria-expanded={isOpen}
              aria-label={replyBtnLabel}
              title={isOpen ? 'Close reply form' : 'Open reply form'}
              className={replyBtnClasses}
            >
              <ShareIcon label='Reply' />
              <span>{replyBtnLabel}</span>
            </button>
          </div>
          <div className='profile-comment__info'>
            <h5 className='profile-comment__info--name'>
              <Link to={url} aria-label={`Username: ${author.username}`}>
                {author.name}
                <Badge role={author.role} />
              </Link>
            </h5>
          </div>
          <p
            id={`article-desc-${commentId}`}
            onClick={handleCollapse}
            aria-label={contentLabel}
            tabIndex={0}
            className='profile-comment__info--content'
          >
            {contentLabel}
            <button
              type='button'
              onClick={handleClick}
              aria-expanded={isMore}
              aria-label={`Read more about: ${content}`}
              className={btnClasses}
            >
              {btnLabel}
            </button>
          </p>
          <div
            className='profile-comment__wrap'
            role='group'
            aria-label='Comment actions'
          >
            <CommentReplyAction
              size='sm'
              url={commentUrl}
              title='Check out this comment'
              text={excerpts(content, 80)}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              isLiked={isLiked}
              isDisliked={isDisliked}
              likeMutation={likeCommentMutation}
              dislikeMutation={dislikeCommentMutation}
              onLike={handleLike}
              onDislike={handleDislike}
            />
            <ProfileAction
              type='comment'
              authorRole={author?.role}
              currentUser={currentUser}
              isAdmin={isAdmin}
              isOpen={isShow}
              isCommentAuthor={isCommentAuthor}
              isPostAuthor={isPostAuthor}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
            />
          </div>
          <div
            id={`reply-form-${commentId}`}
            role='region'
            aria-label={`Reply to ${author.username}'s comment`}
          >
            <ReplyCommentForm
              size='lg'
              isOpen={isOpen}
              isEditing={isEditing}
              content={value}
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

export default ProfileComment;
