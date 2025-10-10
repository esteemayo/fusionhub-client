import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSavedPostsCount } from '../services/postService';
import { getSavedPosts, savePost } from '../services/userService';

import { useAppSelector } from './hooks';
import { ISavedPosts, PostType } from '../types';

const fetchSavedPosts = async () => {
  const { data } = await getSavedPosts();
  return data;
};

const fetchSavedPostsCount = async (postId: string) => {
  const { data } = await getSavedPostsCount(postId);
  return data;
};

const createSavePost = async (postId: string) => {
  const { data } = await savePost(postId);
  return data;
};

export const useSavedPosts: ISavedPosts = (postId) => {
  const queryClient = useQueryClient();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery<PostType[]>({
    queryKey: ['savedPosts'],
    queryFn: fetchSavedPosts,
    enabled: !!currentUser,
  });

  const {
    isPending: isPendingSavedCount,
    error: errorSavedCount,
    data: savedPostsCount,
    refetch,
  } = useQuery<number | undefined>({
    queryKey: ['savedPostsCount', postId],
    queryFn: () => fetchSavedPostsCount(postId as string),
    enabled: !!postId,
  });

  const saveMutation = useMutation({
    mutationFn: createSavePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedPosts'] });
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

  const handleSave = () => {
    if (!currentUser) {
      return null;
    }

    saveMutation.mutate(postId as string, {
      onSuccess: refetch,
    });
  };

  const isSaved = useMemo(() => {
    const isSavedPost =
      (savedPosts ?? [])?.some((post) => post._id === (postId as string)) ||
      false;

    return !!isSavedPost;
  }, [postId, savedPosts]);

  return {
    isPending,
    isPendingSavedCount,
    isSaved,
    error,
    errorSavedCount,
    savedPosts,
    savedPostsCount,
    saveMutation,
    handleSave,
  };
};
