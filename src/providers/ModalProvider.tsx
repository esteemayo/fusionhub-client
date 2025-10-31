import BlockModal from '../components/BlockModal';
import MuteModal from '../components/MuteModal';
import BannerModal from '../components/BannerModal';
import ImageModal from '../components/ImageModal';
import AccountModal from '../components/AccountModal';
import DeleteModal from '../components/DeleteModal';
import CommentModal from '../components/CommentModal';
import ShareModal from '../components/ShareModal';
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
      <MuteModal />
      <BlockModal />
    </>
  );
};

export default ModalProvider;
