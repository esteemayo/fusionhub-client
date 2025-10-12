import ShareIcon from '../ShareIcon';
import SaveIcon from '../SaveIcon';
import CommentIcon from '../CommentIcon';

import CommentLikeButton from '../commentLikeButton/CommentLikeButton';
import ArticleActionItem from '../articleActionItem/ArticleActionItem';
import CommentDislikeButton from '../commentDislikeButton/CommentDislikeButton';

import { ArticleActionProps } from '../../types';

import './ArticleAction.scss';

const ArticleAction = ({
  comments,
  likeCount,
  dislikeCount,
  savedCount,
  isAdmin,
  isLiked,
  isDisliked,
  isSaved,
  likeMutation,
  disLikeMutation,
  saveMutation,
  onComment,
  onLike,
  onDislike,
  onSave,
  onShare,
}: ArticleActionProps) => {
  return (
    <div className='article-action'>
      <ArticleActionItem
        count={comments.length}
        title='Comment'
        onAction={onComment}
      >
        <CommentIcon />
      </ArticleActionItem>
      <CommentLikeButton
        size='sm'
        title='Like Post'
        count={likeCount}
        hasLiked={isLiked}
        isLoading={likeMutation.isPending}
        onLike={onLike}
      />
      <CommentDislikeButton
        size='sm'
        title='Dislike Post'
        count={dislikeCount}
        hasDisliked={isDisliked}
        isLoading={disLikeMutation.isPending}
        onDislike={onDislike}
      />
      <ArticleActionItem
        count={savedCount}
        title='Save Post'
        isActive={isSaved}
        disabled={saveMutation.isPending || isAdmin}
        onAction={onSave}
      >
        <SaveIcon isLoading={saveMutation.isPending} hasSaved={isSaved} />
      </ArticleActionItem>
      <ArticleActionItem title='Share Post' onAction={onShare}>
        <ShareIcon />
      </ArticleActionItem>
    </div>
  );
};

export default ArticleAction;
