import { useMemo } from 'react';

import { ShareCommentProps } from '../../types';
import { useWebShare } from '../../hooks/useWebShare';

import './ShareComment.scss';

const ShareComment = ({
  url,
  size,
  text,
  type = 'comment',
  title,
}: ShareCommentProps) => {
  const { handleShare } = useWebShare(title, text, url);

  const shareBtnClasses = useMemo(
    () => (size === 'sm' ? 'share-comment small' : 'share-comment'),
    [size]
  );

  return (
    <button
      type='button'
      onClick={handleShare}
      className={shareBtnClasses}
      aria-label={`Share this ${type}`}
      title={`Share ${type}`}
    >
      Share
      <span className='sr-only'>Share comment</span>
    </button>
  );
};

export default ShareComment;
