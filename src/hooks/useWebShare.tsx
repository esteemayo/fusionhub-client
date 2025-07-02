import { useCallback, useState } from 'react';

import { IWebShare } from '../types';

export const useWebShare: IWebShare = (
  title: string,
  desc: string,
  url: string
) => {
  const [error, setError] = useState<string | null>(null);

  const share = useCallback(async () => {
    if (navigator.share) {
      if (
        navigator.canShare &&
        !navigator.canShare({ title, text: desc, url })
      ) {
        setError('Cannot share this content');
        return;
      }

      try {
        await navigator.share({
          title: title,
          text: desc,
          url: url,
        });
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : String(error));
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setError('Web Share API not supported, copied to clipboard');
      } catch {
        setError('Failed to copy to clipboard');
      }
    }
  }, [desc, title, url]);

  return {
    error,
    share,
  };
};
