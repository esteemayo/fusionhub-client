import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

import Badge from '../badge/Badge';
import Image from '../Image';
import GoogleImage from '../GoogleImage';

import HeartButton from '../heartButton/HeartButton';
import ReplyAction from '../replyAction/ReplyAction';

import { useLikeReply } from '../../hooks/useLikeReply';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { ReplyProps } from '../../types';
import { excerpts } from '../../utils';
import * as commentModal from '../../features/commentModal/commentModalSlice';

import './Reply.scss';

const Reply = ({ reply, isDisabled, onUpdate }: ReplyProps) => {
  const dispatch = useAppDispatch();

  const {
    _id: replyId,
    author,
    comment,
    post,
    content,
    likes,
    likeCount,
    createdAt,
    updatedAt,
  } = reply;

  const { formattedDate } = useDate(createdAt);
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const commentId = useMemo(() => {
    return comment._id;
  }, [comment._id]);

  const queryKey = ['replies', commentId];

  const { isLiked, likeReplyMutation, handleLike } = useLikeReply(
    replyId,
    likes,
    queryKey
  );

  const [isMore, setIsMore] = useState(false);

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

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    onUpdate(content, replyId);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    dispatch(commentModal.onOpen());
    dispatch(commentModal.setPostId(post._id));
    dispatch(commentModal.setReplyId(replyId));
  };

  const hasUpdated = useMemo(() => {
    return new Date(createdAt).getTime() < new Date(updatedAt).getTime();
  }, [createdAt, updatedAt]);

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
    return comment?.author._id === userId;
  }, [comment?.author._id, userId]);

  const isPostAuthor = useMemo(() => {
    return post?.author._id === userId;
  }, [post?.author._id, userId]);

  return (
    <div className='reply'>
      <div className='reply__container'>
        <div className='reply__author'>
          <Link to={url}>
            {author.fromGoogle && author.image?.startsWith('https') ? (
              <GoogleImage
                src={author.image ?? '/user-default.jpg'}
                width={40}
                height={40}
                className='reply__author--img'
              />
            ) : (
              <Image
                src={author.image ?? '/user-default.jpg'}
                width={40}
                height={40}
                alt='avatar'
                className='reply__author--img'
              />
            )}
          </Link>
        </div>
        <div className='reply__content'>
          <div className='reply__content--time'>
            <time dateTime={createdAt}>{formattedDate}</time>
            {currentUser && hasUpdated && author._id !== userId && (
              <span>(Edited)</span>
            )}
          </div>
          <div className='reply__content--user'>
            <h6 className='reply__content--username'>
              <Link to={url}>{author.name}</Link>
            </h6>
            <Badge role={author.role} />
          </div>
          <p onClick={handleCollapse} className='reply__content--text'>
            {contentLabel}
            <button type='button' className={btnClasses} onClick={handleClick}>
              {btnLabel}
            </button>
          </p>
        </div>
      </div>
      <div className='reply__actions'>
        <HeartButton
          size='sm'
          count={likeCount}
          hasLiked={isLiked}
          isLoading={likeReplyMutation.isPending}
          onLike={handleLike}
        />
        <ReplyAction
          authorRole={author.role}
          commentAuthorRole={comment.author.role}
          currentUser={currentUser}
          postAuthorRole={post.author.role}
          isAdmin={isAdmin}
          isCommentAuthor={isCommentAuthor}
          isPostAuthor={isPostAuthor}
          isReplyAuthor={isReplyAuthor}
          isDisabled={isDisabled}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Reply;
