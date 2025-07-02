import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useRef, useState } from 'react';

import Replies from '../replies/Replies';
import ReplyForm from '../replyForm/ReplyForm';

import Image from '../Image';
import Badge from '../badge/Badge';

import { useReply } from '../../hooks/useReply';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { CommentCardProps } from '../../types';
import { excerpts } from '../../utils';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import './CommentCard.scss';

const CommentCard = ({
  postAuthorId,
  editId,
  editing,
  comment,
  onChange,
  onUpdate,
  onOpen,
}: CommentCardProps) => {
  const {
    _id: commentId,
    author,
    content,
    post: postId,
    createdAt,
    updatedAt,
  } = comment;

  const dispatch = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));
  const { formattedDate } = useDate(createdAt);
  const { data, replyMutation, updateReplyMutation } = useReply(
    postId,
    commentId
  );

  const ref = useRef<HTMLTextAreaElement>(null);

  const [replies, setReplies] = useState(data);
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [replyId, setReplyId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [replyToShow, setReplyToShow] = useState(3);
  const [isMore, setIsMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCollapse = () => {
    if (isMore) {
      setIsMore(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied');
    return;
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    if (isEditing && replyId) return;

    setIsOpen((value) => {
      return !value;
    });
  };

  const handleUpdateReply = (content: string, replyId: string) => {
    setValue(content);
    setReplyId(replyId);

    setIsOpen(true);
    setIsEditing(true);

    const current = ref.current;
    current?.focus();
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    setIsOpen(false);
    if (isEditing) setIsEditing(false);
    if (value.trim() !== '') setValue('');
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

    onUpdate?.(commentId);
    onChange(content);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    onOpen();
    dispatch(commentModal.setCommentId(commentId));
    dispatch(commentModal.setPostId(postId));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    if (value.trim() !== '') {
      if (isEditing) {
        updateReplyMutation.mutate(
          { content: value, replyId },
          {
            onSuccess: () => {
              setValue('');
              setIsOpen(false);
              setReplyId('');
              setIsEditing(false);
            },
          }
        );
        return;
      } else {
        replyMutation.mutate(value, {
          onSuccess: () => {
            setValue('');
            setIsOpen(false);
          },
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
    return author._id;
  }, [author]);

  const url = useMemo(() => {
    return currentUser
      ? userId === author._id
        ? '/accounts/profile'
        : `/accounts/profile?username=${author.username}`
      : `/posts?author=${author.username}`;
  }, [author, currentUser, userId]);

  const actionBtnClasses = useMemo(() => {
    return userId === authorId || userId === postAuthorId || isAdmin
      ? 'comment-card__btn show'
      : 'comment-card__btn hide';
  }, [authorId, isAdmin, postAuthorId, userId]);

  const isDisabled = useMemo(() => {
    return editing && editId === commentId;
  }, [commentId, editId, editing]);

  const isPending = useMemo(() => {
    return replyMutation.isPending || updateReplyMutation.isPending;
  }, [replyMutation.isPending, updateReplyMutation.isPending]);

  useEffect(() => {
    if (data) {
      setReplies(data);
    }
  }, [data]);

  return (
    <article className='comment-card'>
      <div className='comment-card__container'>
        <div className='comment-card__user'>
          <Link to={url}>
            <Image
              src={author.image ?? '/user-default.jpg'}
              width={80}
              height={80}
              alt='avatar'
              className='comment-card__user--img'
            />
          </Link>
        </div>
        <div className='comment-card__details'>
          <div className='comment-card__box'>
            <div className='comment-card__date'>
              <time dateTime={createdAt} className='comment-card__date--time'>
                {formattedDate}
              </time>
              {currentUser && isUpdated && authorId !== (userId as string) && (
                <span className='comment-card__date--status'>updated</span>
              )}
            </div>
            <button
              type='button'
              className={replyBtnClasses}
              onClick={handleToggle}
              disabled={isDisabled}
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
              <span>Reply</span>
            </button>
          </div>
          <div className='comment-card__details--info'>
            <h5 className='comment-card__details--username'>
              <Link to={url}>{author.name}</Link>
            </h5>
            <Badge role={author.role} />
          </div>
          <p
            onClick={handleCollapse}
            onDoubleClick={handleCopy}
            className='comment-card__details--desc'
          >
            {contentLabel}
            <button type='button' onClick={handleClick} className={btnClasses}>
              {btnLabel}
            </button>
          </p>
        </div>
      </div>
      <div className={actionBtnClasses}>
        <button
          type='button'
          className='comment-card__btn--edit'
          onClick={handleUpdate}
          disabled={isDisabled || isOpen}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
            />
          </svg>
        </button>
        <button
          type='button'
          className='comment-card__btn--delete'
          onClick={handleDelete}
          disabled={isDisabled || isOpen}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
            />
          </svg>
        </button>
      </div>
      <Replies
        replyId={replyId}
        replies={replies}
        postAuthorId={postAuthorId}
        replyToShow={replyToShow}
        isLoading={isLoading}
        isEditing={isEditing}
        onClick={handleMoreReplies}
        onUpdate={handleUpdateReply}
      />
      <ReplyForm
        content={value}
        replyId={replyId}
        isOpen={isOpen}
        isLoading={isPending}
        isEditing={isEditing}
        onChange={setValue}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        ref={ref}
      />
    </article>
  );
};

export default CommentCard;
