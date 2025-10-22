import Modal from './modal/Modal';
import MuteContent from './muteContent/MuteContent';

import { onClose } from '../features/muteModal/muteModalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const MuteModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.muteModal }));

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleSubmit = () => {};

  const bodyContent: JSX.Element | undefined = <MuteContent />;

  return (
    <Modal
      isOpen={isOpen}
      title=''
      type='cancel'
      isLoading={false}
      disabled={false}
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
