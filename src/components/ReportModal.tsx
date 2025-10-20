import { useEffect, useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Modal from './modal/Modal';
import ReportForm from './reportForm/ReportForm';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose, resetState } from '../features/reportModal/reportModalSlice';

import { reportOptions } from '../data/formData';
import { reportSchema } from '../validations/reportSchema';

type FormData = z.infer<typeof reportSchema>;

const ReportModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, user, commentId } = useAppSelector((state) => ({
    ...state.reportModal,
  }));

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
      // TODO: mute user API call
    }

    console.log({ ...data, reason: finalReason });
    toast.success('Your report has been submitted successfully');
    reset();
  };

  const targetType = useMemo(() => {
    return commentId ? 'comment' : 'reply';
  }, [commentId]);

  const titleLabel = useMemo(() => {
    return `Report ${commentId ? 'Comment' : 'Reply'}`;
  }, [commentId]);

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
      options={reportOptions}
      register={register as unknown as UseFormRegister<FieldValues>}
      reasonError={errors.reason as unknown as string}
      customError={errors.customReason as unknown as string}
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
