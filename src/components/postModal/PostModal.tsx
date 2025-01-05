import Modal from '../modal/Modal';

import './PostModal.scss';

const PostModal = () => {
  return (
    <Modal
      isOpen
      title='Tell us your story'
      actionLabel='Submit'
      secondaryActionLabel='Prev'
      onClose={() => console.log('closed')}
      onSubmit={() => console.log('submitted')}
    />
  );
};

export default PostModal;
