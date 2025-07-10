import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import { likeComment } from '../services/commentService';

import { ILikeComment } from '../types';

const createLikeComment = async (commentId: string) => {
  const { data } = await likeComment(commentId);
  return data;
};

export const useLikeComment: ILikeComment = (commentId, likes, queryKey) => {
  const queryClient = useQueryClient();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const likeCommentMutation = useMutation({
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
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    likeCommentMutation.mutate(commentId);
  };

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser?.details._id]);

  const isLiked = useMemo(() => {
    return !!likes.some((like) => like === userId) || false;
  }, [likes, userId]);

  return {
    isLiked,
    handleLike,
    likeCommentMutation,
  };
};
