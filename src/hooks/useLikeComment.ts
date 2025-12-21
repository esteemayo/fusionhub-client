import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import { dislikeComment, likeComment } from '../services/commentService';

import { ILikeComment } from '../types';

const createLikeComment = async (commentId: string) => {
  const { data } = await likeComment(commentId);
  return data;
};

const createDislikeComment = async (commentId: string) => {
  const { data } = await dislikeComment(commentId);
  return data;
};

export const useLikeComment: ILikeComment = (
  commentId,
  likes,
  dislikes,
  queryKey
) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const likeMutation = useMutation({
    mutationFn: createLikeComment,
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
    mutationFn: createDislikeComment,
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
    likeMutation.mutate(commentId);
  };

  const handleDislike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    dislikeMutation.mutate(commentId);
  };

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser?.details._id]);

  const isLiked = useMemo(() => {
    return !!(likes ?? []).some((like) => like === userId) || false;
  }, [likes, userId]);

  const isDisliked = useMemo(() => {
    return !!(dislikes ?? []).some((dislike) => dislike === userId) || false;
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
