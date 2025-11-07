import { useMemo } from 'react';
import parse from 'html-react-parser';

import ShareIcon from '../icons/ShareIcon';

import { excerpts, stripHtml } from '../../utils';
import { ShareButtonProps } from '../../types';
import { useWebShare } from '../../hooks/useWebShare';

import './ShareButton.scss';

const ShareButton = ({ title, desc, slug }: ShareButtonProps) => {
  const shareUrl = `${window.location.origin}/post/${slug}`;

  const parsedDesc = useMemo(() => {
    return parse(String(desc)).toString();
  }, [desc]);

  const parsedText = excerpts(stripHtml(parsedDesc), 80);

  const { handleShare } = useWebShare(title, parsedText, shareUrl);

  return (
    <div className='share-button'>
      <button
        type='button'
        onClick={handleShare}
        aria-label='Share button'
        className='share-button__btn'
      >
        <ShareIcon />
      </button>
    </div>
  );
};

export default ShareButton;
