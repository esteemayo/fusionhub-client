import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import ShareContent from './shareContent/ShareContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/shareModal/shareModalSlice';

const ShareModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.shareModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('url');
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.log('Clipboard copy failed:', err);
      toast.error('Could not copy this link.');
    }
  };

  const bodyContent: JSX.Element | undefined = (
    <ShareContent url='http://localhost:5173/post/an-introduction-to-frontend-development#comment-685699e2d0658fb08c99f3f4' />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Share this link'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleCopy}
    />
  );
};

export default ShareModal;
