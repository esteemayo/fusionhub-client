import DislikeIcon from './DislikeIcon';

import { DislikeButtonProps } from '../types';

const DislikeButton = ({
  count,
  hasDisliked,
  isLoading,
  onAction,
}: DislikeButtonProps) => {
  return (
    <button
      type='button'
      onClick={onAction}
      disabled={isLoading || hasDisliked}
    >
      <DislikeIcon disliked={hasDisliked} />
      <span>{count}</span>
    </button>
  );
};

export default DislikeButton;
