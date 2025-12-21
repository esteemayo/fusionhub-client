import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import { dislikeReply, likeReply } from '../services/replyService';

import { ILikeReply } from '../types';

const createLikeReply = async (replyId: string) => {
  const { data } = await likeReply(replyId);
  return data;
};

const createDislikeReply = async (replyId: string) => {
  const { data } = await dislikeReply(replyId);
  return data;
};

export const useLikeReply: ILikeReply = (
  replyId,
  likes,
  dislikes,
  queryKey
) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const likeMutation = useMutation({
    mutationFn: createLikeReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage, { role: 'alert' });
      } else {
        toast.error('An error occurred', { role: 'alert' });
      }
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: createDislikeReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage, { role: 'alert' });
      } else {
        toast.error('An error occurred', { role: 'alert' });
      }
    },
  });

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    likeMutation.mutate(replyId);
  };

  const handleDislike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    dislikeMutation.mutate(replyId);
  };

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser?.details._id]);

  const isLiked = useMemo(() => {
    return !!(likes ?? [])?.some((like) => like === userId) || false;
  }, [likes, userId]);

  const isDisliked = useMemo(() => {
    return !!(dislikes ?? [])?.some((dislike) => dislike === userId) || false;
  }, [dislikes, userId]);

  return {
    isLiked,
    isDisliked,
    handleLike,
    handleDislike,
    likeMutation,
    dislikeMutation,
  };
};
