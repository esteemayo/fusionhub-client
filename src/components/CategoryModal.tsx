import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/categoryModal/categoryModalSlice';

import { deleteCategory } from '../services/categoryService';

const removeCategory = async (categoryId: string) => {
  const { data } = await deleteCategory(categoryId);
  return data;
};

const CategoryModal = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isOpen, categoryId } = useAppSelector((state) => ({
    ...state.categoryModal,
  }));

  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => removeCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category has been successfully deleted.');
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

  const handleSubmit = () => {
    deleteCategoryMutation.mutate(categoryId as string, {
      onSuccess: handleClose,
    });
  };

  const bodyContent: JSX.Element | undefined = (
    <DeleteContent text='Are you sure you want to delete this category? This action cannot be undone and will remove all associated data.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Delete Category Confirmation'
      type='cancel'
      isLoading={deleteCategoryMutation.isPending}
      disabled={deleteCategoryMutation.isPending}
      actionLabel='Delete Category'
      secondaryActionLabel='No, Keep Category'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryAction={handleClose}
    />
  );
};

export default CategoryModal;
