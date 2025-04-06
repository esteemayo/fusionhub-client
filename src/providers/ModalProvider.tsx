import AccountModal from '../components/AccountModal';
import ImageModal from '../components/ImageModal';
import CommentModal from '../components/CommentModal';
import BannerModal from '../components/BannerModal';
import PostModal from '../components/postModal/PostModal';
import UpdateModal from '../components/UpdateModal';

const ModalProvider = () => {
  return (
    <>
      <PostModal />
      <UpdateModal />
      <AccountModal />
      <CommentModal />
      <BannerModal />
      <ImageModal />
    </>
  );
};

export default ModalProvider;
