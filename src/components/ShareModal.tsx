import { toast } from 'react-toastify';

import Modal from './modal/Modal';
import ShareContent from './shareContent/ShareContent';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/shareModal/shareModalSlice';

const ShareModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, url, text, title } = useAppSelector(
    (state) => state.shareModal
  );

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error: unknown) {
      console.log('Clipboard copy failed:', error);
      toast.error('Could not copy this link.', { role: 'alert' });
    } finally {
      handleClose();
    }
  };

  const bodyContent: JSX.Element | undefined = (
    <ShareContent url={url} text={text} title={title} onClick={handleCopy} />
  );

  return (
    <Modal
      isOpen={isOpen}
      title='Share this link'
      type='cancel'
      actionLabel='Copy Link'
      secondaryActionLabel='Cancel'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleCopy}
      secondaryAction={handleClose}
    />
  );
};

export default ShareModal;
