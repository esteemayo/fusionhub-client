import { useMemo } from 'react';

import { ShareCommentProps } from '../../types';

import './ShareComment.scss';

const ShareComment = ({ size }: ShareCommentProps) => {
  const shareBtnClasses = useMemo(() => {
    return size === 'sm' ? 'share-comment small' : 'share-comment';
  }, [size]);

  return (
    <button type='button' className={shareBtnClasses}>
      Share
    </button>
  );
};

export default ShareComment;
