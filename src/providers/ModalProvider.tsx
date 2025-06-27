import AccountModal from '../components/AccountModal';
import ImageModal from '../components/ImageModal';
import CategoryModal from '../components/CategoryModal';
import BannerModal from '../components/BannerModal';
import PostModal from '../components/postModal/PostModal';
import CommentModal from '../components/CommentModal';
import ReplyCommentModal from '../components/ReplyCommentModal';

const ModalProvider = () => {
  return (
    <>
      <PostModal />
      <AccountModal />
      <CommentModal />
      <BannerModal />
      <ImageModal />
      <ReplyCommentModal />
      <CategoryModal />
    </>
  );
};

export default ModalProvider;
