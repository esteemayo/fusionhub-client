import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Replies from '../replies/Replies';
import ReplyCommentForm from '../replyCommentForm/ReplyCommentForm';

import Image from '../Image';
import GoogleImage from '../GoogleImage';

import CommentActionMenu from '../commentActionMenu/CommentActionMenu';
import Badge from '../badge/Badge';
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
import {
  CommentCardProps,
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
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { mutedList } = useMute();
  const { formattedDate } = useDate(createdAt);

  const isMuted = useMemo(() => {
    return (
      !!(mutedList?.mutedComments ?? []).some(
        (comment) => comment === commentId
      ) || false
    );
  }, [commentId, mutedList?.mutedComments]);

  const postId = useMemo(() => {
    return post._id;
  }, [post._id]);

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

  const [replyToShow, setReplyToShow] = useState(3);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isShow, setIsShow] = useState(false);
  const [replies, setReplies] = useState<ReplyType[] | [] | undefined>();

  const commentUrl = `${window.location.origin}/post/${slug}#comment-${commentId}`;

  const toggleActionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

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

  const handleCollapse = () => {
    if (isMore) {
      setIsMore(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
    return;
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMore((value) => {
      return !value;
    });
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
      targetType: 'comment',
      targetId: commentId,
    };

    dispatch(reportModal.onOpen(payload));
    handleClose();
  };

  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const payload: MutePayload = {
      targetType: 'comment',
      targetId: commentId,
      action: isMuted ? 'unmute' : 'mute',
    };

    dispatch(muteModal.onOpen(payload));
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!currentUser) return;

    if (value.trim() !== '') {
      if (isEditing && editId) {
        updateCommentMutation.mutate(
          { content: value, commentId },
          {
            onSuccess: onCancelHandler,
          }
        );
      } else {
        replyMutation.mutate(value, {
          onSuccess: onCancelHandler,
        });
      }
    }
  };

  const handleMoreReplies = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsLoading(true);

    setTimeout(() => {
      setReplyToShow((value) => {
        return value + 3;
      });

      setIsLoading(false);
    }, 1000);
  };

  const isUpdated = useMemo(() => {
    return new Date(createdAt).getTime() < new Date(updatedAt).getTime();
  }, [createdAt, updatedAt]);

  const replyBtnClasses = useMemo(() => {
    return currentUser
      ? 'comment-card__box--reply show'
      : 'comment-card__box--reply hide';
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
    return isMore && content?.length > 200 ? content : excerpts(content, 200);
  }, [content, isMore]);

  const btnClasses = useMemo(() => {
    return content?.length > 200
      ? 'comment-card__details--btn show'
      : 'comment-card__details--btn hide';
  }, [content]);

  const btnLabel = useMemo(() => {
    return isMore ? undefined : 'more';
  }, [isMore]);

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser]);

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser]);

  const authorId = useMemo(() => {
    return author?._id;
  }, [author?._id]);

  const postAuthorId = useMemo(() => {
    return post?.author?._id;
  }, [post?.author?._id]);

  const isCommentAuthor = useMemo(() => {
    return author?._id === userId;
  }, [author?._id, userId]);

  const isPostAuthor = useMemo(() => {
    return postAuthorId === userId;
  }, [postAuthorId, userId]);

  const url = useMemo(() => {
    return currentUser
      ? userId === author?._id
        ? '/accounts/profile'
        : `/accounts/profile?username=${author?.username}`
      : `/posts?author=${author?.username}`;
  }, [author?._id, author?.username, currentUser, userId]);

  const actionBtnClasses = useMemo(() => {
    return !currentUser
      ? 'comment-card__actions--btn hide'
      : 'comment-card__actions--btn show';
  }, [currentUser]);

  const isPending = useMemo(() => {
    return replyMutation.isPending || updateCommentMutation.isPending;
  }, [replyMutation.isPending, updateCommentMutation.isPending]);

  useEffect(() => {
    if (!data) return;

    const sortedData = data.sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );

    setReplies(sortedData);
  }, [data]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isShow) {
          handleClose();
        } else if (isOpen) {
          onCancelHandler();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isShow, onCancelHandler]);

  useEffect(() => {
    setIsShow(activeCardId === commentId);
  }, [activeCardId, commentId]);

  return (
    <article id={`comment-${commentId}`} className='comment-card'>
      <div className='comment-card__container'>
        <div className='comment-card__user'>
          <Link to={url} aria-label={url}>
            {author.fromGoogle && author.image?.startsWith('https') ? (
              <GoogleImage
                src={author.image ?? '/user-default.jpg'}
                width={80}
                height={80}
                alt={author.username}
                className='comment-card__user--img'
              />
            ) : (
              <Image
                src={author.image ?? '/user-default.jpg'}
                width={80}
                height={80}
                alt={author.username}
                className='comment-card__user--img'
              />
            )}
          </Link>
        </div>
        <div className='comment-card__details'>
          <div className='comment-card__box'>
            <div className='comment-card__date'>
              <time
                dateTime={createdAt}
                aria-label={formattedDate}
                className='comment-card__date--time'
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
          <div className='comment-card__details--info'>
            <h5 className='comment-card__details--username'>
              <Link to={url} aria-label={author.name}>
                {author.name}
              </Link>
            </h5>
            <Badge role={author.role} />
          </div>
          <p
            onClick={handleCollapse}
            onDoubleClick={handleCopy}
            aria-label={contentLabel}
            className='comment-card__details--desc'
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
      <div className='comment-card__actions'>
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
        <button
          type='button'
          onClick={toggleActionHandler}
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
      <Replies
        slug={slug}
        activeCardId={activeCardId}
        replyLists={replies}
        replyToShow={replyToShow}
        isLoading={isLoading}
        onChangeActiveCardId={onChangeActiveCardId}
        onClick={handleMoreReplies}
      />
    </article>
  );
};

export default CommentCard;
