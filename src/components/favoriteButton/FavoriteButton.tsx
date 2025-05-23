import LikeButton from '../LikeButton';
import DislikeButton from '../DislikeButton';

import { FavoriteButtonProps } from '../../types';

import './FavoriteButton.scss';

const FavoriteButton = ({
  likeCount,
  dislikeCount,
  isLiked,
  isDisliked,
  likeMutation,
  disLikeMutation,
  onLike,
  onDislike,
}: FavoriteButtonProps) => {
  return (
    <div className='favorite-button'>
      <LikeButton
        count={likeCount}
        hasLiked={isLiked}
        isLoading={likeMutation.isPending}
        onAction={onLike}
      />
      <DislikeButton
        count={dislikeCount}
        hasDisliked={isDisliked}
        isLoading={disLikeMutation.isPending}
        onAction={onDislike}
      />
    </div>
  );
};

export default FavoriteButton;
