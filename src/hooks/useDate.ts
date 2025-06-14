import { useMemo } from 'react';

import { IDate } from '../types';

export const useDate: IDate = (dateTime) => {
  const formattedDate = useMemo(() => {
    const date = new Date(dateTime);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;

    if (diff < 60) {
      return '1m';
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}m`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h`;
    } else if (diff < 2592000) {
      return `${Math.floor(diff / 86400)}d`;
    } else if (diff < 31536000) {
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } else {
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }, [dateTime]);

  return {
    formattedDate,
  };
};
