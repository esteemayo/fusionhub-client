import { useMemo, useState } from 'react';

import Image from '../Image';
import Badge from '../badge/Badge';

import HeartButton from '../commentLikeButton/CommentLikeButton';
import ProfileAction from '../profileAction/ProfileAction';

import { useLikeReply } from '../../hooks/useLikeReply';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as commentModal from '../../features/commentModal/commentModalSlice';
import * as replyCommentModal from '../../features/replyCommentModal/replyCommentModalSlice';

import { excerpts } from '../../utils';
import { ProfileReplyProps } from '../../types';

import './ProfileReply.scss';

const ProfileReply = ({
  _id: replyId,
  author,
  content,
  comment,
  post,
  likes,
  likeCount,
  createdAt,
}: ProfileReplyProps) => {
  const dispatch = useAppDispatch();

  const { formattedDate } = useDate(createdAt);
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const queryKey = ['replies'];

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

    dispatch(replyCommentModal.setContent(content));
    dispatch(replyCommentModal.onOpen());
    dispatch(replyCommentModal.setReplyId(replyId));
    dispatch(replyCommentModal.setIsEditing());
    dispatch(replyCommentModal.setCommentId(comment._id));
    dispatch(replyCommentModal.setPostId(post._id));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(commentModal.setReplyId(replyId));
    dispatch(commentModal.onOpen());
    dispatch(commentModal.setCommentId(comment._id));
    dispatch(commentModal.setPostId(post._id));
  };

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

  return (
    <article className='profile-reply'>
      <div className='profile-reply__container'>
        <div className='profile-reply__cover'>
          <Image
            src={author.image ?? '/user-default.jpg'}
            width={60}
            height={60}
            alt='avatar'
            className='profile-reply__cover--img'
          />
        </div>
        <div className='profile-reply__wrapper'>
          <div className='profile-reply__box'>
            <time dateTime={createdAt} className='profile-reply__box--time'>
              {formattedDate}
            </time>
          </div>
          <div className='profile-reply__info'>
            <div className='profile-reply__info--author'>
              <span className='profile-reply__info--name'>{author.name}</span>
              <Badge role={author.role} />
            </div>
            <p
              className='profile-reply__info--content'
              onClick={handleCollapse}
            >
              {contentLabel}
              <button
                type='button'
                onClick={handleClick}
                className={btnClasses}
              >
                {btnLabel}
              </button>
            </p>
          </div>
          <div className='profile-reply__wrap'>
            <HeartButton
              count={likeCount}
              hasLiked={isLiked}
              isLoading={likeReplyMutation.isPending}
              onLike={handleLike}
            />
            <ProfileAction
              type='reply'
              authorRole={author?.role}
              currentUser={currentUser}
              isAdmin={isAdmin}
              isCommentAuthor={isCommentAuthor}
              isPostAuthor={isPostAuthor}
              isReplyAuthor={isReplyAuthor}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileReply;
