import millify from 'millify';

import DislikeIcon from './DislikeIcon';

import { DislikeButtonProps } from '../types';

const DislikeButton = ({
  count,
  hasDisliked,
  isLoading,
  onAction,
}: DislikeButtonProps) => {
  return (
    <button type='button' onClick={onAction} disabled={isLoading}>
      <DislikeIcon disliked={hasDisliked} />
      <span>{millify(count)}</span>
    </button>
  );
};

export default DislikeButton;
