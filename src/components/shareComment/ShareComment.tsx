import { useMemo } from 'react';

import { ShareCommentProps } from '../../types';
import { useWebShare } from '../../hooks/useWebShare';

import './ShareComment.scss';

const ShareComment = ({ url, size, text, title }: ShareCommentProps) => {
  const { handleShare } = useWebShare(title, text, url);

  const shareBtnClasses = useMemo(() => {
    return size === 'sm' ? 'share-comment small' : 'share-comment';
  }, [size]);

  return (
    <button
      type='button'
      title='Share'
      onClick={handleShare}
      className={shareBtnClasses}
    >
      Share
    </button>
  );
};

export default ShareComment;
