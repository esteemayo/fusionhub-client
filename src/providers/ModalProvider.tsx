import AccountModal from '../components/AccountModal';
import UpdateModal from '../components/UpdateModal';
import PostModal from '../components/postModal/PostModal';
import CommentModal from '../components/CommentModal';

const ModalProvider = () => {
  return (
    <>
      <PostModal />
      <UpdateModal />
      <AccountModal />
      <CommentModal />
    </>
  );
};

export default ModalProvider;
