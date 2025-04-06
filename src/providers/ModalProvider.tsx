import AccountModal from '../components/AccountModal';
import BannerModal from '../components/BannerModal';
import CommentModal from '../components/CommentModal';
import UpdateModal from '../components/UpdateModal';
import PostModal from '../components/postModal/PostModal';

const ModalProvider = () => {
  return (
    <>
      <PostModal />
      <UpdateModal />
      <AccountModal />
      <CommentModal />
      <BannerModal />
    </>
  );
};

export default ModalProvider;
