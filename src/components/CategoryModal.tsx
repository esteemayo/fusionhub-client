import Modal from './modal/Modal';
import DeleteContent from './deleteContent/DeleteContent';

import { useCategory } from '../hooks/useCategory';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { onClose } from '../features/categoryModal/categoryModalSlice';

const CategoryModal = () => {
  const dispatch = useAppDispatch();

  const { deleteMutation } = useCategory();
  const { isOpen, categoryId } = useAppSelector((state) => state.categoryModal);

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleSubmit = () => {
    deleteMutation.mutate(String(categoryId), { onSuccess: handleClose });
  };

  const bodyContent: JSX.Element | undefined = (
    <DeleteContent text='Are you sure you want to delete this category? This action cannot be undone and will remove all associated data.' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Delete Category Confirmation'
      type='cancel'
      isLoading={deleteMutation.isPending}
      disabled={deleteMutation.isPending}
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
