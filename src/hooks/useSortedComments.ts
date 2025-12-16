import { useMemo, useState } from 'react';
import { ISortedComments, sortType } from '../types';

export const useSortedComments: ISortedComments = (comments) => {
  const [sort, setSort] = useState<sortType>('best');

  const sortedComments = useMemo(() => {
    return [...(comments ?? [])].sort((a, b) => {
      if (sort === 'best') return b.likeCount - a.likeCount;

      if (sort === 'newest')
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      if (sort === 'oldest')
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      if (sort === 'mostReplies')
        return (b.replies ?? []).length - (a.replies ?? []).length;

      if (sort === 'mostControversial') {
        const scoreA = Math.min(a.likeCount, a.dislikeCount);
        const scoreB = Math.min(b.likeCount, b.dislikeCount);

        return scoreB - scoreA;
      }

      return 0;
    });
  }, [comments, sort]);

  return {
    sort,
    setSort,
    sortedComments,
  };
};
