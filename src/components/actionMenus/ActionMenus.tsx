import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import SaveIcon from '../SaveIcon';
import ActionMenu from '../actionMenu/ActionMenu';

import { onOpen, setPost } from '../../features/postModal/postModalSlice';
import { onClose } from '../../features/postMenuActions/postMenuActionsSlice';

import { useSavedPosts } from '../../hooks/useSavedPosts';
import { useWebShare } from '../../hooks/useWebShare';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { ActionMenusProps } from '../../types';
import { deletePost, featurePost } from '../../services/postService';

import './ActionMenus.scss';

const createFeaturePost = async (postId: string) => {
  const { data } = await featurePost(postId);
  return data;
};

const removePost = async (postId: string) => {
  const { data } = await deletePost(postId);
  return data;
};

const ActionMenus = ({ post }: ActionMenusProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));
  const { isOpen } = useAppSelector((state) => ({ ...state.postMenuActions }));

  const { error: shareError, share } = useWebShare(
    post?.title || '',
    post?.desc || '',
    window.location.href
  );

  const postId = useMemo(() => {
    return post?._id;
  }, [post]);

  const { isPending, isSaved, error, saveMutation, handleSave } =
    useSavedPosts(postId);

  const featureMutation = useMutation({
    mutationFn: () => createFeaturePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', post?.slug] });
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

  const deleteMutation = useMutation({
    mutationFn: () => removePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted!');
      navigate('/posts');
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

  const handleFeature = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return null;
    }

    featureMutation.mutate();
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (shareError) {
      toast.error(shareError);
      return;
    }

    share();
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isOpen) {
      dispatch(onClose());
    }

    if (!currentUser) {
      return null;
    }

    dispatch(onOpen());
    dispatch(setPost(post));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return null;
    }

    deleteMutation.mutate();
  };

  const isAdmin = useMemo(() => {
    return currentUser?.role === 'admin';
  }, [currentUser]);

  const userId = useMemo(() => {
    return currentUser?.details._id;
  }, [currentUser]);

  const authorId = useMemo(() => {
    return post?.author._id;
  }, [post]);

  const isFeatured = useMemo(() => {
    return !!post?.isFeatured;
  }, [post]);

  return (
    <section className='action-menus'>
      <div className='action-menus__container'>
        {currentUser && isAdmin && (
          <ActionMenu
            label='Feature post'
            isLoading={featureMutation.isPending}
            onAction={handleFeature}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 action-menus__btn--svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                fill={
                  featureMutation.isPending
                    ? isFeatured
                      ? 'none'
                      : '#dddcdc'
                    : isFeatured
                    ? '#dddcdc'
                    : 'none'
                }
              />
            </svg>
          </ActionMenu>
        )}
        {isPending ? (
          <span className='action-menus__container--loader'>loading...</span>
        ) : error ? (
          <span className='action-menus__container--message'>
            {error.message || 'Saved post fetching failed'}
          </span>
        ) : (
          currentUser?.role !== 'admin' && (
            <ActionMenu
              label='Save post'
              isLoading={saveMutation.isPending}
              onAction={handleSave}
            >
              <SaveIcon
                isLoading={saveMutation.isPending}
                hasSaved={isSaved}
                className='action-menus__btn--svg'
              />
            </ActionMenu>
          )
        )}
        <ActionMenu label='Share post' onAction={handleShare}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6 action-menus__btn--svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
            />
          </svg>
        </ActionMenu>
        {(userId === authorId || isAdmin) && (
          <ActionMenu label='Update post' onAction={handleUpdate}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 action-menus__btn--svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
              />
            </svg>
          </ActionMenu>
        )}
        {(userId === authorId || isAdmin) && (
          <ActionMenu
            label='Delete post'
            isLoading={deleteMutation.isPending}
            onAction={handleDelete}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 action-menus__btn--svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
          </ActionMenu>
        )}
      </div>
    </section>
  );
};

export default ActionMenus;
