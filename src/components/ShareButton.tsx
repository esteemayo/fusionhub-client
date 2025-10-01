import { toast } from 'react-toastify';
import parse from 'html-react-parser';
import { useEffect, useMemo } from 'react';

import ShareIcon from './ShareIcon';

import { excerpts, stripHtml } from '../utils';
import { ShareButtonProps } from '../types';
import { useWebShare } from '../hooks/useWebShare';

const ShareButton = ({ title, desc, slug }: ShareButtonProps) => {
  const shareUrl = `${window.location.origin}/post/${slug}`;

  const parsedDesc = useMemo(() => {
    return parse(String(desc)).toString();
  }, [desc]);

  const parsedText = excerpts(stripHtml(parsedDesc), 80);

  const { error, handleShare } = useWebShare(title, parsedText, shareUrl);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <button type='button' onClick={handleShare}>
      <ShareIcon />
    </button>
  );
};

export default ShareButton;
