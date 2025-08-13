import millify from 'millify';

import LikeIcon from './LikeIcon';

import { LikeButtonProps } from '../types';

const LikeButton = ({
  count,
  hasLiked,
  isLoading,
  onAction,
}: LikeButtonProps) => {
  return (
    <button type='button' onClick={onAction} disabled={isLoading}>
      <LikeIcon liked={hasLiked} />
      {count > 0 && <span>{millify(count)}</span>}
    </button>
  );
};

export default LikeButton;
