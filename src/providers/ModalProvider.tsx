import AccountModal from '../components/AccountModal';
import ImageModal from '../components/ImageModal';
import CommentModal from '../components/CommentModal';
import BannerModal from '../components/BannerModal';
import PostModal from '../components/postModal/PostModal';
import DeleteModal from '../components/DeleteModal';
import ReplyCommentModal from '../components/ReplyCommentModal';
import CategoryModal from '../components/CategoryModal';

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
      <DeleteModal />
    </>
  );
};

export default ModalProvider;
