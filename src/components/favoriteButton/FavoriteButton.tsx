import { useState } from 'react';

import LikeButton from '../likeButton/LikeButton';
import DislikeButton from '../dislikeButton/DislikeButton';

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
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    if (disliked) setDisliked(false);

    onLike();
  };

  const handleDislike = () => {
    setDisliked((prev) => !prev);
    if (liked) setLiked(false);

    onDislike();
  };

  return (
    <div className='favorite-button'>
      <LikeButton
        count={likeCount}
        hasLiked={liked || isLiked}
        isLoading={likeMutation.isPending}
        onAction={handleLike}
      />
      <DislikeButton
        count={dislikeCount}
        hasDisliked={disliked || isDisliked}
        isLoading={disLikeMutation.isPending}
        onAction={handleDislike}
      />
    </div>
  );
};

export default FavoriteButton;
