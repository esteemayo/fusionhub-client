import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from '../Image';
import GoogleImage from '../GoogleImage';

import Badge from '../badge/Badge';
import ReplyForm from '../replyForm/ReplyForm';

import ProfileAction from '../profileAction/ProfileAction';
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
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

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
        {
          onSuccess: handleCancel,
        }
      );
    } else {
      const replyObj = {
        content: value,
        comment: comment._id,
        post: post._id,
        parentReplyId: replyId,
      };

      replyTreeMutation.mutate(replyObj, {
        onSuccess: handleCancel,
      });
    }
  };

  const hasUpdated = useMemo(() => {
    return new Date(createdAt).getTime() < new Date(updatedAt).getTime();
  }, [createdAt, updatedAt]);

  const replyBtnClasses = useMemo(() => {
    return currentUser
      ? 'profile-reply__box--reply-btn show'
      : 'profile-reply__box--reply-btn hide';
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
      ? 'profile-reply__info--btn show'
      : 'profile-reply__info--btn hide';
  }, [content]);

  const btnLabel = useMemo(() => {
    return isMore ? undefined : 'more';
  }, [isMore]);

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser?.details._id]);

  const authorId = useMemo(() => {
    return author._id;
  }, [author._id]);

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser?.role]);

  const isReplyAuthor = useMemo(() => {
    return author?._id === userId;
  }, [author?._id, userId]);

  const isCommentAuthor = useMemo(() => {
    return comment?.author._id === userId;
  }, [comment?.author._id, userId]);

  const isPostAuthor = useMemo(() => {
    return post?.author._id === userId;
  }, [post?.author._id, userId]);

  const isBlocked = useMemo(() => {
    return (blockedUsers ?? []).some((user) => user.id === authorId) || false;
  }, [authorId, blockedUsers]);

  const coverClasses = useMemo(() => {
    return isBlocked
      ? 'profile-reply__cover--img blurred'
      : 'profile-reply__cover--img';
  }, [isBlocked]);

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
  }, [handleCancel, isOpen, isShow]);

  useEffect(() => {
    setIsShow(activeCardId === replyId);
  }, [activeCardId, replyId]);

  return (
    <article className='profile-reply'>
      <div className='profile-reply__container'>
        <div className='profile-reply__cover'>
          {author.fromGoogle && author.image?.startsWith('https') ? (
            <GoogleImage
              src={author.image ?? '/user-default.jpg'}
              width={80}
              height={80}
              alt={author.username}
              className={coverClasses}
            />
          ) : (
            <Image
              src={author.image ?? '/user-default.jpg'}
              width={60}
              height={60}
              alt={author.username}
              className={coverClasses}
            />
          )}
        </div>
        <div className='profile-reply__wrapper'>
          <div className='profile-reply__box'>
            <div className='profile-reply__date'>
              <time
                dateTime={createdAt}
                aria-label={formattedDate}
                className='profile-reply__date--time'
              >
                {formattedDate}
              </time>
              {currentUser && hasUpdated && authorId !== (userId as string) && (
                <span
                  aria-label='Edited'
                  className='profile-reply__date--status'
                >
                  (Edited)
                </span>
              )}
            </div>
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
          <div className='profile-reply__info'>
            <div className='profile-reply__info--author'>
              <span
                title={author.name}
                aria-label={author.name}
                className='profile-reply__info--name'
              >
                {author.name}
              </span>
              <Badge role={author.role} />
            </div>
            <p
              onClick={handleCollapse}
              aria-label={contentLabel}
              className='profile-reply__info--content'
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
          <div className='profile-reply__wrap'>
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
          <ReplyForm
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
    </article>
  );
};

export default ProfileReply;
