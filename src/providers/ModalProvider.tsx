import AccountModal from '../components/AccountModal';
import ImageModal from '../components/ImageModal';
import PostModal from '../components/postModal/PostModal';
import BannerModal from '../components/BannerModal';
import ReplyCommentModal from '../components/ReplyCommentModal';
import CommentModal from '../components/CommentModal';

const ModalProvider = () => {
  return (
    <>
      <PostModal />
      <AccountModal />
      <CommentModal />
      <BannerModal />
      <ImageModal />
      <ReplyCommentModal />
    </>
  );
};

export default ModalProvider;
