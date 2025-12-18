import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ShareIcon from '../icons/ShareIcon';
import Badge from '../badge/Badge';
import VerticalEllipsisIcon from '../icons/VerticalEllipsisIcon';

import ReplyMenu from '../ReplyMenu';
import UserAvatar from '../UserAvatar';

import ReplyForm from '../replyForm/ReplyForm';
import CommentReplyAction from '../commentReplyAction/CommentReplyAction';

import { useReply } from '../../hooks/useReply';
import { useMute } from '../../hooks/useMute';
import { useLikeReply } from '../../hooks/useLikeReply';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as reportModal from '../../features/reportModal/reportModalSlice';
import * as muteModal from '../../features/muteModal/muteModalSlice';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import { excerpts, imageSrc } from '../../utils';
import { canShowMenu } from '../../utils/canShowMenu';

import {
  MuteModalType,
  MutePayload,
  ReplyProps,
  ReportModalPayload,
} from '../../types';

import './Reply.scss';

const Reply = ({
  reply,
  slug,
  level,
  activeCardId,
  onChangeActiveCardId,
}: ReplyProps) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const {
    _id: replyId,
    author,
    comment,
    post,
    content,
    parentReply,
    replies,
    likes,
    dislikes,
    likeCount,
    dislikeCount,
    createdAt,
    updatedAt,
  } = reply;

  const { mutedList } = useMute();
  const showMenuButton = canShowMenu(currentUser, author);

  const { formattedDate } = useDate(createdAt);

  const isMuted = useMemo(
    () =>
      !!(mutedList?.mutedReplies ?? []).some((reply) => reply.id === replyId) ||
      false,
    [mutedList?.mutedReplies, replyId]
  );

  const commentId = useMemo(() => comment._id, [comment._id]);

  const queryKey = ['replies', commentId];

  const { replyTreeMutation, updateReplyMutation } = useReply(
    post._id,
    commentId
  );

  const {
    isLiked,
    isDisliked,
    likeReplyMutation,
    dislikeReplyMutation,
    handleLike,
    handleDislike,
  } = useLikeReply(replyId, likes, dislikes, queryKey);

  const [isMore, setIsMore] = useState(false);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isShow, setIsShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const replyUrl = `${window.location.origin}/post/${slug}#reply-${replyId}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMore(true);
  };

  const handleCollapse = () => {
    setIsMore(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 1500);
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
        onChangeActiveCardId(null);
        return false;
      } else {
        onChangeActiveCardId(replyId);
        return true;
      }
    });
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!e) return;

    if (e.key === 'Escape' && isShow) {
      e.preventDefault();
      handleClose();
    }

    if (
      (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') &&
      !isShow
    ) {
      e.preventDefault();
      handleToggle();
    }
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

    if (!currentUser) return;

    dispatch(commentModal.onOpen());
    dispatch(commentModal.setPostId(post._id));
    dispatch(commentModal.setReplyId(replyId));

    handleClose();
  };

  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: MutePayload & MuteModalType = {
      targetId: replyId,
      targetType: 'Reply',
      isMuted,
    };

    dispatch(muteModal.onOpen(payload));
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
      targetType: 'Reply',
      targetId: replyId,
    };

    dispatch(reportModal.onOpen(payload));
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
        comment: commentId,
        post: post._id,
        parentReplyId: replyId,
      };

      replyTreeMutation.mutate(replyObj, { onSuccess: handleCancel });
    }
  };

  const replyClasses = useMemo(
    () => (parentReply || level !== 0 ? 'reply nested' : 'reply'),
    [level, parentReply]
  );

  const hasUpdated = useMemo(
    () => new Date(createdAt).getTime() < new Date(updatedAt).getTime(),
    [createdAt, updatedAt]
  );

  const replyBtnClasses = useMemo(
    () =>
      currentUser
        ? 'reply__wrapper--reply-btn show'
        : 'reply__wrapper--reply-btn hide',
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
    () => (isMore && content.length > 150 ? content : excerpts(content, 150)),
    [content, isMore]
  );

  const btnClasses = useMemo(
    () =>
      content.length > 150
        ? 'reply__content--btn show'
        : 'reply__content--btn hide',
    [content]
  );

  const btnLabel = useMemo(() => (isMore ? undefined : 'more'), [isMore]);

  const userId = useMemo(() => currentUser?.details._id, [currentUser]);

  const authorId = useMemo(() => author._id, [author._id]);

  const isAdmin = useMemo(() => currentUser?.role === 'admin', [currentUser]);

  const url = useMemo(
    () =>
      currentUser
        ? userId === author?._id
          ? '/accounts/profile'
          : `/accounts/profile?username=${author?.username}`
        : `/posts?author=${author?.username}`,
    [author?._id, author?.username, currentUser, userId]
  );

  const isReplyAuthor = useMemo(
    () => author?._id === userId,
    [author?._id, userId]
  );

  const isCommentAuthor = useMemo(
    () => comment?.author?._id === userId,
    [comment?.author?._id, userId]
  );

  const isPostAuthor = useMemo(
    () => post?.author?._id === userId,
    [post?.author?._id, userId]
  );

  const actionBtnClasses = useMemo(
    () =>
      !currentUser ? 'reply__actions--btn hide' : 'reply__actions--btn show',
    [currentUser]
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
  }, [handleCancel, isOpen, isShow, value]);

  useEffect(() => {
    setIsShow(activeCardId === replyId);
  }, [activeCardId, replyId]);

  const isGoogleImage = author.fromGoogle && author.image?.startsWith('https');

  return (
    <>
      <article
        id={`reply-${replyId}`}
        className={replyClasses}
        role='article'
        aria-labelledby={`reply-author-${replyId}`}
        aria-describedby={`reply-content-${replyId}`}
      >
        <h2 id={`reply-title-${replyId}`} className='sr-only'>
          Reply by {author.name}
        </h2>

        <div className='reply__container'>
          <div className='reply__author'>
            <Link
              to={url}
              aria-label={`View ${author.username}’s profile`}
              title={`View ${author.username}’s profile`}
            >
              <UserAvatar
                imgSrc={imageSrc(author.image)}
                size={40}
                alt={`${author.username}’s profile picture`}
                className='reply__author--img'
                isGoogleAvatar={isGoogleImage}
              />
            </Link>
          </div>

          <div className='reply__content'>
            <div className='reply__wrapper'>
              <div className='reply__wrapper--time'>
                <time
                  dateTime={createdAt}
                  aria-label={`Posted on ${formattedDate}`}
                >
                  {formattedDate}
                </time>

                {currentUser &&
                  hasUpdated &&
                  authorId !== (userId as string) && (
                    <span aria-label='This reply was edited'>(Edited)</span>
                  )}
              </div>

              <div>
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
            </div>

            <div className='reply__content--user'>
              <h6
                id={`reply-author-${replyId}`}
                className='reply__content--username'
              >
                <Link
                  to={url}
                  aria-label={`Author: ${author.name}`}
                  title={`Author: ${author.name}`}
                >
                  {author.name}
                </Link>
              </h6>
              <Badge role={author.role} />
            </div>

            <p
              id={`reply-content-${replyId}`}
              onClick={handleCollapse}
              onDoubleClick={handleCopy}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role='textbox'
              aria-readonly='true'
              aria-label={`Reply content by ${author.username}`}
              className='reply__content--text'
            >
              {contentLabel}
              <button
                type='button'
                onClick={handleClick}
                aria-expanded={isMore}
                aria-controls={`reply-content-${replyId}`}
                aria-label={`${isMore ? 'Collapse' : 'Expand'} comment text`}
                title={`${isMore ? 'Collapse' : 'Expand'} comment text`}
                className={btnClasses}
              >
                {btnLabel}
              </button>
            </p>
          </div>
        </div>

        <div className='reply__actions' role='group' aria-label='Reply actions'>
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

          {showMenuButton && (
            <button
              type='button'
              onClick={handleToggle}
              onKeyDown={handleMenuKeyDown}
              aria-expanded={isShow}
              aria-controls={`reply-author-${replyId}`}
              aria-label={`${isShow ? 'Close' : 'Open'} reply menu`}
              title={`${isShow ? 'Close' : 'Open'} reply menu`}
              className={actionBtnClasses}
            >
              <VerticalEllipsisIcon />
              <span className='sr-only'>Open reply menu</span>
            </button>
          )}

          <div aria-live='polite' className='sr-only'>
            {copied && 'Copied to clipboard'}
          </div>

          <ReplyMenu
            authorRole={author.role}
            commentAuthorRole={comment.author.role}
            currentUser={currentUser}
            postAuthorRole={post.author.role}
            isAdmin={isAdmin}
            isCommentAuthor={isCommentAuthor}
            isShow={isShow}
            isPostAuthor={isPostAuthor}
            isReplyAuthor={isReplyAuthor}
            isMuted={isMuted}
            onClose={handleClose}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onMute={handleMute}
            onReport={handleReport}
          />
        </div>

        <div
          id={`reply-form-${replyId}`}
          role='region'
          aria-label={`Reply to ${author.username}’s reply`}
          aria-live='polite'
        >
          <ReplyForm
            size='sm'
            isOpen={isOpen}
            isEditing={isEditing}
            value={value}
            username={author.username}
            editId={editId}
            isLoading={updateReplyMutation.isPending}
            submitLabel='Submit reply'
            updateLabel='Update reply'
            onChange={setValue}
            onCancel={onCancelHandler}
            onSubmit={handleSubmit}
          />
        </div>
      </article>

      {replies.map((reply) => {
        return (
          <Reply
            key={reply._id}
            reply={reply}
            slug={slug}
            level={level! + 1}
            activeCardId={activeCardId}
            onChangeActiveCardId={onChangeActiveCardId}
          />
        );
      })}
    </>
  );
};

export default Reply;
