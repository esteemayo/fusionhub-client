import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import MuteContent from './muteContent/MuteContent';

import { useMute } from '../hooks/useMute';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { onClose } from '../features/muteModal/muteModalSlice';
import { MuteFormData, muteSchema } from '../validations/muteSchema';

import { MutePayload } from '../types';

const MuteModal = () => {
  const dispatch = useAppDispatch();

  const { muteMutation } = useMute();
  const { isOpen, targetId, targetName, targetType, isMuted } = useAppSelector(
    (state) => ({
      ...state.muteModal,
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MuteFormData>({
    resolver: zodResolver(muteSchema),
    defaultValues: {
      reason: '',
    },
  });

  const handleClose = () => {
    dispatch(onClose());
    reset();
  };

  const onSubmit: SubmitHandler<MuteFormData> = (data) => {
    const { reason } = data;

    const payload: MutePayload = {
      targetId,
      targetType,
      reason,
    };

    muteMutation.mutate(payload, {
      onSuccess: (data) => {
        const message = (data as { message?: string })?.message;

        toast.success(message || content.toastMsg);
        handleClose();
      },
    });
  };

  const content = useMemo(() => {
    switch (targetType) {
      case 'User':
        return {
          title: `Mute ${targetName ? `@${targetName}` : 'this user'}?`,
          description: `You won’t see new comments or replies from ${
            targetName ? `@${targetName}` : 'this user'
          }. They won’t be notified that you’ve muted them, and you can unmute them anytime in your settings.`,
          toastMsg: `You’ve muted ${
            targetName ? `@${targetName}` : 'this user'
          }.`,
        };

      case 'Comment':
        return {
          title: isMuted
            ? `Unmute this ${targetType.toLowerCase()}?`
            : `Mute this ${targetType.toLowerCase()}?`,
          description:
            'This comment will be hidden from your view. You won’t get updates or replies related to it, but others can still see and interact with it.',
          toastMsg: 'This comment has been muted.',
        };

      case 'Reply':
        return {
          title: isMuted
            ? `Unmute this ${targetType.toLowerCase()}?`
            : `Mute this ${targetType.toLowerCase()}?`,
          description:
            'This reply will be hidden from your view. You won’t receive further replies or notifications from this thread unless you unmute it later.',
          toastMsg: 'Reply muted successfully.',
        };

      default:
        return { title: '', description: '', toastMsg: '' };
    }
  }, [isMuted, targetName, targetType]);

  const bodyContent: JSX.Element | undefined = (
    <MuteContent
      description={content.description}
      targetType={targetType}
      isMuted={isMuted}
      register={register as unknown as UseFormRegister<FieldValues>}
      errors={errors}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      title={content.title}
      type='cancel'
      isLoading={muteMutation.isPending}
      disabled={muteMutation.isPending}
      actionLabel='Mute'
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={handleClose}
    />
  );
};

export default MuteModal;
