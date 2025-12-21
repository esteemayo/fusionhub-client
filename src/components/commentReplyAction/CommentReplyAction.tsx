import { useState } from 'react';

import CommentLikeButton from '../commentLikeButton/CommentLikeButton';
import ShareComment from '../shareComment/ShareComment';
import CommentDislikeButton from '../commentDislikeButton/CommentDislikeButton';

import { CommentReplyActionProps } from '../../types';

import './CommentReplyAction.scss';

const CommentReplyAction = ({
  url,
  size,
  text,
  type,
  title,
  likeCount,
  dislikeCount,
  isLiked,
  isDisliked,
  likeMutation,
  dislikeMutation,
  onLike,
  onDislike,
}: CommentReplyActionProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setLiked((prev) => !prev);
    if (disliked) setDisliked(false);

    onLike(e);
  };

  const handleDislike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setDisliked((prev) => !prev);
    if (liked) setLiked(false);

    onDislike(e);
  };

  const btnTitle = typeof title === 'string' && title.split(' ').pop();

  return (
    <div className='comment-reply-action'>
      <CommentLikeButton
        size={size}
        count={likeCount}
        title={`Like ${btnTitle}`}
        hasLiked={liked || isLiked}
        isLoading={likeMutation.isPending}
        aria-label={`${isLiked ? 'Unlike' : 'Like'} ${btnTitle}`}
        onLike={handleLike}
      />

      <CommentDislikeButton
        size={size}
        count={dislikeCount}
        title={`Dislike ${btnTitle}`}
        hasDisliked={disliked || isDisliked}
        isLoading={dislikeMutation.isPending}
        aria-label={`${
          isDisliked ? 'Remove dislike from' : 'Dislike'
        } ${btnTitle}`}
        onDislike={handleDislike}
      />

      <ShareComment
        url={url}
        size={size}
        text={text}
        type={type}
        title={title}
      />
    </div>
  );
};

export default CommentReplyAction;
