import ShareIcon from '../icons/ShareIcon';
import SaveIcon from '../icons/SaveIcon';
import CommentIcon from '../icons/CommentIcon';

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
    <div
      className='article-action'
      role='group'
      aria-label='Post actions: comment, like, dislike, save, share'
    >
      <ArticleActionItem
        count={comments.length}
        title='Comment'
        aria-label='Open comments section'
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
        aria-label={`${isLiked ? 'Unlike' : 'Like'} post`}
        onLike={onLike}
      />
      <CommentDislikeButton
        size='sm'
        title='Dislike Post'
        count={dislikeCount}
        hasDisliked={isDisliked}
        isLoading={disLikeMutation.isPending}
        aria-label={`${isDisliked ? 'Remove dislike from' : 'Dislike'} post`}
        onDislike={onDislike}
      />
      <ArticleActionItem
        count={savedCount}
        title='Save Post'
        isActive={isSaved}
        disabled={saveMutation.isPending || isAdmin}
        aria-label={
          isSaved ? 'Remove from saved posts' : 'Save post to your list'
        }
        onAction={onSave}
      >
        <SaveIcon isLoading={saveMutation.isPending} hasSaved={isSaved} />
      </ArticleActionItem>
      <ArticleActionItem
        title='Share Post'
        aria-label='Share this post'
        onAction={onShare}
      >
        <ShareIcon />
      </ArticleActionItem>
    </div>
  );
};

export default ArticleAction;
