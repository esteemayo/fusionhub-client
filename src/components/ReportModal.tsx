import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import ReportForm from './reportForm/ReportForm';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/reportModal/reportModalSlice';

import { reportOptions } from '../data/formData';
import { reportSchema } from '../validations/reportSchema';

type FormData = z.infer<typeof reportSchema>;

const ReportModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, username } = useAppSelector((state) => ({
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

  const bodyContent: JSX.Element | undefined = (
    <ReportForm
      reason={reason}
      username={username}
      options={reportOptions}
      register={register as unknown as UseFormRegister<FieldValues>}
      reasonError={errors.reason as unknown as string}
      customError={errors.customReason as unknown as string}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Report Comment'
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
