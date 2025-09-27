import AccountModal from '../components/AccountModal';
import ShareModal from '../components/ShareModal';
import CommentModal from '../components/CommentModal';
import ImageModal from '../components/ImageModal';
import CategoryModal from '../components/CategoryModal';
import BannerModal from '../components/BannerModal';
import PostModal from '../components/postModal/PostModal';
import DeleteModal from '../components/DeleteModal';
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
      <ShareModal />
      <CategoryModal />
      <DeleteModal />
    </>
  );
};

export default ModalProvider;
