import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import { likeReply } from '../services/replyService';

import { ILikeReply } from '../types';

const createLikeReply = async (replyId: string) => {
  const { data } = await likeReply(replyId);
  return data;
};

export const useLikeReply: ILikeReply = (reply, commentId) => {
  const queryClient = useQueryClient();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const likeReplyMutation = useMutation({
    mutationFn: createLikeReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', commentId] });
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
    likeReplyMutation.mutate(reply._id);
  };

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser?.details._id]);

  const isLiked = useMemo(() => {
    return !!reply.likes.some((like) => like === userId) || false;
  }, [reply.likes, userId]);

  return {
    isLiked,
    handleLike,
    likeReplyMutation,
  };
};
