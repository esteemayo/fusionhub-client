import { toast } from 'react-toastify';

import Modal from './modal/Modal';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/reportModal/reportModalSlice';

const ReportModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.reportModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const onSubmit = () => {
    toast.success('submitted');
  };

  const bodyContent: JSX.Element | undefined = (
    <div className='flex flex-col gap-4'>
      <textarea
        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Describe the issue...'
        rows={4}
      />
      <p className='text-sm text-gray-500'>
        Please provide as much detail as possible to help us understand the
        issue.
      </p>
    </div>
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
      onSubmit={onSubmit}
      secondaryAction={handleClose}
    />
  );
};

export default ReportModal;
