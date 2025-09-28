import { toast } from 'react-toastify';
import { useEffect, useMemo } from 'react';

import { ShareCommentProps } from '../../types';
import { useWebShare } from '../../hooks/useWebShare';

import './ShareComment.scss';

const ShareComment = ({ url, size, text, title }: ShareCommentProps) => {
  const { error, handleShare } = useWebShare(title, text, url);

  const shareBtnClasses = useMemo(() => {
    return size === 'sm' ? 'share-comment small' : 'share-comment';
  }, [size]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <button type='button' onClick={handleShare} className={shareBtnClasses}>
      Share
    </button>
  );
};

export default ShareComment;
