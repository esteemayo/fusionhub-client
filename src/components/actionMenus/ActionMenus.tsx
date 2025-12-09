import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import PencilIcon from '../icons/PencilIcon';
import SaveIcon from '../icons/SaveIcon';
import FeatureIcon from '../icons/FeatureIcon';
import TrashIcon from '../icons/TrashIcon';
import ActionMenu from '../actionMenu/ActionMenu';
import ShareIcon from '../icons/ShareIcon';

import * as postModal from '../../features/postModal/postModalSlice';
import { onClose } from '../../features/postMenuActions/postMenuActionsSlice';

import { useSavedPosts } from '../../hooks/useSavedPosts';
import { useWebShare } from '../../hooks/useWebShare';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { excerpts, stripHtml } from '../../utils';
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

  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { isOpen } = useAppSelector((state) => state.postMenuActions);

  const parsedDesc = useMemo(
    () => parse(String(post?.desc)).toString(),
    [post?.desc]
  );

  const text = excerpts(stripHtml(parsedDesc), 80);

  const { handleShare } = useWebShare(
    post?.title || '',
    text || '',
    window.location.href
  );

  const postId = useMemo(() => post?._id, [post]);

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
        toast.error(errorMessage, { role: 'alert' });
      } else {
        toast.error('An error occurred', { role: 'alert' });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => removePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted!', { role: 'alert' });
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
        toast.error(errorMessage, { role: 'alert' });
      } else {
        toast.error('An error occurred', { role: 'alert' });
      }
    },
  });

  const handleFeature = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    featureMutation.mutate();
  };

  const onShareHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleShare(e);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    if (isOpen) dispatch(onClose());

    dispatch(postModal.setPost(post));
    dispatch(postModal.onOpen());
    dispatch(postModal.setPostQueryKey('posts'));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) return;
    deleteMutation.mutate();
  };

  const isAdmin = useMemo(() => currentUser?.role === 'admin', [currentUser]);

  const authorId = useMemo(() => post?.author._id, [post]);
  const userId = useMemo(() => currentUser?.details._id, [currentUser]);

  const authorizationCheck = useMemo(() => {
    if (!currentUser) return false;

    if (isAdmin) {
      if (authorId === userId) return true;
      if (post?.author.role === 'admin') return false;
      return true;
    }

    return authorId === userId;
  }, [authorId, currentUser, isAdmin, post?.author.role, userId]);

  const isFeatured = !!post?.isFeatured;

  return (
    <section
      className='action-menus'
      role='region'
      aria-label='Post action menus'
    >
      <div
        className='action-menus__container'
        role='menu'
        aria-label='Available actions for this post'
      >
        {currentUser && isAdmin && (
          <ActionMenu
            label='Feature post'
            isLoading={featureMutation.isPending}
            onAction={handleFeature}
            aria-label='Feature post'
            aria-expanded='false'
          >
            <FeatureIcon
              isFeatured={isFeatured}
              isLoading={featureMutation.isPending}
            />
          </ActionMenu>
        )}

        {isPending ? (
          <span
            className='action-menus__container--loader'
            aria-live='polite'
            aria-busy={isPending}
          >
            loading...
          </span>
        ) : error ? (
          <span className='action-menus__container--message' role='alert'>
            {error.message || 'Saved post fetching failed.'}
          </span>
        ) : (
          currentUser?.role !== 'admin' && (
            <ActionMenu
              label='Save post'
              isLoading={saveMutation.isPending}
              onAction={handleSave}
              aria-label='Save post'
            >
              <SaveIcon
                isLoading={saveMutation.isPending}
                hasSaved={isSaved}
                className='action-menus__btn--svg'
              />
            </ActionMenu>
          )
        )}

        <ActionMenu
          label='Share post'
          onAction={onShareHandler}
          aria-label='Share post'
        >
          <ShareIcon />
        </ActionMenu>

        {authorizationCheck && (
          <ActionMenu
            label='Update post'
            onAction={handleUpdate}
            aria-label='Update post'
          >
            <PencilIcon />
          </ActionMenu>
        )}

        {authorizationCheck && (
          <ActionMenu
            label='Delete post'
            isLoading={deleteMutation.isPending}
            onAction={handleDelete}
            aria-label='Delete post'
          >
            <TrashIcon className='action-menus__btn--svg' />
          </ActionMenu>
        )}
      </div>
    </section>
  );
};

export default ActionMenus;
