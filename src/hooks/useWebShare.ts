import { useCallback, useState } from 'react';

import { useAppDispatch } from './hooks';
import { onOpen } from '../features/shareModal/shareModalSlice';

import { IWebShare } from '../types';

export const useWebShare: IWebShare = (
  title,
  text,
  url,
  imageUrl,
  fileName
) => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);

  const handleShare = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();

      if (navigator.canShare && navigator.share) {
        if (navigator.canShare && !navigator.canShare({ title, text, url })) {
          setError('Cannot share this content');
          return;
        }

        try {
          let shareData: ShareData = {
            title,
            text,
            url,
          };

          if (imageUrl && navigator.canShare({ files: [] })) {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File(
              [blob],
              fileName! ?? '/img/default-post.jpg',
              { type: blob.type }
            );
            shareData = { ...shareData, files: [file] };
          }

          await navigator.share(shareData);
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
    [dispatch, fileName, imageUrl, text, title, url]
  );

  return {
    error,
    handleShare,
  };
};
