import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Badge from '../badge/Badge';
import ShareIcon from '../icons/ShareIcon';

import Image from '../Image';
import GoogleImage from '../GoogleImage';

import ReplyForm from '../replyForm/ReplyForm';
import ReplyMenu from '../ReplyMenu';
import CommentReplyAction from '../commentReplyAction/CommentReplyAction';

import { useReply } from '../../hooks/useReply';
import { useMute } from '../../hooks/useMute';
import { useLikeReply } from '../../hooks/useLikeReply';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as reportModal from '../../features/reportModal/reportModalSlice';
import * as muteModal from '../../features/muteModal/muteModalSlice';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import { excerpts } from '../../utils';
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
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

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

  const isMuted = useMemo(() => {
    return (
      !!(mutedList?.mutedReplies ?? []).some((reply) => reply.id === replyId) ||
      false
    );
  }, [mutedList?.mutedReplies, replyId]);

  const commentId = useMemo(() => {
    return comment._id;
  }, [comment._id]);

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

  const replyUrl = `${window.location.origin}/post/${slug}#reply-${replyId}`;

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

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
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
      targetType: 'reply',
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
        {
          onSuccess: handleCancel,
        }
      );
    } else {
      const replyObj = {
        content: value,
        comment: commentId,
        post: post._id,
        parentReplyId: replyId,
      };

      replyTreeMutation.mutate(replyObj, {
        onSuccess: handleCancel,
      });
    }
  };

  const replyClasses = useMemo(() => {
    return parentReply || level !== 0 ? 'reply nested' : 'reply';
  }, [level, parentReply]);

  const hasUpdated = useMemo(() => {
    return new Date(createdAt).getTime() < new Date(updatedAt).getTime();
  }, [createdAt, updatedAt]);

  const replyBtnClasses = useMemo(() => {
    return currentUser
      ? 'reply__wrapper--reply-btn show'
      : 'reply__wrapper--reply-btn hide';
  }, [currentUser]);

  const replyBtnLabel = useMemo(() => {
    return isEditing && editId
      ? isOpen
        ? 'Cancel edit'
        : 'Reply'
      : isOpen
      ? 'Hide'
      : 'Reply';
  }, [editId, isEditing, isOpen]);

  const contentLabel = useMemo(() => {
    return isMore && content.length > 150 ? content : excerpts(content, 150);
  }, [content, isMore]);

  const btnClasses = useMemo(() => {
    return content.length > 150
      ? 'reply__content--btn show'
      : 'reply__content--btn hide';
  }, [content]);

  const btnLabel = useMemo(() => {
    return isMore ? undefined : 'more';
  }, [isMore]);

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser]);

  const authorId = useMemo(() => {
    return author._id;
  }, [author._id]);

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser]);

  const url = useMemo(() => {
    return currentUser
      ? userId === author?._id
        ? '/accounts/profile'
        : `/accounts/profile?username=${author?.username}`
      : `/posts?author=${author?.username}`;
  }, [author?._id, author?.username, currentUser, userId]);

  const isReplyAuthor = useMemo(() => {
    return author?._id === userId;
  }, [author?._id, userId]);

  const isCommentAuthor = useMemo(() => {
    return comment?.author?._id === userId;
  }, [comment?.author?._id, userId]);

  const isPostAuthor = useMemo(() => {
    return post?.author?._id === userId;
  }, [post?.author?._id, userId]);

  const actionBtnClasses = useMemo(() => {
    return !currentUser
      ? 'reply__actions--btn hide'
      : 'reply__actions--btn show';
  }, [currentUser]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isShow) {
          handleClose();
        } else if (isOpen) {
          handleCancel();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleCancel, isOpen, isShow, value]);

  useEffect(() => {
    setIsShow(activeCardId === replyId);
  }, [activeCardId, replyId]);

  return (
    <>
      <article id={`reply-${replyId}`} className={replyClasses}>
        <div className='reply__container'>
          <div className='reply__author'>
            <Link to={url} aria-label={url}>
              {author.fromGoogle && author.image?.startsWith('https') ? (
                <GoogleImage
                  src={author.image ?? '/user-default.jpg'}
                  width={40}
                  height={40}
                  alt={author.username}
                  className='reply__author--img'
                />
              ) : (
                <Image
                  src={author.image ?? '/user-default.jpg'}
                  width={40}
                  height={40}
                  alt={author.username}
                  className='reply__author--img'
                />
              )}
            </Link>
          </div>
          <div className='reply__content'>
            <div className='reply__wrapper'>
              <div className='reply__wrapper--time'>
                <time dateTime={createdAt} aria-label={formattedDate}>
                  {formattedDate}
                </time>
                {currentUser &&
                  hasUpdated &&
                  authorId !== (userId as string) && (
                    <span aria-label='Edited'>(Edited)</span>
                  )}
              </div>
              <div>
                <button
                  type='button'
                  onClick={onToggleReply}
                  aria-label={replyBtnLabel}
                  className={replyBtnClasses}
                >
                  <ShareIcon label='Reply icon' />
                  <span>{replyBtnLabel}</span>
                </button>
              </div>
            </div>
            <div className='reply__content--user'>
              <h6 className='reply__content--username'>
                <Link to={url} aria-label={author.name}>
                  {author.name}
                </Link>
              </h6>
              <Badge role={author.role} />
            </div>
            <p
              onClick={handleCollapse}
              onDoubleClick={handleCopy}
              aria-label={contentLabel}
              className='reply__content--text'
            >
              {contentLabel}
              <button
                type='button'
                onClick={handleClick}
                aria-label={btnLabel}
                className={btnClasses}
              >
                {btnLabel}
              </button>
            </p>
          </div>
        </div>
        <div className='reply__actions'>
          <CommentReplyAction
            size='sm'
            url={replyUrl}
            title='Check out this reply'
            text={excerpts(content, 80)}
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
              aria-label={isShow ? 'Open menu' : 'Close menu'}
              className={actionBtnClasses}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6'
              >
                <path
                  fillRule='evenodd'
                  d='M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          )}
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
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onMute={handleMute}
            onReport={handleReport}
          />
        </div>
        <ReplyForm
          isOpen={isOpen}
          isEditing={isEditing}
          content={value}
          username={author.username}
          editId={editId}
          isLoading={updateReplyMutation.isPending}
          onChange={setValue}
          onCancel={onCancelHandler}
          onSubmit={handleSubmit}
        />
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
