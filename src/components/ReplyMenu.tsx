import ContextMenu from './contextMenu/ContextMenu';
import ReplyMenuList from './ReplyMenuList';

import { ReplyMenuProps } from '../types';

const ReplyMenu = ({
  authorRole,
  commentAuthorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isShow,
  isPostAuthor,
  isReplyAuthor,
  isMuted,
  onDelete,
  onUpdate,
  onMute,
  onReport,
}: ReplyMenuProps) => {
  return (
    <ContextMenu isOpen={isShow}>
      <ReplyMenuList
        authorRole={authorRole}
        commentAuthorRole={commentAuthorRole}
        currentUser={currentUser}
        postAuthorRole={postAuthorRole}
        isAdmin={isAdmin}
        isCommentAuthor={isCommentAuthor}
        isPostAuthor={isPostAuthor}
        isReplyAuthor={isReplyAuthor}
        isMuted={isMuted}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onMute={onMute}
        onReport={onReport}
      />
    </ContextMenu>
  );
};

export default ReplyMenu;
