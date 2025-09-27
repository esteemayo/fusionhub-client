import { useMemo } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/shareModal/shareModalSlice';

import { ShareCommentProps } from '../../types';

import './ShareComment.scss';

const ShareComment = ({ url, size, text, title }: ShareCommentProps) => {
  const dispatch = useAppDispatch();

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });

        toast.success('Shared successfully!');
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      dispatch(onOpen());
    }
  };

  const shareBtnClasses = useMemo(() => {
    return size === 'sm' ? 'share-comment small' : 'share-comment';
  }, [size]);

  return (
    <button type='button' onClick={handleShare} className={shareBtnClasses}>
      Share
    </button>
  );
};

export default ShareComment;
