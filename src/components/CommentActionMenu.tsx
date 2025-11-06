import ContextMenu from './contextMenu/ContextMenu';
import CommentActionMenuList from './CommentActionMenuList';

import { CommentActionMenuProps } from '../types';

const CommentActionMenu = ({
  authorRole,
  currentUser,
  postAuthorRole,
  isAdmin,
  isCommentAuthor,
  isPostAuthor,
  isShow,
  isMuted,
  onReport,
  onMute,
  onDelete,
  onUpdate,
}: CommentActionMenuProps) => {
  return (
    <ContextMenu isOpen={isShow}>
      <CommentActionMenuList
        authorRole={authorRole}
        currentUser={currentUser}
        postAuthorRole={postAuthorRole}
        isAdmin={isAdmin}
        isCommentAuthor={isCommentAuthor}
        isPostAuthor={isPostAuthor}
        isMuted={isMuted}
        onReport={onReport}
        onMute={onMute}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </ContextMenu>
  );
};

export default CommentActionMenu;
