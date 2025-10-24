import { useMemo } from 'react';
import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import MuteContent from './muteContent/MuteContent';

import { useMute } from '../hooks/useMute';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { MutePayload } from '../types';
import { onClose } from '../features/muteModal/muteModalSlice';

const MuteModal = () => {
  const dispatch = useAppDispatch();

  const { muteMutation } = useMute();
  const { isOpen, action, targetId, targetName, targetType } = useAppSelector(
    (state) => ({
      ...state.muteModal,
    })
  );

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleSubmit = () => {
    const payload: MutePayload = {
      targetType,
      targetId,
      action,
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
      case 'user':
        return {
          title: `Mute ${targetName ? `@${targetName}` : 'this user'}?`,
          description: `You won’t see new comments or replies from ${
            targetName ? `@${targetName}` : 'this user'
          }. They won’t be notified that you’ve muted them, and you can unmute them anytime in your settings.`,
          toastMsg: `You’ve muted ${
            targetName ? `@${targetName}` : 'this user'
          }.`,
        };

      case 'comment':
        return {
          title: 'Mute this comment?',
          description:
            'This comment will be hidden from your view. You won’t get updates or replies related to it, but others can still see and interact with it.',
          toastMsg: 'This comment has been muted.',
        };

      case 'reply':
        return {
          title: 'Mute this reply?',
          description:
            'This reply will be hidden from your view. You won’t receive further replies or notifications from this thread unless you unmute it later.',
          toastMsg: 'Reply muted successfully.',
        };

      default:
        return { title: '', description: '', toastMsg: '' };
    }
  }, [targetName, targetType]);

  const bodyContent: JSX.Element | undefined = (
    <MuteContent description={content.description} />
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
      onSubmit={handleSubmit}
      secondaryAction={handleClose}
    />
  );
};

export default MuteModal;
