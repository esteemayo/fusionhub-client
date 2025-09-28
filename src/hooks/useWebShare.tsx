import { useCallback, useState } from 'react';

import { useAppDispatch } from './hooks';
import { onOpen } from '../features/shareModal/shareModalSlice';

import { IWebShare } from '../types';

export const useWebShare: IWebShare = (title, text, url) => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);

  const handleShare = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (navigator.share) {
        if (navigator.canShare && !navigator.canShare({ title, text, url })) {
          setError('Cannot share this content');
          return;
        }

        try {
          await navigator.share({
            title,
            text,
            url,
          });
        } catch (error: unknown) {
          console.log('Error sharing:', error);
          setError(error instanceof Error ? error.message : String(error));
        }
      } else {
        const payload = {
          url,
          text,
          title,
        };

        dispatch(onOpen(payload));
      }
    },
    [dispatch, text, title, url]
  );

  return {
    error,
    handleShare,
  };
};
