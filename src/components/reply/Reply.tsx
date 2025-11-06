import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Badge from '../badge/Badge';
import Image from '../Image';
import GoogleImage from '../GoogleImage';

import ReplyForm from '../replyForm/ReplyForm';
import ReplyMenu from '../ReplyMenu';
import CommentReplyAction from '../commentReplyAction/CommentReplyAction';

import { useMute } from '../../hooks/useMute';
import { useReply } from '../../hooks/useReply';

import { useLikeReply } from '../../hooks/useLikeReply';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as reportModal from '../../features/reportModal/reportModalSlice';
import * as muteModal from '../../features/muteModal/muteModalSlice';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import { excerpts } from '../../utils';
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
      ? 'Hide reply'
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

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
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
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-label='Reply'
                    aria-hidden='true'
                    width='20'
                    height='20'
                    role='img'
                    className='size-6'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M14.4826 0.710819L23.3186 8.30424L23.3453 8.33094C24.1851 9.17074 24.2698 10.5407 23.29 11.3814M23.289 11.3823L14.4683 18.9625C13.8701 19.4753 12.968 19.8927 12.0942 19.4328C11.2639 18.9958 11.0258 18.0483 11.0258 17.2385V15.2064H9.84349C6.58352 15.8322 4.45041 18.793 3.04135 22.3389C2.96776 22.5522 2.86116 22.7801 2.70055 22.9761C2.54223 23.1693 2.21975 23.4586 1.73218 23.4586C1.22248 23.4586 0.893783 23.1456 0.734191 22.9203C0.577052 22.6985 0.491014 22.4466 0.440439 22.2244C0.146878 21.0463 0 19.8659 0 18.6167C0 11.8688 4.3852 6.2531 11.0258 4.76886V2.35363C11.0258 1.56469 11.2714 0.626894 12.0942 0.193849C12.9756 -0.270092 13.8781 0.156293 14.4826 0.710819M13.0426 2.10923C13.0327 2.17428 13.0258 2.2552 13.0258 2.35363V6.4396L12.1902 6.57886C6.06514 7.59972 2 12.5506 2 18.6167C2 18.9793 2.01414 19.3342 2.04243 19.6841C3.58264 16.6438 5.93899 13.8714 9.57597 13.222L9.66318 13.2064H13.0258V17.2385C13.0258 17.3631 13.0353 17.4613 13.0482 17.5365C13.0829 17.5123 13.1223 17.4821 13.1663 17.4444L21.9864 9.86459L21.9874 9.86375C21.9934 9.85865 21.9972 9.85464 21.9995 9.85188L21.9991 9.84963C21.9982 9.84534 21.9923 9.82926 21.9923 9.82926C21.9859 9.81454 17.024 5.52745 17 5.5L13.1512 2.20366L13.1371 2.19057C13.103 2.15892 13.0714 2.13201 13.0426 2.10923ZM2.40429 21.8297L2.40356 21.8278L2.40429 21.8297Z'
                    />
                  </svg>
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
          editId={editId}
          isLoading={updateReplyMutation.isPending}
          onChange={setValue}
          onCancel={onCancelHandler}
          onSubmit={handleSubmit}
        />
      </article>
      {replies?.map((reply) => {
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
