import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IFavourite } from '../types';
import { dislikePost, likePost } from '../services/postService';

const createLikePost = async (postId: string) => {
  const { data } = await likePost(postId);
  return data;
};

const createDislikePost = async (postId: string) => {
  const { data } = await dislikePost(postId);
  return data;
};

export const useFavorite: IFavourite = (post, currentUser) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => createLikePost(post._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'posts', post.slug] });
    },
  });

  const disLikeMutation = useMutation({
    mutationFn: () => createDislikePost(post._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'posts', post.slug] });
    },
  });

  const handleLike = () => {
    if (!currentUser) {
      return navigate('/login');
    }

    likeMutation.mutate();
  };

  const handleDislike = () => {
    if (!currentUser) {
      return navigate('/login');
    }

    disLikeMutation.mutate();
  };

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser]);

  const isLiked = useMemo(() => {
    return !!post.likes.some((id) => id === userId);
  }, [post, userId]);

  const isDisliked = useMemo(() => {
    return !!post.dislikes.some((id) => id === userId);
  }, [post, userId]);

  return {
    isLiked,
    isDisliked,
    likeMutation,
    disLikeMutation,
    handleLike,
    handleDislike,
  };
};
