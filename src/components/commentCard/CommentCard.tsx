import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Replies from '../replies/Replies';
import ReplyCommentForm from '../replyCommentForm/ReplyCommentForm';

import ShareIcon from '../icons/ShareIcon';
import Badge from '../badge/Badge';
import VerticalEllipsisIcon from '../icons/VerticalEllipsisIcon';

import CommentActionMenu from '../CommentActionMenu';
import UserAvatar from '../UserAvatar';
import CommentReplyAction from '../commentReplyAction/CommentReplyAction';

import { useReply } from '../../hooks/useReply';
import { useMute } from '../../hooks/useMute';
import { useComment } from '../../hooks/useComment';

import { useLikeComment } from '../../hooks/useLikeComment';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as reportModal from '../../features/reportModal/reportModalSlice';
import * as muteModal from '../../features/muteModal/muteModalSlice';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import { excerpts } from '../../utils';
import { canShowMenu } from '../../utils/canShowMenu';

import {
  CommentCardProps,
  MuteModalType,
  MutePayload,
  ReplyType,
  ReportModalPayload,
} from '../../types';

import './CommentCard.scss';

const CommentCard = ({
  slug,
  activeCardId,
  comment,
  onChangeActiveCardId,
  onOpen,
}: CommentCardProps) => {
  const {
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
  } = comment;

  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const { formattedDate } = useDate(createdAt);
  const { mutedList } = useMute();
  const showMenuButton = canShowMenu(currentUser, author);

  const isMuted = useMemo(
    () =>
      !!(mutedList?.mutedComments ?? []).some(
        (comment) => comment.id === commentId
      ) || false,
    [commentId, mutedList?.mutedComments]
  );

  const postId = useMemo(() => post._id, [post._id]);

  const queryKey = ['comments', postId];

  const { data, replyMutation } = useReply(postId, commentId);
  const { updateCommentMutation } = useComment(postId);
  const {
    isLiked,
    isDisliked,
    handleLike,
    handleDislike,
    likeCommentMutation,
    dislikeCommentMutation,
  } = useLikeComment(commentId, likes, dislikes, queryKey);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isShow, setIsShow] = useState(false);
  const [replies, setReplies] = useState<ReplyType[] | [] | undefined>();
  const [copied, setCopied] = useState(false);

  const commentUrl = `${window.location.origin}/post/${slug}#comment-${commentId}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMore(true);
  };

  const handleCollapse = () => {
    setIsMore(false);
  };

  const toggleActionHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();

    setIsShow((value) => {
      if (value) {
        onChangeActiveCardId(null);
        return false;
      } else {
        onChangeActiveCardId(commentId);
        return true;
      }
    });
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleActionHandler();
    } else if (e.key === 'Escape') {
      if (isShow) {
        handleClose();
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 1500);
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const onCancelHandler = useCallback(() => {
    setIsOpen(false);

    if (isEditing && editId) {
      setIsEditing(false);
      setEditId(null);
    }

    if (value.trim() !== '') setValue('');
  }, [editId, isEditing, value]);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    onCancelHandler();
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

    if (!currentUser) return;

    onOpen();
    dispatch(commentModal.setCommentId(commentId));
    dispatch(commentModal.setPostId(post._id));

    handleClose();
  };

  const handleReport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const { _id: id, username } = author;

    const payload: ReportModalPayload = {
      user: {
        id,
        username,
      },
      targetType: 'Comment',
      targetId: commentId,
    };

    dispatch(reportModal.onOpen(payload));
    handleClose();
  };

  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: MutePayload & MuteModalType = {
      targetId: commentId,
      targetType: 'Comment',
      isMuted,
    };

    dispatch(muteModal.onOpen(payload));
    handleClose();
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!currentUser) return;

    if (value.trim() !== '') {
      if (isEditing && editId) {
        updateCommentMutation.mutate(
          { content: value, commentId },
          { onSuccess: onCancelHandler }
        );
      } else {
        replyMutation.mutate(value, { onSuccess: onCancelHandler });
      }
    }
  };

  const isUpdated = useMemo(
    () => new Date(createdAt).getTime() < new Date(updatedAt).getTime(),
    [createdAt, updatedAt]
  );

  const replyBtnClasses = useMemo(
    () =>
      currentUser
        ? 'comment-card__box--reply show'
        : 'comment-card__box--reply hide',
    [currentUser]
  );

  const replyBtnLabel = useMemo(
    () =>
      isEditing && editId
        ? isOpen
          ? 'Cancel edit'
          : 'Reply'
        : isOpen
        ? 'Hide'
        : 'Reply',
    [editId, isEditing, isOpen]
  );

  const contentLabel = useMemo(
    () => (isMore && content?.length > 200 ? content : excerpts(content, 200)),
    [content, isMore]
  );

  const btnClasses = useMemo(
    () =>
      content?.length > 200
        ? 'comment-card__details--btn show'
        : 'comment-card__details--btn hide',
    [content]
  );

  const btnLabel = useMemo(() => (isMore ? undefined : 'more'), [isMore]);

  const isAdmin = useMemo(() => currentUser?.role === 'admin', [currentUser]);

  const userId = useMemo(() => currentUser?.details._id, [currentUser]);

  const authorId = useMemo(() => author?._id, [author?._id]);

  const postAuthorId = useMemo(() => post?.author?._id, [post?.author?._id]);

  const isCommentAuthor = useMemo(
    () => author?._id === userId,
    [author?._id, userId]
  );

  const isPostAuthor = useMemo(
    () => postAuthorId === userId,
    [postAuthorId, userId]
  );

  const url = useMemo(
    () =>
      currentUser
        ? userId === author?._id
          ? '/accounts/profile'
          : `/accounts/profile?username=${author?.username}`
        : `/posts?author=${author?.username}`,
    [author?._id, author?.username, currentUser, userId]
  );

  const actionBtnClasses = useMemo(
    () =>
      !currentUser
        ? 'comment-card__actions--btn hide'
        : 'comment-card__actions--btn show',
    [currentUser]
  );

  const isPending = useMemo(
    () => replyMutation.isPending || updateCommentMutation.isPending,
    [replyMutation.isPending, updateCommentMutation.isPending]
  );

  useEffect(() => {
    if (!data) return;

    const sortedData = data.sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );

    setReplies(sortedData);
  }, [data]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();

        if (isShow) {
          handleClose();
        } else if (isOpen) {
          onCancelHandler();
        }
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, isShow, onCancelHandler]);

  useEffect(() => {
    setIsShow(activeCardId === commentId);
  }, [activeCardId, commentId]);

  const isGoogleImage = author.fromGoogle && author.image?.startsWith('https');

  return (
    <article
      id={`comment-${commentId}`}
      className='comment-card'
      aria-labelledby={`comment-author-${commentId}`}
      aria-describedby={`comment-content-${commentId}`}
    >
      <div className='comment-card__container'>
        <div className='comment-card__user'>
          <Link to={url} aria-label={`View ${author.name}'s profile`}>
            <UserAvatar
              imgSrc={author.image}
              size={80}
              alt={`${author.username}'s profile picture`}
              className='comment-card__user--img'
              isGoogleAvatar={isGoogleImage}
            />
          </Link>
        </div>
        <div className='comment-card__details'>
          <div className='comment-card__box'>
            <div className='comment-card__date'>
              <time
                dateTime={new Date(createdAt).toISOString()}
                className='comment-card__date--time'
                aria-label={`Posted on ${formattedDate}`}
              >
                {formattedDate}
              </time>
              {currentUser && isUpdated && authorId !== (userId as string) && (
                <span
                  aria-label='Edited'
                  className='comment-card__date--status'
                >
                  (Edited)
                </span>
              )}
            </div>
            <div>
              <button
                type='button'
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={`reply-form-${commentId}`}
                aria-label={replyBtnLabel}
                title={isOpen ? 'Close reply form' : 'Open reply form'}
                className={replyBtnClasses}
              >
                <ShareIcon label='Reply' />
                <span>{replyBtnLabel}</span>
              </button>
            </div>
          </div>
          <div className='comment-card__details--info'>
            <h5
              id={`comment-author-${commentId}`}
              className='comment-card__details--username'
            >
              <Link to={url} aria-label={`Author ${author.name}'s profile`}>
                {author.name}
              </Link>
            </h5>
            <Badge role={author.role} />
          </div>
          <p
            onClick={handleCollapse}
            onDoubleClick={handleCopy}
            aria-label={`Comment by ${author.name}: ${contentLabel}`}
            role='textbox'
            tabIndex={0}
            className='comment-card__details--desc'
          >
            {contentLabel}
            <button
              type='button'
              onClick={handleClick}
              aria-label={btnLabel}
              aria-expanded={isMore}
              aria-controls={`comment-content-${commentId}`}
              className={btnClasses}
            >
              {btnLabel}
            </button>
          </p>
        </div>
      </div>
      <div
        className='comment-card__actions'
        role='group'
        aria-label='Reply actions'
      >
        <CommentReplyAction
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
        {showMenuButton && (
          <button
            type='button'
            onClick={toggleActionHandler}
            onKeyDown={handleMenuKeyDown}
            aria-haspopup='menu'
            aria-expanded={isShow}
            aria-controls={`comment-author-${commentId}`}
            aria-label={isShow ? 'Close comment menu' : 'Open comment menu'}
            title={isShow ? 'Close comment menu' : 'Open comment menu'}
            className={actionBtnClasses}
          >
            <VerticalEllipsisIcon />
            <span className='sr-only'>Open comment menu</span>
          </button>
        )}
        <div aria-live='polite' className='sr-only'>
          {copied && 'Copied to clipboard'}
        </div>
        <CommentActionMenu
          authorRole={author.role}
          currentUser={currentUser}
          postAuthorRole={post?.author?.role}
          isAdmin={isAdmin}
          isCommentAuthor={isCommentAuthor}
          isPostAuthor={isPostAuthor}
          isShow={isShow}
          isMuted={isMuted}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onMute={handleMute}
          onReport={handleReport}
        />
      </div>
      <div
        id={`reply-form-${commentId}`}
        role='region'
        aria-label={`Reply to ${author.username}'s comment`}
      >
        <ReplyCommentForm
          content={value}
          editId={editId}
          isOpen={isOpen}
          isLoading={isPending}
          isEditing={isEditing}
          onChange={setValue}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
      <Replies
        slug={slug}
        activeCardId={activeCardId}
        replyLists={replies}
        onChangeActiveCardId={onChangeActiveCardId}
      />
    </article>
  );
};

export default CommentCard;
