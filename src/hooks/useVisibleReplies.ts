import { useMemo } from 'react';
import { IVisibleReplies } from '../types';

export const useVisibleReplies: IVisibleReplies = (
  replyLists,
  blockedUsers,
  mutedReplies
) => {
  return useMemo(() => {
    return (replyLists ?? []).filter((reply) => {
      const isBlocked = (blockedUsers ?? []).some(
        (user) => user.id === reply.author._id
      );

      const isMuted = (mutedReplies ?? []).some(
        (entry) => entry.id === reply._id
      );

      return !isBlocked && !isMuted;
    });
  }, [blockedUsers, mutedReplies, replyLists]);
};
