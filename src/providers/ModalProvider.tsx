import BannerModal from '../components/BannerModal';
import ShareModal from '../components/ShareModal';
import AccountModal from '../components/AccountModal';
import ImageModal from '../components/ImageModal';
import CommentModal from '../components/CommentModal';
import DeleteModal from '../components/DeleteModal';
import CategoryModal from '../components/CategoryModal';
import ReportModal from '../components/ReportModal';
import PostModal from '../components/postModal/PostModal';

const ModalProvider = () => {
  return (
    <>
      <PostModal />
      <AccountModal />
      <CommentModal />
      <BannerModal />
      <ImageModal />
      <ShareModal />
      <CategoryModal />
      <DeleteModal />
      <ReportModal />
    </>
  );
};

export default ModalProvider;
