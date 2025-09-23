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
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => createLikePost(post._id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', post.slug] });

      const previousPost = queryClient.getQueryData(['post', post.slug]);

      queryClient.setQueryData(
        ['post', post.slug],
        (old: typeof post | undefined) => {
          if (!old) return old;
          return {
            ...old,
            likes: [...old.likes, currentUser?.details._id],
          };
        }
      );

      return { previousPost };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', post.slug], context.previousPost);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', post.slug] });
    },
  });

  const disLikeMutation = useMutation({
    mutationFn: () => createDislikePost(post._id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', post.slug] });

      const previousPost = queryClient.getQueryData(['post', post.slug]);

      queryClient.setQueryData(
        ['post', post.slug],
        (old: typeof post | undefined) => {
          if (!old) return old;
          return {
            ...old,
            dislikes: [...old.dislikes, currentUser?.details._id],
          };
        }
      );

      return { previousPost };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', post.slug], context.previousPost);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', post.slug] });
    },
  });

  const handleLike = () => {
    if (!currentUser) {
      return null;
    }

    likeMutation.mutate();
  };

  const handleDislike = () => {
    if (!currentUser) {
      return null;
    }

    disLikeMutation.mutate();
  };

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser]);

  const isLiked = useMemo(() => {
    return !!(post.likes ?? []).some((id) => id === userId);
  }, [post, userId]);

  const isDisliked = useMemo(() => {
    return !!(post.dislikes ?? []).some((id) => id === userId);
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
