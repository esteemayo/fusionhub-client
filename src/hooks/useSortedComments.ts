import { useMemo, useState } from 'react';

import { ISortedComments, sortType } from '../types';

export const useSortedComments: ISortedComments = (comments) => {
  const [sort, setSort] = useState<sortType>('best');

  const sortedComments = useMemo(() => {
    return [...(comments ?? [])].sort((a, b) => {
      if (sort === 'best') {
        return b.likeCount - a.likeCount;
      } else if (sort === 'newest') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });
  }, [comments, sort]);

  return {
    sort,
    setSort,
    sortedComments,
  };
};
