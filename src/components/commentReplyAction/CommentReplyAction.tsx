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

  return (
    <div className='comment-reply-action'>
      <CommentLikeButton
        size={size}
        count={likeCount}
        hasLiked={liked || isLiked}
        isLoading={likeMutation.isPending}
        onLike={handleLike}
      />
      <CommentDislikeButton
        size={size}
        count={dislikeCount}
        hasDisliked={disliked || isDisliked}
        isLoading={dislikeMutation.isPending}
        onDislike={handleDislike}
      />
      <ShareComment url={url} size={size} text={text} title={title} />
    </div>
  );
};

export default CommentReplyAction;
