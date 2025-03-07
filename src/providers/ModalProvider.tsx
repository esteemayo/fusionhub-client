import AccountModal from '../components/AccountModal';
import CommentModal from '../components/CommentModal';
import PostModal from '../components/postModal/PostModal';

const ModalProvider = () => {
  return (
    <>
      <PostModal />
      <AccountModal />
      <CommentModal />
    </>
  );
};

export default ModalProvider;
