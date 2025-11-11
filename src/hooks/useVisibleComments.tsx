import { useMemo } from 'react';

import { IVisibleComments } from '../types';

export const useVisibleComments: IVisibleComments = (
  comments,
  blockedUsers,
  mutedComments
) => {
  return useMemo(() => {
    return comments?.filter((comment) => {
      const isBlocked = (blockedUsers ?? []).some(
        (user) => user.id === comment.author._id
      );

      const isMuted = (mutedComments ?? []).some(
        (entry) => entry.id === comment._id
      );

      return !isBlocked && !isMuted;
    });
  }, [blockedUsers, comments, mutedComments]);
};
