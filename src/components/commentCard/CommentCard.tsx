import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Replies from '../replies/Replies';
import Image from '../Image';
import ReplyForm from '../replyForm/ReplyForm';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useReply } from '../../hooks/useReply';
import {
  setCommentId,
  setPostId,
} from '../../features/commentModal/commentModalSlice';

import { excerpts } from '../../utils';
import { CommentCardProps } from '../../types';

import './CommentCard.scss';

const CommentCard = ({
  postAuthorId,
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
  const { data, replyMutation, updateReplyMutation } = useReply(
    postId,
    commentId
  );

  const ref = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [replyId, setReplyId] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied');
    return;
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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

    setIsOpen(false);
    if (isEditing) setIsEditing(false);
    if (value.trim() !== '') setValue('');
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setReadMore((value) => {
      return !value;
    });
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onUpdate?.(commentId);
    onChange(content);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onOpen();
    dispatch(setCommentId(commentId));
    dispatch(setPostId(postId));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const isUpdated = useMemo(() => {
    return new Date(createdAt).getTime() < new Date(updatedAt).getTime();
  }, [createdAt, updatedAt]);

  const contentLabel = useMemo(() => {
    return readMore && content?.length > 200 ? content : excerpts(content, 200);
  }, [content, readMore]);

  const btnClasses = useMemo(() => {
    return content?.length > 200
      ? 'comment-card__details--btn show'
      : 'comment-card__details--btn hide';
  }, [content]);

  const btnLabel = useMemo(() => {
    return `Read ${readMore ? 'less' : 'more'}`;
  }, [readMore]);

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
    return userId === author._id
      ? '/accounts/profile'
      : `/accounts/profile?username=${author.username}`;
  }, [author, userId]);

  const actionBtnClasses = useMemo(() => {
    return userId === authorId || userId === postAuthorId || isAdmin
      ? 'comment-card__btn show'
      : 'comment-card__btn hide';
  }, [authorId, isAdmin, postAuthorId, userId]);

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
                {format(createdAt)}
              </time>
              {currentUser && isUpdated && authorId !== (userId as string) && (
                <span className='comment-card__date--status'>updated</span>
              )}
            </div>
            <button
              type='button'
              className='comment-card__box--reply'
              onClick={handleToggle}
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
                  d='M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5'
                />
              </svg>
              <span>Reply</span>
            </button>
          </div>
          <h5 className='comment-card__details--username'>
            <Link to={url}>{author.name}</Link>
          </h5>
          <p onDoubleClick={handleCopy} className='comment-card__details--desc'>
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
        replies={data}
        postAuthorId={postAuthorId}
        onUpdate={handleUpdateReply}
      />
      <ReplyForm
        content={value}
        isOpen={isOpen}
        isLoading={replyMutation.isPending}
        onChange={setValue}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        ref={ref}
      />
    </article>
  );
};

export default CommentCard;
