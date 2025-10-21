import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { useEffect, useMemo } from 'react';

import Modal from './modal/Modal';
import ReportForm from './reportForm/ReportForm';

import { useMute } from '../hooks/useMute';
import { useReport } from '../hooks/useReport';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose, resetState } from '../features/reportModal/reportModalSlice';

import { MutePayload, ReportPayload } from '../types';
import { reportOptions } from '../data/formData';
import { reportSchema } from '../validations/reportSchema';

type FormData = z.infer<typeof reportSchema>;

const ReportModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, user, targetType, targetId } = useAppSelector((state) => ({
    ...state.reportModal,
  }));

  const { reportMutation } = useReport();
  const { mutedList, muteMutation } = useMute();

  const isMuted = useMemo(() => {
    return (
      !!(mutedList?.mutedUsers ?? []).some((userId) => userId === user.id) ||
      false
    );
  }, [mutedList?.mutedUsers, user.id]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: '',
      customReason: '',
      details: '',
      muteUser: false,
    },
  });

  const reason = watch('reason');

  const handleClose = () => {
    dispatch(onClose());
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { reason, customReason } = data;
    const finalReason =
      reason === 'Other' ? customReason?.trim() || '' : reason;

    if (!finalReason) return;

    if (data.muteUser) {
      const payload: MutePayload = {
        targetType,
        targetId,
        action: isMuted ? 'unmute' : 'mute',
      };

      muteMutation.mutate(payload);
    }

    const payload: ReportPayload = {
      ...data,
      targetType,
      targetId,
    };

    reportMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        handleClose();
      },
    });
  };

  const titleLabel = useMemo(() => {
    return `Report ${targetType
      .charAt(0)
      .toUpperCase()
      .concat(targetType.slice(1))}`;
  }, [targetType]);

  useEffect(() => {
    if (isOpen) {
      return () => {
        dispatch(resetState());
      };
    }
  }, [dispatch, isOpen]);

  const bodyContent: JSX.Element | undefined = (
    <ReportForm
      reason={reason}
      username={user.username}
      targetType={targetType}
      disabled={reportMutation.isPending || muteMutation.isPending}
      options={reportOptions}
      register={register as unknown as UseFormRegister<FieldValues>}
      reasonError={errors.reason?.message}
      detailsError={errors.details?.message}
      customError={errors.customReason?.message}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      title={titleLabel}
      type='cancel'
      isLoading={false}
      disabled={false}
      actionLabel='Submit Report'
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={handleClose}
    />
  );
};

export default ReportModal;
