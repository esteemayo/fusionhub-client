import BannerModal from '../components/BannerModal';
import MuteModal from '../components/MuteModal';
import AccountModal from '../components/AccountModal';
import ShareModal from '../components/ShareModal';
import CommentModal from '../components/CommentModal';
import ImageModal from '../components/ImageModal';
import CategoryModal from '../components/CategoryModal';
import DeleteModal from '../components/DeleteModal';
import PostModal from '../components/postModal/PostModal';
import ReportModal from '../components/ReportModal';

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
      <MuteModal />
    </>
  );
};

export default ModalProvider;
