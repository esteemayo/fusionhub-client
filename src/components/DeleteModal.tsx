import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { closeDeleteModal } from '../features/deleteModal/deleteModalSlice';

import { deletePost } from '../services/postService';

const removePost = async (postId: string) => {
  const { data } = await deletePost(postId);
  return data;
};

const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isOpen, postId, queryKey } = useAppSelector(
    (state) => state.deleteModal
  );

  const deletePostMutation = useMutation({
    mutationFn: removePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success('Post deleted successfully');
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

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const handleSubmit = () => {
    deletePostMutation.mutate(postId!, {
      onSuccess: handleClose,
    });
  };

  const bodyContent: JSX.Element | undefined = (
    <DeleteContent text='Are you sure you want to delete this article? This action cannot be undone.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Confirm Deletion'
      type='cancel'
      isLoading={deletePostMutation.isPending}
      disabled={deletePostMutation.isPending}
      actionLabel='Confirm Delete'
      secondaryActionLabel='Cancel Deletion'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryAction={handleClose}
    />
  );
};

export default DeleteModal;
