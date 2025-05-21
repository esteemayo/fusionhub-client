import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/commentModal/commentModalSlice';

import { deleteComment } from '../services/commentService';

const removeComment = async (commentId: string) => {
  const { data } = await deleteComment(commentId);
  return data;
};

const CommentModal = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  const { isOpen, commentId } = useAppSelector((state) => ({
    ...state.commentModal,
  }));

  const mutation = useMutation({
    mutationFn: (commentId: string) => removeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Comment removed!');
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
    dispatch(onClose());
  };

  const handleClick = () => {
    mutation.mutate(commentId, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const bodyContent: React.JSX.Element | undefined = (
    <DeleteContent text='Are you sure you want to permanently delete this comment? This action cannot be undone.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Delete Comment?'
      type='cancel'
      isLoading={mutation.isPending}
      disabled={mutation.isPending}
      actionLabel='Delete'
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleClick}
      secondaryAction={handleClose}
    />
  );
};

export default CommentModal;
