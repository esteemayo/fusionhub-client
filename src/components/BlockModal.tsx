import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Modal from './modal/Modal';
import BlockContent from './blockContent/BlockContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/blockModal/blockModalSlice';

import { useBlockedUsers } from '../hooks/useBlockedUsers';
import { BlockInputData, blockSchema } from '../validations/blockSchema';

const BlockModal = () => {
  const dispatch = useAppDispatch();

  const { blockUserMutation } = useBlockedUsers();
  const { isOpen, isBlocked, targetId } = useAppSelector(
    (state) => state.blockModal
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlockInputData>({
    resolver: zodResolver(blockSchema),
    defaultValues: {
      reason: '',
    },
  });

  const handleClose = () => {
    dispatch(onClose());
    reset();
  };

  const onSubmit: SubmitHandler<BlockInputData> = (data) => {
    const { reason } = data;
    blockUserMutation.mutate({ targetId, reason }, { onSuccess: handleClose });
  };

  const bodyContent: JSX.Element | undefined = (
    <BlockContent
      isBlocked={isBlocked}
      register={register as unknown as UseFormRegister<FieldValues>}
      errors={errors}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      title={`${isBlocked ? 'Unblock' : 'Block'} User`}
      type='cancel'
      isLoading={blockUserMutation.isPending}
      disabled={blockUserMutation.isPending}
      actionLabel={isBlocked ? 'Unblock' : 'Block'}
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={handleClose}
    />
  );
};

export default BlockModal;
