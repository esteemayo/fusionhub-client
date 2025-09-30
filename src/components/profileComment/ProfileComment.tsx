import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import Image from '../Image';
import GoogleImage from '../GoogleImage';

import ProfileAction from '../profileAction/ProfileAction';
import Badge from '../badge/Badge';
import CommentReplyAction from '../commentReplyAction/CommentReplyAction';

import { useLikeComment } from '../../hooks/useLikeComment';
import { useDate } from '../../hooks/useDate';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as commentModal from '../../features/commentModal/commentModalSlice';
import * as replyCommentModal from '../../features/replyCommentModal/replyCommentModalSlice';

import { ProfileCommentProps } from '../../types';
import { excerpts } from '../../utils';
import { getPostById } from '../../services/postService';

import './ProfileComment.scss';

const fetchPostById = async (postId: string) => {
  const { data } = await getPostById(postId);
  return data;
};

const ProfileComment = ({
  _id: commentId,
  author,
  content,
  post,
  likes,
  dislikes,
  likeCount,
  dislikeCount,
  createdAt,
  activeCardId,
  onChangeCardId,
}: ProfileCommentProps) => {
  const dispatch = useAppDispatch();

  const { formattedDate } = useDate(createdAt);
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const queryKey = ['comments'];

  const {
    isLiked,
    isDisliked,
    likeCommentMutation,
    dislikeCommentMutation,
    handleLike,
    handleDislike,
  } = useLikeComment(commentId, likes, dislikes, queryKey);

  const { data } = useQuery({
    queryKey: ['post', post._id],
    queryFn: () => fetchPostById(post._id),
    enabled: !!post._id,
  });

  const [isMore, setIsMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const commentUrl = `${window.location.origin}/post/${data?.slug}#comment-${commentId}`;

  const handleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(replyCommentModal.setPostId(post._id));
    dispatch(replyCommentModal.onOpen());
    dispatch(replyCommentModal.setCommentId(commentId));
  };

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

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsOpen((value) => {
      if (value) {
        onChangeCardId(null);
        return false;
      } else {
        onChangeCardId(commentId);
        return true;
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(replyCommentModal.setContent(content));
    dispatch(replyCommentModal.onOpen());
    dispatch(replyCommentModal.setPostId(post._id));
    dispatch(replyCommentModal.setIsEditing());
    dispatch(replyCommentModal.setCommentId(commentId));

    handleClose();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(commentModal.setPostId(post._id));
    dispatch(commentModal.onOpen());
    dispatch(commentModal.setCommentId(commentId));

    handleClose();
  };

  const replyBtnClasses = useMemo(() => {
    return currentUser
      ? 'profile-comment__box--reply-btn show'
      : 'profile-comment__box--reply-btn hide';
  }, [currentUser]);

  const contentLabel = useMemo(() => {
    return isMore && content.length > 200 ? content : excerpts(content, 200);
  }, [content, isMore]);

  const btnClasses = useMemo(() => {
    return content.length > 200
      ? 'profile-comment__info--btn show'
      : 'profile-comment__info--btn hide';
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

  const isCommentAuthor = useMemo(() => {
    return author?._id === userId;
  }, [author?._id, userId]);

  const isPostAuthor = useMemo(() => {
    return post?.author._id === userId;
  }, [post?.author._id, userId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsOpen(activeCardId === commentId);
  }, [activeCardId, commentId]);

  return (
    <article className='profile-comment'>
      <div className='profile-comment__container'>
        <div className='profile-comment__cover'>
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
              width={60}
              height={60}
              alt={author.username}
              className='profile-comment__cover--img'
            />
          )}
        </div>
        <div className='profile-comment__wrapper'>
          <div className='profile-comment__box'>
            <time dateTime={createdAt} className='profile-comment__box--time'>
              {formattedDate}
            </time>
            <button
              type='button'
              onClick={handleReply}
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
              <span>Reply</span>
            </button>
          </div>
          <div className='profile-comment__info'>
            <div className='profile-comment__info--author'>
              <span className='profile-comment__info--name' title={author.name}>
                {author.name}
              </span>
              <Badge role={author.role} />
            </div>
            <p
              className='profile-comment__info--content'
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
          <div className='profile-comment__wrap'>
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
            <ProfileAction
              type='comment'
              authorRole={author?.role}
              currentUser={currentUser}
              isAdmin={isAdmin}
              isOpen={isOpen}
              isCommentAuthor={isCommentAuthor}
              isPostAuthor={isPostAuthor}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileComment;
