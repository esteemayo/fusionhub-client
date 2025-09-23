import CommentLikeButton from '../commentLikeButton/CommentLikeButton';
import ShareComment from '../shareComment/ShareComment';
import CommentDislikeButton from '../commentDislikeButton/CommentDislikeButton';

import { CommentReplyActionProps } from '../../types';

import './CommentReplyAction.scss';

const CommentReplyAction = ({
  size,
  likeCount,
  dislikeCount,
  isLiked,
  isDisliked,
  likeMutation,
  dislikeMutation,
  onLike,
  onDislike,
}: CommentReplyActionProps) => {
  return (
    <div className='comment-reply-action'>
      <CommentLikeButton
        size={size}
        count={likeCount}
        hasLiked={isLiked}
        isLoading={likeMutation.isPending}
        onLike={onLike}
      />
      <CommentDislikeButton
        size={size}
        count={dislikeCount}
        hasDisliked={isDisliked}
        isLoading={dislikeMutation.isPending}
        onDislike={onDislike}
      />
      <ShareComment size={size} />
    </div>
  );
};

export default CommentReplyAction;
