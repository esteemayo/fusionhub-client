import millify from 'millify';
import { useMemo } from 'react';

import DislikeIcon from '../DislikeIcon';

import { CommentDislikeButtonProps } from '../../types';

import './CommentDislikeButton.scss';

const CommentDislikeButton = ({
  size,
  count,
  hasDisliked,
  isLoading,
  onDislike,
}: CommentDislikeButtonProps) => {
  const dislikeBtnClasses = useMemo(() => {
    return size === 'sm'
      ? 'comment-dislike-button small'
      : 'comment-dislike-button';
  }, [size]);

  return (
    <button
      type='button'
      onClick={onDislike}
      className={dislikeBtnClasses}
      disabled={isLoading}
    >
      <DislikeIcon disliked={hasDisliked} />
      {count > 0 && <span>{millify(count)}</span>}
    </button>
  );
};

export default CommentDislikeButton;
