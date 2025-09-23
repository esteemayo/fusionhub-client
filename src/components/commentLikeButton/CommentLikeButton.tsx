import millify from 'millify';
import { useMemo } from 'react';

import LikeIcon from '../LikeIcon';

import { CommentLikeButtonProps } from '../../types';

import './CommentLikeButton.scss';

const CommentLikeButton = ({
  size,
  count,
  hasLiked,
  isLoading,
  onLike,
}: CommentLikeButtonProps) => {
  const heartBtnClasses = useMemo(() => {
    return size === 'sm' ? 'comment-like-button small' : 'comment-like-button';
  }, [size]);

  return (
    <button
      type='button'
      onClick={onLike}
      className={heartBtnClasses}
      disabled={isLoading}
      aria-disabled={isLoading}
    >
      <LikeIcon liked={hasLiked} />
      {count > 0 && <span>{millify(count)}</span>}
    </button>
  );
};

export default CommentLikeButton;
