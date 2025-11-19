import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Modal from './modal/Modal';
import ReportForm from './reportForm/ReportForm';

import { useMute } from '../hooks/useMute';
import { useReport } from '../hooks/useReport';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose, resetState } from '../features/reportModal/reportModalSlice';

import { MutePayload, ReportPayload } from '../types';
import { reportOptions } from '../data/formData';
import { ReportInputData, reportSchema } from '../validations/reportSchema';

const ReportModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, user, targetType, targetId } = useAppSelector(
    (state) => state.reportModal
  );

  const { reportMutation } = useReport();
  const { mutedList, muteMutation } = useMute();

  const isMuted = useMemo(() => {
    return (
      !!(mutedList?.mutedUsers ?? []).some((entry) => entry.id === user.id) ||
      false
    );
  }, [mutedList?.mutedUsers, user.id]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ReportInputData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: 'Spam or misleading',
      customReason: '',
      details: '',
      muteUser: false,
    },
  });

  const selectedReason = watch('reason');

  const setCustomValue = (
    name: keyof ReportInputData,
    value: string | boolean
  ) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleClose = () => {
    dispatch(onClose());

    setCustomValue('reason', 'Spam or misleading');
    setCustomValue('customReason', '');
    setCustomValue('details', '');
    setCustomValue('muteUser', false);
  };

  const onSubmit: SubmitHandler<ReportInputData> = (data) => {
    const { reason, customReason, details } = data;

    if (data.muteUser) {
      const payload: MutePayload = {
        targetType,
        targetId,
        reason,
      };

      muteMutation.mutate(payload);
    }

    const payload: ReportPayload = {
      targetType,
      targetId,
      reason,
      customReason,
      details,
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
      reason={selectedReason}
      username={user.username}
      targetType={targetType}
      isMuted={isMuted}
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
      isLoading={reportMutation.isPending || muteMutation.isPending}
      disabled={reportMutation.isPending || muteMutation.isPending}
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
